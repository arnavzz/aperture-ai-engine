import os
import pandas as pd
from pymongo import MongoClient
from sqlalchemy import create_engine

def device_type_flag(device_type: str) -> int:
    return 1 if device_type.lower() == "mobile" else 0

def query_intent_flag(intent: str) -> int:
    mapping = {"navigational": 0, "informational": 1, "commercial": 2}
    return mapping.get(intent.lower(), 1)

def load_features():
    # Load SERP snapshots
    mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
    serp_df = pd.DataFrame(list(mongo.aperture_db.serp_snapshots.find()))

    # Load user metrics
    engine = create_engine(os.getenv("POSTGRES_URI", "postgresql://postgres:password@localhost:5432/aperture"))
    metrics_df = pd.read_sql("SELECT query, page_url, ctr, scroll_depth, dwell_time FROM user_metrics", engine)

    # Merge on query + page_url
    df = pd.merge(serp_df, metrics_df, how="inner", on=["query", "page_url"])

    # Feature creation
    df["aio_length"] = df["elements"].apply(
        lambda els: sum(e["position"]["height"] for e in els if e["tag"] == "DIV" and "data-attrid" in e.get("html", ""))
    )
    df["snippet_richness"] = df["html"].str.count("<li>") + df["html"].str.contains("application/ld+json").astype(int)
    df["device_type_flag"] = df["device_type"].apply(device_type_flag)
    df["query_intent_flag"] = df["query_intent"].apply(query_intent_flag)
    df["brand_flag"] = df["brand_flag"].astype(int)

    feature_cols = ["aio_length", "organic_rank", "snippet_richness", "device_type_flag", "query_intent_flag", "brand_flag"]
    return df[feature_cols + ["ctr", "scroll_depth"]]

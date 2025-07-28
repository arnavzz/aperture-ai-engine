import os
import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
gaps = pd.DataFrame(list(mongo.aperture_db.gap_insights.find()))
metrics = pd.DataFrame(list(mongo.aperture_db.user_metrics.find()))

# Merge gap insights with user metrics
df = gaps.merge(metrics, on="page_url")
df["traffic_norm"] = df["impressions"] / df["impressions"].max()
df["gap_size_norm"] = 1 - df["gaps"].apply(lambda g: g[0]["distance"])
df["brand_flag"] = df["brand_flag"].astype(int)

# Compute weighted score
alpha, beta, gamma = 0.5, 0.3, 0.2
df["score"] = alpha * df["traffic_norm"] + beta * df["gap_size_norm"] + gamma * df["brand_flag"]

# Store top-N priorities
top = df.sort_values("score", ascending=False).head(50)
mongo.aperture_db.gap_priorities.replace_one({}, top.to_dict(orient="records"), upsert=True)

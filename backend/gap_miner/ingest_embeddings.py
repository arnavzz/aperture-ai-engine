import os
from pymongo import MongoClient
from .embedding_service import embed_text
from .vector_store import upsert_point

# Connect to MongoDB
mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
coll = mongo.aperture_db.content_chunks

# Embed and upsert each document
for doc in coll.find():
    text = doc["text"]
    vec = embed_text(text)
    uid = f"{doc['source']}_{str(doc['_id'])}"
    payload = {
        "source": doc["source"],
        "query": doc["query"],
        "url": doc.get("url", "")
    }
    upsert_point(uid, vec, payload)

import os
from pymongo import MongoClient
from .embedding_service import embed_text
from .vector_store import search_vector

# Connect to MongoDB
mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
pages = mongo.aperture_db.your_pages.find()

gap_results = []
for page in pages:
    # Embed page content
    page_vec = embed_text(page["content"])
    # Search nearest neighbors
    hits = search_vector(page_vec, top_k=20)
    # Filter out own content
    gaps = [h for h in hits if h.payload["source"] != "your_site"]
    gap_results.append({
        "page_url": page["url"],
        "gaps": [{"query": h.payload["query"], "distance": h.score} for h in gaps]
    })

# Store gap insights
mongo.aperture_db.gap_insights.insert_many(gap_results)

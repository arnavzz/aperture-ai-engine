import os
import networkx as nx
from pymongo import MongoClient
from .embedding_service import embed_text
from sklearn.metrics.pairwise import cosine_similarity

# Connect to MongoDB
mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
serp = mongo.aperture_db.serp_snapshots
graph = nx.DiGraph()

# Extract PAA questions and add nodes
for snap in serp.find():
    for el in snap.get("elements", []):
        if el.get("type") == "paa_item":
            q = el.get("text", "")
            vec = embed_text(q)
            graph.add_node(q, vector=vec, source="paa")

# Connect similar questions
nodes = list(graph.nodes(data=True))
for i, (q1, d1) in enumerate(nodes):
    for q2, d2 in nodes[i+1:]:
        sim = cosine_similarity([d1["vector"]], [d2["vector"]])[0][0]
        if sim > 0.8:
            graph.add_edge(q1, q2, weight=float(sim))

# Save question graph
data = nx.readwrite.json_graph.node_link_data(graph)
mongo.aperture_db.question_graphs.replace_one({}, data, upsert=True)

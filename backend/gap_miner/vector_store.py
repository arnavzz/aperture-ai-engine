from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

# Initialize Qdrant client
client = QdrantClient(url="http://localhost:6333", prefer_grpc=False)

# Create or recreate the collection
client.recreate_collection(
    collection_name="aperture_embeddings",
    vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
)

def upsert_point(point_id: str, vector: list[float], payload: dict):
    client.upsert(
        collection_name="aperture_embeddings",
        points=[{"id": point_id, "vector": vector, "payload": payload}]
    )

def search_vector(vector: list[float], top_k: int = 10):
    return client.search(
        collection_name="aperture_embeddings",
        query_vector=vector,
        limit=top_k
    )

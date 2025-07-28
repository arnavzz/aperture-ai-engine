import os, requests

GROQ_KEY = os.getenv("GROQ_API_KEY")
EMB_MODEL = "groq-embedding-1"

def embed_text(text: str) -> list[float]:
    resp = requests.post(
        "https://api.groq.com/openai/v1/embeddings",
        headers={"Authorization": f"Bearer {GROQ_KEY}"},
        json={"model": EMB_MODEL, "input": text}
    )
    resp.raise_for_status()
    return resp.json()["data"][0]["embedding"]

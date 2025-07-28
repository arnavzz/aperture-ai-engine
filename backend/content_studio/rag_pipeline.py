import os, requests
from jinja2 import Environment, FileSystemLoader

from gap_miner.embedding_service import embed_text
from gap_miner.vector_store import search_vector

GROQ_KEY = os.getenv("GROQ_API_KEY")
LLM_MODEL = "llama3-70b-4096"

env = Environment(loader=FileSystemLoader("backend/content_studio/prompt_templates"))

def retrieve_context(query: str, top_k=5) -> str:
    vec = embed_text(query)
    hits = search_vector(vec, top_k)
    return "\n\n".join(h.payload.get("text", "") for h in hits)

def generate_block(block_type: str, query: str, context: str) -> str:
    template = env.get_template(f"{block_type}_template.j2")
    prompt = template.render(query=query, context=context)
    resp = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {GROQ_KEY}"},
        json={
            "model": LLM_MODEL,
            "messages": [{"role": "system", "content": prompt}],
            "max_tokens": 512
        }
    )
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"]
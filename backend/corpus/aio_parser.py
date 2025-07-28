import requests
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_groq_aio(query: str):
    headers = {"Authorization": f"Bearer {GROQ_API_KEY}"}
    prompt = f"Simulate the Google AIO for the query: '{query}'"
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        json={
            "model": "llama3-70b-4096",
            "messages": [{"role": "user", "content": prompt}],
        }
    )
    data = response.json()
    return data["choices"][0]["message"]["content"]

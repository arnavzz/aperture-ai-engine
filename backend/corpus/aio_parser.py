# aio_parser.py
import requests

def get_groq_aio(query, groq_api_key):
    prompt = f"Simulate the AIO response Google would show for the query: '{query}'"
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {groq_api_key}"},
        json={
            "model": "llama3-70b-4096",
            "messages": [{"role": "user", "content": prompt}],
        }
    )
    return response.json()["choices"][0]["message"]["content"]

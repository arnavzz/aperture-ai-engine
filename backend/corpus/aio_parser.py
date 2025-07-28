import requests

def get_groq_aio(query: str, groq_api_key: str):
    prompt = f"Simulate the Google AIO for the query: '{query}'"
    response = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={"Authorization": f"Bearer {groq_api_key}"},
        json={
            "model": "llama3-70b-4096",
            "messages": [{"role": "user", "content": prompt}],
        }
    )
    data = response.json()
    return data["choices"][0]["message"]["content"]

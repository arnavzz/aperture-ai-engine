import requests

def fetch_your_content(api_url: str, token: str):
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f"{api_url}/content", headers=headers)
    return response.json()

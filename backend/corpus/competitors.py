import requests
from bs4 import BeautifulSoup

def fetch_competitor_content(urls: list):
    contents = []
    for url in urls:
        r = requests.get(url)
        soup = BeautifulSoup(r.text, 'html.parser')
        paragraphs = [p.text for p in soup.find_all('p')]
        contents.append({'url': url, 'text': ' '.join(paragraphs)})
    return contents

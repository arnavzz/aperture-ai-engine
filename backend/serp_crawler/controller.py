import subprocess
import json
from fastapi import APIRouter

router = APIRouter()

@router.get("/crawl-serp")
def crawl_serp(query: str):
    # Executes the Puppeteer script and returns SERP data
    cmd = f'node puppeteer_script.js "{query}"'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return json.loads(result.stdout)

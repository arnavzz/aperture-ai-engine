# controller.py
import subprocess, json
from fastapi import APIRouter

router = APIRouter()

@router.get("/crawl-serp")
def crawl_serp(query: str):
    cmd = f'node puppeteer_script.js "{query}"'
    result = subprocess.run(cmd, shell=True, capture_output=True)
    return json.loads(result.stdout)

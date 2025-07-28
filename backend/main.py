# backend/main.py
import os
from fastapi import FastAPI
from dotenv import load_dotenv

# Load .env early
load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))

app = FastAPI()

# Phase 1: SERP crawler
from serp_crawler.controller import router as serp_router
app.include_router(serp_router, prefix="/api")

# Phase 2: Risk prediction
from backend.models.predict_router import router as predict_router   # if you wrapped predict-risk in a router
app.include_router(predict_router, prefix="/api")

# Phase 4: Content augmentation
from content_studio.augment_endpoints import router as aug_router
app.include_router(aug_router, prefix="/api")

# Phase 5: Human‑in‑the‑Loop QA
from governance.huaqa_endpoints import router as qa_router
app.include_router(qa_router, prefix="/api")

# Start schedulers on startup
from analytics.scheduler import start_scheduler as start_analytics_scheduler
from governance.feedback_loop import start_feedback_loop

@app.on_event("startup")
def startup_tasks():
    start_analytics_scheduler()
    start_feedback_loop()

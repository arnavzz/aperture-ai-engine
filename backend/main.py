from fastapi import FastAPI
from serp_crawler.controller import router as serp_router

app = FastAPI()

app.include_router(serp_router, prefix="/api")

# Placeholder: import and integrate other modules as needed

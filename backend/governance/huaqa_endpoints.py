from fastapi import APIRouter
from pydantic import BaseModel
from pymongo import MongoClient
import os

router = APIRouter()
mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))

class QARequest(BaseModel):
    page_url: str
    augmentation: dict
    approved: bool
    override_html: str = None

@router.post("/qa-review")
def qa_review(req: QARequest):
    coll = mongo.aperture_db.editor_feedback
    coll.insert_one(req.dict())
    return {"status": "recorded"}
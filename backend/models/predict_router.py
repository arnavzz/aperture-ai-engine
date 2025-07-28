# backend/models/predict_router.py
import os, joblib
from fastapi import APIRouter
from pydantic import BaseModel
from .feature_store import device_type_flag, query_intent_flag

router = APIRouter()

# load your models
model_dir = os.getenv("MODEL_DIR", "backend/models")
aio_clf = joblib.load(f"{model_dir}/aio_classifier.joblib")
ctr_model = joblib.load(f"{model_dir}/ctr_model.joblib")

class PredictRequest(BaseModel):
    aio_length: float
    organic_rank: int
    snippet_richness: int
    device_type: str
    query_intent: str
    brand_flag: bool

@router.post("/predict-risk")
def predict(req: PredictRequest):
    feats = [
        int(req.aio_length > 0),
        req.aio_length,
        req.organic_rank,
        req.snippet_richness,
        device_type_flag(req.device_type),
        query_intent_flag(req.query_intent),
        int(req.brand_flag)
    ]
    return {
        "aio_risk": float(aio_clf.predict_proba([feats])[0][1]),
        "ctr_pred": float(ctr_model.predict([feats])[0])
    }

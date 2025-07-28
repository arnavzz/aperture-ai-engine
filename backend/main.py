import os, joblib
from fastapi import FastAPI
from pydantic import BaseModel

from models.feature_store import device_type_flag, query_intent_flag

app = FastAPI()
model_dir = os.getenv("MODEL_DIR", "backend/models")
aio_clf = joblib.load(os.path.join(model_dir, "aio_classifier.joblib"))
ctr_model = joblib.load(os.path.join(model_dir, "ctr_model.joblib"))

class PredictRequest(BaseModel):
    aio_length: float
    organic_rank: int
    snippet_richness: int
    device_type: str
    query_intent: str
    brand_flag: bool

def preprocess_request(req: PredictRequest):
    device_flag = device_type_flag(req.device_type)
    intent_flag = query_intent_flag(req.query_intent)
    return [
        int(req.aio_length > 0),
        req.aio_length,
        req.organic_rank,
        req.snippet_richness,
        device_flag,
        intent_flag,
        int(req.brand_flag)
    ]

@app.post("/api/predict-risk")
def predict(req: PredictRequest):
    features = preprocess_request(req)
    aio_prob = float(aio_clf.predict_proba([features])[0][1])
    ctr_pred = float(ctr_model.predict([features])[0])
    return {"aio_risk": aio_prob, "ctr_pred": ctr_pred}

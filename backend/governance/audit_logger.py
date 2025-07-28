from pymongo import MongoClient
import datetime
import os

mongo = MongoClient(os.getenv("MONGODB_URI", "mongodb://localhost:27017"))
logs = mongo.aperture_db.audit_logs

def log_interaction(prompt: str, response: str, user: str):
    logs.insert_one({
        "prompt": prompt,
        "response": response,
        "user": user,
        "timestamp": datetime.datetime.utcnow()
    })
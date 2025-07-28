import os
import joblib
from sklearn.model_selection import train_test_split
from xgboost import XGBRegressor
from models.feature_store import load_features

def train():
    df = load_features()
    X = df[["aio_length", "organic_rank", "snippet_richness", "device_type_flag", "query_intent_flag", "brand_flag"]]
    y = df["ctr"]
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

    model = XGBRegressor(n_estimators=200, learning_rate=0.05, max_depth=6)
    model.fit(X_train, y_train, eval_set=[(X_val, y_val)], early_stopping_rounds=10, verbose=True)
    rmse = ((model.predict(X_val) - y_val) ** 2).mean() ** 0.5
    print("Validation RMSE:", rmse)

    model_path = os.getenv("MODEL_DIR", "backend/models")
    os.makedirs(model_path, exist_ok=True)
    joblib.dump(model, f"{model_path}/ctr_model.joblib")

if __name__ == "__main__":
    train()

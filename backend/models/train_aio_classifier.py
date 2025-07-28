import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from models.feature_store import load_features

def train():
    df = load_features()
    X = df[["aio_length", "organic_rank", "snippet_richness", "device_type_flag", "query_intent_flag", "brand_flag"]]
    y = df["aio_length"].gt(0).astype(int)
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

    clf = GradientBoostingClassifier(n_estimators=100, learning_rate=0.1, max_depth=5)
    clf.fit(X_train, y_train)
    print("Validation accuracy:", clf.score(X_val, y_val))

    model_path = os.getenv("MODEL_DIR", "backend/models")
    os.makedirs(model_path, exist_ok=True)
    joblib.dump(clf, f"{model_path}/aio_classifier.joblib")

if __name__ == "__main__":
    train()

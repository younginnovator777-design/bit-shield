from src.ingestion.parsers import parse_json
from src.features.engine import compute_features
from src.models.detector import train_isolation_forest
from src.explainability.explainer import explain_model

def test_ml_and_shap_flow():
    df = parse_json("data/raw/synthetic_data.json")
    df_feat = compute_features(df)
    model, df_scored, feature_cols = train_isolation_forest(df_feat)
    explanations = explain_model(model, df_scored, feature_cols)
    
    assert "risk_score" in df_scored.columns
    assert len(explanations) == len(df_scored)
    print("✓ Isolation Forest and SHAP explanations verified!")

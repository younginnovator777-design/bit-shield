from src.ingestion.parsers import parse_json
from src.features.engine import compute_features
from src.models.detector import train_isolation_forest
from src.explainability.explainer import explain_model
from src.scoring.fused_score import compute_fused_scores

def test_full_backend_pipeline():
    df = parse_json("data/raw/synthetic_data.json")
    df_feat = compute_features(df)
    model, df_scored, feature_cols = train_isolation_forest(df_feat)
    explanations = explain_model(model, df_scored, feature_cols)
    df_alerts = compute_fused_scores(df_scored, explanations)
    
    assert "confidence_score" in df_alerts.columns
    assert "priority_band" in df_alerts.columns
    assert len(df_alerts) == len(df)
    print("✓ Full backend scoring & alert pipeline verified!")

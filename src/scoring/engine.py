import numpy as np
import polars as pl
from src.scoring.rules import assign_priority_band

def compute_risk_and_confidence(df: pl.DataFrame, anomaly_scores: np.ndarray, shap_values=None, feature_names=None) -> pl.DataFrame:
    min_s, max_s = anomaly_scores.min(), anomaly_scores.max()
    if max_s - min_s > 1e-6:
        base_ml_risk = ((anomaly_scores - min_s) / (max_s - min_s)) * 100.0
    else:
        base_ml_risk = np.full_like(anomaly_scores, 50.0)

    risk_scores = []
    confidence_scores = []
    priority_bands = []
    top_features = []
    shap_explanations = []

    for i in range(len(df)):
        row = df.row(i, named=True)
        
        ip_reuse = row.get("ip_reuse_count", 1)
        vpn_flag = row.get("vpn_flag", 0)
        vulnerability_flag = row.get("vulnerability_flag", 0)
        fan_out = row.get("fan_out_ratio", 1.0)
        completeness = row.get("completeness_score", 0.90)

        ip_spike_risk = min(100.0, (ip_reuse - 1) * 30.0 + (vpn_flag * 40.0) + (vulnerability_flag * 50.0))
        fanout_spike_risk = min(100.0, fan_out * 15.0) if fan_out > 2.0 else 0.0

        final_risk = float(max(base_ml_risk[i], ip_spike_risk, fanout_spike_risk))
        final_risk = min(100.0, round(final_risk, 1))

        confidence = round(float(completeness) * 100.0, 1)

        priority = assign_priority_band(final_risk)

        if ip_spike_risk >= max(base_ml_risk[i], fanout_spike_risk) and ip_spike_risk > 0:
            top_feat = "ip_reuse_count"
            explanation = "Repeated network observation or high-risk IP endpoint detected."
        elif fanout_spike_risk > base_ml_risk[i]:
            top_feat = "fan_out_ratio"
            explanation = "Unusually high fund dispersal across multiple output addresses."
        else:
            top_feat = "total_input_amount"
            explanation = "Statistical volume anomaly detected in transaction profile."

        risk_scores.append(final_risk)
        confidence_scores.append(confidence)
        priority_bands.append(priority)
        top_features.append(top_feat)
        shap_explanations.append(explanation)

    return df.with_columns([
        pl.Series("risk_score", risk_scores),
        pl.Series("confidence_score", confidence_scores),
        pl.Series("priority_band", priority_bands),
        pl.Series("top_feature", top_features),
        pl.Series("shap_explanation", shap_explanations)
    ])

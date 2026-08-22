import polars as pl

def compute_fused_scores(df_scored: pl.DataFrame, explanations: list) -> pl.DataFrame:
    records = []
    for row, exp in zip(df_scored.iter_rows(named=True), explanations):
        risk = float(row["risk_score"])
        
        # Locked 5-Part Confidence Calculation
        D = float(row.get("completeness_score", 0.5))
        E = 0.9 if exp.get("contribution", 0.0) > 0.05 else 0.4
        S = 0.8
        G_s = 0.75 if row.get("fan_out_ratio", 0) > 2 else 0.3
        X = 0.85 if exp.get("top_feature") else 0.2
        
        confidence = round((0.25*D + 0.30*E + 0.20*S + 0.15*G_s + 0.10*X) * 100, 1)
        
        # 2-Axis Priority Matrix
        if risk >= 75 and confidence >= 70:
            priority = "Priority Lead"
        elif risk >= 75 and confidence < 70:
            priority = "Investigate Further"
        elif risk < 75 and confidence >= 70:
            priority = "Low Concern"
        else:
            priority = "Insufficient Evidence"
            
        # Plain-English Translation
        feat = exp.get("top_feature", "")
        if "fan_out" in feat:
            narrative = "Unusually high fund dispersion. Funds were distributed across significantly more outputs than expected."
        elif "reuse" in feat:
            narrative = "Repeated network observation. Multiple transactions originated from the same endpoint."
        else:
            narrative = f"Activity anomaly detected in {feat}."
            
        records.append({
            "txid": row["txid"], 
            "risk_score": round(risk, 1), 
            "confidence_score": confidence, 
            "priority_band": priority,
            "top_feature": feat, 
            "shap_explanation": narrative
        })
    return pl.DataFrame(records)

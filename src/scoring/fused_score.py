import polars as pl

def compute_fused_scores(df_scored: pl.DataFrame, explanations: list) -> pl.DataFrame:
    records = []
    for row, exp in zip(df_scored.iter_rows(named=True), explanations):
        risk = float(row["risk_score"])
        
        # Confidence calculation: Completeness (D) + Evidence Corroboration (E)
        completeness = float(row.get("completeness_score", 0.5))
        top_shap_val = exp.get("contribution", 0.0)
        corroboration = 0.9 if top_shap_val > 0.05 else 0.4
        
        confidence = round((completeness * 0.5 + corroboration * 0.5) * 100, 1)
        
        # Assign Priority Band
        if risk >= 75 and confidence >= 70:
            priority = "Critical (High Evidence)"
        elif risk >= 75:
            priority = "Critical (Limited Evidence)"
        elif risk >= 50:
            priority = "Review"
        else:
            priority = "Low"
            
        records.append({
            "txid": row["txid"],
            "risk_score": round(risk, 1),
            "confidence_score": confidence,
            "priority_band": priority,
            "top_feature": exp["top_feature"],
            "shap_explanation": f"Flagged primarily due to {exp['top_feature']}"
        })
        
    return pl.DataFrame(records)

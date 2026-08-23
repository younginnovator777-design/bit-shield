def assign_priority_band(risk_score: float) -> str:
    if risk_score >= 75.0:
        return "Priority Lead"
    elif risk_score >= 40.0:
        return "Investigate Further"
    else:
        return "Low Concern"

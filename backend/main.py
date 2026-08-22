from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.services.pipeline_service import get_alerts, get_local_graph

app = FastAPI(title="BIT-SHIELD Offline API", version="3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "offline_backend_active"}

@app.get("/api/overview")
def overview():
    alerts = get_alerts()
    high_pri = [a for a in alerts if a["priority_band"] == "Priority Lead"]
    return {
        "transactions_processed": len(alerts),
        "total_leads": len(alerts),
        "high_priority_leads": len(high_pri),
        "avg_risk": round(sum(a["risk_score"] for a in alerts) / len(alerts), 1) if alerts else 0,
        "avg_confidence": round(sum(a["confidence_score"] for a in alerts) / len(alerts), 1) if alerts else 0,
    }

@app.get("/api/alerts")
def list_alerts():
    return sorted(get_alerts(), key=lambda x: x["risk_score"], reverse=True)

@app.get("/api/alerts/{txid}")
def get_alert(txid: str):
    alerts = get_alerts()
    for a in alerts:
        if a["txid"] == txid:
            return a
    return {"error": "Lead not found"}

@app.get("/api/graph/{txid}")
def get_graph(txid: str, hops: int = 2):
    return get_local_graph(txid, hops)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.services.pipeline_service import run_full_pipeline, get_alerts, get_local_graph

app = FastAPI(title="BIT-SHIELD API", version="3.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "online", "mode": "offline-isolated"}

@app.get("/api/overview")
def overview():
    try:
        df_final, _, _ = run_full_pipeline()
        high_priority = len(df_final.filter(df_final["priority_band"] == "Priority Lead")) if "priority_band" in df_final.columns else 0
        avg_conf = round(float(df_final["confidence_score"].mean()), 1) if "confidence_score" in df_final.columns else 85.0
        return {
            "transactions_processed": len(df_final),
            "total_leads": len(df_final),
            "high_priority_leads": high_priority,
            "avg_confidence": avg_conf
        }
    except Exception as e:
        print(f"Error in overview: {e}")
        return {"transactions_processed": 0, "total_leads": 0, "high_priority_leads": 0, "avg_confidence": 0, "error": str(e)}

@app.get("/api/alerts")
def alerts():
    try:
        return get_alerts()
    except Exception as e:
        print(f"Error in alerts: {e}")
        return []

@app.get("/api/alerts/{txid}")
def alert_detail(txid: str):
    try:
        alerts_list = get_alerts()
        for a in alerts_list:
            if a.get("txid") == txid:
                return a
        return {"error": "TXID not found"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/graph/{txid}")
def graph_detail(txid: str, hops: int = 2):
    try:
        return get_local_graph(txid, hops)
    except Exception as e:
        return {"nodes": [], "edges": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)

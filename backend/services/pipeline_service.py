import json
import os
import polars as pl
from src.features.engine import compute_features
from src.models.detector import train_isolation_forest
from src.scoring.engine import compute_risk_and_confidence
from src.graph.builder import build_dual_layer_graph

def run_full_pipeline():
    raw_path = "data/raw/synthetic_data.json"
    if not os.path.exists(raw_path):
        return pl.DataFrame(), None, {}

    with open(raw_path, "r") as f:
        data = json.load(f)

    df = pl.DataFrame(data)

    # 1. Compute Features
    df_feat = compute_features(df)

    # 2. Train Isolation Forest & Extract Base ML Scores
    _, df_ml, _ = train_isolation_forest(df_feat)
    anomaly_scores = df_ml["risk_score"].to_numpy()

    # 3. Compute Max-Spike Risk & Priority Bands
    df_final = compute_risk_and_confidence(df_feat, anomaly_scores)

    # 4. Build Dual-Layer Graph (Extract graph object if tuple returned)
    graph_res = build_dual_layer_graph(df_final)
    G = graph_res[0] if isinstance(graph_res, tuple) else graph_res

    return df_final, G, {}

def get_alerts():
    df_final, _, _ = run_full_pipeline()
    if df_final.is_empty():
        return []
    return df_final.to_dicts()

def get_local_graph(txid: str, hops: int = 2):
    _, G, _ = run_full_pipeline()
    if G is None:
        return {"nodes": [], "edges": []}

    if isinstance(G, tuple):
        G = G[0]

    # Check both raw txid and TX: pre-pended node IDs
    target_node = None
    if G.has_node(txid):
        target_node = txid
    elif G.has_node(f"TX:{txid}"):
        target_node = f"TX:{txid}"

    if not target_node:
        return {"nodes": [], "edges": []}

    sub_nodes = set([target_node])
    for _ in range(hops):
        next_nodes = set(sub_nodes)
        for n in sub_nodes:
            next_nodes.update(G.neighbors(n))
        sub_nodes = next_nodes

    subG = G.subgraph(sub_nodes)
    nodes = [{"id": n, "label": n, "type": G.nodes[n].get("type", G.nodes[n].get("node_type", "unknown"))} for n in subG.nodes()]
    edges = [{"source": u, "target": v, "relation": d.get("relation", "OBSERVED_WITH")} for u, v, d in subG.edges(data=True)]
    return {"nodes": nodes, "edges": edges}

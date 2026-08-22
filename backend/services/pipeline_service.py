import polars as pl
import networkx as nx
from src.ingestion.parsers import parse_json
from src.features.engine import compute_features
from src.graph.builder import build_dual_layer_graph
from src.models.detector import train_isolation_forest
from src.explainability.explainer import explain_model
from src.scoring.fused_score import compute_fused_scores

_cache = {}

def run_full_pipeline(json_path: str = "data/raw/synthetic_data.json"):
    if "data" in _cache:
        return _cache["data"]

    df = parse_json(json_path)
    df_feat = compute_features(df)
    
    # Safely extract G if build_dual_layer_graph returns (G, entity_map)
    raw_graph = build_dual_layer_graph(df)
    G = raw_graph[0] if isinstance(raw_graph, tuple) else raw_graph

    model, df_scored, feature_cols = train_isolation_forest(df_feat)
    explanations = explain_model(model, df_scored, feature_cols)
    df_final = compute_fused_scores(df_scored, explanations)

    _cache["data"] = (df_final, G, explanations)
    return _cache["data"]

def get_alerts():
    df_final, _, _ = run_full_pipeline()
    return df_final.to_dicts()

def get_local_graph(txid: str, hops: int = 2):
    _, G, _ = run_full_pipeline()
    tx_node = f"TX:{txid}" if not txid.startswith("TX:") else txid
    if not G.has_node(tx_node):
        return {"nodes": [], "edges": []}

    sub_nodes = set([tx_node])
    for _ in range(hops):
        next_nodes = set(sub_nodes)
        for n in sub_nodes:
            next_nodes.update(G.neighbors(n))
        sub_nodes = next_nodes

    subG = G.subgraph(sub_nodes)
    nodes = [{"id": n, "label": n, "type": G.nodes[n].get("node_type", "unknown")} for n in subG.nodes()]
    edges = [{"source": u, "target": v, "relation": d.get("relation", "OBSERVED_WITH")} for u, v, d in subG.edges(data=True)]
    return {"nodes": nodes, "edges": edges}

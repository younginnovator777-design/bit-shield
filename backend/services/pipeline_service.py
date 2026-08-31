import json
import os
import random
from datetime import datetime, timezone

# ── Rich Mock Alert Profiles ─────────────────────────────────────────────────
# Used as fallback when the ML pipeline cannot run (missing data files, etc.)
# Covers 6 structural varieties: fan-out burst, Tor relay, mixer, bridge, benign, sparse

MOCK_ALERT_PROFILES = [
    {
        "txid": "e8b21f4a9c01",
        "risk_score": 91,
        "confidence_score": 78,
        "priority_band": "Priority Lead",
        "top_feature": "burst_velocity_score",
        "shap_explanation": (
            "Extreme burst velocity across 14 outputs in 42s from bulletproof ASN-45102. "
            "CIOH resolves 5 input wallets to single entity. High fan-out ratio (14.0) "
            "and graph centrality confirm coordinated dispersal syndicate."
        ),
        "amount_btc": 128.4,
        "output_count": 14,
        "asn": "AS45102 (Xnnet LLC — Bulletproof Host)",
        "ip": "203.0.113.88",
        "timestamp": "2025-06-14T03:22:18Z",
        "velocity_percentile": 99.4,
        "fan_out_ratio": 14.0,
        "graph_centrality": 0.87,
        "shap_values": [
            {"feature": "Burst Velocity",     "value": 0.32, "direction": "positive"},
            {"feature": "Fan-Out Ratio",       "value": 0.28, "direction": "positive"},
            {"feature": "ASN Risk Score",      "value": 0.18, "direction": "positive"},
            {"feature": "CIOH Cluster Size",   "value": 0.14, "direction": "positive"},
            {"feature": "Graph Centrality",    "value": 0.08, "direction": "positive"},
        ],
        "timeline_events": [
            {"offset_ms": 0,     "type": "input",  "label": "Consolidated funding wallet",       "amount_btc": 128.4},
            {"offset_ms": 3100,  "type": "output", "label": "Fan-out output #1",                 "amount_btc": 9.18},
            {"offset_ms": 6200,  "type": "output", "label": "Fan-out output #2",                 "amount_btc": 9.17},
            {"offset_ms": 9800,  "type": "output", "label": "Fan-out output #3",                 "amount_btc": 9.22},
            {"offset_ms": 18000, "type": "hop",    "label": "2nd-hop layer transfer",            "amount_btc": 82.4},
            {"offset_ms": 42000, "type": "output", "label": "Peer broadcast consolidation",      "amount_btc": 55.1},
        ],
        "neighborhood_nodes": [
            {"id": "bc1q7a3f...92e", "type": "wallet",   "risk": 91},
            {"id": "bc1q99x8...55b", "type": "wallet",   "risk": 44},
            {"id": "bc1q88aa...33f", "type": "wallet",   "risk": 38},
            {"id": "e8b21f4a9c01",  "type": "tx",        "risk": 91},
            {"id": "203.0.113.88",  "type": "ip",        "risk": 80},
            {"id": "AS45102",        "type": "asn",       "risk": 82},
            {"id": "bc1qd42m...10a", "type": "wallet",   "risk": 22},
        ],
        "neighborhood_edges": [
            {"from": "bc1q7a3f...92e", "to": "e8b21f4a9c01",  "weight": 5, "anomalous": True},
            {"from": "bc1q99x8...55b", "to": "e8b21f4a9c01",  "weight": 3, "anomalous": True},
            {"from": "bc1q88aa...33f", "to": "e8b21f4a9c01",  "weight": 2, "anomalous": False},
            {"from": "e8b21f4a9c01",  "to": "bc1qd42m...10a", "weight": 2, "anomalous": False},
            {"from": "203.0.113.88",  "to": "AS45102",         "weight": 4, "anomalous": True},
        ],
        "investigator_actions": [
            "Assign Priority 1 to senior analyst",
            "Freeze downstream UTXO trail",
            "Cross-reference AS45102 with INTERPOL OSINF DB",
            "Export court-admissible dossier (JSON/PDF)",
            "Tag entity cluster for ongoing monitoring",
        ],
    },
    {
        "txid": "401ca8d7b34f",
        "risk_score": 84,
        "confidence_score": 41,
        "priority_band": "Investigate Further",
        "top_feature": "fan_out_count",
        "shap_explanation": (
            "82.5 BTC peeling chain with abnormal locktime patterns. "
            "Originating from ephemeral Tor relay node with minimal historical co-spends. "
            "Evidence sparse due to single-session relay use."
        ),
        "amount_btc": 82.5,
        "output_count": 9,
        "asn": "AS0 (Tor Relay — Exit Node)",
        "ip": "198.51.100.24",
        "timestamp": "2025-06-14T07:55:03Z",
        "velocity_percentile": 96.2,
        "fan_out_ratio": 9.0,
        "graph_centrality": 0.61,
        "shap_values": [
            {"feature": "Fan-Out Count",        "value": 0.29, "direction": "positive"},
            {"feature": "Peeling Depth",         "value": 0.24, "direction": "positive"},
            {"feature": "Locktime Anomaly",      "value": 0.19, "direction": "positive"},
            {"feature": "Tor Relay Endpoint",    "value": 0.17, "direction": "positive"},
            {"feature": "Output Value Std Dev",  "value": 0.11, "direction": "positive"},
        ],
        "timeline_events": [
            {"offset_ms": 0,     "type": "input",  "label": "Originating wallet",    "amount_btc": 82.5},
            {"offset_ms": 5400,  "type": "output", "label": "Peeling output #1",     "amount_btc": 8.25},
            {"offset_ms": 11000, "type": "output", "label": "Peeling output #2",     "amount_btc": 8.24},
            {"offset_ms": 19200, "type": "hop",    "label": "Mid-chain aggregation", "amount_btc": 66.0},
            {"offset_ms": 38000, "type": "output", "label": "Tor relay broadcast",   "amount_btc": 55.1},
        ],
        "neighborhood_nodes": [
            {"id": "bc1q44d5...c7a", "type": "wallet", "risk": 84},
            {"id": "401ca8d7b34f",  "type": "tx",      "risk": 84},
            {"id": "198.51.100.24", "type": "ip",      "risk": 71},
            {"id": "AS0-TOR",       "type": "asn",     "risk": 65},
            {"id": "bc1q11f2...e1b", "type": "wallet", "risk": 18},
        ],
        "neighborhood_edges": [
            {"from": "bc1q44d5...c7a", "to": "401ca8d7b34f",  "weight": 5, "anomalous": True},
            {"from": "401ca8d7b34f",   "to": "bc1q11f2...e1b", "weight": 2, "anomalous": False},
            {"from": "198.51.100.24",  "to": "AS0-TOR",         "weight": 3, "anomalous": True},
        ],
        "investigator_actions": [
            "Initiate targeted reconnaissance on Tor relay session",
            "Correlate with historical Tor exit node blacklist",
            "Collect additional 24h temporal window PCAP",
            "Re-score after telemetry gap resolved",
        ],
    },
    {
        "txid": "9bf3301cc44a",
        "risk_score": 22,
        "confidence_score": 88,
        "priority_band": "Low Concern",
        "top_feature": "temporal_regularity",
        "shap_explanation": (
            "Regular exchange batch withdrawal pattern. Identified as Kraken exchange "
            "hot-wallet consolidation via multi-sig inputs. Commercial datacenter ASN confirmed."
        ),
        "amount_btc": 4.2,
        "output_count": 3,
        "asn": "AS16509 (Amazon Web Services — Commercial DC)",
        "ip": "54.240.0.1",
        "timestamp": "2025-06-14T12:00:01Z",
        "velocity_percentile": 34.1,
        "fan_out_ratio": 3.0,
        "graph_centrality": 0.18,
        "shap_values": [
            {"feature": "Temporal Regularity", "value": -0.28, "direction": "negative"},
            {"feature": "ASN Commercial",      "value": -0.21, "direction": "negative"},
            {"feature": "Multi-sig Pattern",   "value": -0.18, "direction": "negative"},
            {"feature": "Fan-Out Count",       "value":  0.11, "direction": "positive"},
        ],
        "timeline_events": [
            {"offset_ms": 0,     "type": "input",  "label": "Exchange hot wallet", "amount_btc": 4.2},
            {"offset_ms": 12000, "type": "output", "label": "Batch payout #1",    "amount_btc": 1.4},
            {"offset_ms": 25000, "type": "output", "label": "Batch payout #2",    "amount_btc": 1.4},
            {"offset_ms": 38000, "type": "output", "label": "Batch payout #3",    "amount_btc": 1.4},
        ],
        "neighborhood_nodes": [
            {"id": "bc1qex3k...99z", "type": "exchange", "risk": 5},
            {"id": "9bf3301cc44a",  "type": "tx",        "risk": 22},
            {"id": "54.240.0.1",    "type": "ip",        "risk": 4},
            {"id": "AS16509",       "type": "asn",       "risk": 3},
        ],
        "neighborhood_edges": [
            {"from": "bc1qex3k...99z", "to": "9bf3301cc44a", "weight": 2, "anomalous": False},
            {"from": "9bf3301cc44a",   "to": "54.240.0.1",   "weight": 1, "anomalous": False},
        ],
        "investigator_actions": [
            "Auto-log to baseline repository",
            "No triage required",
            "Flag as known benign exchange pattern",
        ],
    },
    {
        "txid": "613cc5f901db",
        "risk_score": 77,
        "confidence_score": 65,
        "priority_band": "Investigate Further",
        "top_feature": "graph_centrality",
        "shap_explanation": (
            "High betweenness centrality in transaction graph. Acts as bridge between two "
            "previously unconnected entity clusters. Fee density anomaly (+340% above median)."
        ),
        "amount_btc": 18.7,
        "output_count": 6,
        "asn": "AS24940 (Hetzner Online — Known VPS Provider)",
        "ip": "195.201.0.88",
        "timestamp": "2025-06-14T15:41:22Z",
        "velocity_percentile": 88.7,
        "fan_out_ratio": 6.0,
        "graph_centrality": 0.74,
        "shap_values": [
            {"feature": "Graph Centrality",  "value": 0.31, "direction": "positive"},
            {"feature": "Fee Density",       "value": 0.22, "direction": "positive"},
            {"feature": "Bridge Node Role",  "value": 0.20, "direction": "positive"},
            {"feature": "Cluster Connector", "value": 0.14, "direction": "positive"},
            {"feature": "Temporal Burst",    "value": 0.13, "direction": "positive"},
        ],
        "timeline_events": [
            {"offset_ms": 0,     "type": "input",  "label": "Cluster A funding",   "amount_btc": 18.7},
            {"offset_ms": 8000,  "type": "hop",    "label": "Bridge transfer",     "amount_btc": 18.7},
            {"offset_ms": 22000, "type": "output", "label": "Cluster B dispersal", "amount_btc": 14.9},
        ],
        "neighborhood_nodes": [
            {"id": "bc1qbr1d...44x", "type": "wallet", "risk": 77},
            {"id": "613cc5f901db",  "type": "tx",      "risk": 77},
            {"id": "195.201.0.88",  "type": "ip",      "risk": 52},
            {"id": "AS24940",       "type": "asn",     "risk": 40},
            {"id": "bc1qcl2e...99k", "type": "wallet", "risk": 31},
        ],
        "neighborhood_edges": [
            {"from": "bc1qbr1d...44x", "to": "613cc5f901db",  "weight": 4, "anomalous": True},
            {"from": "613cc5f901db",   "to": "bc1qcl2e...99k", "weight": 3, "anomalous": True},
            {"from": "195.201.0.88",   "to": "AS24940",         "weight": 2, "anomalous": False},
        ],
        "investigator_actions": [
            "Map full bridge topology across 3 hops",
            "Submit Hetzner VPS IP to CCIRC feed",
            "Cross-check cluster A & B entity ownership",
        ],
    },
    {
        "txid": "109aa77fee12",
        "risk_score": 14,
        "confidence_score": 22,
        "priority_band": "Insufficient Evidence",
        "top_feature": "missing_network_telemetry",
        "shap_explanation": (
            "Low anomaly score with sparse context. Activity appears unremarkable but "
            "cannot be fully characterized. Missing broadcast peer logs."
        ),
        "amount_btc": 0.08,
        "output_count": 2,
        "asn": "AS0 (Unknown — No Telemetry)",
        "ip": "0.0.0.0",
        "timestamp": "2025-06-14T19:04:55Z",
        "velocity_percentile": 12.4,
        "fan_out_ratio": 2.0,
        "graph_centrality": 0.04,
        "shap_values": [
            {"feature": "Missing Telemetry", "value": -0.18, "direction": "negative"},
            {"feature": "Low Amount",        "value": -0.12, "direction": "negative"},
            {"feature": "Low Fan-Out",       "value": -0.09, "direction": "negative"},
        ],
        "timeline_events": [
            {"offset_ms": 0,     "type": "input",  "label": "Originating wallet", "amount_btc": 0.08},
            {"offset_ms": 60000, "type": "output", "label": "P2P transfer",       "amount_btc": 0.08},
        ],
        "neighborhood_nodes": [
            {"id": "bc1q55a9...11c", "type": "wallet", "risk": 14},
            {"id": "109aa77fee12",  "type": "tx",      "risk": 14},
        ],
        "neighborhood_edges": [
            {"from": "bc1q55a9...11c", "to": "109aa77fee12", "weight": 1, "anomalous": False},
        ],
        "investigator_actions": [
            "Archive to background buffer",
            "Re-evaluate if linked entity resurfaces",
        ],
    },
    {
        "txid": "f1c0de22ab88",
        "risk_score": 88,
        "confidence_score": 82,
        "priority_band": "Priority Lead",
        "top_feature": "mixer_fingerprint",
        "shap_explanation": (
            "Coinjoin/mixer fingerprint detected across 12 equal-output transactions. "
            "CoinJoin output values match known Wasabi Wallet mixing denomination (0.01 BTC). "
            "Temporal pattern matches automated round coordination."
        ),
        "amount_btc": 0.12,
        "output_count": 12,
        "asn": "AS55836 (Leaseweb — Known Bulletproof)",
        "ip": "95.211.0.44",
        "timestamp": "2025-06-14T22:18:03Z",
        "velocity_percentile": 97.8,
        "fan_out_ratio": 12.0,
        "graph_centrality": 0.79,
        "shap_values": [
            {"feature": "Mixer Fingerprint",   "value": 0.38, "direction": "positive"},
            {"feature": "Equal Output Values", "value": 0.24, "direction": "positive"},
            {"feature": "Bulletproof ASN",     "value": 0.18, "direction": "positive"},
            {"feature": "Round Coordination",  "value": 0.12, "direction": "positive"},
            {"feature": "High Fan-Out",        "value": 0.08, "direction": "positive"},
        ],
        "timeline_events": [
            {"offset_ms": 0,    "type": "input",  "label": "12 coordinated inputs", "amount_btc": 0.12},
            {"offset_ms": 2200, "type": "output", "label": "Equal-value batch #1",  "amount_btc": 0.01},
            {"offset_ms": 4400, "type": "output", "label": "Equal-value batch #2",  "amount_btc": 0.01},
            {"offset_ms": 8800, "type": "output", "label": "Round complete",        "amount_btc": 0.10},
        ],
        "neighborhood_nodes": [
            {"id": "bc1qmix1...78a", "type": "mixer",  "risk": 88},
            {"id": "f1c0de22ab88",  "type": "tx",      "risk": 88},
            {"id": "95.211.0.44",   "type": "ip",      "risk": 85},
            {"id": "AS55836",       "type": "asn",     "risk": 80},
            {"id": "bc1qout1...22b", "type": "wallet", "risk": 30},
        ],
        "neighborhood_edges": [
            {"from": "bc1qmix1...78a", "to": "f1c0de22ab88",  "weight": 5, "anomalous": True},
            {"from": "f1c0de22ab88",   "to": "bc1qout1...22b", "weight": 4, "anomalous": True},
            {"from": "95.211.0.44",    "to": "AS55836",         "weight": 4, "anomalous": True},
        ],
        "investigator_actions": [
            "Classify as Coinjoin round — immediate escalation",
            "Map all 12 input addresses back 3 hops",
            "Alert FATF-designated exchange monitoring system",
            "Export full mixing round evidence package",
        ],
    },
]


def _ensure_safe_defaults(alert: dict) -> dict:
    """Guarantee all required UI fields have safe non-None defaults."""
    alert.setdefault("neighborhood_nodes", [])
    alert.setdefault("neighborhood_edges", [])
    alert.setdefault("timeline_events", [])
    alert.setdefault("shap_values", [])
    alert.setdefault("investigator_actions", ["Review lead and escalate if necessary."])
    alert.setdefault("graph_centrality", 0.0)
    alert.setdefault("velocity_percentile", 50.0)
    alert.setdefault("fan_out_ratio", 1.0)
    alert.setdefault("output_count", 1)
    alert.setdefault("asn", "AS0 (Unknown)")
    alert.setdefault("ip", "0.0.0.0")
    alert.setdefault("confidence_score", 50)
    alert.setdefault("priority_band", "Investigate Further")
    alert.setdefault("top_feature", "unknown_feature")
    alert.setdefault("shap_explanation", "No explanation available.")
    return alert


# ── Pipeline Integration ──────────────────────────────────────────────────────
try:
    import polars as pl
    from src.features.engine import compute_features
    from src.models.detector import train_isolation_forest
    from src.scoring.engine import compute_risk_and_confidence
    from src.graph.builder import build_dual_layer_graph
    _PIPELINE_AVAILABLE = True
except ImportError:
    _PIPELINE_AVAILABLE = False


def run_full_pipeline():
    if not _PIPELINE_AVAILABLE:
        return _empty_df(), None, {}

    raw_path = "data/raw/synthetic_data.json"
    if not os.path.exists(raw_path):
        return _empty_df(), None, {}

    with open(raw_path, "r") as f:
        data = json.load(f)

    df = pl.DataFrame(data)
    df_feat = compute_features(df)
    _, df_ml, _ = train_isolation_forest(df_feat)
    anomaly_scores = df_ml["risk_score"].to_numpy()
    df_final = compute_risk_and_confidence(df_feat, anomaly_scores)
    graph_res = build_dual_layer_graph(df_final)
    G = graph_res[0] if isinstance(graph_res, tuple) else graph_res
    return df_final, G, {}


def _empty_df():
    """Return a typed empty DataFrame if polars is available, else None."""
    try:
        import polars as pl
        return pl.DataFrame()
    except ImportError:
        return None


def get_alerts():
    """Return alert list — falls back to rich mock profiles if pipeline is unavailable."""
    try:
        df_final = run_full_pipeline()[0]
        if df_final is not None and not df_final.is_empty():
            raw = df_final.to_dicts()
            return [_ensure_safe_defaults(a) for a in raw]
    except Exception as e:
        print(f"[pipeline] get_alerts fallback: {e}")

    # Fallback: return all mock profiles with safe defaults guaranteed
    return [_ensure_safe_defaults(dict(p)) for p in MOCK_ALERT_PROFILES]


def get_local_graph(txid: str, hops: int = 2):
    """Return subgraph — falls back to synthesizing from mock profile if pipeline unavailable."""
    try:
        _, G, _ = run_full_pipeline()
        if G is not None:
            if isinstance(G, tuple):
                G = G[0]
            target_node = None
            if G.has_node(txid):
                target_node = txid
            elif G.has_node(f"TX:{txid}"):
                target_node = f"TX:{txid}"

            if target_node:
                sub_nodes = set([target_node])
                for _ in range(hops):
                    next_nodes = set(sub_nodes)
                    for n in sub_nodes:
                        next_nodes.update(G.neighbors(n))
                    sub_nodes = next_nodes
                subG = G.subgraph(sub_nodes)
                nodes = [
                    {
                        "id": n,
                        "label": n,
                        "type": G.nodes[n].get("type", G.nodes[n].get("node_type", "wallet")),
                        "risk": G.nodes[n].get("risk", 50),
                    }
                    for n in subG.nodes()
                ]
                edges = [
                    {
                        "source": u,
                        "target": v,
                        "from": u,
                        "to": v,
                        "relation": d.get("relation", "OBSERVED_WITH"),
                        "anomalous": d.get("anomalous", False),
                        "weight": d.get("weight", 1),
                    }
                    for u, v, d in subG.edges(data=True)
                ]
                return {"nodes": nodes, "edges": edges}
    except Exception as e:
        print(f"[pipeline] get_local_graph fallback: {e}")

    # Fallback: synthesize from mock profile's neighborhood_nodes
    profile = next((p for p in MOCK_ALERT_PROFILES if p["txid"] == txid), None)
    if profile:
        nodes = [
            {"id": n["id"], "label": n["id"], "type": n["type"], "risk": n.get("risk", 50)}
            for n in profile.get("neighborhood_nodes", [])
        ]
        edges = [
            {
                "from": e["from"],
                "to": e["to"],
                "source": e["from"],
                "target": e["to"],
                "relation": "OBSERVED_WITH",
                "anomalous": e.get("anomalous", False),
                "weight": e.get("weight", 1),
            }
            for e in profile.get("neighborhood_edges", [])
        ]
        return {"nodes": nodes, "edges": edges}

    return {"nodes": [], "edges": []}

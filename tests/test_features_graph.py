from src.ingestion.parsers import parse_csv
from src.features.engine import compute_features
from src.graph.builder import build_dual_layer_graph

def test_features_and_graph():
    df = parse_csv("samples/sample.csv")
    df_feat = compute_features(df)
    G_raw, entity_map = build_dual_layer_graph(df)
    
    assert "fan_out_ratio" in df_feat.columns
    assert G_raw.number_of_nodes() > 0
    print("✓ Features and Graph built successfully!")

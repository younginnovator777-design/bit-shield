import streamlit as st
import polars as pl
import networkx as nx
from pyvis.network import Network
import streamlit.components.v1 as components

from src.ingestion.parsers import parse_csv, parse_json, parse_xml
from src.features.engine import compute_features
from src.graph.builder import build_dual_layer_graph
from src.models.detector import train_isolation_forest
from src.explainability.explainer import explain_model
from src.scoring.fused_score import compute_fused_scores

st.set_page_config(page_title="Bit-Shield Workstation", layout="wide", initial_sidebar_state="expanded")

st.title("🛡️ Bit-Shield Transaction Monitoring")
st.caption("NTRO PS 26146 - Blockchain Intelligence & Risk Workstation")

@st.cache_data
def load_and_process():
    df = parse_json("data/raw/synthetic_data.json")
    df_feat = compute_features(df)
    model, df_scored, feature_cols = train_isolation_forest(df_feat)
    explanations = explain_model(model, df_scored, feature_cols)
    df_alerts = compute_fused_scores(df_scored, explanations)
    G_raw, entity_map = build_dual_layer_graph(df)
    return df, df_alerts, G_raw, entity_map

df_raw, df_alerts, G_raw, entity_map = load_and_process()

# KPI Row
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total Transactions", len(df_raw))
col2.metric("Critical Alerts", len(df_alerts.filter(pl.col("priority_band").str.contains("Critical"))))
col3.metric("Avg Risk Score", f"{df_alerts['risk_score'].mean():.1f}")
col4.metric("Avg Confidence", f"{df_alerts['confidence_score'].mean():.1f}%")

tab1, tab2, tab3 = st.tabs(["🚨 Alert Queue", "🔍 Lead Investigation", "🕸️ Network Graph"])

with tab1:
    st.subheader("Ranked Risk Alert Queue")
    st.dataframe(df_alerts.to_pandas(), use_container_width=True)

with tab2:
    st.subheader("Selected Lead Breakdown")
    tx_list = df_alerts["txid"].to_list()
    selected_tx = st.selectbox("Select Transaction ID to Investigate", tx_list)
    lead_info = df_alerts.filter(pl.col("txid") == selected_tx).to_dicts()[0]
    
    c1, c2 = st.columns(2)
    with c1:
        st.write(f"**Risk Score:** {lead_info['risk_score']} / 100")
        st.write(f"**Confidence:** {lead_info['confidence_score']}%")
        st.write(f"**Priority:** {lead_info['priority_band']}")
    with c2:
        st.write(f"**Top SHAP Feature:** `{lead_info['top_feature']}`")
        st.info(lead_info['shap_explanation'])

with tab3:
    st.subheader("Localized Network Graph")
    net = Network(height="450px", width="100%", bgcolor="#222222", font_color="white", directed=True)
    for n in G_raw.nodes(data=True):
        net.add_node(n[0], label=n[0], color="red" if "TX:" in n[0] else "lightblue")
    for e in G_raw.edges():
        net.add_edge(e[0], e[1])
    net.save_graph("graph.html")
    with open("graph.html", "r", encoding="utf-8") as f:
        components.html(f.read(), height=500)

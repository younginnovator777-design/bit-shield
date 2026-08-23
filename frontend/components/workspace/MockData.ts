// ── BIT-SHIELD: Realistic Frontend Mock Data ───────────────────────────
// Used as fallback when backend API is unavailable.

export interface Lead {
  txid: string;
  risk_score: number;
  confidence_score: number;
  priority_band: "Priority Lead" | "Investigate Further" | "Low Concern" | "Insufficient Evidence";
  top_feature: string;
  shap_explanation: string;
  amount_btc: number;
  output_count: number;
  asn: string;
  ip: string;
  timestamp: string;
  velocity_percentile: number;
  fan_out_ratio: number;
  graph_centrality: number;
  shap_values: { feature: string; value: number; direction: "positive" | "negative" }[];
  timeline_events: { offset_ms: number; type: string; label: string; amount_btc?: number }[];
  neighborhood_nodes: { id: string; type: "wallet" | "tx" | "ip" | "asn" | "exchange" | "mixer"; risk?: number }[];
  neighborhood_edges: { from: string; to: string; weight: number; anomalous?: boolean }[];
  investigator_actions: string[];
}

export const MOCK_LEADS: Lead[] = [
  {
    txid: "e8b21f4a9c01",
    risk_score: 91,
    confidence_score: 78,
    priority_band: "Priority Lead",
    top_feature: "burst_velocity_score",
    shap_explanation: "Extreme burst velocity across 14 outputs in 42s from bulletproof ASN-45102. CIOH resolves 5 input wallets to single entity. High fan-out ratio (14.0) and graph centrality confirm coordinated dispersal syndicate.",
    amount_btc: 128.4,
    output_count: 14,
    asn: "AS45102 (Xnnet LLC — Bulletproof Host)",
    ip: "203.0.113.88",
    timestamp: "2025-06-14T03:22:18Z",
    velocity_percentile: 99.4,
    fan_out_ratio: 14.0,
    graph_centrality: 0.87,
    shap_values: [
      { feature: "Burst Velocity", value: 0.32, direction: "positive" },
      { feature: "Fan-Out Ratio", value: 0.28, direction: "positive" },
      { feature: "ASN Risk Score", value: 0.18, direction: "positive" },
      { feature: "CIOH Cluster Size", value: 0.14, direction: "positive" },
      { feature: "Graph Centrality", value: 0.08, direction: "positive" },
    ],
    timeline_events: [
      { offset_ms: 0,    type: "input",  label: "Consolidated funding wallet", amount_btc: 128.4 },
      { offset_ms: 3100, type: "output", label: "Fan-out output #1",           amount_btc: 9.18 },
      { offset_ms: 6200, type: "output", label: "Fan-out output #2",           amount_btc: 9.17 },
      { offset_ms: 9800, type: "output", label: "Fan-out output #3",           amount_btc: 9.22 },
      { offset_ms: 18000,type: "hop",    label: "2nd-hop layer transfer",      amount_btc: 82.4 },
      { offset_ms: 42000,type: "output", label: "Peer broadcast consolidation",amount_btc: 55.1 },
    ],
    neighborhood_nodes: [
      { id: "bc1q7a3f...92e",  type: "wallet",   risk: 91 },
      { id: "bc1q99x8...55b",  type: "wallet",   risk: 44 },
      { id: "bc1q88aa...33f",  type: "wallet",   risk: 38 },
      { id: "e8b21f4a9c01",   type: "tx",        risk: 91 },
      { id: "203.0.113.88",   type: "ip",        risk: 80 },
      { id: "AS45102",         type: "asn",       risk: 82 },
      { id: "bc1qd42m...10a",  type: "wallet",   risk: 22 },
      { id: "bc1q33ef...88c",  type: "wallet",   risk: 27 },
    ],
    neighborhood_edges: [
      { from: "bc1q7a3f...92e", to: "e8b21f4a9c01", weight: 5,  anomalous: true },
      { from: "bc1q99x8...55b", to: "e8b21f4a9c01", weight: 3,  anomalous: true },
      { from: "bc1q88aa...33f", to: "e8b21f4a9c01", weight: 2 },
      { from: "e8b21f4a9c01",   to: "bc1qd42m...10a", weight: 2 },
      { from: "e8b21f4a9c01",   to: "bc1q33ef...88c", weight: 2 },
      { from: "203.0.113.88",   to: "AS45102",        weight: 4,  anomalous: true },
    ],
    investigator_actions: [
      "Assign Priority 1 to senior analyst",
      "Freeze downstream UTXO trail",
      "Cross-reference AS45102 with INTERPOL OSINF DB",
      "Export court-admissible dossier (JSON/PDF)",
      "Tag entity cluster for ongoing monitoring",
    ],
  },
  {
    txid: "401ca8d7b34f",
    risk_score: 84,
    confidence_score: 41,
    priority_band: "Investigate Further",
    top_feature: "fan_out_count",
    shap_explanation: "82.5 BTC peeling chain with abnormal locktime patterns. Originating from ephemeral Tor relay node with minimal historical co-spends. Evidence sparse due to single-session relay use.",
    amount_btc: 82.5,
    output_count: 9,
    asn: "AS0 (Tor Relay — Exit Node)",
    ip: "198.51.100.24",
    timestamp: "2025-06-14T07:55:03Z",
    velocity_percentile: 96.2,
    fan_out_ratio: 9.0,
    graph_centrality: 0.61,
    shap_values: [
      { feature: "Fan-Out Count",       value: 0.29, direction: "positive" },
      { feature: "Peeling Depth",        value: 0.24, direction: "positive" },
      { feature: "Locktime Anomaly",     value: 0.19, direction: "positive" },
      { feature: "Tor Relay Endpoint",   value: 0.17, direction: "positive" },
      { feature: "Output Value Std Dev", value: 0.11, direction: "positive" },
    ],
    timeline_events: [
      { offset_ms: 0,    type: "input",  label: "Originating wallet",  amount_btc: 82.5 },
      { offset_ms: 5400, type: "output", label: "Peeling output #1",   amount_btc: 8.25 },
      { offset_ms: 11000,type: "output", label: "Peeling output #2",   amount_btc: 8.24 },
      { offset_ms: 19200,type: "hop",    label: "Mid-chain aggregation",amount_btc: 66.0 },
      { offset_ms: 38000,type: "output", label: "Tor relay broadcast",  amount_btc: 55.1 },
    ],
    neighborhood_nodes: [
      { id: "bc1q44d5...c7a", type: "wallet",   risk: 84 },
      { id: "401ca8d7b34f",  type: "tx",        risk: 84 },
      { id: "198.51.100.24", type: "ip",        risk: 71 },
      { id: "AS0-TOR",       type: "asn",       risk: 65 },
      { id: "bc1q11f2...e1b", type: "wallet",   risk: 18 },
      { id: "bc1q22c3...d9a", type: "wallet",   risk: 21 },
    ],
    neighborhood_edges: [
      { from: "bc1q44d5...c7a", to: "401ca8d7b34f", weight: 5, anomalous: true },
      { from: "401ca8d7b34f",   to: "bc1q11f2...e1b", weight: 2 },
      { from: "401ca8d7b34f",   to: "bc1q22c3...d9a", weight: 2 },
      { from: "198.51.100.24",  to: "AS0-TOR",        weight: 3, anomalous: true },
    ],
    investigator_actions: [
      "Initiate targeted reconnaissance on Tor relay session",
      "Correlate with historical Tor exit node blacklist",
      "Collect additional 24h temporal window PCAP",
      "Re-score after telemetry gap resolved",
    ],
  },
  {
    txid: "9bf3301cc44a",
    risk_score: 22,
    confidence_score: 88,
    priority_band: "Low Concern",
    top_feature: "temporal_regularity",
    shap_explanation: "Regular exchange batch withdrawal pattern. Identified as Kraken exchange hot-wallet consolidation via multi-sig inputs. Commercial datacenter ASN confirmed. Temporal signature matches known batch schedule.",
    amount_btc: 4.2,
    output_count: 3,
    asn: "AS16509 (Amazon Web Services — Commercial DC)",
    ip: "54.240.0.1",
    timestamp: "2025-06-14T12:00:01Z",
    velocity_percentile: 34.1,
    fan_out_ratio: 3.0,
    graph_centrality: 0.18,
    shap_values: [
      { feature: "Temporal Regularity", value: -0.28, direction: "negative" },
      { feature: "ASN Commercial",      value: -0.21, direction: "negative" },
      { feature: "Multi-sig Pattern",   value: -0.18, direction: "negative" },
      { feature: "Fan-Out Count",       value: 0.11, direction: "positive" },
    ],
    timeline_events: [
      { offset_ms: 0,     type: "input",  label: "Exchange hot wallet", amount_btc: 4.2 },
      { offset_ms: 12000, type: "output", label: "Batch payout #1",    amount_btc: 1.4 },
      { offset_ms: 25000, type: "output", label: "Batch payout #2",    amount_btc: 1.4 },
      { offset_ms: 38000, type: "output", label: "Batch payout #3",    amount_btc: 1.4 },
    ],
    neighborhood_nodes: [
      { id: "bc1qex3k...99z", type: "exchange", risk: 5 },
      { id: "9bf3301cc44a",  type: "tx",        risk: 22 },
      { id: "54.240.0.1",    type: "ip",        risk: 4  },
      { id: "AS16509",       type: "asn",       risk: 3  },
    ],
    neighborhood_edges: [
      { from: "bc1qex3k...99z", to: "9bf3301cc44a", weight: 2 },
      { from: "9bf3301cc44a",   to: "54.240.0.1",   weight: 1 },
    ],
    investigator_actions: [
      "Auto-log to baseline repository",
      "No triage required",
      "Flag as known benign exchange pattern",
    ],
  },
  {
    txid: "613cc5f901db",
    risk_score: 77,
    confidence_score: 65,
    priority_band: "Investigate Further",
    top_feature: "graph_centrality",
    shap_explanation: "High betweenness centrality in transaction graph. Acts as bridge between two previously unconnected entity clusters. Fee density anomaly (+340% above median) suggests deliberate timing manipulation.",
    amount_btc: 18.7,
    output_count: 6,
    asn: "AS24940 (Hetzner Online — Known VPS Provider)",
    ip: "195.201.0.88",
    timestamp: "2025-06-14T15:41:22Z",
    velocity_percentile: 88.7,
    fan_out_ratio: 6.0,
    graph_centrality: 0.74,
    shap_values: [
      { feature: "Graph Centrality",  value: 0.31, direction: "positive" },
      { feature: "Fee Density",       value: 0.22, direction: "positive" },
      { feature: "Bridge Node Role",  value: 0.20, direction: "positive" },
      { feature: "Cluster Connector", value: 0.14, direction: "positive" },
      { feature: "Temporal Burst",    value: 0.13, direction: "positive" },
    ],
    timeline_events: [
      { offset_ms: 0,    type: "input",  label: "Cluster A funding", amount_btc: 18.7 },
      { offset_ms: 8000, type: "hop",    label: "Bridge transfer",   amount_btc: 18.7 },
      { offset_ms: 22000,type: "output", label: "Cluster B dispersal",amount_btc: 14.9 },
    ],
    neighborhood_nodes: [
      { id: "bc1qbr1d...44x", type: "wallet",  risk: 77 },
      { id: "613cc5f901db",  type: "tx",       risk: 77 },
      { id: "195.201.0.88",  type: "ip",       risk: 52 },
      { id: "AS24940",       type: "asn",       risk: 40 },
      { id: "bc1qcl2e...99k", type: "wallet",  risk: 31 },
    ],
    neighborhood_edges: [
      { from: "bc1qbr1d...44x", to: "613cc5f901db", weight: 4, anomalous: true },
      { from: "613cc5f901db",   to: "bc1qcl2e...99k", weight: 3, anomalous: true },
      { from: "195.201.0.88",   to: "AS24940",        weight: 2 },
    ],
    investigator_actions: [
      "Map full bridge topology across 3 hops",
      "Submit Hetzner VPS IP to CCIRC feed",
      "Cross-check cluster A & B entity ownership",
    ],
  },
  {
    txid: "109aa77fee12",
    risk_score: 14,
    confidence_score: 22,
    priority_band: "Insufficient Evidence",
    top_feature: "missing_network_telemetry",
    shap_explanation: "Low anomaly score with sparse context. Activity appears unremarkable but cannot be fully characterized. Missing broadcast peer logs and no historical address co-spends detected.",
    amount_btc: 0.08,
    output_count: 2,
    asn: "AS0 (Unknown — No Telemetry)",
    ip: "0.0.0.0",
    timestamp: "2025-06-14T19:04:55Z",
    velocity_percentile: 12.4,
    fan_out_ratio: 2.0,
    graph_centrality: 0.04,
    shap_values: [
      { feature: "Missing Telemetry", value: -0.18, direction: "negative" },
      { feature: "Low Amount",        value: -0.12, direction: "negative" },
      { feature: "Low Fan-Out",       value: -0.09, direction: "negative" },
    ],
    timeline_events: [
      { offset_ms: 0,    type: "input",  label: "Originating wallet", amount_btc: 0.08 },
      { offset_ms: 60000,type: "output", label: "P2P transfer",       amount_btc: 0.08 },
    ],
    neighborhood_nodes: [
      { id: "bc1q55a9...11c", type: "wallet", risk: 14 },
      { id: "109aa77fee12",  type: "tx",      risk: 14 },
    ],
    neighborhood_edges: [
      { from: "bc1q55a9...11c", to: "109aa77fee12", weight: 1 },
    ],
    investigator_actions: [
      "Archive to background buffer",
      "Re-evaluate if linked entity resurfaces",
    ],
  },
  {
    txid: "f1c0de22ab88",
    risk_score: 88,
    confidence_score: 82,
    priority_band: "Priority Lead",
    top_feature: "mixer_fingerprint",
    shap_explanation: "Coinjoin/mixer fingerprint detected across 12 equal-output transactions. CoinJoin output values match known Wasabi Wallet mixing denomination (0.01 BTC). Temporal pattern matches automated round coordination.",
    amount_btc: 0.12,
    output_count: 12,
    asn: "AS55836 (Leaseweb — Known Bulletproof)",
    ip: "95.211.0.44",
    timestamp: "2025-06-14T22:18:03Z",
    velocity_percentile: 97.8,
    fan_out_ratio: 12.0,
    graph_centrality: 0.79,
    shap_values: [
      { feature: "Mixer Fingerprint",     value: 0.38, direction: "positive" },
      { feature: "Equal Output Values",   value: 0.24, direction: "positive" },
      { feature: "Bulletproof ASN",       value: 0.18, direction: "positive" },
      { feature: "Round Coordination",    value: 0.12, direction: "positive" },
      { feature: "High Fan-Out",          value: 0.08, direction: "positive" },
    ],
    timeline_events: [
      { offset_ms: 0,    type: "input",  label: "12 coordinated inputs", amount_btc: 0.12 },
      { offset_ms: 2200, type: "output", label: "Equal-value batch #1",  amount_btc: 0.01 },
      { offset_ms: 4400, type: "output", label: "Equal-value batch #2",  amount_btc: 0.01 },
      { offset_ms: 8800, type: "output", label: "Round complete",        amount_btc: 0.10 },
    ],
    neighborhood_nodes: [
      { id: "bc1qmix1...78a", type: "mixer",    risk: 88 },
      { id: "f1c0de22ab88",  type: "tx",        risk: 88 },
      { id: "95.211.0.44",   type: "ip",        risk: 85 },
      { id: "AS55836",       type: "asn",       risk: 80 },
      { id: "bc1qout1...22b", type: "wallet",   risk: 30 },
    ],
    neighborhood_edges: [
      { from: "bc1qmix1...78a", to: "f1c0de22ab88", weight: 5, anomalous: true },
      { from: "f1c0de22ab88",   to: "bc1qout1...22b", weight: 4, anomalous: true },
      { from: "95.211.0.44",    to: "AS55836",         weight: 4, anomalous: true },
    ],
    investigator_actions: [
      "Classify as Coinjoin round — immediate escalation",
      "Map all 12 input addresses back 3 hops",
      "Alert FATF-designated exchange monitoring system",
      "Export full mixing round evidence package",
    ],
  },
];

export const MOCK_OVERVIEW = {
  transactions_processed: 38420,
  total_leads: 6,
  high_priority_leads: 2,
  avg_confidence: 63,
  engine_status: "ONLINE",
  last_run: "2025-06-14T22:45:00Z",
  model_version: "iso-forest-v2.4.1",
  records_per_second: 2840,
  memory_mb: 412,
  tree_depth: 12,
};

export const ACTIVITY_EVENTS = [
  "TX e8b21f4a: 14-output fan-out detected — AS45102 correlation confirmed",
  "TX 401ca8d7: Tor relay broadcast flagged — 82.5 BTC peeling chain",
  "TX f1c0de22: CoinJoin mixer round detected — 12 equal-value outputs",
  "GRAPH: CIOH cluster resolved — 5 wallets → 1 entity [e8b21f4a]",
  "INGEST: Block #852,140 parsed — 892 transactions processed",
  "TX 613cc5f9: Bridge topology identified between cluster A ↔ cluster B",
  "MODEL: Isolation Forest scored 38,420 feature vectors in 13.5s",
  "ASN AS45102: Bulletproof host confirmed via offline registry",
  "TX 9bf3301c: Exchange pattern recognized — Kraken hot-wallet batch",
  "GRAPH: Fan-out ratio 14.0 — 99.4th velocity percentile",
  "TEMPORAL: Burst window 42s — 14 peers synchronized broadcast",
  "SHAP: Feature attribution computed — top driver: burst_velocity_score",
];

export const CASE_BINDER_DATA = {
  case_id: "CASE-2025-0614-001",
  title: "Operation CHAIN RELAY",
  analyst: "Senior Analyst, FIU-India",
  created: "2025-06-14T08:00:00Z",
  status: "ACTIVE",
  leads: ["e8b21f4a9c01", "f1c0de22ab88"],
  audit_log: [
    { ts: "2025-06-14T22:45:00Z", action: "Case Created",           detail: "Operation CHAIN RELAY opened" },
    { ts: "2025-06-14T22:47:12Z", action: "Lead Added",             detail: "e8b21f4a9c01 added to case binder" },
    { ts: "2025-06-14T22:48:30Z", action: "Lead Added",             detail: "f1c0de22ab88 added — CoinJoin mixer" },
    { ts: "2025-06-14T22:51:04Z", action: "Graph Expanded",         detail: "3-hop neighborhood rendered for e8b21f4a9c01" },
    { ts: "2025-06-14T22:53:19Z", action: "Entity Tagged",          detail: "bc1q7a3f...92e tagged as 'Primary Suspect Wallet'" },
    { ts: "2025-06-14T22:55:00Z", action: "ASN Correlated",         detail: "AS45102 matched against offline bulletproof host registry" },
    { ts: "2025-06-14T23:01:44Z", action: "Evidence Package Staged", detail: "Court export queued — JSON+PDF" },
  ],
};

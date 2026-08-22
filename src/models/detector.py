import polars as pl
from sklearn.ensemble import IsolationForest

FEATURE_COLS = ["num_inputs", "num_outputs", "fan_out_ratio", "total_input_amount", "ip_reuse_count", "completeness_score"]

def train_isolation_forest(df: pl.DataFrame):
    X = df.select(FEATURE_COLS).to_pandas().fillna(0)
    model = IsolationForest(n_estimators=100, contamination=0.2, random_state=42)
    model.fit(X)
    
    scores = -model.score_samples(X)
    norm_scores = (scores - scores.min()) / (scores.max() - scores.min() + 1e-5) * 100
    
    return model, df.with_columns(pl.Series("risk_score", norm_scores)), FEATURE_COLS

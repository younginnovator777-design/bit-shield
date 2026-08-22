import shap
import pandas as pd
import polars as pl

def explain_model(model, df: pl.DataFrame, feature_cols: list):
    X = df.select(feature_cols).to_pandas().fillna(0)
    explainer = shap.TreeExplainer(model)
    shap_values = explainer.shap_values(X)
    
    explanations = []
    for i in range(len(X)):
        row_vals = dict(zip(feature_cols, shap_values[i]))
        top_feat = max(row_vals, key=row_vals.get)
        explanations.append({
            "top_feature": top_feat,
            "contribution": float(row_vals[top_feat]),
            "shap_dict": row_vals
        })
    return explanations

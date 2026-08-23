import polars as pl

REQUIRED_COLUMNS = {
    "txid": pl.Utf8,
    "timestamp": pl.Utf8,
    "input_addresses": pl.List(pl.Utf8),
    "input_amounts": pl.List(pl.Float64),
    "output_addresses": pl.List(pl.Utf8),
    "output_amounts": pl.List(pl.Float64),
    "fee": pl.Float64,
    "src_ip": pl.Utf8,
    "geo_country": pl.Utf8,
    "asn": pl.Int64,
    "vpn_flag": pl.Int64,
    "vulnerability_flag": pl.Int64,
    "completeness_score": pl.Float64,
}

def ensure_schema(df: pl.DataFrame) -> pl.DataFrame:
    missing_exprs = []
    for col, dtype in REQUIRED_COLUMNS.items():
        if col not in df.columns:
            if dtype == pl.List(pl.Utf8):
                missing_exprs.append(pl.lit([]).cast(pl.List(pl.Utf8)).alias(col))
            elif dtype == pl.List(pl.Float64):
                missing_exprs.append(pl.lit([]).cast(pl.List(pl.Float64)).alias(col))
            elif dtype == pl.Float64:
                missing_exprs.append(pl.lit(0.0).alias(col))
            elif dtype == pl.Int64:
                missing_exprs.append(pl.lit(0).alias(col))
            elif dtype == pl.Utf8:
                missing_exprs.append(pl.lit("UNKNOWN").alias(col))
    if missing_exprs:
        df = df.with_columns(missing_exprs)
    return df

def compute_features(df: pl.DataFrame) -> pl.DataFrame:
    df = ensure_schema(df)
    
    # Base Transformations
    df = df.with_columns([
        pl.col("input_addresses").list.len().alias("num_inputs"),
        pl.col("output_addresses").list.len().alias("num_outputs"),
        (pl.col("output_addresses").list.len() / (pl.col("input_addresses").list.len() + 1e-5)).alias("fan_out_ratio"),
        pl.col("input_amounts").list.sum().alias("total_input_amount"),
        pl.col("output_amounts").list.sum().alias("total_output_amount"),
        pl.col("timestamp").str.to_datetime(time_zone="UTC").alias("dt_timestamp"),
    ])

    # Aggregations & Secondary Features
    df = df.with_columns([
        pl.col("src_ip").cum_count().over("src_ip").alias("ip_reuse_count"),
        pl.col("fee").alias("transaction_fee"),
        pl.col("asn").alias("autonomous_system_number"),
        pl.col("geo_country").alias("country_code"),
        pl.col("completeness_score").fill_null(0.90).alias("completeness_score")
    ])

    return df

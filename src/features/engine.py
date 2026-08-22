# pyrefly: ignore [missing-import]
import polars as pl

def compute_features(df: pl.DataFrame) -> pl.DataFrame:
    return df.with_columns([
        pl.col("input_addresses").list.len().alias("num_inputs"),
        pl.col("output_addresses").list.len().alias("num_outputs"),
        (pl.col("output_addresses").list.len() / (pl.col("input_addresses").list.len() + 1e-5)).alias("fan_out_ratio"),
        pl.col("input_amounts").list.eval(pl.element().sum()).list.get(0).alias("total_input_amount"),
        pl.col("output_amounts").list.eval(pl.element().sum()).list.get(0).alias("total_output_amount"),
        pl.col("timestamp").str.to_datetime(time_zone="UTC").alias("dt_timestamp"),
    ]).with_columns([
        pl.col("src_ip").cum_count().over("src_ip").alias("ip_reuse_count"),
        pl.col("src_ip").cum_count().over("geo_country").alias("country_activity_count"),
        (
            (pl.col("fee").is_not_null().cast(pl.Float64) +
             pl.col("geo_country").is_not_null().cast(pl.Float64) +
             pl.col("asn").is_not_null().cast(pl.Float64)) / 3.0
        ).alias("completeness_score")
    ])

import polars as pl
from lxml import etree

def parse_csv(filepath: str) -> pl.DataFrame:
    df = pl.read_csv(filepath, schema_overrides={
        "input_addresses": pl.String,
        "output_addresses": pl.String,
        "input_amounts": pl.String,
        "output_amounts": pl.String,
    })
    return df.with_columns([
        pl.col("input_addresses").str.split("|"),
        pl.col("output_addresses").str.split("|"),
        pl.col("input_amounts").str.split("|").list.eval(pl.element().cast(pl.Float64)),
        pl.col("output_amounts").str.split("|").list.eval(pl.element().cast(pl.Float64)),
    ])

def parse_json(filepath: str) -> pl.DataFrame:
    return pl.read_json(filepath)

def parse_xml(filepath: str) -> pl.DataFrame:
    tree = etree.parse(filepath)
    root = tree.getroot()
    records = []
    
    for tx in root.findall("transaction"):
        records.append({
            "timestamp": tx.findtext("timestamp"),
            "src_ip": tx.findtext("src_ip"),
            "dst_ip": tx.findtext("dst_ip"),
            "src_port": int(tx.findtext("src_port")),
            "dst_port": int(tx.findtext("dst_port")),
            "txid": tx.findtext("txid"),
            "input_addresses": [e.text for e in tx.findall("input_addresses/address")],
            "output_addresses": [e.text for e in tx.findall("output_addresses/address")],
            "input_amounts": [float(e.text) for e in tx.findall("input_amounts/amount")],
            "output_amounts": [float(e.text) for e in tx.findall("output_amounts/amount")],
            "fee": float(tx.findtext("fee")),
            "script_type": tx.findtext("script_type"),
            "geo_country": tx.findtext("geo_country"),
            "asn": tx.findtext("asn"),
        })
    return pl.DataFrame(records)

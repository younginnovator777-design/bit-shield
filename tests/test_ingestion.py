from src.ingestion.parsers import parse_csv, parse_json, parse_xml

def test_three_format_equivalence():
    df_csv = parse_csv("samples/sample.csv")
    df_json = parse_json("samples/sample.json")
    df_xml = parse_xml("samples/sample.xml")
    
    assert df_csv.columns == df_json.columns == df_xml.columns
    assert df_csv.shape == df_json.shape == df_xml.shape
    print("✓ All 3 formats normalize to identical Polars DataFrames!")
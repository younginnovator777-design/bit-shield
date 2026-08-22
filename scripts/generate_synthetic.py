import json, csv, random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()
random.seed(42)

def generate_datasets():
    base_time = datetime(2026, 3, 1, 10, 0, 0)
    records = []
    
    for i in range(20):
        records.append({
            "timestamp": (base_time + timedelta(minutes=i*5)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "src_ip": f"192.168.1.{random.randint(1, 5)}",
            "dst_ip": f"10.0.0.{random.randint(1, 5)}",
            "src_port": 8333,
            "dst_port": 8333,
            "txid": f"tx_norm_{i:03d}",
            "input_addresses": [f"addr_in_{random.randint(1, 10)}"],
            "output_addresses": [f"addr_out_{random.randint(1, 10)}"],
            "input_amounts": [round(random.uniform(0.1, 2.0), 2)],
            "output_amounts": [round(random.uniform(0.09, 1.9), 2)],
            "fee": 0.01,
            "script_type": "p2pkh",
            "geo_country": "IN",
            "asn": "AS1234",
            "is_anomaly": 0
        })
        
    for i in range(5):
        records.append({
            "timestamp": (base_time + timedelta(seconds=i*2)).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "src_ip": "10.99.99.99",
            "dst_ip": "10.0.0.1",
            "src_port": 9050,
            "dst_port": 8333,
            "txid": f"tx_burst_{i:03d}",
            "input_addresses": [f"addr_fan_{i}" for i in range(5)],
            "output_addresses": [f"addr_out_burst_{i}" for i in range(10)],
            "input_amounts": [50.0] * 5,
            "output_amounts": [24.0] * 10,
            "fee": 1.0,
            "script_type": "p2sh",
            "geo_country": "UNKNOWN",
            "asn": "AS9999",
            "is_anomaly": 1
        })
        
    with open("data/raw/synthetic_data.json", "w") as f:
        json.dump(records, f, indent=2)
        
    print("✓ Synthetic scenario datasets generated in data/raw/")

if __name__ == "__main__":
    generate_datasets()

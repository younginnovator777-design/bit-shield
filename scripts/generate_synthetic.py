import json
import random
from datetime import datetime, timedelta, timezone
import os

def generate_complex_laundering_dataset():
    data = []
    base_time = datetime.now(timezone.utc) - timedelta(days=1)

    # 1. Normal Transactions (Dynamic metadata restored)
    countries = ["US", "CA", "GB", "DE", "FR", "JP", "AU"]
    asns = [15169, 7922, 16509, 8075, 13335]

    for i in range(15):
        inp_amt = round(random.uniform(0.1, 5.0), 4)
        fee = round(random.uniform(0.00005, 0.0005), 5)
        out_amt = round(inp_amt - fee, 4)
        
        data.append({
            "txid": f"tx_norm_{i:03d}",
            "timestamp": (base_time + timedelta(seconds=i*450)).isoformat(),
            "input_addresses": [f"addr_in_{i}"],
            "input_amounts": [inp_amt],
            "output_addresses": [f"addr_out_{i}"],
            "output_amounts": [out_amt],
            "fee": fee,
            "src_ip": f"192.168.{random.randint(1, 50)}.{random.randint(1, 254)}",
            "geo_country": random.choice(countries),
            "asn": random.choice(asns),
            "vpn_flag": 0,
            "vulnerability_flag": 0,
            # Vary completeness score so confidence scores are unique per row
            "completeness_score": round(random.uniform(0.72, 0.98), 2)
        })

    # 2. Mule Chain Scenario
    mule_ips = ["10.0.42.1", "10.0.42.1", "10.0.42.2", "10.0.42.3"]
    for i in range(4):
        data.append({
            "txid": f"tx_mule_chain_00{i}",
            "timestamp": (base_time + timedelta(seconds=5000 + (i * 45))).isoformat(),
            "input_addresses": [f"mule_wallet_{i}"],
            "input_amounts": [12.5],
            "output_addresses": [f"mule_wallet_{i+1}"],
            "output_amounts": [12.48],
            "fee": 0.02,
            "src_ip": mule_ips[i % len(mule_ips)],
            "geo_country": "RU" if i % 2 == 0 else "KP",
            "asn": 4134,
            "vpn_flag": 1,
            "vulnerability_flag": 1,
            "completeness_score": 0.65
        })

    # 3. Fan-Out Dispersal Scenario
    data.append({
        "txid": "tx_burst_000",
        "timestamp": (base_time + timedelta(seconds=12000)).isoformat(),
        "input_addresses": ["main_vault_01"],
        "input_amounts": [5.1],
        "output_addresses": [f"addr_out_burst_{j}" for j in range(10)],
        "output_amounts": [0.5 for _ in range(10)],
        "fee": 0.1,
        "src_ip": "172.16.0.99",
        "geo_country": "CY",
        "asn": 9009,
        "vpn_flag": 1,
        "vulnerability_flag": 0,
        "completeness_score": 0.85
    })

    os.makedirs("data/raw", exist_ok=True)
    with open("data/raw/synthetic_data.json", "w") as f:
        json.dump(data, f, indent=2)

    print("Successfully restored dynamic dataset.")

if __name__ == "__main__":
    generate_complex_laundering_dataset()

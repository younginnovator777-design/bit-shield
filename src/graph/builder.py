import networkx as nx
import polars as pl

class UnionFind:
    def __init__(self):
        self.parent = {}
    
    def find(self, i):
        if i not in self.parent:
            self.parent[i] = i
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]
    
    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j

def build_dual_layer_graph(df: pl.DataFrame):
    G_raw = nx.DiGraph()
    uf = UnionFind()
    
    for row in df.iter_rows(named=True):
        tx_node = f"TX:{row['txid']}"
        ip_node = f"IP:{row['src_ip']}"
        
        G_raw.add_node(tx_node, type="transaction", timestamp=row["timestamp"])
        G_raw.add_node(ip_node, type="ip", country=row["geo_country"], asn=row["asn"])
        G_raw.add_edge(ip_node, tx_node, relation="OBSERVED_WITH")
        
        inputs = row["input_addresses"]
        for inp in inputs:
            addr_node = f"ADDR:{inp}"
            G_raw.add_node(addr_node, type="address")
            G_raw.add_edge(addr_node, tx_node, relation="INPUT_TO")
            
        if len(inputs) > 1:
            for i in range(1, len(inputs)):
                uf.union(inputs[0], inputs[i])
                
        for out in row["output_addresses"]:
            addr_node = f"ADDR:{out}"
            G_raw.add_node(addr_node, type="address")
            G_raw.add_edge(tx_node, addr_node, relation="OUTPUT_TO")
            
    entity_map = {}
    for node in G_raw.nodes():
        if node.startswith("ADDR:"):
            clean_addr = node.replace("ADDR:", "")
            root_entity = f"ENTITY:{uf.find(clean_addr)}"
            entity_map[node] = root_entity
            
    return G_raw, entity_map

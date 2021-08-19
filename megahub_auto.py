#!/usr/bin/env python3
import json
from time import time
import os.path, os

graph = {
    "nodes":[],
    "links":[]
}
graph3d = {
    "nodes":[],
    "links":[]
}
graph_full = {
    "nodes":[],
    "links":[]
}
graph3d_full = {
    "nodes":[],
    "links":[]
}

dir_path = os.path.dirname(os.path.realpath(__file__))
graph_path = os.path.join(dir_path, 'plebnet/graphs/')
megahubs_path = os.path.join(dir_path, 'known_plebs.json')
ln_path = os.path.join(dir_path, 'describegraph.json')

neighbours_dict = {}
known_megahubs = set()
nodes_list = []
nodes_set = set()
edges_set = set()
add_everything = False
i=0

def load_ln():
    with open(ln_path, 'r', encoding='utf8') as file:
        data=file.read()
    return json.loads(data)


def search_nodes():
    i=0
    for node in ln_graph["nodes"]:
        pub_key = node.get("pub_key")
        if pub_key in known_megahubs or add_everything:
            nodes_list.append(pub_key)
            nodes_set.add(pub_key)
            i+=1
            color = node.get("color")
            alias = node.get("alias")
            if alias == "":
                alias = pub_key[:20]
            node_info = {
                "name": alias,
                "id": pub_key,
                "color": color,
                "group": 1
            }
            graph["nodes"].append(node_info)
            graph3d["nodes"].append(node_info)
            graph_full["nodes"].append(node_info)
            graph3d_full["nodes"].append(node_info)


def search_edges():
    for edge in ln_graph["edges"]:
        node1 = edge.get("node1_pub")
        if node1 in nodes_set:
            node2 = edge.get("node2_pub")
            if node2 in nodes_set:
                edges_set.add((node1,node2))
                graph_full["links"].append({
                    "source": nodes_list.index(node1),
                    "target": nodes_list.index(node2),
                    "value": 1
                })
                graph3d_full["links"].append({
                    "source": node1,
                    "target": node2,
                    "value": 1
                })


def remove_non_triangles():
    #global graph, graph_full, graph3d, graph3d_full
    triangle_edges = set()
    for node in set(nodes_set):
        neighbours = set()
        for edge in edges_set:
            if node in edge:
                neighbour = edge[edge.index(node)-1]
                neighbours.add(neighbour)
        #if not neighbours:
        #    kill = nodes_list.index(node)
        #    graph["nodes"].pop(kill)
        #    graph3d["nodes"].pop(kill)
        #    graph_full["nodes"].pop(kill)
        #    graph3d_full["nodes"].pop(kill)
        #    nodes_list.remove(node)
        #    nodes_set.remove(node)
        #else:
        neighbours_dict[node] = list(neighbours)
        for edge in edges_set:
            if edge[0] in neighbours and edge[1] in neighbours:
                triangle_edges.add(edge)
    for triangle in triangle_edges:
        node1 = triangle[0]
        node2 = triangle[1]
        graph["links"].append({
            "source": nodes_list.index(node1),
            "target": nodes_list.index(node2),
            "value": 1
        })
        graph3d["links"].append({
            "source": node1,
            "target": node2,
            "value": 1
        })


def save_graph(file, graph_to_save):
    with open(graph_path+file, "w") as outfile:
        outfile.write(json.dumps(graph_to_save, indent=2))

if __name__ == '__main__':
    #plebnet

    t0 = time()
    myCmd = 'docker exec lnd lncli describegraph > ' + ln_path
    os.system(myCmd)
    
    t1 = time()
    if os.path.isfile(megahubs_path):
        with open(megahubs_path, 'r', encoding='utf8') as file:
            data = file.read()
        known_megahubs = set(json.loads(data))
    
    t2 = time()
    ln_graph = load_ln()
    
    t3 = time()
    search_nodes()
    search_edges()

    t4 = time()
    remove_non_triangles()

    t5 = time()
    save_graph("graph.json", graph)
    save_graph("graph3d.json", graph3d)
    save_graph("graph_full.json", graph_full)
    save_graph("graph3d_full.json", graph3d_full)
    save_graph("neighbours.json", neighbours_dict)

    t6=time()
    print("\nPlebnet")
    print("Fetching LN graph took: " + str(round(t1 - t0, 2)) + "s")
    print("Fetching known plebs took: " + str(round(t2 - t1, 2)) + "s")
    print("Opening LN graph took: " + str(round(t3 - t2, 2)) + "s")
    print("Searching nodes took: " + str(round(t4 - t3, 2)) + "s")
    print("Finding and removing triangles took: " + str(round(t5 - t4, 2)) + "s")
    print("Saving files took: " + str(round(t6 - t5, 2)) + "s")
    print("Total: " + str(round(t6 - t0, 2)) + "s")
    print("\nNodes: " + str(len(graph["nodes"])))
    print("Channels (triangles): " + str(len(graph["links"])))
    print("Channels: " + str(len(graph_full["links"])))



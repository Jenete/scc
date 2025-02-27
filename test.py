
import matplotlib.pyplot as plt
import networkx as nx

def create_gas_absorption_pfd():
    # Create a directed graph
    G = nx.DiGraph()

    # Add nodes (equipment)
    equipment = [
        ("CO2", "CO2 Supply"),
        ("Air", "Air Supply"),
        ("Mix", "Gas Mixer"),
        ("Abs", "Absorption Column"),
        ("Sump", "Sump Tank"),
        ("Pump", "Pump"),
    ]
    G.add_nodes_from(equipment)

    # Add edges (process streams)
    streams = [
        ("CO2", "Mix"),
        ("Air", "Mix"),
        ("Mix", "Abs"),
        ("Sump", "Pump"),
        ("Pump", "Abs"),
        ("Abs", "Sump"),
    ]
    G.add_edges_from(streams)

    # Set up the plot
    plt.figure(figsize=(12, 8))
    pos = nx.spring_layout(G)

    # Draw the graph
    nx.draw(G, pos, with_labels=True, node_color='lightblue', 
            node_size=3000, font_size=8, font_weight='bold', 
            arrows=True, edge_color='gray')

    # Add labels to nodes
    labels = nx.get_node_attributes(G, 'equipment')
    nx.draw_networkx_labels(G, pos, labels, font_size=8)

    # Add edge labels
    edge_labels = {
        ("CO2", "Mix"): "CO2",
        ("Air", "Mix"): "Air",
        ("Mix", "Abs"): "Gas mixture",
        ("Sump", "Pump"): "Water",
        ("Pump", "Abs"): "Water in",
        ("Abs", "Sump"): "Water out",
    }
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=7)

    # Add title
    plt.title("Gas Absorption System - Process Flow Diagram", fontsize=16)

    # Show the plot
    plt.axis('off')
    plt.tight_layout()
    plt.show()

if _name_ == "_main_":
    create_gas_absorption_pfd()
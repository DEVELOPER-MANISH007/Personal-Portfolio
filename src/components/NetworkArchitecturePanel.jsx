import { networkLayers } from "./neuralNetworkData";

export default function NetworkArchitecturePanel({ selection, passStage, onSelectLayer }) {
  const selectedLayerId = selection?.type === "layer"
    ? selection.id
    : selection?.type === "neuron"
      ? networkLayers.find((layer) => layer.id === selection.id.split("-").slice(0, -1).join("-"))?.id
      : selection?.type === "connection"
        ? selection.id.split("->")[0].replace(/-\d+$/, "")
        : null;

  return (
    <section className="network-architecture-panel" aria-labelledby="network-architecture-title">
      <div className="network-architecture-heading">
        <div>
          <span className="explorer-micro-label mono">FEED-FORWARD / 4 LAYERS</span>
          <h3 id="network-architecture-title">Network architecture</h3>
        </div>
        <span className="illustrative-badge mono">ILLUSTRATIVE</span>
      </div>
      <div className="network-layer-controls" role="group" aria-label="Select a network layer">
        {networkLayers.map((layer, index) => (
          <button
            key={layer.id}
            type="button"
            className={`network-layer-button${selectedLayerId === layer.id ? " is-selected" : ""}${passStage === index ? " is-active" : ""}`}
            aria-pressed={selection?.type === "layer" && selection.id === layer.id}
            onClick={() => onSelectLayer(layer.id)}
          >
            <span className="network-layer-index mono">0{index + 1}</span>
            <span className="network-layer-copy"><b>{layer.label}</b><small>{layer.count} {layer.count === 1 ? "neuron" : "neurons"}</small></span>
            {index < networkLayers.length - 1 && <span className="network-layer-arrow" aria-hidden="true">→</span>}
          </button>
        ))}
      </div>
      <p className="architecture-caption">4 → 5 → 4 → 1 units · illustrative binary-classification shape</p>
    </section>
  );
}

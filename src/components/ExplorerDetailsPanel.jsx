import {
  getConnection,
  getLayer,
  getNeuron,
  getNeuronConnections,
  networkLayers,
  networkNeurons,
} from "./neuralNetworkData";
import { activationFunctions } from "./activationFunctions";

function ObjectChips({ items, selectedId, onSelect, type, label }) {
  return (
    <div className="explorer-object-controls" role="group" aria-label={label}>
      {items.map((item) => (
        <button key={item.id} type="button" aria-pressed={selectedId === item.id} onClick={() => onSelect({ type, id: item.id })}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default function ExplorerDetailsPanel({ selection, onSelect, onClear }) {
  const layer = selection && selection.type !== "connection"
    ? getLayer(selection.type === "layer" ? selection.id : getNeuron(selection.id)?.layerId)
    : null;
  const neuron = selection?.type === "neuron" ? getNeuron(selection.id) : null;
  const connection = selection?.type === "connection" ? getConnection(selection.id) : null;
  const incoming = neuron ? getNeuronConnections(neuron.id).filter((item) => item.targetId === neuron.id) : [];
  const outgoing = neuron ? getNeuronConnections(neuron.id).filter((item) => item.sourceId === neuron.id) : [];
  const activation = layer?.activation ? activationFunctions[layer.activation] : null;
  const layerIndex = layer ? networkLayers.findIndex((item) => item.id === layer.id) : -1;
  const previousLayer = layerIndex > 0 ? networkLayers[layerIndex - 1] : null;
  const nextLayer = layerIndex >= 0 && layerIndex < networkLayers.length - 1 ? networkLayers[layerIndex + 1] : null;
  const layerNeurons = layer ? networkNeurons.filter((item) => item.layerId === layer.id) : [];
  const selectedLabel = neuron
    ? `${layer.label} · Neuron ${neuron.index}`
    : connection
      ? `${connection.sourceLabel} → ${connection.targetLabel}`
      : layer?.label;

  return (
    <section className="explorer-details-panel" aria-labelledby="explorer-details-title" aria-live="polite">
      <div className="explorer-panel-heading">
        <div>
          <span className="explorer-micro-label mono">NETWORK INSPECTOR</span>
          <h3 id="explorer-details-title">{selection ? "Selected object" : "Explore the network"}</h3>
        </div>
        {selection && <button className="clear-selection-button" type="button" onClick={onClear}>Clear selection</button>}
      </div>

      {!selection && (
        <div className="explorer-empty-details">
          <span className="explorer-selection-mark" aria-hidden="true">＋</span>
          <p>Select a layer, neuron, or connection to inspect how this illustrative network is organized.</p>
          <span className="explorer-key-hint mono">CANVAS CLICK · OR USE LAYER CONTROLS</span>
        </div>
      )}

      {selection?.type === "layer" && layer && (
        <div className="explorer-detail-content">
          <div className="explorer-detail-titleline"><span className="explorer-selection-mark" aria-hidden="true">L</span><div><span className="explorer-kind-label mono">{layer.kind}</span><h4>{layer.label} layer</h4></div></div>
          <p>{layer.purpose}</p>
          <div className="explorer-detail-metrics"><span><b>{layer.count}</b> neurons</span><span>{layer.dimensions}</span><span>{activation ? activation.label : "Input values"}</span></div>
          <p className="explorer-layer-neighbors">Previous: <b>{previousLayer?.label ?? "Feature values"}</b><span aria-hidden="true">→</span> Next: <b>{nextLayer?.label ?? "Model output"}</b></p>
          <div className="explorer-neuron-picker"><span className="explorer-kind-label mono">SELECT A NEURON</span><ObjectChips items={layerNeurons.map((item) => ({ id: item.id, label: `N${item.index}` }))} selectedId={selection.id} onSelect={onSelect} type="neuron" label={`${layer.label} layer neurons`} /></div>
        </div>
      )}

      {neuron && layer && (
        <div className="explorer-detail-content">
          <div className="explorer-detail-titleline"><span className="explorer-selection-mark" aria-hidden="true">N{neuron.index}</span><div><span className="explorer-kind-label mono">{layer.kind}</span><h4>{layer.label} · Neuron {neuron.index}</h4></div></div>
          <p>{layer.activation ? `This unit combines incoming signals and applies ${activation.label}.` : "This input unit represents one of the illustrative feature values entering the network."} Its outgoing signals feed the next layer in this feed-forward example.</p>
          <div className="explorer-detail-metrics"><span><b>{incoming.length}</b> incoming</span><span><b>{outgoing.length}</b> outgoing</span><span>{activation ? activation.label : "No activation"}</span></div>
          <div className="explorer-connection-picker">
            <span className="explorer-kind-label mono">CONNECTED LINKS · SIMULATED WEIGHTS</span>
            <ObjectChips items={[...incoming, ...outgoing].map((item) => ({ id: item.id, label: `${item.sourceLabel} → ${item.targetLabel}` }))} selectedId={null} onSelect={onSelect} type="connection" label={`Connections for ${layer.label} neuron ${neuron.index}`} />
          </div>
        </div>
      )}

      {connection && (
        <div className="explorer-detail-content">
          <div className="explorer-detail-titleline"><span className="explorer-selection-mark" aria-hidden="true">↗</span><div><span className="explorer-kind-label mono">CONNECTION · SIMULATED</span><h4>{connection.sourceLabel} → {connection.targetLabel}</h4></div></div>
          <p>A connection carries the source unit&apos;s value toward the destination unit. In a trained network, a learned weight scales that signal before it is combined with other inputs.</p>
          <div className="explorer-detail-metrics"><span><b>{connection.sourceLabel}</b> source</span><span><b>{connection.targetLabel}</b> destination</span><span><b>{connection.simulatedWeight.toFixed(2)}</b> illustrative weight</span></div>
          <p className="explorer-simulation-note">This weight is a deterministic illustrative value, not learned from a real model.</p>
        </div>
      )}

      {selection && selectedLabel && <span className="explorer-breadcrumb mono">NETWORK / {selectedLabel.toUpperCase()}</span>}
    </section>
  );
}

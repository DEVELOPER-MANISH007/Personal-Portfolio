import { networkLayers } from "./neuralNetworkData";

const stageDescriptions = [
  "Illustrative feature values enter the input layer.",
  "The first hidden layer combines incoming signals.",
  "The second hidden layer refines those signals.",
  "The output unit is reached; no prediction is calculated.",
];

export default function ForwardPassPanel({ stage, status, onRun, onReplay, onReset }) {
  const currentLayer = stage >= 0 ? networkLayers[stage] : null;
  const progress = stage >= 0 ? ((stage + 1) / networkLayers.length) * 100 : 0;
  const actionLabel = status === "running" ? "Pause" : status === "paused" ? "Resume" : "Run Forward Pass";

  return (
    <section className="forward-pass-panel" aria-label="Visual forward-pass demonstration">
      <div className="forward-pass-main">
        <div className="forward-pass-topline">
          <div>
            <span className="explorer-micro-label mono">SIGNAL FLOW · VISUAL DEMO</span>
            <p className="forward-pass-stage" aria-live="polite">
              {currentLayer ? <><b>{currentLayer.label}</b> · {stageDescriptions[stage]}</> : "Follow a signal through each layer of the illustrative network."}
            </p>
          </div>
          <span className={`forward-pass-state mono is-${status}`}>{status === "complete" ? "COMPLETE" : status.toUpperCase()}</span>
        </div>
        <div className="forward-pass-progress" role="progressbar" aria-label="Forward-pass visual progress" aria-valuemin={0} aria-valuemax={networkLayers.length} aria-valuenow={stage + 1}>
          {networkLayers.map((layer, index) => (
            <span key={layer.id} className={`${index <= stage ? "is-reached" : ""}${index === stage ? " is-current" : ""}`}>
              <i aria-hidden="true" />{layer.label}
            </span>
          ))}
          <div className="forward-pass-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="forward-pass-actions">
        <button className="forward-pass-run" type="button" onClick={onRun}>
          <span aria-hidden="true">{status === "running" ? "Ⅱ" : status === "paused" ? "▶" : "▷"}</span>{actionLabel}
        </button>
        <button className="forward-pass-secondary" type="button" onClick={onReplay}>Replay</button>
        <button className="forward-pass-secondary" type="button" onClick={onReset}>Reset</button>
      </div>
    </section>
  );
}

import { activationFunctions } from "./activationFunctions";

function buildCurve(activation) {
  const [minY, maxY] = activation.domain;
  const points = Array.from({ length: 101 }, (_, index) => {
    const x = -5 + index * 0.1;
    const y = activation.evaluate(x);
    const svgX = 16 + (index / 100) * 178;
    const svgY = 108 - ((y - minY) / (maxY - minY)) * 90;
    return `${index === 0 ? "M" : "L"}${svgX.toFixed(2)},${svgY.toFixed(2)}`;
  });
  return points.join(" ");
}

export default function ActivationFunctionPanel({ value, onChange, activeNeuron }) {
  const activation = activationFunctions[value];
  const [minY, maxY] = activation.domain;
  const zeroY = 108 - ((0 - minY) / (maxY - minY)) * 90;
  function handleTabKeyDown(event) {
    const ids = Object.keys(activationFunctions);
    const currentIndex = ids.indexOf(value);
    const nextIndex = event.key === "ArrowRight"
      ? (currentIndex + 1) % ids.length
      : event.key === "ArrowLeft"
        ? (currentIndex - 1 + ids.length) % ids.length
        : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    const nextId = ids[nextIndex];
    onChange(nextId);
    event.currentTarget.parentElement.querySelector(`#activation-tab-${nextId}`)?.focus();
  }

  return (
    <section className="activation-panel" aria-labelledby="activation-panel-title">
      <div className="explorer-panel-heading">
        <div>
          <span className="explorer-micro-label mono">ACTIVATION EXPLORER</span>
          <h3 id="activation-panel-title">Function profile</h3>
        </div>
        {activeNeuron && <span className="activation-linked mono">{activeNeuron}</span>}
      </div>
      <div className="activation-tabs" role="tablist" aria-label="Choose an activation function">
        {Object.entries(activationFunctions).map(([id, item]) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`activation-tab-${id}`}
            aria-selected={value === id}
            aria-controls="activation-chart-panel"
            tabIndex={value === id ? 0 : -1}
            onClick={() => onChange(id)}
            onKeyDown={handleTabKeyDown}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div id="activation-chart-panel" className="activation-chart-panel" role="tabpanel" aria-labelledby={`activation-tab-${value}`}>
        <svg className="activation-chart" viewBox="0 0 210 130" role="img" aria-label={`${activation.label} activation curve from x equals minus five to five`}>
          <path d="M16 18H194 M16 63H194 M16 108H194" className="activation-gridline" />
          <path d={`M16 ${zeroY.toFixed(2)}H194`} className="activation-axis" />
          <path d="M105 14V112" className="activation-axis activation-axis-y" />
          <path d={buildCurve(activation)} className="activation-curve" />
          <text x="17" y="125">−5</text><text x="188" y="125">5</text><text x="108" y="12">f(x)</text>
        </svg>
        <div className="activation-copy">
          <code>{activation.formula}</code>
          <p>{activation.explanation}</p>
          <div className="activation-properties">
            <span><b>Range</b>{activation.range}</span>
            <span><b>Gradient</b>{activation.gradient}</span>
          </div>
        </div>
      </div>
      <p className="activation-note">Changing this explorer updates the illustration only; it does not retrain a model.</p>
    </section>
  );
}

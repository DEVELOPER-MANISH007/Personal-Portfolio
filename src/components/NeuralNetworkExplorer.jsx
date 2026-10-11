import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import ActivationFunctionPanel from "./ActivationFunctionPanel";
import ExplorerDetailsPanel from "./ExplorerDetailsPanel";
import ForwardPassPanel from "./ForwardPassPanel";
import NetworkArchitecturePanel from "./NetworkArchitecturePanel";
import NeuralNetworkCanvas from "./NetworkScene";
import { getLayer, getNeuron } from "./neuralNetworkData";

export default function NeuralNetworkExplorer() {
  const reduceMotion = useReducedMotion();
  const [selection, setSelection] = useState(null);
  const [activation, setActivation] = useState("relu");
  const [passStage, setPassStage] = useState(-1);
  const [passStatus, setPassStatus] = useState("idle");

  useEffect(() => {
    if (passStatus !== "running") return undefined;
    if (passStage >= 3) {
      const completionTimer = window.setTimeout(() => setPassStatus("complete"), 650);
      return () => window.clearTimeout(completionTimer);
    }
    const stepTimer = window.setTimeout(() => setPassStage((stage) => Math.min(stage + 1, 3)), reduceMotion ? 1000 : 850);
    return () => window.clearTimeout(stepTimer);
  }, [passStatus, passStage, reduceMotion]);

  useEffect(() => {
    if (!selection) return undefined;
    function clearWithEscape(event) {
      if (event.key === "Escape") setSelection(null);
    }
    window.addEventListener("keydown", clearWithEscape);
    return () => window.removeEventListener("keydown", clearWithEscape);
  }, [selection]);

  const handleSelect = useCallback((nextSelection) => {
    if (passStatus === "running") setPassStatus("paused");
    setSelection(nextSelection);
    if (nextSelection.type === "neuron") {
      const neuron = getNeuron(nextSelection.id);
      const layer = neuron && getLayer(neuron.layerId);
      if (layer?.activation) setActivation(layer.activation);
    }
  }, [passStatus]);

  const handleClear = useCallback(() => setSelection(null), []);
  const runOrPause = () => {
    if (passStatus === "running") {
      setPassStatus("paused");
    } else if (passStatus === "paused") {
      setPassStatus("running");
    } else {
      setSelection(null);
      setPassStage(0);
      setPassStatus("running");
    }
  };
  const replay = () => {
    setSelection(null);
    setPassStage(0);
    setPassStatus("running");
  };
  const reset = () => {
    setPassStatus("idle");
    setPassStage(-1);
    setSelection(null);
  };

  const selectedNeuron = selection?.type === "neuron" ? getNeuron(selection.id) : null;
  const selectedLayer = selectedNeuron ? getLayer(selectedNeuron.layerId) : null;
  const activationLabel = selectedNeuron
    ? `${selectedLayer.label.toUpperCase()} / N${selectedNeuron.index}`
    : null;

  return (
    <div className="neural-explorer" aria-label="Interactive neural network explorer">
      <NetworkArchitecturePanel selection={selection} passStage={passStage} onSelectLayer={(id) => handleSelect({ type: "layer", id })} />

      <div className="network-stage-frame">
        <div className="network-stage-topline mono">
          <span><i aria-hidden="true" />LIVE TOPOLOGY</span>
          <span>DRAG TO ORBIT · SELECT TO INSPECT</span>
        </div>
        <div className="network-stage" role="group" aria-label="Interactive three-dimensional neural network; accessible layer, neuron, and connection controls are below">
          <NeuralNetworkCanvas
            selection={selection}
            passStage={passStage}
            reducedMotion={reduceMotion}
            onSelect={handleSelect}
            onClear={handleClear}
          />
          <div className="network-stage-hint mono" aria-hidden="true">4 → 5 → 4 → 1</div>
        </div>
        <p className="network-stage-disclaimer"><span aria-hidden="true">◇</span> Illustrative architecture · not connected to a trained model</p>
      </div>

      <ForwardPassPanel stage={passStage} status={passStatus} onRun={runOrPause} onReplay={replay} onReset={reset} />

      <div className="explorer-panels">
        <ExplorerDetailsPanel selection={selection} onSelect={handleSelect} onClear={handleClear} />
        <ActivationFunctionPanel value={activation} onChange={setActivation} activeNeuron={activationLabel} />
      </div>
    </div>
  );
}

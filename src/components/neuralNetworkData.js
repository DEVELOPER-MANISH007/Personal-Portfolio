import * as THREE from "three";

export const networkLayers = [
  {
    id: "input",
    label: "Input",
    kind: "INPUT LAYER",
    count: 4,
    x: -3.45,
    purpose: "Receives four illustrative feature values and passes them into the network.",
    dimensions: "4 features → 4 units",
    activation: null,
  },
  {
    id: "hidden-1",
    label: "Hidden 1",
    kind: "HIDDEN LAYER 01",
    count: 5,
    x: -1.15,
    purpose: "Combines input signals into intermediate representations.",
    dimensions: "4 inputs → 5 units",
    activation: "relu",
  },
  {
    id: "hidden-2",
    label: "Hidden 2",
    kind: "HIDDEN LAYER 02",
    count: 4,
    x: 1.15,
    purpose: "Refines intermediate signals before they reach the output.",
    dimensions: "5 inputs → 4 units",
    activation: "relu",
  },
  {
    id: "output",
    label: "Output",
    kind: "OUTPUT LAYER",
    count: 1,
    x: 3.45,
    purpose: "Produces one illustrative output unit for a binary-classification-shaped example.",
    dimensions: "4 inputs → 1 unit",
    activation: "sigmoid",
  },
];

export const networkNeurons = networkLayers.flatMap((layer) =>
  Array.from({ length: layer.count }, (_, index) => ({
    id: `${layer.id}-${index + 1}`,
    layerId: layer.id,
    index: index + 1,
    position: [
      layer.x,
      ((layer.count - 1) / 2 - index) * 0.66,
      (index % 3 - 1) * 0.12,
    ],
  }))
);

const neuronsByLayer = networkLayers.map((layer) =>
  networkNeurons.filter((neuron) => neuron.layerId === layer.id)
);

export const networkConnections = networkLayers.slice(0, -1).flatMap((layer, layerIndex) => {
  const sourceNeurons = neuronsByLayer[layerIndex];
  const targetNeurons = neuronsByLayer[layerIndex + 1];
  return sourceNeurons.flatMap((source, sourceIndex) =>
    targetNeurons.map((target, targetIndex) => {
      const start = new THREE.Vector3(...source.position);
      const end = new THREE.Vector3(...target.position);
      const direction = end.clone().sub(start);
      const midpoint = start.clone().add(end).multiplyScalar(0.5);
      const rotation = new THREE.Euler().setFromQuaternion(
        new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())
      );
      const simulatedWeight = Math.round(
        Math.sin((layerIndex + 1) * 13 + sourceIndex * 7 + targetIndex * 11) * 0.92 * 100
      ) / 100;

      return {
        id: `${source.id}->${target.id}`,
        sourceId: source.id,
        targetId: target.id,
        sourceLayerId: source.layerId,
        targetLayerId: target.layerId,
        layerIndex,
        sourceLabel: `${layer.label} ${source.index}`,
        targetLabel: `${target.layerId === "output" ? "Output" : networkLayers[layerIndex + 1].label} ${target.index}`,
        simulatedWeight,
        position: midpoint.toArray(),
        rotation: [rotation.x, rotation.y, rotation.z],
        length: direction.length(),
        start: start.toArray(),
        end: end.toArray(),
      };
    })
  );
});

export function getNeuronConnections(neuronId) {
  return networkConnections.filter(
    (connection) => connection.sourceId === neuronId || connection.targetId === neuronId
  );
}

export function getLayer(id) {
  return networkLayers.find((layer) => layer.id === id);
}

export function getNeuron(id) {
  return networkNeurons.find((neuron) => neuron.id === id);
}

export function getConnection(id) {
  return networkConnections.find((connection) => connection.id === id);
}

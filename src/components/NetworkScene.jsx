import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { networkConnections, networkLayers, networkNeurons } from "./neuralNetworkData";

const layerIndex = Object.fromEntries(networkLayers.map((layer, index) => [layer.id, index]));

function isNodeHighlighted(neuron, selection) {
  if (!selection) return true;
  if (selection.type === "neuron") {
    if (selection.id === neuron.id) return true;
    return networkConnections.some(
      (connection) =>
        (connection.sourceId === selection.id && connection.targetId === neuron.id) ||
        (connection.targetId === selection.id && connection.sourceId === neuron.id)
    );
  }
  if (selection.type === "connection") {
    const connection = networkConnections.find((item) => item.id === selection.id);
    return connection?.sourceId === neuron.id || connection?.targetId === neuron.id;
  }
  if (selection.type === "layer") {
    return Math.abs(layerIndex[neuron.layerId] - layerIndex[selection.id]) <= 1;
  }
  return true;
}

function isConnectionHighlighted(connection, selection) {
  if (!selection) return true;
  if (selection.type === "connection") return selection.id === connection.id;
  if (selection.type === "neuron") {
    return connection.sourceId === selection.id || connection.targetId === selection.id;
  }
  return connection.sourceLayerId === selection.id || connection.targetLayerId === selection.id;
}

function NetworkNeuron({ neuron, selected, highlighted, active, onSelect }) {
  const hue = neuron.layerId.startsWith("hidden") ? "#a78bfa" : "#7dd8ff";
  const opacity = active ? 1 : highlighted ? 0.88 : 0.16;

  return (
    <group position={neuron.position}>
      {selected && (
        <mesh>
          <sphereGeometry args={[0.23, 16, 16]} />
          <meshBasicMaterial color="#effaff" wireframe transparent opacity={0.8} />
        </mesh>
      )}
      {active && (
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={hue} transparent opacity={0.16} />
        </mesh>
      )}
      <mesh
        onClick={(event) => { event.stopPropagation(); onSelect({ type: "neuron", id: neuron.id }); }}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "auto"; }}
      >
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh raycast={() => null}>
        <sphereGeometry args={[0.115, 20, 20]} />
        <meshStandardMaterial color={hue} emissive={hue} emissiveIntensity={selected ? 2.8 : active ? 2.1 : 0.8} roughness={0.3} metalness={0.12} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function NetworkConnection({ connection, selected, highlighted, active, onSelect }) {
  const opacity = active ? 0.84 : highlighted ? selected ? 0.96 : 0.42 : 0.07;
  const color = selected ? "#f1e6ff" : active ? "#7dd8ff" : "#8292c7";

  return (
    <group position={connection.position} rotation={connection.rotation}>
      <mesh onClick={(event) => { event.stopPropagation(); onSelect({ type: "connection", id: connection.id }); }}>
        <cylinderGeometry args={[0.045, 0.045, connection.length, 6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh raycast={() => null}>
        <cylinderGeometry args={[selected ? 0.017 : 0.009, selected ? 0.017 : 0.009, connection.length, 5]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
    </group>
  );
}

function TravelingPulse({ connection, offset }) {
  const ref = useRef();
  const elapsed = useRef(0);
  const start = useMemo(() => new THREE.Vector3(...connection.start), [connection]);
  const end = useMemo(() => new THREE.Vector3(...connection.end), [connection]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsed.current += delta;
    const progress = (elapsed.current * 0.68 + offset) % 1;
    ref.current.position.lerpVectors(start, end, progress);
  });

  return (
    <mesh ref={ref} position={connection.start}>
      <sphereGeometry args={[0.043, 10, 10]} />
      <meshBasicMaterial color="#d6f8ff" />
    </mesh>
  );
}

function NetworkScene({ selection, passStage, onSelect, onClear }) {
  const networkRef = useRef();
  const elapsed = useRef(0);
  const activeLayer = passStage >= 0 && passStage < networkLayers.length ? passStage : -1;
  const activeConnections = activeLayer >= 0 && activeLayer < networkLayers.length - 1
    ? networkConnections.filter((connection) => connection.layerIndex === activeLayer)
    : [];
  const pulses = activeConnections.filter((_, index) => index % 6 === 0).slice(0, 4);

  useFrame((_, delta) => {
    if (!networkRef.current) return;
    elapsed.current += delta;
    networkRef.current.rotation.y = Math.sin(elapsed.current * 0.25) * 0.035;
    networkRef.current.rotation.x = Math.sin(elapsed.current * 0.18) * 0.018;
  });

  return (
    <>
      <ambientLight intensity={0.62} />
      <pointLight position={[-3, 3, 4]} color="#7dd8ff" intensity={22} distance={10} />
      <pointLight position={[3, -2, 3]} color="#a78bfa" intensity={17} distance={9} />
      <group ref={networkRef}>
        {networkConnections.map((connection) => {
          const highlighted = isConnectionHighlighted(connection, selection);
          return (
            <NetworkConnection
              key={connection.id}
              connection={connection}
              selected={selection?.type === "connection" && selection.id === connection.id}
              highlighted={highlighted}
              active={connection.layerIndex === activeLayer}
              onSelect={onSelect}
            />
          );
        })}
        {networkNeurons.map((neuron) => (
          <NetworkNeuron
            key={neuron.id}
            neuron={neuron}
            selected={selection?.type === "neuron" && selection.id === neuron.id}
            highlighted={isNodeHighlighted(neuron, selection)}
            active={layerIndex[neuron.layerId] === activeLayer}
            onSelect={onSelect}
          />
        ))}
        {pulses.map((connection, index) => <TravelingPulse key={`${connection.id}-pulse`} connection={connection} offset={index * 0.23} />)}
      </group>
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} rotateSpeed={0.42} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.6} />
      <mesh position={[0, 0, -0.95]} onClick={(event) => { event.stopPropagation(); onClear(); }}>
        <planeGeometry args={[20, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  );
}

function activateWithKeyboard(event, action) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

export function StaticNetworkFallback({ selection, passStage, onSelect, onClear }) {
  const layerX = [-30 + 130, 300, 500, 700];
  const coords = Object.fromEntries(networkNeurons.map((neuron) => {
    const index = layerIndex[neuron.layerId];
    const layer = networkLayers[index];
    const localIndex = neuron.index - 1;
    return [neuron.id, [layerX[index], 175 + ((layer.count - 1) / 2 - localIndex) * 42]];
  }));

  return (
    <svg className="network-fallback" viewBox="0 0 800 350" role="group" aria-label="Static interactive neural network diagram">
      <rect x="0" y="0" width="800" height="350" fill="transparent" onClick={onClear} />
      {networkConnections.map((connection) => {
        const [x1, y1] = coords[connection.sourceId];
        const [x2, y2] = coords[connection.targetId];
        const selected = selection?.type === "connection" && selection.id === connection.id;
        return (
          <line
            key={connection.id}
            className={`network-fallback-edge${selected ? " is-selected" : ""}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            role="button" tabIndex={0}
            aria-label={`Connection from ${connection.sourceLabel} to ${connection.targetLabel}`}
            onClick={() => onSelect({ type: "connection", id: connection.id })}
            onKeyDown={(event) => activateWithKeyboard(event, () => onSelect({ type: "connection", id: connection.id }))}
          />
        );
      })}
      {networkNeurons.map((neuron) => {
        const [cx, cy] = coords[neuron.id];
        const selected = selection?.type === "neuron" && selection.id === neuron.id;
        const active = passStage === layerIndex[neuron.layerId];
        return (
          <g key={neuron.id} className={`network-fallback-node${selected ? " is-selected" : ""}${active ? " is-active" : ""}`} role="button" tabIndex={0} aria-label={`${networkLayers[layerIndex[neuron.layerId]].label} neuron ${neuron.index}`} onClick={() => onSelect({ type: "neuron", id: neuron.id })} onKeyDown={(event) => activateWithKeyboard(event, () => onSelect({ type: "neuron", id: neuron.id }))}>
            <circle cx={cx} cy={cy} r={selected ? 9 : 6} />
            <text x={cx} y={cy - 13} textAnchor="middle">{neuron.index}</text>
          </g>
        );
      })}
      {networkLayers.map((layer, index) => (
        <text key={layer.id} className="network-fallback-label" x={layerX[index]} y="320" textAnchor="middle" role="button" aria-label={`Select ${layer.label} layer`} tabIndex={0} onClick={() => onSelect({ type: "layer", id: layer.id })} onKeyDown={(event) => activateWithKeyboard(event, () => onSelect({ type: "layer", id: layer.id }))}>{layer.label}</text>
      ))}
    </svg>
  );
}

export default function NeuralNetworkCanvas({ selection, passStage, reducedMotion, onSelect, onClear }) {
  return (
    <Canvas
      className="network-canvas"
      camera={{ position: [0, 0, 8.3], fov: 43, near: 0.1, far: 40 }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      fallback={<StaticNetworkFallback selection={selection} passStage={passStage} onSelect={onSelect} onClear={onClear} />}
      onPointerMissed={onClear}
    >
      <color attach="background" args={["#070b16"]} />
      <fog attach="fog" args={["#070b16", 11, 24]} />
      <NetworkScene selection={selection} passStage={passStage} onSelect={onSelect} onClear={onClear} />
    </Canvas>
  );
}

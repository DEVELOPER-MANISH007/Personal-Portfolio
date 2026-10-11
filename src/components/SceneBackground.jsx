import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------
   NeuralCore — a sphere of nodes + connecting synapse lines with
   traveling data-pulses. Reads clearly as a neural network / data
   graph, breathing and rotating, reacting to scroll depth.
--------------------------------------------------------------- */
function NeuralCore({ scrollRef }) {
  const groupRef = useRef();
  const pulseRef = useRef();
  const NODE_COUNT = 130;
  const RADIUS = 90;

  const { positions, nodeVecs, linkPositions, pulses } = useMemo(() => {
    const nodeVecs = [];
    const positions = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * Math.PI * (3 - Math.sqrt(5));
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      const jitter = RADIUS * (0.9 + Math.random() * 0.18);
      const v = new THREE.Vector3(x * jitter, y * jitter, z * jitter);
      nodeVecs.push(v);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    }

    // nearest-neighbour links
    const linkPairs = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const dists = [];
      for (let j = 0; j < NODE_COUNT; j++) {
        if (i === j) continue;
        dists.push([j, nodeVecs[i].distanceTo(nodeVecs[j])]);
      }
      dists.sort((a, b) => a[1] - b[1]);
      const linkCount = 2 + Math.floor(Math.random() * 2);
      for (let k = 0; k < linkCount; k++) {
        const j = dists[k][0];
        const key = i < j ? `${i}_${j}` : `${j}_${i}`;
        if (!linkPairs.find((p) => p.key === key)) {
          linkPairs.push({ key, a: i, b: j });
        }
      }
    }

    const linkPositions = new Float32Array(linkPairs.length * 6);
    linkPairs.forEach((p, idx) => {
      const a = nodeVecs[p.a];
      const b = nodeVecs[p.b];
      linkPositions[idx * 6] = a.x;
      linkPositions[idx * 6 + 1] = a.y;
      linkPositions[idx * 6 + 2] = a.z;
      linkPositions[idx * 6 + 3] = b.x;
      linkPositions[idx * 6 + 4] = b.y;
      linkPositions[idx * 6 + 5] = b.z;
    });

    const PULSE_COUNT = 24;
    const pulses = Array.from({ length: PULSE_COUNT }, () => ({
      link: linkPairs[Math.floor(Math.random() * linkPairs.length)],
      t: Math.random(),
      speed: 0.004 + Math.random() * 0.01,
    }));

    return { positions, nodeVecs, linkPositions, pulses, linkPairs };
  }, []);

  const pulsePositions = useMemo(
    () => new Float32Array(pulses.length * 3),
    [pulses.length]
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.12;
      const breathe = 1 + Math.sin(t * 0.8) * 0.03;
      const scrollPush = 1 + (scrollRef.current || 0) * 0.35;
      groupRef.current.scale.setScalar(breathe * scrollPush);
    }

    // animate data pulses along their edges
    const arr = pulseRef.current.geometry.attributes.position.array;
    pulses.forEach((p, i) => {
      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
      }
      const a = nodeVecs[p.link.a];
      const b = nodeVecs[p.link.b];
      arr[i * 3] = a.x + (b.x - a.x) * p.t;
      arr[i * 3 + 1] = a.y + (b.y - a.y) * p.t;
      arr[i * 3 + 2] = a.z + (b.z - a.z) * p.t;
    });
    pulseRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7dd8ff"
          size={4.2}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linkPositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3a5a8f" transparent opacity={0.32} />
      </lineSegments>

      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pulsePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff8b6b"
          size={6.5}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ---------------------------------------------------------------
   OrbitPlanets — rings + spheres representing the 4 projects,
   slowly orbiting the neural core.
--------------------------------------------------------------- */
function OrbitPlanets() {
  const groupRef = useRef();
  const colors = ["#7dd8ff", "#a78bfa", "#ff8b6b", "#9be8c4"];
  const radii = [150, 205, 262, 325];

  const planetRefs = useRef([]);

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.012;
    planetRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const speed = 0.11 - i * 0.016;
      mesh.userData.angle += speed * delta * 1.4;
      const radius = radii[i];
      const x = Math.cos(mesh.userData.angle) * radius;
      const z = Math.sin(mesh.userData.angle) * radius;
      const y =
        Math.sin(mesh.userData.angle * 2 + i) * radius * 0.12 +
        Math.sin(i) * 10;
      mesh.position.set(x, y, z);
      mesh.rotation.y += delta * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {radii.map((radius, i) => (
        <mesh key={`ring-${i}`} rotation={[Math.PI / 2 + i * 0.05, 0, i * 0.32]}>
          <ringGeometry args={[radius - 0.5, radius + 0.5, 160]} />
          <meshBasicMaterial
            color="#1c2440"
            side={THREE.DoubleSide}
            transparent
            opacity={0.55}
          />
        </mesh>
      ))}
      {radii.map((radius, i) => (
        <mesh
          key={`planet-${i}`}
          ref={(el) => {
            if (el) {
              el.userData.angle = (i / radii.length) * Math.PI * 2;
              planetRefs.current[i] = el;
            }
          }}
        >
          <sphereGeometry args={[7.5 + i * 1.4, 20, 20]} />
          <meshBasicMaterial color={colors[i]} wireframe />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------------------------------------------------------
   StarField — distant ambient stars
--------------------------------------------------------------- */
function StarField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const count = 2200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5000;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5000;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5000;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.0035;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={1.5}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------------------------------------------------------
   ReactiveField — particles that visibly swirl around the mouse
   cursor position (raycast onto a world-space plane).
--------------------------------------------------------------- */
function ReactiveField({ mouseRef }) {
  const ref = useRef();
  const COUNT = 320;
  const { camera } = useThree();

  const homePositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < COUNT; i++) {
      arr.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 900,
          (Math.random() - 0.5) * 600,
          (Math.random() - 0.5) * 500 - 100
        )
      );
    }
    return arr;
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    homePositions.forEach((v, i) => {
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    });
    return arr;
  }, [homePositions]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );
  const mouseWorld = useRef(new THREE.Vector3());
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const ndc = useMemo(() => new THREE.Vector2(), []);

  useFrame(() => {
    ndc.set(mouseRef.current.x, -mouseRef.current.y);
    raycaster.setFromCamera(ndc, camera);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, hit)) {
      mouseWorld.current.copy(hit);
    }

    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      const home = homePositions[i];
      const px = arr[i * 3];
      const py = arr[i * 3 + 1];
      const pz = arr[i * 3 + 2];
      tmp.set(px, py, pz);
      const dist = tmp.distanceTo(mouseWorld.current);

      if (dist < 260) {
        const pull = (1 - dist / 260) * 0.7;
        const dir = tmp.clone().sub(mouseWorld.current).normalize();
        const swirl = new THREE.Vector3(-dir.y, dir.x, dir.z * 0.3).multiplyScalar(
          60
        );
        const tx = mouseWorld.current.x + dir.x * 70 + swirl.x * 0.3;
        const ty = mouseWorld.current.y + dir.y * 70 + swirl.y * 0.3;
        const tz = mouseWorld.current.z + dir.z * 70;
        arr[i * 3] += (tx - px) * 0.06 * pull + (home.x - px) * 0.01;
        arr[i * 3 + 1] += (ty - py) * 0.06 * pull + (home.y - py) * 0.01;
        arr[i * 3 + 2] += (tz - pz) * 0.06 * pull + (home.z - pz) * 0.01;
      } else {
        arr[i * 3] += (home.x - px) * 0.025;
        arr[i * 3 + 1] += (home.y - py) * 0.025;
        arr[i * 3 + 2] += (home.z - pz) * 0.025;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={3}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------------------------------------------------------
   CameraRig — drives the camera based on scroll progress + mouse,
   diving through the neural network as the user scrolls.
--------------------------------------------------------------- */
function CameraRig({ scrollRef, mouseRef }) {
  useFrame(({ camera }) => {
    const scrollFrac = scrollRef.current || 0;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const camZ = 460 - scrollFrac * 560;
    const camY = 20 + scrollFrac * 60;
    const camX = Math.sin(scrollFrac * Math.PI) * 40;

    camera.position.x += (camX + mx * 38 - camera.position.x) * 0.05;
    camera.position.y += (camY + my * 24 - camera.position.y) * 0.05;
    camera.position.z += (camZ - camera.position.z) * 0.07;
    camera.lookAt(mx * 14, scrollFrac * 16 + my * 8, 0);
  });
  return null;
}

/* ---------------------------------------------------------------
   Main exported background — fixed full-viewport canvas.
   scrollRef and mouseRef are refs (0..1 / -1..1) updated by the
   parent so the whole scene reacts to real page scroll + cursor.
--------------------------------------------------------------- */
export default function SceneBackground({ scrollRef, mouseRef }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return (
    <div className="scene-canvas-wrap">
      <Canvas
        frameloop={reducedMotion ? "demand" : "always"}
        camera={{ position: [0, 20, 460], fov: 62, near: 0.1, far: 6000 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#05060d"]} />
        <fog attach="fog" args={["#05060d", 200, 2400]} />
        <StarField />
        <NeuralCore scrollRef={scrollRef} />
        <OrbitPlanets />
        <ReactiveField mouseRef={mouseRef} />
        <CameraRig scrollRef={scrollRef} mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
}

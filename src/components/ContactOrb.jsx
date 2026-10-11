const nodes = [
  [200, 62, 4], [270, 83, 3], [323, 137, 4], [338, 205, 3],
  [303, 276, 4], [244, 326, 3], [171, 335, 4], [105, 300, 3],
  [65, 238, 4], [76, 163, 3], [122, 102, 4], [178, 132, 3],
  [248, 146, 4], [282, 205, 3], [231, 253, 4], [160, 242, 3],
  [127, 192, 4], [201, 204, 5], [218, 88, 2], [317, 231, 2],
];

const edges = [
  [0, 1], [0, 11], [0, 18], [1, 2], [1, 12], [2, 3], [2, 12], [2, 13],
  [3, 13], [3, 19], [4, 5], [4, 13], [4, 14], [4, 19], [5, 6], [5, 14],
  [6, 7], [6, 15], [7, 8], [7, 15], [8, 9], [8, 16], [9, 10], [9, 16],
  [10, 11], [10, 16], [11, 12], [11, 17], [12, 13], [12, 17], [13, 14],
  [13, 17], [14, 15], [14, 17], [15, 16], [15, 17], [16, 17], [17, 18],
];

export default function ContactOrb() {
  function handlePointerMove(event) {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--orb-tilt-x", `${-y * 7}deg`);
    event.currentTarget.style.setProperty("--orb-tilt-y", `${x * 7}deg`);
  }

  function resetPointer(event) {
    event.currentTarget.style.setProperty("--orb-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--orb-tilt-y", "0deg");
  }

  return (
    <div
      className="contact-orb-scene"
      role="img"
      aria-label="Abstract neural network sphere with connected cyan and violet nodes"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="contact-orb-grid" aria-hidden="true" />
      <svg className="contact-orb-svg" viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <radialGradient id="orb-core" cx="42%" cy="35%" r="68%">
            <stop offset="0" stopColor="#8de8ff" stopOpacity=".19" />
            <stop offset=".48" stopColor="#6274dc" stopOpacity=".1" />
            <stop offset="1" stopColor="#070b18" stopOpacity=".02" />
          </radialGradient>
          <linearGradient id="orb-edge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#7dd8ff" stopOpacity=".9" />
            <stop offset=".52" stopColor="#8392ff" stopOpacity=".56" />
            <stop offset="1" stopColor="#c29aff" stopOpacity=".88" />
          </linearGradient>
          <filter id="orb-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="200" cy="200" r="148" fill="url(#orb-core)" />
        <circle className="contact-orb-halo" cx="200" cy="200" r="153" fill="none" stroke="url(#orb-edge)" strokeOpacity=".24" />
        <ellipse cx="200" cy="200" rx="153" ry="62" fill="none" stroke="#83dfff" strokeOpacity=".22" transform="rotate(-34 200 200)" />
        <ellipse cx="200" cy="200" rx="153" ry="62" fill="none" stroke="#b391ff" strokeOpacity=".2" transform="rotate(42 200 200)" />
        <g className="contact-orb-rotor" transform="rotate(-18 200 200)">
          <circle cx="200" cy="200" r="116" fill="none" stroke="#8292c7" strokeOpacity=".1" />
          {edges.map(([from, to], index) => {
            const [x1, y1] = nodes[from];
            const [x2, y2] = nodes[to];
            return (
              <line
                key={`${from}-${to}`}
                className={`contact-orb-edge${index % 6 === 0 ? " is-pulsing" : ""}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
              />
            );
          })}
          {edges.slice(2, 14).map(([from, to], index) => {
            const [x1, y1] = nodes[from];
            const [x2, y2] = nodes[to];
            return <line key={`pulse-${from}-${to}`} className="contact-orb-pulse" style={{ animationDelay: `${index * -0.62}s` }} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
          {nodes.map(([cx, cy, radius], index) => (
            <circle key={`${cx}-${cy}`} className={`contact-orb-node${index % 4 === 0 ? " is-bright" : ""}`} cx={cx} cy={cy} r={radius} />
          ))}
          <circle cx="200" cy="200" r="24" fill="url(#orb-core)" stroke="#a8baff" strokeOpacity=".52" />
          <circle className="contact-orb-center" cx="200" cy="200" r="5" />
        </g>
      </svg>
      <div className="contact-orb-coordinates mono" aria-hidden="true">N 37.42&nbsp;&nbsp; / &nbsp;&nbsp;SYNAPSE 001</div>
    </div>
  );
}

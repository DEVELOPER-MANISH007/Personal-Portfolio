import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import SkillIcon from "./SkillIcon";
import { skillClusters } from "../data/content";
function SkillCard({ cluster, index }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 24 }), sy = useSpring(y, { stiffness: 180, damping: 24 });
  const rotateX = useTransform(sy, [-100, 100], [4, -4]), rotateY = useTransform(sx, [-140, 140], [-5, 5]);
  function move(e) { const r=e.currentTarget.getBoundingClientRect(); x.set(e.clientX-r.left-r.width/2); y.set(e.clientY-r.top-r.height/2); }
  function reset() { x.set(0); y.set(0); }
  const feature = cluster.title === "Machine Learning";
  return <Reveal className={`cluster${feature ? " cluster-featured" : ""}`} delay={index * .05} y={18}><motion.article onMouseMove={move} onMouseLeave={reset} style={{ rotateX, rotateY, "--accent": cluster.color }} className="cluster-surface">
    <div className="cluster-topline"><span className="cluster-index mono">0{index + 1} / FIELD</span><span className="orbit-dot" /></div>
    <div className="cluster-head"><h3>{cluster.title}</h3><span className="cluster-mark" aria-hidden="true">{feature ? "ƒ(x)" : "↗"}</span></div>
    <ul className="skill-chip-list">{cluster.items.map((item) => <li className="skill-chip" key={item.name}><span className="skill-chip-icon"><SkillIcon name={item.icon} /></span><span className="skill-chip-name">{item.name}</span></li>)}</ul>
    <div className="cluster-spark" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /></div>
  </motion.article></Reveal>;
}
export default function Skills() {
  return <section id="skills"><Reveal className="eyebrow">02 / Capabilities</Reveal><div className="sec-head"><div><Reveal as="h2" className="sec-title">Data Science Toolkit</Reveal><Reveal as="p" className="section-subtitle">From raw data to production-ready intelligence.</Reveal></div><Reveal as="div" className="sec-count mono" delay={.1}>06 disciplines · one workflow</Reveal></div><div className="skill-clusters">{skillClusters.map((cluster, i) => <SkillCard key={cluster.title} cluster={cluster} index={i} />)}</div></section>;
}

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import SkillIcon from "./SkillIcon";
import { skillClusters } from "../data/content";

/**
 * SkillChip — a single skill pill with its logo. Tracks the mouse
 * locally and tilts + lifts toward the cursor with spring physics,
 * and glows in the cluster's accent color on hover.
 */
function SkillChip({ item, color }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  const rotateX = useTransform(springY, [-30, 30], [10, -10]);
  const rotateY = useTransform(springX, [-30, 30], [-10, 10]);
  const translateY = useTransform(springY, [-30, 30], [4, -4]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.li
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        y: translateY,
        "--accent": color,
      }}
      whileHover={{ scale: 1.06 }}
      className="skill-chip"
    >
      <span className="skill-chip-icon">
        <SkillIcon name={item.icon} />
      </span>
      <span className="skill-chip-name">{item.name}</span>
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <Reveal className="eyebrow">02 / Tech Stack</Reveal>

      <div className="sec-head">
        <Reveal as="h2" className="sec-title">
          Tools of the trade
        </Reveal>
        <Reveal as="div" className="sec-count mono" delay={0.1}>
          six clusters · core orbit
        </Reveal>
      </div>

      <div className="skill-clusters">
        {skillClusters.map((cluster, i) => (
          <Reveal
            key={cluster.title}
            className="cluster"
            delay={i * 0.06}
            y={20}
          >
            <div className="cluster-head">
              <span
                className="orbit-dot"
                style={{
                  background: cluster.color,
                  boxShadow: `0 0 10px ${cluster.color}`,
                }}
              />
              <h3>{cluster.title}</h3>
            </div>
            <ul className="skill-chip-list">
              {cluster.items.map((item) => (
                <SkillChip key={item.name} item={item} color={cluster.color} />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

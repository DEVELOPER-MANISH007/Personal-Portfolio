import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { experience } from "../data/content";

/**
 * Experience — NOT rendered anywhere in the app.
 *
 * This portfolio currently represents a fresher with no professional
 * work experience, so no Experience section is shown in the UI —
 * inventing placeholder job entries would misrepresent the person.
 *
 * This component is kept ready for the future: once real roles
 * exist, add them to the `experience` array in `data/content.js`
 * (same shape as each entry below) and import + render
 * `<Experience />` in App.jsx. Until then it deliberately renders
 * nothing (returns null) even if it were accidentally imported,
 * so it can never show empty/fake cards.
 */
function ExperienceCard({ role, org, period, points }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-60, 60], [6, -6]);
  const rotateY = useTransform(springX, [-180, 180], [-6, 6]);

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
    <motion.div
      className="journey-card"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, "--accent": "#a78bfa" }}
      whileHover={{ scale: 1.02 }}
    >
      <span className="journey-card-glow" />
      <span className="when mono">{period}</span>
      <h4>{role}</h4>
      <p>{org}</p>
      {points?.length > 0 && (
        <ul className="journey-card-points">
          {points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

export default function Experience() {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience">
      <Reveal className="eyebrow">Experience</Reveal>
      <div className="sec-head">
        <Reveal as="h2" className="sec-title">
          Where I've worked
        </Reveal>
      </div>
      <div className="journey-cert-stack">
        {experience.map((exp, i) => (
          <Reveal key={`${exp.role}-${i}`} delay={i * 0.08}>
            <ExperienceCard {...exp} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

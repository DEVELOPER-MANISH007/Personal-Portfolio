import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { education, certifications } from "../data/content";

/**
 * JourneyCard — a bigger info card that tilts toward the cursor,
 * used for both the education entry and each certification.
 */
function JourneyCard({ eyebrow, title, subtitle, color }) {
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
      style={{ rotateX, rotateY, "--accent": color }}
      whileHover={{ scale: 1.02 }}
    >
      <span className="journey-card-glow" />
      <span className="when mono">{eyebrow}</span>
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </motion.div>
  );
}

export default function Journey() {
  return (
    <section id="journey">
      <Reveal className="eyebrow">04 / Journey</Reveal>

      <div className="sec-head">
        <Reveal as="h2" className="sec-title">
          Education & certifications
        </Reveal>
      </div>

      <div className="journey-grid">
        <div>
          <Reveal>
            <JourneyCard
              eyebrow={education.years}
              title={education.degree}
              subtitle={`${education.school} · ${education.cgpa}`}
              color="#7dd8ff"
            />
          </Reveal>
        </div>

        <div className="journey-cert-stack">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <JourneyCard
                eyebrow="Certification"
                title={c.name}
                subtitle={c.org}
                color={["#a78bfa", "#ff8b6b", "#9be8c4"][i % 3]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

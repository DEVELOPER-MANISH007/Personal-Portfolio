import Reveal from "./Reveal";
import { certifications } from "../data/content";

const colors = ["#7dd8ff", "#a78bfa", "#ff8b6b", "#9be8c4"];

/**
 * Certificates — NOT rendered anywhere in the app.
 *
 * Certifications already appear as cards inside the original
 * Education & Certifications section (Journey.jsx), which was
 * restored to its exact original design. Rendering this section too
 * would just show the same real certifications twice, so it's kept
 * here — unused — only in case the layout is ever restructured to
 * split them out. Uses real data from `certifications` in
 * data/content.js; nothing here is invented.
 */
export default function Certificates() {
  return (
    <section id="certificates">
      <Reveal className="eyebrow">05 / Certificates</Reveal>

      <div className="sec-head">
        <Reveal as="h2" className="sec-title">
          Proof of the reps
        </Reveal>
        <Reveal as="div" className="sec-count mono" delay={0.1}>
          {certifications.length} completed
        </Reveal>
      </div>

      <div className="cert-timeline">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.08} y={20}>
            <div className="cert-item" style={{ "--accent": colors[i % colors.length] }}>
              <span className="cert-dot" />
              <div className="cert-card">
                <span className="cert-org mono">{c.org}</span>
                <h4>{c.name}</h4>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

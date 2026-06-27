import Reveal from "./Reveal";
import { projects } from "../data/content";

export default function Projects() {
  return (
    <section id="projects">
      <Reveal className="eyebrow">03 / Projects</Reveal>

      <div className="sec-head">
        <Reveal as="h2" className="sec-title">
          Four problems, solved end to end
        </Reveal>
        <Reveal as="div" className="sec-count mono" delay={0.1}>
          2026 · all deployed
        </Reveal>
      </div>

      <div className="project-list">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08} y={24}>
            <div className="project-row">
              <div className="proj-orbit">
                <div
                  className="planet"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, ${p.color}, transparent 70%)`,
                    border: `1px solid ${p.color}55`,
                  }}
                />
              </div>

              <div className="proj-main">
                <h3>{p.title}</h3>
                <span className="proj-tag">{p.tag}</span>
                <p>{p.description}</p>
              </div>

              <div className="proj-stack">
                {p.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>

              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="proj-link"
              >
                View Code →
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

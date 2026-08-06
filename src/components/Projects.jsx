import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Reveal from "./Reveal";
import ProjectModal from "./ProjectModal";
import { projects, projectCategories } from "../data/content";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects">
      <Reveal className="eyebrow">03 / Projects</Reveal>

      <div className="sec-head">
        <Reveal as="h2" className="sec-title">
          {projects.length} problems, solved end to end
        </Reveal>
        <Reveal as="div" className="sec-count mono" delay={0.1}>
          2026 · all shipped
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <div
          className="project-filters"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeFilter === cat}
              className={`filter-chip${activeFilter === cat ? " active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
              {activeFilter === cat && (
                <motion.span
                  layoutId="filter-underline"
                  className="filter-chip-underline"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>

      <LayoutGroup>
        <motion.div className="project-list" layout>
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((p) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div
                  className="project-row"
                  role="button"
                  tabIndex={0}
                  data-cursor="View"
                  onClick={() => setActiveProject(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveProject(p);
                    }
                  }}
                  aria-label={`Open details for ${p.title}`}
                >
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
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${p.title} source code on GitHub`}
                  >
                    View Code →
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {visibleProjects.length === 0 && (
            <motion.p
              className="project-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Nothing filed under "{activeFilter}" yet — check back soon.
            </motion.p>
          )}
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

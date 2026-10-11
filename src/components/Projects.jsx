import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Reveal from "./Reveal";
import ProjectModal from "./ProjectModal";
import ProjectVisual from "./ProjectVisual";
import { projects, projectCategories } from "../data/content";
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All"), [activeProject, setActiveProject] = useState(null);
  const visibleProjects = useMemo(() => activeFilter === "All" ? projects : projects.filter((p) => p.categories.includes(activeFilter)), [activeFilter]);
  return <section id="projects"><Reveal className="eyebrow">03 / Selected work</Reveal>
    <div className="sec-head"><div><Reveal as="h2" className="sec-title">Projects built around real questions.</Reveal><Reveal as="p" className="section-subtitle">A mix of predictive models, exploratory analysis, and tools for working with data.</Reveal></div><Reveal as="div" className="sec-count mono">{projects.length} projects</Reveal></div>
    <Reveal delay={.05}><div className="project-filters" role="group" aria-label="Filter projects by category">{projectCategories.map((cat) => <button key={cat} type="button" aria-pressed={activeFilter === cat} className={`filter-chip${activeFilter === cat ? " active" : ""}`} onClick={() => setActiveFilter(cat)}>{cat}</button>)}</div></Reveal>
    <LayoutGroup><motion.div className="project-grid" layout><AnimatePresence mode="popLayout">{visibleProjects.map((p, i) => <motion.article key={p.title} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .3, delay: i * .035 }} className="project-card">
      <ProjectVisual type={p.visual} title={p.title} color={p.color} />
      <div className="project-card-body"><span className="proj-tag">{p.tag}</span><h3>{p.title}</h3><p>{p.description}</p><div className="proj-stack">{p.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
        <div className="project-card-links"><a href={p.link} target="_blank" rel="noreferrer" className="proj-link" aria-label={`View ${p.title} source code on GitHub`}>GitHub <span aria-hidden="true">↗</span></a>{p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className="proj-link">{p.demoLabel || "Project link"} <span aria-hidden="true">↗</span></a>}<button type="button" className="project-details-button" onClick={() => setActiveProject(p)} aria-label={`Open details for ${p.title}`}>Details <span aria-hidden="true">↗</span></button></div></div>
    </motion.article>)}</AnimatePresence>{visibleProjects.length === 0 && <p className="project-empty">Nothing filed under “{activeFilter}” yet — check back soon.</p>}</motion.div></LayoutGroup>
    <AnimatePresence>{activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}</AnimatePresence>
  </section>;
}

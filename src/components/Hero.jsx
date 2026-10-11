import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { profile, stats } from "../data/content";
import { resumeFilename, resumeUrl } from "../data/resume";
const roles = ["Data Scientist", "Machine Learning Engineer", "AI/ML Developer"];
const NeuralNetworkExplorer = lazy(() => import("./NeuralNetworkExplorer"));
function RoleRotator() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => { if (reduceMotion) return undefined; const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 3000); return () => clearInterval(id); }, [reduceMotion]);
  return <span className="role-rotator"><AnimatePresence mode="wait"><motion.span key={roles[index]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }} className="role-rotator-text">{roles[index]}</motion.span></AnimatePresence></span>;
}
export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-composition">
        <motion.div className="hero-inner" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="hero-kicker mono"><span className="status-pulse" /> DATA SCIENCE <i>·</i> MACHINE LEARNING <i>·</i> AI</div>
          <p className="hero-role mono">Currently exploring as a <RoleRotator /></p>
          <h1 className="hero-title"><span>Turning Data</span><br /><span className="accent">Into Intelligence.</span></h1>
          <p className="hero-sub">I&apos;m <b>{profile.name}</b>, a Computer Science graduate focused on Data Science and Machine Learning. I build data-driven solutions through Python, exploratory data analysis, statistical thinking, and end-to-end machine learning pipelines — from raw datasets to useful predictions.</p>
          <div className="hero-actions">
            <div className="hero-primary-actions">
              <a href="#projects" className="btn btn-solid">Explore My Projects <span aria-hidden="true">↘</span></a>
              <a href={resumeUrl} download={resumeFilename} className="btn btn-ghost resume-hero-btn" aria-label="Download Manish Kumar resume as PDF"><FaDownload aria-hidden="true" />Download Resume</a>
            </div>
            <a href="#education" className="hero-education-link mono">Education &amp; Certificates <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-stats">{stats.map((stat) => <div className="hero-stat" key={stat.label}><span className="hero-stat-num mono">{stat.value}</span><span className="hero-stat-lbl">{stat.label}</span></div>)}</div>
        </motion.div>
        <Suspense fallback={<div className="neural-explorer-loading mono" role="status">Loading interactive network…</div>}>
          <NeuralNetworkExplorer />
        </Suspense>
      </div>
      <div className="scroll-cue mono"><span>Scroll to explore</span><div className="line" /></div>
    </section>
  );
}

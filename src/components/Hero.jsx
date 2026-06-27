import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, stats } from "../data/content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const roles = [
  "Aspiring Data Scientist",
  "Machine Learning Engineer",
  "Pipeline Builder",
  "Insight Hunter",
];

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="role-rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="role-rotator-text"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Title letters animate in with a slight stagger + 3D tilt-up,
   giving the headline real presence on load. */
function AnimatedTitle({ text, className }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: 40, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3 + (wi * 6 + ci) * 0.025,
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero">
      <motion.div
        className="hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="hero-kicker mono" variants={item}>
          <span className="status-pulse" />
          // currently:&nbsp;<RoleRotator />
          <span className="blink">_</span>
        </motion.div>

        <h1 className="hero-title">
          <AnimatedTitle text={profile.name} />
          <br />
          <AnimatedTitle text="finds signal in noise." className="accent" />
        </h1>

        <motion.p className="hero-sub" variants={item}>
          B.Tech Computer Science graduate building{" "}
          <b>end-to-end machine learning pipelines</b> — from messy raw data
          to deployed, interactive predictions. Comfortable across Python,
          statistics, and the full Streamlit-to-production loop.
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <a href="#projects" className="btn btn-solid">
            View Projects ↓
          </a>
          <a href={`mailto:${profile.email}`} className="btn btn-ghost">
            Say Hello
          </a>
        </motion.div>

        <motion.div className="hero-stats" variants={item}>
          {stats.map((s) => (
            <div className="hero-stat" key={s.label}>
              <span className="hero-stat-num mono">{s.value}</span>
              <span className="hero-stat-lbl">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="scroll-cue mono">
        <span>Scroll</span>
        <div className="line" />
      </div>
    </section>
  );
}

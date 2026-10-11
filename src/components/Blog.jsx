import Reveal from "./Reveal";
import { blog } from "../data/content";

const topics = [
  {
    code: "PY",
    title: "Python",
    idea: "Building and deploying ML applications with Streamlit",
    accent: "#7dd8ff",
  },
  {
    code: "PD",
    title: "Pandas",
    idea: "Exploratory Data Analysis with Pandas",
    accent: "#a78bfa",
  },
  {
    code: "EDA",
    title: "Exploratory Data Analysis",
    idea: "Visualizing data with Matplotlib and Seaborn",
    accent: "#ff9c79",
  },
  {
    code: "ML",
    title: "Machine Learning",
    idea: "Comparing Machine Learning Models",
    accent: "#8be1c0",
  },
  {
    code: "FE",
    title: "Feature Engineering",
    idea: "Understanding Feature Engineering",
    accent: "#d2a7ff",
  },
  {
    code: "EV",
    title: "Model Evaluation",
    idea: "A practical look at model evaluation workflows",
    accent: "#f0ca79",
  },
];

function WorkflowIllustration() {
  return (
    <div
      className="insight-visual"
      role="img"
      aria-label="Conceptual machine learning workflow: raw data, exploration, feature engineering, modeling, and evaluation."
    >
      <div className="insight-visual-topline mono">
        <span>WORKFLOW MAP</span>
        <span>CONCEPT ONLY</span>
      </div>
      <svg viewBox="0 0 560 280" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="workflow-line" x1="0" x2="1">
            <stop offset="0" stopColor="#7dd8ff" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
          <radialGradient id="workflow-glow">
            <stop stopColor="#7dd8ff" stopOpacity=".18" />
            <stop offset="1" stopColor="#7dd8ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="295" cy="140" r="132" fill="url(#workflow-glow)" />
        <path d="M64 145H489" fill="none" stroke="url(#workflow-line)" strokeWidth="2" strokeDasharray="5 8" opacity=".7" />
        <path d="M113 145C145 145 144 76 190 76S231 145 276 145 322 213 366 213s54-68 83-68" fill="none" stroke="#a78bfa" strokeWidth="1.5" opacity=".48" />
        <path d="M113 145C145 145 144 213 190 213s41-68 86-68 46-69 90-69 54 69 83 69" fill="none" stroke="#7dd8ff" strokeWidth="1.5" opacity=".4" />
        {[
          { x: 64, label: "RAW", color: "#7dd8ff" },
          { x: 166, label: "EXPLORE", color: "#a78bfa" },
          { x: 276, label: "FEATURES", color: "#ff9c79" },
          { x: 388, label: "MODEL", color: "#8be1c0" },
          { x: 489, label: "EVALUATE", color: "#d2a7ff" },
        ].map((node) => (
          <g key={node.label}>
            <circle cx={node.x} cy="145" r="25" fill="#0b1020" stroke={node.color} strokeOpacity=".72" />
            <circle cx={node.x} cy="145" r="5" fill={node.color} />
            <text x={node.x} y="194" textAnchor="middle">{node.label}</text>
          </g>
        ))}
        <text className="workflow-caption" x="280" y="255" textAnchor="middle">RAW DATA → USEFUL PREDICTIONS</text>
      </svg>
      <div className="insight-visual-foot mono">A PRACTICAL, END-TO-END VIEW</div>
    </div>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="insights-section" aria-labelledby="insights-title">
      <Reveal className="eyebrow">05 / Field Notes</Reveal>

      <div className="sec-head insights-heading">
        <div>
          <Reveal as="h2" id="insights-title" className="sec-title">
            Insights & Experiments
          </Reveal>
          <Reveal as="p" className="section-subtitle">
            Practical notes on data, models, and the steps between them.
          </Reveal>
        </div>
        <Reveal className="insights-status mono">WRITING IN PROGRESS</Reveal>
      </div>

      <Reveal className="insight-featured-wrap" y={16}>
        <article className="insight-featured">
          <div className="insight-featured-copy">
            <div className="insight-featured-meta mono">
              <span>FEATURED TOPIC</span>
              <span className="insight-coming">{blog.status}</span>
            </div>
            <h3>From Raw Data to Machine Learning: An End-to-End Workflow</h3>
            <p>
              A planned walkthrough of the practical stages that turn a raw dataset into a useful model — from exploration and feature work to evaluation and deployment.
            </p>
            <span className="insight-editorial-note mono">TOPIC IDEA · ARTICLE NOT YET PUBLISHED</span>
          </div>
          <WorkflowIllustration />
        </article>
      </Reveal>

      <div className="insight-topics-heading">
        <h3>On the roadmap</h3>
        <p>{blog.blurb}</p>
      </div>

      <div className="insight-topic-grid">
        {topics.map((topic, index) => (
          <Reveal key={topic.code} delay={index * 0.035} y={12}>
            <article className="insight-topic-card" style={{ "--topic-accent": topic.accent }}>
              <div className="insight-topic-topline">
                <span className="insight-topic-code mono">{topic.code}</span>
                <span className="insight-topic-state mono">UPCOMING</span>
              </div>
              <h4>{topic.title}</h4>
              <p>{topic.idea}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

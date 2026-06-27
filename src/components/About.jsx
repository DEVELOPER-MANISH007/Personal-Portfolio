import { useRef } from "react";
import Reveal from "./Reveal";
import { profile, stats } from "../data/content";

export default function About() {
  const textRef = useRef(null);

  // Subtle radial spotlight that follows the cursor inside the
  // about-text block, in addition to the custom cursor label.
  function handleMouseMove(e) {
    const el = textRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--spot-x", `${x}%`);
    el.style.setProperty("--spot-y", `${y}%`);
  }

  return (
    <section id="about">
      <Reveal className="eyebrow">01 / About</Reveal>

      <div className="about-grid">
        <div
          className="about-text"
          ref={textRef}
          onMouseMove={handleMouseMove}
          data-cursor="Read ↓"
        >
          <Reveal as="p" delay={0.05}>
            I'm a <strong>Computer Science graduate (AIMT, Greater Noida)</strong>{" "}
            who got pulled into data science the moment statistics stopped
            being theory and started being a tool to actually explain things.
            What I enjoy most is the full arc of a problem: pulling apart
            messy real-world data, engineering features that matter, and
            shipping a model people can actually click on.
          </Reveal>
          <Reveal as="p" delay={0.1}>
            My foundation in full-stack engineering (MERN) means I don't just
            build models in notebooks — I think about how they get deployed,
            wrapped in an interface, and used. That's the gap most "data
            scientists" leave open, and it's the one I try to close every
            time.
          </Reveal>
          <Reveal as="p" delay={0.15}>
            Currently sharpening my edge in regression, classification, and
            feature engineering — while looking for opportunities to apply it
            on real, messy, production-grade data.
          </Reveal>

          <Reveal className="stat-strip" delay={0.2}>
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="num mono">{s.value}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} y={20}>
          <div className="console mono" data-cursor="Code">
            <Line no="01">
              <span className="key">class</span> DataScientist:
            </Line>
            <Line no="02">&nbsp;&nbsp;<span className="key">def</span> __init__(self):</Line>
            <Line no="03">
              &nbsp;&nbsp;&nbsp;&nbsp;self.name = <span className="str">"{profile.name}"</span>
            </Line>
            <Line no="04">
              &nbsp;&nbsp;&nbsp;&nbsp;self.role = <span className="str">"{profile.role}"</span>
            </Line>
            <Line no="05">
              &nbsp;&nbsp;&nbsp;&nbsp;self.stack = [<span className="str">"Python"</span>,{" "}
              <span className="str">"SQL"</span>, <span className="str">"sklearn"</span>]
            </Line>
            <Line no="06">&nbsp;&nbsp;&nbsp;&nbsp;self.grad_year = <span className="val">2024</span></Line>
            <Line no="07">
              &nbsp;&nbsp;&nbsp;&nbsp;self.looking_for = <span className="str">"signal"</span>
            </Line>
            <Line no="08">&nbsp;</Line>
            <Line no="09">&nbsp;&nbsp;<span className="key">def</span> ship(self, data):</Line>
            <Line no="10">
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="key">return</span> clean(data).model().deploy()
            </Line>
            <Line no="11"><span className="com"># &gt;&gt;&gt; ready_for_production = True</span></Line>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Line({ no, children }) {
  return (
    <div className="ln">
      <span className="no">{no}</span>
      <span>{children}</span>
    </div>
  );
}

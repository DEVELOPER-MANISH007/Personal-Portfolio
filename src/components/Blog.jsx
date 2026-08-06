import Reveal from "./Reveal";
import { blog } from "../data/content";

/**
 * Blog — "Coming Soon" placeholder built on the same structure a
 * real post grid will use later (section > sec-head > content),
 * so wiring up real posts is a drop-in swap, not a rebuild.
 */
export default function Blog() {
  return (
    <section id="blog">
      <Reveal className="eyebrow">05 / Blog</Reveal>

      <div className="sec-head">
        <Reveal as="h2" className="sec-title">
          Writing, soon
        </Reveal>
      </div>

      <Reveal delay={0.08} y={20}>
        <div className="blog-coming-soon">
          <span className="blog-badge mono">{blog.status}</span>
          <p>{blog.blurb}</p>
        </div>
      </Reveal>
    </section>
  );
}

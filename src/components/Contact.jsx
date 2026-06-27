import Reveal from "./Reveal";
import { profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact">
      <Reveal className="eyebrow">05 / Contact</Reveal>

      <Reveal as="h2" className="contact-title" delay={0.05}>
        Let's turn your data
        <br />
        into something useful.
      </Reveal>

      <Reveal as="p" className="sub" delay={0.1}>
        Open to data science & ML engineering roles. I reply fast — drop a
        line.
      </Reveal>

      <Reveal className="contact-links" delay={0.15}>
        <a className="contact-link" href={`mailto:${profile.email}`}>
          <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 6-10 7L2 6" />
          </svg>
          {profile.email}
        </a>
        <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">
          <svg className="ic" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 0z" />
          </svg>
          GitHub
        </a>
        <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
          <svg className="ic" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
          </svg>
          LinkedIn
        </a>
      </Reveal>
    </section>
  );
}

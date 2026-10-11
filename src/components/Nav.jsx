import { useState } from "react";
import { resumeFilename, resumeUrl } from "../data/resume";

const links = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Toolkit", href: "#skills" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Education & Certs", href: "#education" },
  { num: "05", label: "Insights", href: "#blog" },
  { num: "06", label: "Contact", href: "#contact" },
  { num: "", label: "Resume", href: resumeUrl, download: resumeFilename },
];
export default function Nav() {
  const [open, setOpen] = useState(false);
  return <nav className="nav" aria-label="Primary"><a className="nav-mark" href="#hero" aria-label="Manish Kumar, home"><span className="dot" /> MANISH.KUMAR</a><button type="button" className="nav-toggle" aria-expanded={open} aria-controls="primary-links" onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button><div id="primary-links" className={`nav-links${open ? " nav-links-open" : ""}`}>{links.map((l) => <a key={l.label} href={l.href} data-num={l.num || undefined} download={l.download || undefined} className={l.download ? "nav-resume" : undefined} aria-label={l.download ? "Download Manish Kumar resume as PDF" : undefined} onClick={() => setOpen(false)}>{l.label}</a>)}</div></nav>;
}

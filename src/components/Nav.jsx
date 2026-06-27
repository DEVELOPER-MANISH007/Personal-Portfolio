const links = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Stack", href: "#skills" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Journey", href: "#journey" },
  { num: "05", label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-mark">
        <span className="dot" /> MANISH.KUMAR
      </div>
      <div className="nav-links">
        {links.map((l) => (
          <a key={l.num} href={l.href} data-num={l.num}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

import { FaGraduationCap } from "react-icons/fa";
import Reveal from "./Reveal";
import { certifications, education } from "../data/content";

function CertificateGallery() {
  return (
    <div className="education-certificates" aria-labelledby="certificates-title">
      <div className="education-subhead">
        <div>
          <h3 id="certificates-title">Certificates</h3>
          <p>Original credentials and course completions.</p>
        </div>
        <span className="mono">{String(certifications.length).padStart(2, "0")} FILES</span>
      </div>

      <div className="education-certificate-list">
        {certifications.map((certificate, index) => (
          <Reveal key={certificate.name} delay={index * 0.035} y={12}>
            <article className="education-certificate-card">
              <div className="education-certificate-preview">
                <img
                  src={certificate.preview}
                  alt={`Original ${certificate.name} certificate from ${certificate.org}`}
                  loading="lazy"
                />
              </div>
              <div className="education-certificate-info">
                <span className="education-certificate-issuer mono">{certificate.org}</span>
                <h4>{certificate.name}</h4>
                <p>{certificate.date}</p>
                <div className="education-certificate-actions">
                  <a href={certificate.file} target="_blank" rel="noreferrer">
                    View Certificate <span aria-hidden="true">↗</span>
                  </a>
                  {certificate.verify && (
                    <a href={certificate.verify} target="_blank" rel="noreferrer">
                      Verify <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <section id="education" aria-labelledby="education-title">
      <Reveal className="eyebrow">04 / Education & Certifications</Reveal>

      <div className="sec-head education-heading">
        <div>
          <Reveal as="h2" id="education-title" className="sec-title">
            Education & Certifications
          </Reveal>
          <Reveal as="p" className="section-subtitle">
            Academic foundation and documented learning milestones.
          </Reveal>
        </div>
      </div>

      <div className="education-layout">
        <div className="education-primary">
          <Reveal>
            <article className="education-degree-card">
              <div className="education-card-topline">
                <span className="education-icon" aria-hidden="true">
                  <FaGraduationCap />
                </span>
                <span className="education-years mono">{education.years}</span>
              </div>
              <span className="education-kicker mono">BACHELOR OF TECHNOLOGY</span>
              <h3>{education.degree}</h3>
              <p className="education-school">{education.school}</p>
              <div className="education-cgpa">
                <span className="education-cgpa-value">7.5</span>
                <span className="education-cgpa-label mono">CGPA</span>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.06}>
            <aside className="education-focus-card">
              <span className="education-focus-mark" aria-hidden="true">01</span>
              <div>
                <span className="education-kicker mono">FOUNDATION</span>
                <p>Computer Science foundation with a focus on practical data science and machine learning.</p>
              </div>
            </aside>
          </Reveal>
        </div>

        <Reveal className="education-gallery-wrap" delay={0.04}>
          <CertificateGallery />
        </Reveal>
      </div>
    </section>
  );
}

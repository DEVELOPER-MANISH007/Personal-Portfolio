import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";
import Reveal from "./Reveal";
import ContactOrb from "./ContactOrb";
import { profile } from "../data/content";
import { resumeUrl } from "../data/resume";

/**
 * Contact — a real, production-ready "Say Hello" form.
 *
 * Root cause of the original issue: there was no contact form at
 * all — "Say Hello" was just a `mailto:` link, which silently fails
 * for any visitor without a configured desktop mail client (the
 * majority of mobile/browser users), with zero feedback that
 * anything went wrong. This replaces it with an in-page form that
 * sends via EmailJS (a client-side email API — no backend server
 * needed for a static Vite/React app), with full validation,
 * loading/success/error states, and a honeypot field for basic spam
 * prevention. The mailto/GitHub/LinkedIn links stay as a fallback.
 *
 * Setup: copy .env.example to .env, create a free EmailJS account,
 * and fill in VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID /
 * VITE_EMAILJS_PUBLIC_KEY. The form degrades gracefully (clear error
 * message, no crash) if those env vars are missing.
 */

const initialForm = { name: "", email: "", message: "", company: "" }; // `company` = honeypot

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "That email doesn't look right.";
  }
  if (!form.message.trim()) {
    errors.message = "Say something — even a quick hello.";
  } else if (form.message.trim().length < 10) {
    errors.message = "A little more detail helps (10+ characters).";
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Honeypot: real users never fill this hidden field in.
    if (form.company) return;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setErrorMessage(
        "Email isn't configured yet — reach me directly at the address below instead."
      );
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          message: form.message.trim(),
          to_email: profile.email,
        },
        { publicKey }
      );
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending that — please try the email link below."
      );
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="contact-shell">
        <Reveal className="eyebrow">06 / Contact</Reveal>
        <div className="contact-layout">
          <div className="contact-left-column">
            <div className="contact-intro">
              <Reveal as="h2" id="contact-title" className="contact-title" delay={0.05}>
                Have an idea?<br />Let&apos;s connect.
              </Reveal>
              <Reveal as="p" className="sub" delay={0.1}>
                Have a Data Science, Machine Learning, or AI project in mind? Let&apos;s exchange ideas and build something useful.
              </Reveal>
            </div>

            <Reveal className="contact-visual-block" delay={0.12}>
              <ContactOrb />
              <div className="contact-orb-caption">
                <span className="contact-opportunity"><i aria-hidden="true" />OPEN TO OPPORTUNITIES</span>
                <p>Every great solution starts with a connection.</p>
              </div>
            </Reveal>

            <Reveal className="contact-links" delay={0.16}>
              <a className="contact-link" href={`mailto:${profile.email}`}>
                <FaEnvelope className="contact-link-icon" aria-hidden="true" />
                <span className="contact-link-copy"><span className="contact-link-label mono">EMAIL</span><span>{profile.email}</span></span>
                <span className="contact-link-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile (opens in a new tab)">
                <FaGithub className="contact-link-icon" aria-hidden="true" />
                <span className="contact-link-copy"><span className="contact-link-label mono">GITHUB</span><span>DEVELOPER-MANISH007</span></span>
                <span className="contact-link-arrow" aria-hidden="true">↗</span>
              </a>
              <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
                <FaLinkedin className="contact-link-icon" aria-hidden="true" />
                <span className="contact-link-copy"><span className="contact-link-label mono">LINKEDIN</span><span>Mitansh Kumar</span></span>
                <span className="contact-link-arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
            <Reveal className="contact-resume-action" delay={0.18}>
              <a href={resumeUrl} target="_blank" rel="noreferrer" aria-label="View Manish Kumar resume PDF in a new tab">
                <FaFilePdf aria-hidden="true" />
                <span>View Resume <small>PDF · Opens in a new tab</small></span>
                <span className="contact-resume-arrow" aria-hidden="true">↗</span>
              </a>
            </Reveal>
          </div>

          <Reveal className="contact-form-wrap" delay={0.12} y={20}>
            <div className="contact-panel-header">
              <div>
                <span className="contact-panel-kicker mono">INITIATE CONNECTION</span>
                <p>Send a message</p>
              </div>
              <span className={`contact-panel-state mono${status === "sending" ? " is-sending" : ""}`}><i aria-hidden="true" />{status === "sending" ? "SENDING" : "READY"}</span>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" autoComplete="name" value={form.name} placeholder="Your name" onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                  {errors.name && <span className="field-error" id="name-error" role="alert">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" value={form.email} placeholder="you@example.com" onChange={handleChange} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                  {errors.email && <span className="field-error" id="email-error" role="alert">{errors.email}</span>}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={6} value={form.message} placeholder="Tell me a little about what you have in mind…" onChange={handleChange} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                {errors.message && <span className="field-error" id="message-error" role="alert">{errors.message}</span>}
              </div>

              <div className="form-footer">
                <motion.button type="submit" className="btn btn-solid" disabled={status === "sending"} whileTap={{ scale: 0.97 }}>
                  {status === "sending" ? "Sending…" : "Send Message"}
                  {status === "sending" && <span className="contact-submit-indicator" aria-hidden="true" />}
                </motion.button>
                <div className="form-status" role="status" aria-live="polite">
                  {status === "success" && <span className="status-ok">✓ Message sent — I’ll get back to you soon.</span>}
                  {status === "error" && <span className="status-err">{errorMessage}</span>}
                </div>
              </div>
            </form>
            <div className="contact-panel-foot mono"><span>DATA SCIENCE</span><span>·</span><span>MACHINE LEARNING</span><span>·</span><span>AI</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

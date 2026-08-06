import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { profile } from "../data/content";

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
    if (form.company) {
      setStatus("success");
      return;
    }

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
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        "Something went wrong sending that — please try the email link below."
      );
    }
  }

  return (
    <section id="contact">
      <Reveal className="eyebrow">06 / Contact</Reveal>

      <Reveal as="h2" className="contact-title" delay={0.05}>
        Let's turn your data
        <br />
        into something useful.
      </Reveal>

      <Reveal as="p" className="sub" delay={0.1}>
        Open to data science & ML engineering roles. I reply fast — drop a
        line below or reach out directly.
      </Reveal>

      <Reveal delay={0.12} y={20}>
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from real users, invisible to screen
              readers, but bots that auto-fill every field trip it. */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span className="field-error" id="name-error" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className="field-error" id="email-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <span className="field-error" id="message-error" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <div className="form-footer">
            <motion.button
              type="submit"
              className="btn btn-solid"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </motion.button>

            <div className="form-status" role="status" aria-live="polite">
              {status === "success" && (
                <span className="status-ok">
                  ✓ Sent — I'll get back to you soon.
                </span>
              )}
              {status === "error" && (
                <span className="status-err">{errorMessage}</span>
              )}
            </div>
          </div>
        </form>
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

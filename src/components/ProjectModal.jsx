import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

/**
 * ProjectModal — premium detail view for a single project.
 * Accessible by design: ESC to close, click-outside to close,
 * focus is trapped and moved to the dialog on open, and focus is
 * restored to the trigger element on close.
 */
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div
          className="modal-hero"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${project.color}55, transparent 65%), radial-gradient(circle at 80% 80%, ${project.color}33, transparent 60%)`,
            borderColor: `${project.color}40`,
          }}
        >
          <span className="modal-hero-tag mono">{project.tag}</span>
          <h3 id="modal-title" className="modal-hero-title">
            {project.title}
          </h3>
        </div>

        <div className="modal-body">
          <p className="modal-desc">{project.description}</p>

          {project.features?.length > 0 && (
            <div className="modal-section">
              <h4 className="modal-section-title mono">Features</h4>
              <ul className="modal-feature-list">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-section">
            <h4 className="modal-section-title mono">Technologies</h4>
            <div className="proj-stack">
              {project.stack.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-solid"
            >
              GitHub →
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

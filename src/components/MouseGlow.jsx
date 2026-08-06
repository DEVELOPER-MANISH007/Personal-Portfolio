import { useEffect, useRef } from "react";

/**
 * MouseGlow — a subtle radial light that follows the cursor across
 * the page content. Deliberately simple: a single fixed <div> whose
 * position is updated by writing CSS custom properties directly on
 * mousemove (no setState, no re-render), then interpolated toward
 * the cursor inside a requestAnimationFrame loop for a soft, lagged
 * feel. Fully independent of the Three.js canvas/scene — this is
 * plain DOM + CSS, so it can never cost the WebGL scene a frame.
 * Disabled automatically on touch devices and when the user prefers
 * reduced motion.
 */
export default function MouseGlow() {
  const glowRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const active = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isTouch) return;

    function handleMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!active.current) {
        active.current = true;
        el.style.opacity = "1";
      }
    }
    function handleLeave() {
      active.current = false;
      if (el) el.style.opacity = "0";
    }

    const el = glowRef.current;
    current.current.x = window.innerWidth / 2;
    current.current.y = window.innerHeight / 2;

    function tick() {
      // ease toward the real cursor position — gives the glow a
      // soft, weighted lag instead of jittering 1:1 with the mouse
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (el) {
        el.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div className="mouse-glow" ref={glowRef} aria-hidden="true" />;
}

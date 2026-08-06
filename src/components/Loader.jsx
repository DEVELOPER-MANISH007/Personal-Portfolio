import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Loader — a short, branded loading screen shown while the Three.js
 * scene + fonts settle in. Purely presentational (no real asset
 * tracking is needed since the scene has no textures/models to
 * stream), but it smooths out the moment the WebGL canvas takes to
 * compile its first frame and keeps first paint from feeling like a
 * flash of unstyled content.
 */
export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const DURATION = 900;

    function tick(now) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 200);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div className="loader-mark mono">
            <span className="status-pulse" />
            MANISH.KUMAR
          </div>
          <div className="loader-bar">
            <motion.div
              className="loader-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="loader-pct mono">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CustomCursor — a small floating label that follows the mouse,
 * shown only while hovering an element with [data-cursor]. The
 * element's data-cursor value becomes the label text.
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState(null);

  useEffect(() => {
    function handleMove(e) {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target.closest("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <AnimatePresence>
      {label && (
        <motion.div
          className="custom-cursor"
          style={{ left: pos.x, top: pos.y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {label}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

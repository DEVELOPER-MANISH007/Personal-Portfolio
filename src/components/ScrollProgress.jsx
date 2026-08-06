import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a thin, elegant progress bar fixed to the very
 * top of the viewport. Uses Framer Motion's scroll hooks (already a
 * project dependency) so it costs nothing extra and never touches
 * React state / re-renders on scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.2,
  });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

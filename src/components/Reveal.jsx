import { motion } from "framer-motion";

/**
 * Reveal — fades + slides content up into view as the user scrolls
 * to it. Wraps children so every section gets consistent, real
 * scroll-triggered animation (not just animate-on-mount).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  as = "div",
  id,
}) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      id={id}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </Tag>
  );
}

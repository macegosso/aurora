"use client";

import { motion } from "motion/react";

/**
 * Page-transition wrapper. Re-mounts per route segment, so each navigation
 * gets a cinematic fade/rise instead of a hard cut.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

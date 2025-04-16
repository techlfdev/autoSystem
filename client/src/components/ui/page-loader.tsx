
import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ 
          duration: 0.3,
          ease: [0.33, 1, 0.68, 1],
          delay: 0.1 
        }}
        className="relative h-8 w-8"
      >
        <div className="absolute inset-0 rounded-full border-[2px] border-black/[0.12] dark:border-white/[0.12]" />
        <div className="absolute inset-0 rounded-full border-[2px] border-primary border-t-transparent animate-[spin_1200ms_linear_infinite]" />
      </motion.div>
    </motion.div>
  );
}

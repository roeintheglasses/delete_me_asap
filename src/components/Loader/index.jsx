import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Loader = ({ className }) => {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1,
  };

  const pulseTransition = {
    repeat: Infinity,
    duration: 1,
    ease: "easeInOut",
  };

  return (
    <div className={cn("font-mono text-2xl", className)}>
      <div className="flex items-center gap-1">
        <span>[</span>
        <motion.span animate={{ rotate: 360 }} transition={spinTransition}>
          |
        </motion.span>
        <span>]</span>
        <motion.span
          className="ml-2"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={pulseTransition}
        >
          Loading...
        </motion.span>
      </div>
    </div>
  );
};

export default Loader;

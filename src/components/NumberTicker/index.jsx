import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

export function NumberTicker({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear any pending timeouts to prevent animation conflicts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Add a small delay before updating to allow previous animations to complete
    timeoutRef.current = setTimeout(() => {
      setDisplayValue(value);
    }, 50);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const digits = String(displayValue).padStart(7, "0").split("");

  return (
    <div className="flex gap-2 font-mono text-4xl p-4">
      {digits.map((digit, index) => (
        <div
          key={index}
          className="relative w-[1.2ch] h-[1.8em] overflow-hidden bg-zinc-900 border-2 border-zinc-800 rounded-md shadow-inner px-6"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                type: "tween",
              }}
              className="absolute inset-0 flex items-center justify-center font-bold"
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

NumberTicker.propTypes = {
  /** The numeric value to display in the ticker. Will be padded to 7 digits with leading zeros */
  value: PropTypes.number.isRequired,
};

NumberTicker.displayName = "NumberTicker";

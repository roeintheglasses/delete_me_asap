import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function NumberTicker({ value }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const digits = String(displayValue).padStart(7, "0").split("");

  return (
    <div className="flex font-mono text-xl">
      {digits.map((digit, index) => (
        <div key={index} className="relative w-[1ch] h-[1.5em] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0.0, 0.2, 1],
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
              className="absolute inset-0 flex items-center justify-center"
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

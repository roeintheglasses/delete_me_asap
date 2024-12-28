import * as React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export function Progress({
  value,
  className,
  showValue = false,
  valueSuffix = "%",
  barColor = "bg-primary",
  backgroundColor = "bg-secondary",
  ...props
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      {showValue && (
        <div className="text-sm text-muted-foreground">
          {Math.round(value)}
          {valueSuffix}
        </div>
      )}
      <div
        className={`h-1 w-full ${backgroundColor} overflow-hidden ${className}`}
        {...props}
      >
        <motion.div
          className={`h-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 0.01,
            ease: "linear",
          }}
        />
      </div>
    </div>
  );
}

Progress.propTypes = {
  /** The current progress value (0-100) */
  value: PropTypes.number,
  /** Additional CSS classes to apply to the progress bar */
  className: PropTypes.string,
  /** Whether to show the numeric value */
  showValue: PropTypes.bool,
  /** Suffix to display after the value */
  valueSuffix: PropTypes.string,
  /** Custom color class for the progress bar */
  barColor: PropTypes.string,
  /** Custom color class for the background */
  backgroundColor: PropTypes.string,
};

Progress.displayName = "Progress";

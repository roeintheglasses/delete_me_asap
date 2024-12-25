import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

//@ts-ignore
export const BackgroundBeams = React.memo(({ className }) => {
  // Generate paths once and memoize
  const paths = useMemo(() => {
    const pathsArray = [];
    for (let i = 0; i < 50; i++) {
      const offset = i * 8;
      pathsArray.push(
        `M${-380 + i * 7} ${-189 - offset}C${-380 + i * 7} ${-189 - offset} ${
          -312 + i * 7
        } ${216 - offset} ${152 + i * 7} ${343 - offset}C${616 + i * 7} ${
          470 - offset
        } ${684 + i * 7} ${875 - offset} ${684 + i * 7} ${875 - offset}`
      );
    }
    return pathsArray;
  }, []);

  // Memoize gradient configs
  const gradientConfigs = useMemo(
    () =>
      paths.map((_, index) => ({
        id: `linearGradient-${index}`,
        initial: {
          x1: "0%",
          x2: "0%",
          y1: "0%",
          y2: "0%",
        },
        animate: {
          x1: ["0%", "100%"],
          x2: ["0%", "95%"],
          y1: ["0%", "100%"],
          y2: ["0%", `${93 + (index % 8)}%`],
        },
        transition: {
          duration: 10 + (index % 10),
          ease: "easeInOut",
          repeat: Infinity,
          delay: index % 10,
        },
      })),
    []
  );

  return (
    <div
      className={cn(
        "absolute h-full w-full bg-zinc-900 inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
        className
      )}
    >
      <svg
        className="z-0 h-full w-full pointer-events-none absolute"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <motion.path
            key={`path-${index}`}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}
        <defs>
          {gradientConfigs.map(({ id, initial, animate, transition }) => (
            <motion.linearGradient
              key={id}
              id={id}
              initial={initial}
              animate={animate}
              transition={transition}
            >
              <stop stopColor="#444444" stopOpacity="0" />
              <stop stopColor="#444444" />
              <stop offset="32.5%" stopColor="#555555" />
              <stop offset="100%" stopColor="#666666" stopOpacity="0" />
            </motion.linearGradient>
          ))}

          <radialGradient
            id="paint0_radial_242_278"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop offset="0.0666667" stopColor="var(--neutral-300)" />
            <stop offset="0.243243" stopColor="var(--neutral-300)" />
            <stop offset="0.43594" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.propTypes = {
  /** Additional CSS classes to apply to the background beams container */
  className: PropTypes.string,
};

BackgroundBeams.displayName = "BackgroundBeams";

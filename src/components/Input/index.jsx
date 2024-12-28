import * as React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import PropTypes from "prop-types";

export function Input({ className, ...props }) {
  return <ShadcnInput className={className} {...props} />;
}

Input.propTypes = {
  /** Additional CSS classes to apply to the input */
  className: PropTypes.string,
};

Input.displayName = "Input";

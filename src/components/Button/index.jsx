import * as React from "react";
import { Button as ShadcnButton } from "../ui/button";
import PropTypes from "prop-types";

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
};

const colorMap = {
  primary: "default",
  secondary: "secondary",
  danger: "destructive",
  ghost: "ghost",
  outline: "outline",
  link: "link",
};

export function Button({
  children,
  size = "md",
  color = "danger",
  className,
  ...props
}) {
  return (
    <ShadcnButton
      size={sizeMap[size]}
      variant={colorMap[color]}
      className={className}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
}

Button.propTypes = {
  /** Additional CSS classes to apply to the button */
  className: PropTypes.string,
};

Button.displayName = "Button";

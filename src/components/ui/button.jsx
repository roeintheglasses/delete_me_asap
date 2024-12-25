import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef((props, ref) => {
  const { className, variant, size, asChild = false, ...otherProps } = props;
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...otherProps}
    />
  );
});

Button.propTypes = {
  /** Additional CSS classes to apply to the button */
  className: PropTypes.string,
  /** The visual style variant of the button */
  variant: PropTypes.oneOf([
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ]),
  /** The size variant of the button */
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
  /** When true, renders the button as a Radix UI Slot */
  asChild: PropTypes.bool,
  /** The button's children/content */
  children: PropTypes.node,
  /** onClick handler for the button */
  onClick: PropTypes.func,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Type of the button */
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.displayName = "Button";

export { Button, buttonVariants };

import { GithubIcon } from "lucide-react";
import PropTypes from "prop-types";

export function Navbar() {
  return (
    <nav className="w-full backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold">Click to Delete</div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <GithubIcon className="h-6 w-6" />
        </a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  /** Additional CSS classes to apply to the navbar */
  className: PropTypes.string,
};

Navbar.displayName = "Navbar";

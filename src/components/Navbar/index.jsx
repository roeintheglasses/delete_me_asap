import { GithubIcon } from "lucide-react";
import PropTypes from "prop-types";

import { Button } from "@/components/Button";

export function Navbar({ onLogout }) {
  return (
    <nav className="w-full backdrop-blur">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold">Click to Delete</div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div>Github</div>
                <GithubIcon className="h-6 w-6" />
              </div>
            </div>
          </a>
          <Button onClick={onLogout} variant="ghost">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  /** Additional CSS classes to apply to the navbar */
  className: PropTypes.string,
  onLogout: PropTypes.func,
};

Navbar.displayName = "Navbar";

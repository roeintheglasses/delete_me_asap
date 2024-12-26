import { useState, useEffect, Suspense } from "react";
import { GithubIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import Loader from "./components/Loader";
import LoginDialog from "./components/Login-Dialog";
import {
  signup,
  loginUser,
  loginAnonymously,
  logout,
  getUser,
} from "./lib/auth";
import { localStorage } from "./lib/storage";

function App() {
  const [count, setCount] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    getAndSetUserData();
    return () => {
      setLoggedInUser(null);
    };
  }, []);

  const getAndSetUserData = async () => {
    setIsPageLoading(true);
    const user = await getUser();
    if (user) {
      setLoggedInUser(user);
    }
    setIsPageLoading(false);
  };

  const handleLogout = async () => {
    setIsPageLoading(true);
    await logout();
    setLoggedInUser(null);
    setIsPageLoading(false);
  };

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= 1000000) {
      setDeleted(true);
    }
  };

  if (isPageLoading) {
    return <Loader />;
  }

  if (deleted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-destructive animate-in fade-in duration-500">
        <h1 className="text-4xl font-bold text-destructive-foreground">
          Site has been deleted
        </h1>
      </div>
    );
  }

  if (!loggedInUser) {
    return <LoginDialog setLoggedInUser={setLoggedInUser} />;
  }

  if (loggedInUser) {
    return (
      <div className="min-h-screen w-screen flex flex-col">
        <nav className="w-full border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="text-2xl font-bold animate-in slide-in-from-left duration-500">
              Click to Delete
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity animate-in slide-in-from-right duration-500"
            >
              <GithubIcon className="h-6 w-6" />
            </a>
            <p>
              {loggedInUser
                ? `Logged in as ${loggedInUser.name || "Anonymous"}`
                : "Not logged in"}
            </p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom duration-700">
          <h1 className="text-4xl font-bold">Click to Delete</h1>
          <p className="text-xl">Clicks until deletion: {1000000 - count}</p>
          <Button
            onClick={handleClick}
            variant="destructive"
            size="lg"
            className="text-lg hover:animate-pulse"
          >
            Click me
          </Button>
        </div>
      </div>
    );
  }
}

export default App;

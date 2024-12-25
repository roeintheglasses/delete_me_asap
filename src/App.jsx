import { useState, useEffect, Suspense } from "react";
import { GithubIcon } from "lucide-react";

import Loader from "./components/Loader";
import LoginDialog from "./components/Login-Dialog";
import { Button } from "./components/Button";
import { Navbar } from "./components/Navbar";
import { BackgroundUIContainer } from "./components/BackgroundUIContainer";
import { NumberTicker } from "./components/NumberTicker";

import { localStorage } from "./lib/storage";

import {
  signup,
  loginUser,
  loginAnonymously,
  logout,
  getUser,
} from "./lib/auth";

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
      <div className="dark h-screen w-screen flex items-center justify-center bg-destructive animate-in fade-in duration-500 dark">
        <h1 className="text-4xl font-bold text-destructive-foreground">
          Site has been deleted
        </h1>
      </div>
    );
  }

  if (!loggedInUser) {
    return <LoginDialog setLoggedInUser={setLoggedInUser} />;
  }

  return (
    <BackgroundUIContainer>
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Click to Delete</h1>
        <div className="text-xl flex flex-col items-center gap-2">
          <div>Current count:</div>
          <NumberTicker value={count} />
        </div>
        <Button onClick={handleClick} size="lg" className="text-lg">
          Click me
        </Button>
      </div>
    </BackgroundUIContainer>
  );
}

export default App;

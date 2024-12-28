import { useState, useEffect } from "react";
import { GithubIcon } from "lucide-react";

import Loader from "@/components/Loader";
import LoginDialog from "@/components/Login-Dialog";
import { Button } from "@/components/Button";
import { Navbar } from "@/components/Navbar";
import { BackgroundUIContainer } from "@/components/BackgroundUIContainer";
import { NumberTicker } from "@/components/NumberTicker";
import { Progress } from "@/components/Progress";
import { Toaster } from "@/components/ui/sonner";

import {
  signup,
  loginUser,
  loginAnonymously,
  logout,
  getUser,
} from "@/lib/auth";

export default function App() {
  const [count, setCount] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [cooldownProgress, setCooldownProgress] = useState(100);

  useEffect(() => {
    getAndSetUserData();
    return () => setLoggedInUser(null);
  }, []);

  const getAndSetUserData = async () => {
    setIsPageLoading(true);
    const user = await getUser();
    if (user) {
      setLoggedInUser(user);
    }
    setTimeout(() => setIsPageLoading(false), 1000);
  };

  const handleLogout = async () => {
    setIsPageLoading(true);
    await logout();
    setLoggedInUser(null);
    setIsPageLoading(false);
  };

  const handleClick = () => {
    if (!canClick) return;

    // Update count
    const newCount = count + 1;
    setCount(newCount);
    if (newCount >= 1000000) {
      setDeleted(true);
    }

    // Handle cooldown
    setCanClick(false);
    setCooldownProgress(0);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 1000) * 100, 100);
      setCooldownProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setCanClick(true);
      }
    }, 10);

    setTimeout(() => {
      clearInterval(interval);
      setCanClick(true);
      setCooldownProgress(100);
    }, 1000);
  };

  if (isPageLoading) {
    return (
      <PageLayout>
        <div className="text-xl flex flex-col items-center gap-2">
          <Loader />
        </div>
      </PageLayout>
    );
  }

  if (deleted) {
    return (
      <PageLayout>
        <h2 className="text-4xl font-bold text-destructive-foreground">
          Site has been deleted
        </h2>
      </PageLayout>
    );
  }

  if (!loggedInUser) {
    return (
      <PageLayout>
        <CounterDisplay count={count} />
        <LoginDialog setLoggedInUser={setLoggedInUser} />
      </PageLayout>
    );
  }

  return (
    <BackgroundUIContainer>
      <Navbar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Click to Delete</h1>
        <div className="flex flex-col items-center gap-4">
          <CounterDisplay count={count} />
          <ClickControls
            cooldownProgress={cooldownProgress}
            canClick={canClick}
            onButtonClick={handleClick}
          />
        </div>
      </div>
    </BackgroundUIContainer>
  );
}

// Layout component for consistent page structure
const PageLayout = ({ children }) => (
  <BackgroundUIContainer>
    <Navbar />
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">Click to Delete</h1>
      {children}
    </div>
    <Toaster />
  </BackgroundUIContainer>
);

// Component for the counter display
const CounterDisplay = ({ count }) => (
  <div className="text-xl flex flex-col items-center gap-2">
    <div>Current count:</div>
    <NumberTicker value={count} />
  </div>
);

// Component for the click button and progress
const ClickControls = ({ cooldownProgress, canClick, onButtonClick }) => (
  <div className="flex w-full flex-col items-center gap-4 px-8">
    <Progress
      value={cooldownProgress}
      className="w-[350px]"
      showValue
      valueSuffix="%"
      barColor="bg-destructive"
      backgroundColor="bg-destructive/20"
    />
    <Button
      onClick={onButtonClick}
      size="lg"
      className="text-lg"
      disabled={!canClick}
    >
      Click me
    </Button>
  </div>
);

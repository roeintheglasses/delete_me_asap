import { useState } from "react";
import { Button } from "./components/ui/button";
import { GithubIcon } from "lucide-react";

function App() {
  const [count, setCount] = useState(0);
  const [deleted, setDeleted] = useState(false);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);

    if (newCount >= 1000000) {
      setDeleted(true);
    }
  };

  if (deleted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-destructive animate-in fade-in duration-500">
        <h1 className="text-4xl font-bold text-destructive-foreground">
          Site has been deleted
        </h1>
      </div>
    );
  }

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

export default App;

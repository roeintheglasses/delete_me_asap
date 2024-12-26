import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { GithubIcon } from "lucide-react";
import { account, ID } from './lib/appwrite';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [count, setCount] = useState(0);
  const [deleted, setDeleted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Check localStorage for authentication status on app load
  useEffect(() => {
    const savedAuthStatus = localStorage.getItem("isAuthenticated");
    if (savedAuthStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with actual authentication logic
    if (email === "test@example.com" && password === "password") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true"); // Save status in localStorage
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove status from localStorage
  };

  async function loginUser(email, password) {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loginAnonymously() {
    setLoading(true);
    try {
      await account.createAnonymousSession();
      setLoggedInUser(await account.get());
      setIsAuthenticated(true);
    } catch (error) {
      alert("Anonymous login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

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

  if (!isAuthenticated) {
    return (
      <div>
        <p>{loggedInUser ? `Logged in as ${loggedInUser.name || 'Anonymous'}` : 'Not logged in'}</p>
  
        <form>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <button
            type="button"
            disabled={loading}
            onClick={() => loginUser(email, password)}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
  
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                await account.create(ID.unique(), email, password, name);
                loginUser(email, password);
              } catch (error) {
                alert("Registration failed: " + error.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
  
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                await account.deleteSession('current');
                setLoggedInUser(null);
              } catch (error) {
                alert("Logout failed: " + error.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
  
          <button
            type="button"
            disabled={loading}
            onClick={loginAnonymously}
          >
            {loading ? 'Logging in anonymously...' : 'Login Anonymously'}
          </button>
        </form>
      </div>
    );
  };
  

  if(isAuthenticated){
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
}

export default App;

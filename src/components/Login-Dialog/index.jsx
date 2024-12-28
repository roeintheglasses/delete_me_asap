import { useState } from "react";
import { Loader2 } from "lucide-react";

import { FaGoogle, FaDiscord, FaGithub } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/Button";
import { Input } from "@/components/ui/input";

import { signup, loginUser, loginAnonymously, loginViaOAuth } from "@/lib/auth";

export default function LoginDialog({ setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const name = email.split("@")[0];
    const user = await signup(email, password, name);
    if (user) {
      setLoggedInUser(user);
    } else {
      setError(
        "Failed to create account. Please check your email and password."
      );
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const user = await loginUser(email, password);
    if (user) {
      setLoggedInUser(user);
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const handleLoginAnonymously = async () => {
    setLoading(true);
    setError("");
    const user = await loginAnonymously();
    if (user) {
      setLoggedInUser(user);
    } else {
      setError("Anonymous login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Login to delete</Button>
      </DialogTrigger>
      <DialogContent className="dark bg-zinc-950 text-zinc-50">
        <DialogHeader>
          <DialogTitle>Welcome to Click to Delete</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Login or create an account to continue destruction
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-2">
            <Button
              type="button"
              className="w-full flex gap-2 items-center"
              variant="outline"
              onClick={() => {
                loginViaOAuth("google");
              }}
            >
              <FaGoogle size={20} />
              Google
            </Button>

            <Button
              type="button"
              className="w-full flex gap-2 items-center"
              variant="outline"
              onClick={() => {
                loginViaOAuth("github");
              }}
            >
              <FaGithub size={20} />
              GitHub
            </Button>
            <Button
              type="button"
              className="w-full flex gap-2 items-center"
              variant="outline"
              onClick={() => {
                loginViaOAuth("discord");
              }}
            >
              <FaDiscord size={20} />
              Discord
            </Button>
          </div>

          <Button
            type="button"
            disabled={loading}
            onClick={handleLoginAnonymously}
            variant="secondary"
            className="bg-zinc-800 hover:bg-zinc-700"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Login Anonymously"
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-950 px-2 text-zinc-400">
                Or continue with a click to delete account
              </span>
            </div>
          </div>

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-900 border-zinc-800"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-900 border-zinc-800"
          />

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="flex flex-col gap-2">
            <div className="flex w-full gap-2">
              <Button
                type="button"
                className="w-full"
                disabled={loading}
                onClick={handleSignup}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Register"}
              </Button>

              <Button
                type="button"
                className="w-full"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

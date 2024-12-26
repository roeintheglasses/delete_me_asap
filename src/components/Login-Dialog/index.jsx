import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { signup, loginUser, loginAnonymously } from "@/lib/auth";

export default function LoginDialog({ setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = email.split("@")[0];
    const user = await signup(email, password, name);
    if (user) {
      setLoggedInUser(user);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    const user = await loginUser(email, password);
    if (user) {
      setLoggedInUser(user);
    }
    setLoading(false);
  };

  const handleLoginAnonymously = async () => {
    setLoading(true);
    const user = await loginAnonymously();
    if (user) {
      setLoggedInUser(user);
    }
    setLoading(false);
  };

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to Click to Delete</DialogTitle>
          <DialogDescription>
            Please login or create an account to continue
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex flex-col gap-2">
            <Button type="button" disabled={loading} onClick={handleSignup}>
              {loading ? "Registering..." : "Register"}
            </Button>

            <Button type="button" disabled={loading} onClick={handleLogin}>
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Button
              type="button"
              disabled={loading}
              onClick={handleLoginAnonymously}
              variant="secondary"
            >
              {loading ? "Logging in anonymously..." : "Login Anonymously"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

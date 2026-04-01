import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center mx-auto mb-4">
            <span className="text-sm font-bold text-primary-foreground">BI</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Buy-side Insight</h1>
          <p className="text-sm text-muted-foreground mt-1">Enterprise AI Knowledge Base</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-6 space-y-4">
          <div>
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">Sign In</Button>
          <p className="text-xs text-center text-muted-foreground">
            Forgot password? Contact your administrator
          </p>
        </form>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const roles = ["超级管理员", "管理员", "研究员", "访客"] as const;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("研究员");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "请输入邮箱地址";
    if (!password.trim()) newErrors.password = "请输入密码";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    localStorage.setItem("userRole", selectedRole);
    navigate("/home");
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
          <p className="text-sm text-muted-foreground mt-1">企业级 AI 投研知识库</p>
        </div>

        <form onSubmit={handleLogin} className="glass-card p-6 space-y-4">
          <div>
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">选择角色</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    selectedRole === role
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-sm">邮箱</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="you@company.com"
              className="mt-1"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label className="text-sm">密码</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="••••••••"
              className="mt-1"
            />
            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
          </div>
          <Button type="submit" className="w-full">登 录</Button>
          <p className="text-xs text-center text-muted-foreground">
            忘记密码？请联系系统管理员
          </p>
        </form>
      </motion.div>
    </div>
  );
}

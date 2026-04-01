import { useState } from 'react';
import { useNavigate } from 'react-router';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('researcher');

  const roles = [
    { id: 'superadmin', label: '超级管理员' },
    { id: 'admin', label: '管理员' },
    { id: 'researcher', label: '研究员' },
    { id: 'guest', label: '访客' }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, role: selectedRole });
    // Store user role in localStorage
    localStorage.setItem('userRole', selectedRole);
    // Navigate to main page after login
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-foreground rounded-xl mb-4">
            <span className="text-lg font-bold text-background">BI</span>
          </div>
          <h1 className="text-xl font-semibold mb-1 text-foreground">Buy-side Insight</h1>
          <p className="text-sm text-muted-foreground">企业级 AI 投研知识库</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="text-xs text-muted-foreground mb-3 block">选择角色</label>
              <div className="grid grid-cols-4 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`px-2 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                      selectedRole === role.id
                        ? 'bg-foreground text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-xs text-muted-foreground mb-2 block">
                邮箱
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full h-10 px-3 text-sm bg-muted border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-xs text-muted-foreground mb-2 block">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-10 px-3 text-sm bg-muted border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-10 bg-foreground text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              登录
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                忘记密码？请联系系统管理员
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
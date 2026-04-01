import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [avatar] = useState("张");
  const [name, setName] = useState("张研究员");
  const [email, setEmail] = useState("zhang@buyside.com");
  const [employeeId, setEmployeeId] = useState("EMP-2024-001");
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyReview, setNotifyReview] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">个人设置</h1>
        <p className="text-sm text-muted-foreground">管理您的账户信息和偏好</p>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">个人信息</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center relative group cursor-pointer">
              <span className="text-lg font-medium text-muted-foreground">{avatar}</span>
              <div className="absolute inset-0 rounded-full bg-foreground/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-primary-foreground">更换</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">高级研究分析师</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">姓名</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">邮箱</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">工号</Label>
              <Input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">修改密码</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">当前密码</Label>
              <Input type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)} className="mt-1" placeholder="••••••••" />
            </div>
            <div>
              <Label className="text-sm">新密码</Label>
              <Input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className="mt-1" placeholder="••••••••" />
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">通知偏好</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">邮件通知</Label>
                <p className="text-xs text-muted-foreground">接收重要的系统邮件通知</p>
              </div>
              <Switch checked={notifyEmail} onCheckedChange={setNotifyEmail} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">审核结果通知</Label>
                <p className="text-xs text-muted-foreground">文档审核完成时通知我</p>
              </div>
              <Switch checked={notifyReview} onCheckedChange={setNotifyReview} />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/5" onClick={handleLogout}>
            退出登录
          </Button>
          <Button>保存更改</Button>
        </div>
      </div>
    </div>
  );
}

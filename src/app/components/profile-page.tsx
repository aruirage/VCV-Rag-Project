import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { useNavigate } from 'react-router';
import { CameraIcon } from '@radix-ui/react-icons';

export function ProfilePage() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('张');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [name, setName] = useState('张研究员');
  const [email, setEmail] = useState('zhang@buyside.com');
  const [employeeId, setEmployeeId] = useState('EMP-2024-001');
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 创建预览URL
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      // 实际项目中应该上传到服务器
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-foreground">个人设置</h1>
        <p className="text-sm text-muted-foreground">管理您的账户信息和偏好</p>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4 text-foreground">个人信息</h2>
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="h-16 w-16 rounded-full bg-muted flex items-center justify-center relative group cursor-pointer overflow-hidden"
              onClick={handleAvatarClick}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="头像" className="h-full w-full object-cover" />
              ) : (
                <span className="text-lg font-medium text-muted-foreground">{avatar}</span>
              )}
              <div className="absolute inset-0 rounded-full bg-foreground/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <CameraIcon className="h-5 w-5 text-background mb-1" />
                <span className="text-xs text-background">更换头像</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
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
              <Input
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">修改密码</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">当前密码</Label>
              <Input
                type="password"
                value={oldPw}
                onChange={(e) => setOldPw(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label className="text-sm">新密码</Label>
              <Input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive/5"
            onClick={handleLogout}
          >
            退出登录
          </Button>
          <Button>保存更改</Button>
        </div>
      </div>
    </div>
  );
}
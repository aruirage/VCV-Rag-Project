import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface Member {
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  docs: number;
}

const initialMembers: Member[] = [
  { name: '张研究员', email: 'zhang@buyside.com', role: '超级管理员', status: '活跃', joinDate: '2024-01-15', docs: 34 },
  { name: '李研究员', email: 'li@buyside.com', role: '管理员', status: '活跃', joinDate: '2024-03-20', docs: 22 },
  { name: '王总监', email: 'wang@buyside.com', role: '研究员', status: '活跃', joinDate: '2024-05-10', docs: 18 },
  { name: '赵分析师', email: 'zhao@buyside.com', role: '研究员', status: '活跃', joinDate: '2024-06-08', docs: 12 },
  { name: '陈助理', email: 'chen@buyside.com', role: '研究员', status: '活跃', joinDate: '2024-08-15', docs: 8 },
  { name: '刘访客', email: 'liu@buyside.com', role: '访客', status: '已邀请', joinDate: '2024-12-10', docs: 0 },
];

const roleBg: Record<string, string> = {
  '超级管理员': 'bg-primary text-primary-foreground',
  '管理员': 'bg-info/10 text-info',
  '研究员': 'bg-success/10 text-success',
  '访客': 'bg-muted text-muted-foreground',
};

const statusBg: Record<string, string> = {
  '活跃': 'bg-success/10 text-success',
  '已邀请': 'bg-warning/10 text-warning',
  '已禁用': 'bg-muted text-muted-foreground',
};

const roles = ['超级管理员', '管理员', '研究员', '访客'];

export function MembersPage() {
  const [members, setMembers] = useState(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('研究员');

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        status: '已邀请',
        joinDate: new Date().toISOString().slice(0, 10),
        docs: 0,
      },
    ]);
    setInviteOpen(false);
    setInviteEmail('');
    setInviteRole('研究员');
  };

  const handleRoleChange = (index: number, newRole: string) => {
    setMembers((prev) => prev.map((m, i) => (i === index ? { ...m, role: newRole } : m)));
  };

  const handleToggleStatus = (index: number) => {
    setMembers((prev) =>
      prev.map((m, i) =>
        i === index ? { ...m, status: m.status === '已禁用' ? '活跃' : '已禁用' } : m
      )
    );
  };

  const handleDelete = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">成员管理</h1>
          <p className="text-sm text-muted-foreground">共 {members.length} 名成员</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setInviteOpen(true)}>
          <PlusIcon className="h-3.5 w-3.5" /> 邀请成员
        </Button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">成员</th>
              <th className="text-left px-4 py-3 font-medium">角色</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">加入日期</th>
              <th className="text-left px-4 py-3 font-medium">文档数</th>
              <th className="px-4 py-3 w-24 font-medium text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        {m.name.slice(0, 1)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={m.role}
                    onChange={(e) => handleRoleChange(i, e.target.value)}
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border-0 ${roleBg[m.role]}`}
                  >
                    {roles.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      statusBg[m.status] || 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.joinDate}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.docs}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleStatus(i)}
                      className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors"
                    >
                      {m.status === '已禁用' ? '启用' : '禁用'}
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-xs text-destructive hover:text-destructive/80 px-2 py-1 rounded hover:bg-destructive/5 transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>邀请成员</DialogTitle>
            <DialogDescription>输入邮箱地址和角色，发送邀请链接</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm">邮箱地址</Label>
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm">角色</Label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="mt-1 w-full h-9 rounded-md border border-input bg-card px-3 text-sm"
              >
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteOpen(false)}>
              取消
            </Button>
            <Button onClick={handleInvite} disabled={!inviteEmail.trim()}>
              发送邀请
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { 
  MagnifyingGlassIcon, 
  ClockIcon, 
  FileTextIcon, 
  UploadIcon,
  GearIcon,
  ReaderIcon,
  ExitIcon,
  PersonIcon,
  DashboardIcon,
  CheckCircledIcon,
  MixIcon
} from '@radix-ui/react-icons';
import { TooltipProvider } from './ui/tooltip';
import { Toaster } from './ui/sonner';
import { useState, useEffect } from 'react';

const researchNav = [
  { name: '知识检索', href: '/', icon: MagnifyingGlassIcon },
  { name: '对话', href: '/conversations', icon: ReaderIcon },
  { name: '研究输出', href: '/research-board', icon: DashboardIcon },
];

const knowledgeNav = [
  { name: '公共文档库', href: '/library', icon: FileTextIcon },
  { name: '我的文档', href: '/documents', icon: FileTextIcon },
  { name: '上传文档', href: '/upload', icon: UploadIcon },
];

const adminNav = [
  { name: '审核管理', href: '/review', icon: CheckCircledIcon },
  { name: '成员管理', href: '/members', icon: MixIcon },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    // 从 localStorage 或者其他地方获取用户角色
    const role = localStorage.getItem('userRole') || 'researcher';
    setUserRole(role);
  }, []);

  const isAdmin = userRole === 'admin' || userRole === 'superadmin';

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex h-screen bg-background">
        {/* 侧边栏 */}
        <aside className="w-56 bg-white border-r border-border flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-xs font-bold text-background">BI</span>
              </div>
              <span className="text-sm font-semibold">Buy-side Insight</span>
            </div>
          </div>

          {/* 研究导航 */}
          <nav className="p-3">
            <div className="text-xs text-muted-foreground mb-2 px-3">研究</div>
            <div className="space-y-0.5">
              {researchNav.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* 知识库导航 */}
          <nav className="px-3 pb-3">
            <div className="text-xs text-muted-foreground mb-2 px-3">知识库</div>
            <div className="space-y-0.5">
              {knowledgeNav.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* 管理导航（仅管理员可见） */}
          {isAdmin && (
            <nav className="px-3 pb-3">
              <div className="text-xs text-muted-foreground mb-2 px-3">管理</div>
              <div className="space-y-0.5">
                {adminNav.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>
          )}

          {/* 底部个人设置 */}
          <div className="mt-auto p-3 border-t border-border space-y-0.5">
            <Link
              to="/settings"
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                location.pathname === '/settings'
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <GearIcon className="h-4 w-4" />
              <span>系统设置</span>
            </Link>
            <Link
              to="/profile"
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                location.pathname === '/profile'
                  ? 'bg-muted text-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}
            >
              <PersonIcon className="h-4 w-4" />
              <span>个人设置</span>
            </Link>
          </div>
        </aside>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* 顶部栏 */}
          <header className="h-14 border-b border-border bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">BI</span>
              </div>
              <span className="text-sm font-semibold">Buy-side Insight</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">JD</span>
            </div>
          </header>
          
          {/* 内容区 */}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
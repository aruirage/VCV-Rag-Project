import { useState } from 'react';
import { MagnifyingGlassIcon, ClockIcon, FileTextIcon, UploadIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router';

const sources = ['全部来源', '公共库', '私有库', '宏观', '行业'];

const recentQueries = [
  '新能源光伏行业PE估值区间是多少？',
  '医疗器械行业竞争格局分析',
  '2024年半导体行业供需展望',
];

const quickActions = [
  { icon: FileTextIcon, title: '公共文档库', desc: '浏览共享知识库', href: '/library' },
  { icon: UploadIcon, title: '上传文档', desc: '添加研究文档', href: '/upload' },
  { icon: ClockIcon, title: '检索历史', desc: '查看历史记录', href: '/history' },
  { icon: FileTextIcon, title: '我的文档', desc: '管理已上传文档', href: '/documents' },
];

export function IndexPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('全部来源');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/conversations?q=${encodeURIComponent(query)}&source=${encodeURIComponent(selectedSource)}`);
    }
  };

  return (
    <div className="h-full flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold mb-2 text-foreground">您想研究什么？</h1>
          <p className="text-sm text-muted-foreground">基于 AI 的智能检索知识库</p>
        </div>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="glass-card flex items-center gap-2 px-4 py-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="输入研究问题，如：光伏行业估值分析..."
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              type="submit"
              className="h-8 w-8 rounded-md bg-muted hover:bg-accent flex items-center justify-center transition-colors"
            >
              <span className="text-lg">→</span>
            </button>
          </div>
        </form>

        {/* 来源标签 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedSource === source
                  ? 'bg-foreground text-primary-foreground'
                  : 'bg-white border border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        {/* 最近检索 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 px-1">
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">最近检索</span>
          </div>
          <div className="space-y-2">
            {recentQueries.map((q, i) => (
              <button
                key={i}
                onClick={() => setQuery(q)}
                className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* 快捷操作卡片 */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.href)}
              className="glass-card p-4 hover:shadow-md transition-shadow text-center group"
            >
              <div className="flex justify-center mb-2">
                <div className="h-10 w-10 rounded-full bg-muted group-hover:bg-accent flex items-center justify-center transition-colors">
                  <action.icon className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm font-medium mb-1">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
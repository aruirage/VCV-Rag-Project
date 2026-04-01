import { FileTextIcon, MagnifyingGlassIcon, EyeOpenIcon, GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const industryCategories = ['光伏', '半导体', '医疗器械', '消费电子', '新能源汽车'];
const topicCategories = ['估值分析', '竞争格局', '供需展望', '政策解读'];
const docTypes = ['深度报告', '图表', '数据手册', '会议纪要'];

interface Document {
  name: string;
  category: string;
  pages: number;
  author: string;
  date: string;
  industry?: string;
  topic?: string;
  type?: string;
}

const docs: Document[] = [
  { name: '光伏行业深度...', category: '行业研究', pages: 84, author: '张研究员', date: '12月15日', industry: '光伏', topic: '估值分析', type: '深度报告' },
  { name: '新能源估值...', category: '公司研究', pages: 32, author: '李研究员', date: '12月14日', industry: '新能源汽车', topic: '估值分析', type: '数据手册' },
  { name: '医疗器械竞...', category: '行业研究', pages: 28, author: '王总监', date: '12月12日', industry: '医疗器械', topic: '竞争格局', type: '深度报告' },
  { name: '半导体供需...', category: '行业研究', pages: 56, author: '张研究员', date: '12月10日', industry: '半导体', topic: '供需展望', type: '深度报告' },
  { name: 'ESG评级方...', category: 'ESG', pages: 44, author: '李研究员', date: '12月8日', topic: '政策解读', type: '数据手册' },
  { name: '银行业不良...', category: '固定收益', pages: 18, author: '王总监', date: '12月5日', topic: '供需展望', type: '图表' },
  { name: '消费电子产...', category: '行业研究', pages: 72, author: '张研究员', date: '12月3日', industry: '消费电子', topic: '竞争格局', type: '深度报告' },
  { name: '宏观经济月...', category: '宏观策略', pages: 14, author: '李研究员', date: '12月1日', type: '会议纪要' },
  { name: '光伏产业链...', category: '行业研究', pages: 48, author: '王总监', date: '11月28日', industry: '光伏', topic: '竞争格局', type: '深度报告' },
  { name: '半导体估值...', category: '公司研究', pages: 22, author: '张研究员', date: '11月25日', industry: '半导体', topic: '估值分析', type: '数据手册' },
  { name: '医疗政策解...', category: '政策研究', pages: 16, author: '李研究员', date: '11月20日', industry: '医疗器械', topic: '政策解读', type: '会议纪要' },
  { name: '消费电子图...', category: '数据图表', pages: 8, author: '王总监', date: '11月18日', industry: '消费电子', topic: '供需展望', type: '图表' },
];

export function LibraryPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 筛选逻辑
  const filteredDocs = docs.filter(doc => {
    // 搜索过滤
    if (search && !doc.name.toLowerCase().includes(search.toLowerCase()) && 
        !doc.category.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    // 行业过滤
    if (selectedIndustry && doc.industry !== selectedIndustry) {
      return false;
    }
    
    // 主题过滤
    if (selectedTopic && doc.topic !== selectedTopic) {
      return false;
    }
    
    // 文档类型过滤
    if (selectedType && doc.type !== selectedType) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="flex h-full">
      {/* 左侧筛选面板 */}
      <div className="w-44 border-r border-border bg-white overflow-y-auto">
        <div className="p-4">
          {/* 分类筛选标题 */}
          <h3 className="text-xs text-muted-foreground mb-3">分类筛选</h3>

          {/* 全部 */}
          <button
            onClick={() => {
              setSelectedIndustry(null);
              setSelectedTopic(null);
              setSelectedType(null);
            }}
            className={`w-full text-left px-3 py-1.5 text-sm rounded-md mb-3 transition-colors ${
              !selectedIndustry && !selectedTopic && !selectedType
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            全部
          </button>

          {/* 行业 */}
          <div className="mb-4">
            <h4 className="text-xs font-medium mb-2">行业</h4>
            <div className="space-y-0.5">
              {industryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedIndustry(selectedIndustry === cat ? null : cat);
                    setSelectedTopic(null);
                    setSelectedType(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                    selectedIndustry === cat
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 主题 */}
          <div className="mb-4">
            <h4 className="text-xs font-medium mb-2">主题</h4>
            <div className="space-y-0.5">
              {topicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedTopic(selectedTopic === cat ? null : cat);
                    setSelectedIndustry(null);
                    setSelectedType(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                    selectedTopic === cat
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 文档类型 */}
          <div>
            <h4 className="text-xs font-medium mb-2">文档类型</h4>
            <div className="space-y-0.5">
              {docTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(selectedType === type ? null : type);
                    setSelectedIndustry(null);
                    setSelectedTopic(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                    selectedType === type
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 右侧主内容区 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-6xl">
          {/* 标题 */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold mb-1 text-foreground">公共文档库</h1>
            <p className="text-sm text-muted-foreground">
              浏览共享知识库文档 · 共 {filteredDocs.length} 个文档
              {(selectedIndustry || selectedTopic || selectedType) && (
                <span className="ml-2 text-xs text-primary">
                  (已筛选: {selectedIndustry || selectedTopic || selectedType})
                </span>
              )}
            </p>
          </div>

          {/* 搜索栏和视图切换 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 border border-border rounded-md bg-white">
              <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索文档..."
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-1 border border-border rounded-md p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
              >
                <GridIcon className="h-4 w-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted/50'
                }`}
              >
                <ListBulletIcon className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* 文档网格 */}
          {filteredDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileTextIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">未找到匹配的文档</p>
              <p className="text-xs text-muted-foreground">
                尝试调整筛选条件或搜索关键词
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredDocs.map((doc, i) => (
                <div
                  key={i}
                  className="glass-card p-4 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    {/* 文档图标 */}
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                      <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium mb-1 truncate">{doc.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{doc.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.pages} 页 · {doc.author} · {doc.date}
                      </p>
                    </div>

                    {/* 预览图标 */}
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
                      <EyeOpenIcon className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
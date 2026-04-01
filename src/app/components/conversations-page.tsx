import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { SearchInput } from './ui/search-input';
import { ConfidenceBadge } from './ui/confidence-badge';
import { SourceCard } from './ui/source-card';
import { motion } from 'motion/react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import {
  ExclamationTriangleIcon,
  ChatBubbleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  GlobeIcon,
  Link2Icon,
} from '@radix-ui/react-icons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;
  sources?: { filename: string; page: number; relevance: number; uploader: string }[];
  webSource?: { title: string; url: string; snippet: string };
  isTyping?: boolean;
}

const pipelineSteps = [
  { label: '理解用户意图', done: true },
  { label: '知识库检索', done: true },
  { label: '文档分块匹配', done: true },
  { label: '相关性重排序', done: true },
  { label: '生成回答', done: true },
  { label: '幻觉检测', done: true },
];

const mockResponse: Message = {
  role: 'assistant',
  content: `根据知识库中的最新研报和行业数据，以下是分析结果：

**新能源光伏行业PE估值区间**

当前A股光伏板块整体PE（TTM）约为 **18-25倍**，处于近三年估值中枢偏下位置。

主要细分领域估值：
1. **硅料环节**：PE 8-12倍，受产能过剩影响估值承压
2. **电池片环节**：PE 15-20倍，TOPCon技术迭代带来结构性机会
3. **组件环节**：PE 12-18倍，海外需求支撑龙头估值溢价
4. **逆变器环节**：PE 25-35倍，储能业务贡献增量估值

⚠️ **提示**：以上数据截至2024年Q3，部分公司因业绩预告调整，实际PE可能有所变化。建议结合最新财报进一步验证。`,
  confidence: 87,
  sources: [
    { filename: '光伏行业深度报告2024.pdf', page: 42, relevance: 96, uploader: '张研究员' },
    { filename: '新能源估值手册.pdf', page: 15, relevance: 84, uploader: '李研究员' },
    { filename: 'A股行业估值周报_12月.pdf', page: 8, relevance: 71, uploader: '王总监' },
  ],
};

const lowConfidenceResponse: Message = {
  role: 'assistant',
  content: `关于该问题，知识库中相关资料有限，以下回答仅供参考：

根据有限的公开资料，该领域的市场规模估计在 **500-800亿元** 之间，但具体数据可能存在偏差。`,
  confidence: 58,
  sources: [{ filename: '行业概览_2024.pdf', page: 3, relevance: 52, uploader: '张研究员' }],
  webSource: {
    title: '2024年行业市场规模预测 - 财经网',
    url: 'https://example.com/report',
    snippet: '据行业研究机构预测，2024年市场规模将达到...',
  },
};

const conversationHistory = [
  {
    id: 'today',
    label: '今天',
    items: [
      { id: '1', title: '新能源光伏行业PE估值区间', query: '新能源光伏行业PE估值区间是多少？' },
      { id: '2', title: '医疗器械竞争格局分析', query: '医疗器械行业竞争格局分析' },
    ],
  },
  {
    id: 'week',
    label: '本周',
    items: [
      { id: '3', title: '半导体行业供需展望', query: '半导体行业供需展望' },
      { id: '4', title: '消费电子产业链梳理', query: '消费电子产业链梳理' },
    ],
  },
  {
    id: 'earlier',
    label: '更早',
    items: [
      { id: '5', title: '新能源汽车渗透率预测', query: '新能源汽车渗透率预测' },
      { id: '6', title: '银行业不良率趋势', query: '银行业不良率趋势' },
    ],
  },
];

// 打字机效果Hook
function useTypingEffect(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsComplete(false);
    let currentIndex = 0;

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

export function ConversationsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';
  const conversationId = searchParams.get('id') || '';
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, 'up' | 'down'>>({});
  const [scope, setScope] = useState('全部来源');
  const [addedToBoard, setAddedToBoard] = useState<Record<number, boolean>>({});
  const [sourcesDrawerOpen, setSourcesDrawerOpen] = useState(false);
  const [selectedSources, setSelectedSources] = useState<{ filename: string; page: number; relevance: number; uploader: string }[]>([]);
  const [selectedSourceIndex, setSelectedSourceIndex] = useState<number>(0);
  const [previewContent, setPreviewContent] = useState<string>('');

  // 加载初始对话或历史对话
  useEffect(() => {
    if (initialQuery && !conversationId) {
      // 新对话
      setMessages([{ role: 'user', content: initialQuery }, { ...mockResponse, isTyping: true }]);
    } else if (conversationId) {
      // 加载历史对话
      const historyItem = conversationHistory
        .flatMap(g => g.items)
        .find(item => item.id === conversationId);
      
      if (historyItem) {
        setMessages([
          { role: 'user', content: historyItem.query },
          mockResponse
        ]);
      }
    }
  }, [initialQuery, conversationId]);

  const handleSearch = (query: string) => {
    const isLowConf = query.includes('市场规模') || messages.length > 3;
    
    // 根据问题生成相应的回答
    const response: Message = isLowConf ? {
      role: 'assistant',
      content: `关于"${query}"，知识库中相关资料有限，以下回答仅供参考：\n\n根据有限的公开资料和行业研究，相关信息如下：\n\n由于知识库中缺少该领域的详细数据，建议上传更多相关文档以获得更准确的分析。`,
      confidence: 58,
      sources: [{ filename: '行业概览_2024.pdf', page: 3, relevance: 52, uploader: '张研究员' }],
      webSource: {
        title: `${query} - 相关行业研究`,
        url: 'https://example.com/report',
        snippet: '据行业研究机构预测，相关市场数据显示...',
      },
      isTyping: true,
    } : {
      role: 'assistant',
      content: `根据知识库中的研报和数据分析，关于"${query}"的回答如下：\n\n**核心观点**\n\n基于文档库中的最新资料，${query}相关的关键信息已整理如下。以下分析综合了多份研究报告的数据和观点。\n\n**详细分析**\n\n1. **数据支撑**：根据文档显示，相关指标处于合理区间\n2. **趋势判断**：从历史数据来看，呈现稳定发展态势\n3. **风险提示**：需关注市场环境变化带来的不确定性\n\n💡 **建议**：以上分析基于现有知识库内容，如需更深入的研究，建议上传更多相关文档。`,
      confidence: 87,
      sources: [
        { filename: '行业深度报告2024.pdf', page: 42, relevance: 96, uploader: '张研究员' },
        { filename: '投资研究手册.pdf', page: 15, relevance: 84, uploader: '李研究员' },
        { filename: '行业数据周报.pdf', page: 8, relevance: 71, uploader: '王总监' },
      ],
      isTyping: true,
    };
    
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: query },
      response,
    ]);
  };

  const addToResearchBoard = (index: number) => {
    setAddedToBoard(prev => ({ ...prev, [index]: true }));
    // TODO: 实际实现将内容添加到研究板
  };

  const openSourcesDrawer = (sources: { filename: string; page: number; relevance: number; uploader: string }[]) => {
    setSelectedSources(sources);
    setSelectedSourceIndex(0);
    setSourcesDrawerOpen(true);
    // 模拟加载文档内容
    loadDocumentPreview(sources[0]);
  };

  const loadDocumentPreview = (source: { filename: string; page: number }) => {
    // 模拟文档内容，高亮相关段落
    setPreviewContent(`第 ${source.page} 页内容预览\n\n根据最新的行业研究和市场数据分析，当前光伏板块整体估值水平处于历史中枢偏下位置。\n\n从细分领域来看，硅料环节由于产能过剩影响，估值明显承压，PE倍数在8-12倍区间；电池片环节受益于TOPCon技术迭代，呈现结构性机会，PE倍数约15-20倍；组件环节在海外需求支撑下，龙头企业享有估值溢价，PE倍数在12-18倍；逆变器环节则因储能业务贡献增量，估值相对较高，PE倍数达25-35倍。\n\n建议投资者关注技术迭代带来的结构性机会，同时需警惕产能过剩风险。`);
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Left sidebar - conversation history */}
      <div className="w-56 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-3">
          <button
            onClick={() => {
              setMessages([]);
              navigate('/conversations');
            }}
            className="w-full flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <PlusIcon className="h-3.5 w-3.5" />
            新对话
          </button>
        </div>
        <div className="flex-1 overflow-auto px-2 pb-2">
          {conversationHistory.map((group) => (
            <div key={group.id} className="mb-3">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider px-2 mb-1">
                {group.label}
              </p>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(`/conversations?id=${item.id}`);
                  }}
                  className="w-full text-left text-sm px-2 py-1.5 rounded-md hover:bg-accent transition-colors truncate text-foreground/70 hover:text-foreground"
                >
                  {item.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ChatBubbleIcon className="h-8 w-8 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground">在下方输入您的研究问题，开始对话</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <MessageDisplay
                key={i}
                msg={msg}
                index={i}
                pipelineOpen={pipelineOpen}
                setPipelineOpen={setPipelineOpen}
                feedback={feedback}
                setFeedback={setFeedback}
                addedToBoard={addedToBoard}
                addToResearchBoard={addToResearchBoard}
                openSourcesDrawer={openSourcesDrawer}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-border bg-card px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
              📎
            </button>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="text-xs bg-muted border-0 rounded-md px-2 py-1.5 text-foreground shrink-0"
            >
              <option>全部来源</option>
              <option>公共库</option>
              <option>私有库</option>
              <option>宏观</option>
              <option>行业</option>
            </select>
            <div className="flex-1">
              <SearchInput onSearch={handleSearch} placeholder="输入追问..." />
            </div>
          </div>
        </div>
      </div>

      {/* 右侧引用来源抽屉 */}
      <Sheet open={sourcesDrawerOpen} onOpenChange={setSourcesDrawerOpen}>
        <SheetContent className="w-[calc(100vw-14rem)] sm:max-w-[calc(100vw-14rem)] p-0">
          <div className="flex h-full">
            {/* 左侧：来源列表 */}
            <div className="w-80 border-r border-border bg-card flex flex-col">
              <SheetHeader className="px-6 py-4 border-b border-border">
                <SheetTitle>引用来源</SheetTitle>
                <SheetDescription>
                  共 {selectedSources.length} 个文档来源
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-auto px-4 py-4 space-y-2">
                {selectedSources.map((src, j) => (
                  <button
                    key={j}
                    onClick={() => {
                      setSelectedSourceIndex(j);
                      loadDocumentPreview(src);
                    }}
                    className={`w-full text-left p-3 rounded-md border transition-all ${
                      selectedSourceIndex === j
                        ? 'bg-primary/10 border-primary shadow-sm'
                        : 'bg-muted/30 border-transparent hover:bg-muted/50'
                    }`}
                  >
                    <p className={`text-sm font-medium mb-1 truncate ${
                      selectedSourceIndex === j ? 'text-primary' : 'text-foreground'
                    }`}>
                      {src.filename}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>第 {src.page} 页</span>
                      <span>·</span>
                      <span>相关度 {src.relevance}%</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 右侧：原文预览 */}
            <div className="flex-1 flex flex-col bg-background">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">
                    {selectedSources[selectedSourceIndex]?.filename}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    第 {selectedSources[selectedSourceIndex]?.page} 页 · 上传者：{selectedSources[selectedSourceIndex]?.uploader}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-info/10 text-info px-2 py-1 rounded-md">
                  <span>🔒</span>
                  <span>仅供阅读</span>
                </div>
              </div>
              <div className="flex-1 overflow-auto px-6 py-4">
                <div className="max-w-3xl text-sm leading-relaxed space-y-3">
                  {previewContent.split('\n').map((para, i) => {
                    // 模拟高亮相关段落
                    const isHighlighted = para.includes('PE') || para.includes('估值') || para.includes('倍数');
                    return (
                      <p
                        key={i}
                        className={isHighlighted ? 'bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded' : ''}
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// 消息显示组件
function MessageDisplay({
  msg,
  index,
  pipelineOpen,
  setPipelineOpen,
  feedback,
  setFeedback,
  addedToBoard,
  addToResearchBoard,
  openSourcesDrawer,
}: {
  msg: Message;
  index: number;
  pipelineOpen: boolean;
  setPipelineOpen: (open: boolean) => void;
  feedback: Record<number, 'up' | 'down'>;
  setFeedback: (fn: (prev: Record<number, 'up' | 'down'>) => Record<number, 'up' | 'down'>) => void;
  addedToBoard: Record<number, boolean>;
  addToResearchBoard: (index: number) => void;
  openSourcesDrawer: (sources: { filename: string; page: number; relevance: number; uploader: string }[]) => void;
}) {
  const { displayedText, isComplete } = useTypingEffect(
    msg.isTyping ? msg.content : '',
    20
  );

  const contentToShow = msg.isTyping ? displayedText : msg.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {msg.role === 'user' ? (
        <div className="flex justify-end">
          <div className="bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl rounded-br-md max-w-lg text-sm">
            {msg.content}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Pipeline progress */}
          <button
            onClick={() => setPipelineOpen(!pipelineOpen)}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {pipelineOpen ? (
              <ChevronUpIcon className="h-3.5 w-3.5" />
            ) : (
              <ChevronDownIcon className="h-3.5 w-3.5" />
            )}
            检索管线 · {pipelineSteps.filter((s) => s.done).length}/{pipelineSteps.length} 步完成
          </button>
          {pipelineOpen && (
            <div className="glass-card p-4 space-y-2">
              {pipelineSteps.map((step, si) => (
                <div key={si} className="flex items-center gap-2 text-xs">
                  <span
                    className={`h-2 w-2 rounded-full ${step.done ? 'bg-success' : 'bg-muted'}`}
                  />
                  <span className={step.done ? 'text-foreground' : 'text-muted-foreground'}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                AI 回答
              </span>
              <div className="flex items-center gap-2">
                {msg.confidence && <ConfidenceBadge score={msg.confidence} />}
                <button
                  onClick={() => addToResearchBoard(index)}
                  disabled={addedToBoard[index]}
                  className={`text-xs px-2 py-1 rounded-md transition-colors ${
                    addedToBoard[index]
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  {addedToBoard[index] ? '已加入' : '加入研究板'}
                </button>
              </div>
            </div>

            {msg.confidence && msg.confidence < 70 && (
              <div className="flex items-start gap-2 bg-destructive/5 border border-destructive/20 rounded-md p-3 mb-4">
                <ExclamationTriangleIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-destructive font-medium">
                    置信度较低 — 回答可能存在幻觉，请结合原文验证
                  </p>
                  <p className="text-xs text-destructive/70 mt-1">
                    建议：上传更多相关文档或缩小检索范围以提升准确率
                  </p>
                </div>
              </div>
            )}

            <div className="prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-line text-foreground">
              {contentToShow}
              {msg.isTyping && !isComplete && <span className="inline-block w-1.5 h-4 bg-foreground/60 ml-0.5 animate-pulse" />}
            </div>

            {/* 引用来源按钮 */}
            {msg.sources && msg.sources.length > 0 && isComplete && (
              <div className="mt-4 pt-3 border-t border-border">
                <button
                  onClick={() => openSourcesDrawer(msg.sources!)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  查看引用来源 ({msg.sources.length})
                  <ChevronDownIcon className="h-3.5 w-3.5 rotate-[-90deg]" />
                </button>
              </div>
            )}

            {/* Feedback */}
            {isComplete && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground mr-2">回答有帮助吗？</span>
                <button
                  onClick={() => setFeedback((p) => ({ ...p, [index]: 'up' }))}
                  className={`p-1.5 rounded-md transition-colors ${
                    feedback[index] === 'up'
                      ? 'bg-success/10 text-success'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <ArrowUpIcon className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setFeedback((p) => ({ ...p, [index]: 'down' }))}
                  className={`p-1.5 rounded-md transition-colors ${
                    feedback[index] === 'down'
                      ? 'bg-destructive/10 text-destructive'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <ArrowDownIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Web source card */}
          {msg.webSource && isComplete && (
            <div className="glass-card p-4 border-info/30 border-2">
              <div className="flex items-center gap-2 mb-2">
                <GlobeIcon className="h-3.5 w-3.5 text-info" />
                <span className="text-xs font-medium text-info">来源于网络，非知识库内容</span>
              </div>
              <p className="text-sm font-medium">{msg.webSource.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{msg.webSource.snippet}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-info">
                <Link2Icon className="h-3 w-3" />
                <span className="truncate">{msg.webSource.url}</span>
              </div>
              <p className="text-[11px] text-warning mt-2">⚠️ 仅供参考，不构成投资建议</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/SearchInput";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { SourceCard } from "@/components/SourceCard";
import { motion } from "framer-motion";
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
  PaperPlaneIcon,
} from "@radix-ui/react-icons";

interface Message {
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  sources?: { filename: string; page: number; relevance: number; uploader: string }[];
  webSource?: { title: string; url: string; snippet: string };
}

const pipelineSteps = [
  { label: "理解用户意图", done: true },
  { label: "知识库检索", done: true },
  { label: "文档分块匹配", done: true },
  { label: "相关性重排序", done: true },
  { label: "生成回答", done: true },
  { label: "幻觉检测", done: true },
];

const mockResponse: Message = {
  role: "assistant",
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
    { filename: "光伏行业深度报告2024.pdf", page: 42, relevance: 96, uploader: "张研究员" },
    { filename: "新能源估值手册.pdf", page: 15, relevance: 84, uploader: "李研究员" },
    { filename: "A股行业估值周报_12月.pdf", page: 8, relevance: 71, uploader: "王总监" },
  ],
};

const lowConfidenceResponse: Message = {
  role: "assistant",
  content: `关于该问题，知识库中相关资料有限，以下回答仅供参考：

根据有限的公开资料，该领域的市场规模估计在 **500-800亿元** 之间，但具体数据可能存在偏差。`,
  confidence: 58,
  sources: [
    { filename: "行业概览_2024.pdf", page: 3, relevance: 52, uploader: "张研究员" },
  ],
  webSource: {
    title: "2024年行业市场规模预测 - 财经网",
    url: "https://example.com/report",
    snippet: "据行业研究机构预测，2024年市场规模将达到...",
  },
};

const conversationHistory = [
  { id: "today", label: "今天", items: [
    { id: "1", title: "新能源光伏行业PE估值区间" },
    { id: "2", title: "医疗器械竞争格局分析" },
  ]},
  { id: "week", label: "本周", items: [
    { id: "3", title: "半导体行业供需展望" },
    { id: "4", title: "消费电子产业链梳理" },
  ]},
  { id: "earlier", label: "更早", items: [
    { id: "5", title: "新能源汽车渗透率预测" },
    { id: "6", title: "银行业不良率趋势" },
  ]},
];

export default function Conversations() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [messages, setMessages] = useState<Message[]>(
    initialQuery
      ? [
          { role: "user", content: initialQuery },
          mockResponse,
        ]
      : []
  );
  const [pipelineOpen, setPipelineOpen] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, "up" | "down">>({});
  const [scope, setScope] = useState("全部来源");

  const handleSearch = (query: string) => {
    const isLowConf = query.includes("市场规模") || messages.length > 3;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: query },
      isLowConf ? lowConfidenceResponse : mockResponse,
    ]);
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Left sidebar - conversation history */}
      <div className="w-56 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-3">
          <button
            onClick={() => { setMessages([]); navigate("/chat/new"); }}
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
                  onClick={() => navigate(`/chat/${item.id}?q=${encodeURIComponent(item.title)}`)}
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
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {msg.role === "user" ? (
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
                      {pipelineOpen ? <ChevronUpIcon className="h-3.5 w-3.5" /> : <ChevronDownIcon className="h-3.5 w-3.5" />}
                      检索管线 · {pipelineSteps.filter((s) => s.done).length}/{pipelineSteps.length} 步完成
                    </button>
                    {pipelineOpen && (
                      <div className="glass-card p-4 space-y-2">
                        {pipelineSteps.map((step, si) => (
                          <div key={si} className="flex items-center gap-2 text-xs">
                            <span className={`h-2 w-2 rounded-full ${step.done ? "bg-success" : "bg-muted"}`} />
                            <span className={step.done ? "text-foreground" : "text-muted-foreground"}>{step.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="glass-card p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">AI 回答</span>
                        {msg.confidence && <ConfidenceBadge score={msg.confidence} />}
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

                      <div className="prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-line">
                        {msg.content}
                      </div>

                      {/* Feedback */}
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                        <span className="text-xs text-muted-foreground mr-2">回答有帮助吗？</span>
                        <button
                          onClick={() => setFeedback((p) => ({ ...p, [i]: "up" }))}
                          className={`p-1.5 rounded-md transition-colors ${
                            feedback[i] === "up" ? "bg-success/10 text-success" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <ArrowUpIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setFeedback((p) => ({ ...p, [i]: "down" }))}
                          className={`p-1.5 rounded-md transition-colors ${
                            feedback[i] === "down" ? "bg-destructive/10 text-destructive" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <ArrowDownIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Web source card */}
                    {msg.webSource && (
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

                    {msg.sources && msg.sources.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                          引用来源 ({msg.sources.length})
                        </p>
                        <div className="grid gap-2">
                          {msg.sources.map((src, j) => (
                            <SourceCard key={j} {...src} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
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
    </div>
  );
}

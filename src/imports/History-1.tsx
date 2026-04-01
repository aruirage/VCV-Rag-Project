import { useState } from "react";
import { ClockIcon, MagnifyingGlassIcon, TrashIcon } from "@radix-ui/react-icons";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { useNavigate } from "react-router-dom";

const historyData = [
  { id: "1", query: "新能源光伏行业PE估值区间", date: "2024-12-15 14:32", confidence: 87, sources: 3, scope: "全部", group: "today" },
  { id: "2", query: "医疗器械行业竞争格局分析", date: "2024-12-15 11:05", confidence: 92, sources: 5, scope: "行业", group: "today" },
  { id: "3", query: "2024年半导体行业供需展望", date: "2024-12-14 16:48", confidence: 78, sources: 4, scope: "公共库", group: "today" },
  { id: "4", query: "消费电子产业链上下游梳理", date: "2024-12-13 09:22", confidence: 65, sources: 2, scope: "私有库", group: "week" },
  { id: "5", query: "银行业不良率变化趋势", date: "2024-12-10 15:10", confidence: 91, sources: 6, scope: "全部", group: "week" },
  { id: "6", query: "新能源汽车渗透率预测", date: "2024-12-02 10:33", confidence: 84, sources: 4, scope: "行业", group: "month" },
];

const tabs = [
  { label: "全部", value: "all" },
  { label: "今天", value: "today" },
  { label: "本周", value: "week" },
  { label: "本月", value: "month" },
];

export default function History() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [items, setItems] = useState(historyData);

  const filtered = activeTab === "all" ? items : items.filter((i) => i.group === activeTab);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">检索历史</h1>
        <p className="text-sm text-muted-foreground">您最近的研究提问和检索结果</p>
      </div>

      <div className="flex gap-1 mb-4">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTab(t.value)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
              activeTab === t.value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:bg-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 text-center">
          <ClockIcon className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">暂无检索记录</p>
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(`/chat/${item.id}?q=${encodeURIComponent(item.query)}`)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="w-full glass-card p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.query}</p>
                <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <ClockIcon className="h-3 w-3" />
                  {item.date} · {item.sources} 篇来源
                </p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.scope}</span>
              <ConfidenceBadge score={item.confidence} />
              {hoveredId === item.id && (
                <button
                  onClick={(e) => handleDelete(item.id, e)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                </button>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { SearchInput } from "@/components/SearchInput";
import { useNavigate } from "react-router-dom";
import { ClockIcon, FileTextIcon, LightningBoltIcon, UploadIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const recentQueries = [
  "新能源光伏行业PE估值区间是多少？",
  "医疗器械行业竞争格局分析",
  "2024年半导体行业供需展望",
];

const quickFilters = [
  { label: "全部来源", active: true },
  { label: "公共库", active: false },
  { label: "私有库", active: false },
  { label: "宏观", active: false },
  { label: "行业", active: false },
];

const guideCards = [
  { icon: FileTextIcon, label: "公共文档库", sub: "浏览共享知识库", link: "/library" },
  { icon: UploadIcon, label: "上传文档", sub: "添加研究资料", link: "/upload" },
  { icon: ClockIcon, label: "检索历史", sub: "查看历史提问", link: "/history" },
  { icon: LightningBoltIcon, label: "我的文档", sub: "管理已上传文件", link: "/my-docs" },
];

export default function Index() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/chat/1?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            您想研究什么？
          </h1>
          <p className="text-sm text-muted-foreground">
            基于 AI 的智能投研知识库检索
          </p>
        </div>

        <SearchInput onSearch={handleSearch} large className="mb-4" placeholder="输入研究问题，如：光伏行业估值分析..." />

        <div className="flex items-center gap-2 justify-center flex-wrap mb-8">
          {quickFilters.map((f) => (
            <button
              key={f.label}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                f.active
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 px-1">
              <ClockIcon className="h-3.5 w-3.5" />
              <span className="font-medium uppercase tracking-wider">最近检索</span>
            </div>
            <div className="space-y-1">
              {recentQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSearch(q)}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-lg hover:bg-card transition-colors text-foreground/80 hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {guideCards.map((card) => (
              <button
                key={card.label}
                onClick={() => navigate(card.link)}
                className="glass-card p-4 text-center hover:shadow-md transition-shadow"
              >
                <card.icon className="h-4 w-4 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">{card.label}</p>
                <p className="text-xs text-muted-foreground">{card.sub}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

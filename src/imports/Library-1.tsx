import { FileTextIcon, MagnifyingGlassIcon, ViewGridIcon, ListBulletIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const categoryTree = [
  { label: "行业", children: ["光伏", "半导体", "医疗器械", "消费电子", "新能源汽车"] },
  { label: "主题", children: ["估值分析", "竞争格局", "供需展望", "政策解读"] },
  { label: "文档类型", children: ["深度报告", "周报", "数据手册", "会议纪要"] },
];

const docs = [
  { name: "光伏行业深度报告2024.pdf", category: "行业研究", uploader: "张研究员", date: "12月15日", pages: 84 },
  { name: "新能源估值手册.pdf", category: "公司研究", uploader: "李研究员", date: "12月14日", pages: 32 },
  { name: "医疗器械竞争格局.pdf", category: "行业研究", uploader: "王总监", date: "12月12日", pages: 28 },
  { name: "半导体供需分析_Q4.pdf", category: "行业研究", uploader: "张研究员", date: "12月10日", pages: 56 },
  { name: "ESG评级方法论.pdf", category: "ESG", uploader: "李研究员", date: "12月8日", pages: 44 },
  { name: "银行业不良率趋势.pdf", category: "固定收益", uploader: "王总监", date: "12月5日", pages: 18 },
  { name: "消费电子产业链.pdf", category: "行业研究", uploader: "张研究员", date: "12月3日", pages: 72 },
  { name: "宏观经济月度回顾.pdf", category: "宏观策略", uploader: "李研究员", date: "12月1日", pages: 14 },
];

export default function Library() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = docs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (!activeCategory || d.category.includes(activeCategory))
  );

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Left category tree */}
      <div className="w-48 border-r border-border bg-card p-4 shrink-0 overflow-auto">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">分类筛选</p>
        <button
          onClick={() => setActiveCategory(null)}
          className={`w-full text-left text-sm px-2 py-1.5 rounded-md mb-1 transition-colors ${
            !activeCategory ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          全部
        </button>
        {categoryTree.map((group) => (
          <div key={group.label} className="mb-3">
            <p className="text-xs font-medium text-foreground px-2 py-1">{group.label}</p>
            {group.children.map((child) => (
              <button
                key={child}
                onClick={() => setActiveCategory(child)}
                className={`w-full text-left text-xs px-4 py-1.5 rounded-md transition-colors ${
                  activeCategory === child ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {child}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-lg font-semibold">公共文档库</h1>
          <p className="text-sm text-muted-foreground">浏览共享知识库文档</p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="glass-card flex items-center gap-2 px-3 py-2 flex-1 max-w-xs">
            <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索文档..."
              className="bg-transparent text-sm outline-none w-full"
            />
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <ViewGridIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <ListBulletIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((doc, i) => (
              <div key={i} className="glass-card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                    <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doc.category}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {doc.pages} 页 · {doc.uploader} · {doc.date}
                    </p>
                  </div>
                  <button className="text-muted-foreground hover:text-foreground p-1">
                    <EyeOpenIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                  <th className="text-left px-4 py-3 font-medium">文档名称</th>
                  <th className="text-left px-4 py-3 font-medium">分类</th>
                  <th className="text-left px-4 py-3 font-medium">上传者</th>
                  <th className="text-left px-4 py-3 font-medium">日期</th>
                  <th className="px-4 py-3 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <FileTextIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="font-medium truncate">{doc.name}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{doc.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{doc.uploader}</td>
                    <td className="px-4 py-3 text-muted-foreground">{doc.date}</td>
                    <td className="px-4 py-3">
                      <button className="text-muted-foreground hover:text-foreground">
                        <EyeOpenIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

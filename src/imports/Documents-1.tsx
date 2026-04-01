import { useState } from "react";
import { FileTextIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const documents = [
  { name: "光伏行业深度报告2024.pdf", category: "行业研究", library: "公共库", date: "2024-12-15", status: "approved" as const, size: "2.4 MB", reason: "" },
  { name: "新能源估值手册.pdf", category: "公司研究", library: "私有库", date: "2024-12-14", status: "approved" as const, size: "890 KB", reason: "" },
  { name: "医疗器械竞争格局.pdf", category: "行业研究", library: "公共库", date: "2024-12-13", status: "pending" as const, size: "5.1 MB", reason: "" },
  { name: "半导体供需分析_Q4.pdf", category: "行业研究", library: "公共库", date: "2024-12-12", status: "approved" as const, size: "1.7 MB", reason: "" },
  { name: "ESG评级方法论2025.docx", category: "ESG", library: "公共库", date: "2024-12-11", status: "rejected" as const, size: "3.2 MB", reason: "数据来源不明确，缺少引用标注" },
];

const tabs = [
  { label: "全部", value: "all" },
  { label: "待审核", value: "pending" },
  { label: "已入库", value: "approved" },
  { label: "已拒绝", value: "rejected" },
];

export default function Documents() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const filtered = activeTab === "all" ? documents : documents.filter((d) => d.status === activeTab);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">我的文档</h1>
          <p className="text-sm text-muted-foreground">管理已上传文件，查看审核状态</p>
        </div>
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
          <FileTextIcon className="h-8 w-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-3">暂无文档</p>
          <Button size="sm" onClick={() => navigate("/upload")}>去上传</Button>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">文档名称</th>
                <th className="text-left px-4 py-3 font-medium">分类</th>
                <th className="text-left px-4 py-3 font-medium">库类型</th>
                <th className="text-left px-4 py-3 font-medium">上传时间</th>
                <th className="text-left px-4 py-3 font-medium">状态</th>
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
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{doc.category}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{doc.library}</td>
                  <td className="px-4 py-3 text-muted-foreground">{doc.date}</td>
                  <td className="px-4 py-3">
                    {doc.status === "rejected" && doc.reason ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <StatusBadge status={doc.status} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">拒绝原因：{doc.reason}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <StatusBadge status={doc.status} />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      <DotsVerticalIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

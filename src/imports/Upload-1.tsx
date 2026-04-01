import { UploadIcon, FileTextIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Progress } from "@/components/ui/progress";

interface FileItem {
  name: string;
  size: string;
  category: string;
  status: "上传中" | "解析中" | "分类完成";
  progress: number;
  library: string;
  partition: string;
}

const categories = ["行业研究", "宏观策略", "固定收益", "信用分析", "ESG", "公司研究", "其他"];
const partitions = ["光伏", "半导体", "医疗器械", "消费电子", "新能源汽车", "银行", "通用"];

export default function Upload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileItem[]>([
    { name: "光伏行业深度报告2024.pdf", size: "2.4 MB", category: "行业研究", status: "分类完成", progress: 100, library: "公共库", partition: "光伏" },
    { name: "新能源估值手册.pdf", size: "5.1 MB", category: "公司研究", status: "解析中", progress: 65, library: "私有库", partition: "新能源汽车" },
  ]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size > 1048576 ? `${(f.size / 1048576).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`,
      category: "其他",
      status: "上传中" as const,
      progress: 30,
      library: "公共库",
      partition: "通用",
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    // Simulate progress
    setTimeout(() => {
      setFiles((prev) => prev.map((f) => f.status === "上传中" ? { ...f, status: "解析中", progress: 65 } : f));
    }, 1500);
    setTimeout(() => {
      setFiles((prev) => prev.map((f) => f.status === "解析中" ? { ...f, status: "分类完成", progress: 100 } : f));
    }, 3000);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const statusMap: Record<string, "processing" | "pending" | "approved"> = {
    "上传中": "processing",
    "解析中": "processing",
    "分类完成": "approved",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">上传文档</h1>
        <p className="text-sm text-muted-foreground">添加研究文档到知识库</p>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple
        accept=".pdf,.pptx,.ppt,.xlsx,.xls,.docx,.doc,.txt,.mp3,.mp4"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        className={`glass-card border-2 border-dashed p-12 text-center transition-colors cursor-pointer ${
          dragActive ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        <UploadIcon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium mb-1">拖拽文件到此处或点击上传</p>
        <p className="text-xs text-muted-foreground">支持 PDF、PPT、Excel、Word、TXT、MP3、MP4，单文件最大 100MB</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">上传队列</p>
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <FileTextIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                  <select
                    value={file.category}
                    className="text-xs bg-muted border-0 rounded-md px-2 py-1 text-foreground"
                    onChange={(e) => {
                      const newFiles = [...files];
                      newFiles[i].category = e.target.value;
                      setFiles(newFiles);
                    }}
                  >
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  <select
                    value={file.library}
                    className="text-xs bg-muted border-0 rounded-md px-2 py-1 text-foreground"
                    onChange={(e) => {
                      const newFiles = [...files];
                      newFiles[i].library = e.target.value;
                      setFiles(newFiles);
                    }}
                  >
                    <option>公共库</option>
                    <option>私有库</option>
                  </select>
                  <select
                    value={file.partition}
                    className="text-xs bg-muted border-0 rounded-md px-2 py-1 text-foreground"
                    onChange={(e) => {
                      const newFiles = [...files];
                      newFiles[i].partition = e.target.value;
                      setFiles(newFiles);
                    }}
                  >
                    {partitions.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <StatusBadge status={statusMap[file.status]} />
                  <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-foreground">
                    <Cross2Icon className="h-3.5 w-3.5" />
                  </button>
                </div>
                {file.progress < 100 && (
                  <Progress value={file.progress} className="mt-2 h-1" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setFiles([])}>取消</Button>
            <Button size="sm">提交审核</Button>
          </div>
        </div>
      )}
    </div>
  );
}

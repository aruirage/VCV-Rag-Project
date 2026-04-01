import { UploadIcon, FileTextIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";

interface FileItem {
  name: string;
  size: string;
  category: string;
  status: "processing" | "pending";
}

const categories = ["Equity Research", "Macro", "Fixed Income", "Credit", "ESG", "Industry", "Other"];

export default function Upload() {
  const [files, setFiles] = useState<FileItem[]>([
    { name: "Tesla_10Q_Q3_2024.pdf", size: "2.4 MB", category: "Equity Research", status: "processing" },
  ]);
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Upload Documents</h1>
        <p className="text-sm text-muted-foreground">Add research documents to the knowledge base</p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
        className={`glass-card border-2 border-dashed p-12 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-border"
        }`}
      >
        <UploadIcon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium mb-1">Drop files here or click to upload</p>
        <p className="text-xs text-muted-foreground">PDF, PPTX, DOCX up to 50MB each</p>
        <Button variant="outline" size="sm" className="mt-4">
          Browse Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Upload Queue</p>
          <div className="space-y-2">
            {files.map((file, i) => (
              <div key={i} className="glass-card p-4 flex items-center gap-3">
                <FileTextIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
                <select
                  value={file.category}
                  className="text-xs bg-muted border-0 rounded-md px-2 py-1 text-foreground"
                  onChange={() => {}}
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <StatusBadge status={file.status} />
                <button className="text-muted-foreground hover:text-foreground">
                  <Cross2Icon className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button size="sm">Submit for Review</Button>
          </div>
        </div>
      )}
    </div>
  );
}

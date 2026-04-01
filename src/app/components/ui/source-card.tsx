import { FileTextIcon, PersonIcon } from '@radix-ui/react-icons';

interface SourceCardProps {
  filename: string;
  page: number;
  relevance: number;
  uploader: string;
}

export function SourceCard({ filename, page, relevance, uploader }: SourceCardProps) {
  return (
    <div className="glass-card p-3 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center shrink-0">
          <FileTextIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{filename}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span>第 {page} 页</span>
            <span>·</span>
            <span className="confidence-high font-medium">相关度 {relevance}%</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <PersonIcon className="h-3 w-3" />
              {uploader}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

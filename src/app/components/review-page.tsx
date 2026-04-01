import { FileTextIcon, CheckIcon, Cross2Icon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { StatusBadge } from './ui/status-badge';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

interface DocItem {
  name: string;
  category: string;
  uploader: string;
  date: string;
  size: string;
  pages: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

const initialDocs: DocItem[] = [
  { name: '医疗器械竞争格局.pdf', category: '行业研究', uploader: '张研究员', date: '12月15日', size: '5.1 MB', pages: 42, status: 'pending' },
  { name: '消费电子产业链梳理.pdf', category: '行业研究', uploader: '李研究员', date: '12月14日', size: '3.8 MB', pages: 28, status: 'pending' },
  { name: '银行业风险评估.pdf', category: '固定收益', uploader: '王总监', date: '12月13日', size: '1.2 MB', pages: 16, status: 'pending' },
  { name: '光伏行业深度报告2024.pdf', category: '行业研究', uploader: '张研究员', date: '12月10日', size: '2.4 MB', pages: 84, status: 'approved' },
  { name: '新能源估值手册.pdf', category: '公司研究', uploader: '李研究员', date: '12月8日', size: '890 KB', pages: 32, status: 'approved' },
  { name: 'ESG评级方法论2025.docx', category: 'ESG', uploader: '李研究员', date: '12月5日', size: '3.2 MB', pages: 44, status: 'rejected', reason: '数据来源不明确' },
];

const tabs = [
  { label: '待审核', value: 'pending' },
  { label: '已通过', value: 'approved' },
  { label: '已拒绝', value: 'rejected' },
];

export function ReviewPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const [docs, setDocs] = useState(initialDocs);
  const [rejectTarget, setRejectTarget] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [previewDoc, setPreviewDoc] = useState<DocItem | null>(null);

  const filtered = docs.filter((d) => d.status === activeTab);
  const pendingCount = docs.filter((d) => d.status === 'pending').length;

  const handleApprove = (index: number) => {
    const actualIndex = docs.findIndex((d) => d === filtered[index]);
    setDocs((prev) => prev.map((d, i) => (i === actualIndex ? { ...d, status: 'approved' as const } : d)));
  };

  const handleReject = () => {
    if (rejectTarget === null) return;
    const target = filtered[rejectTarget];
    const actualIndex = docs.findIndex((d) => d === target);
    setDocs((prev) =>
      prev.map((d, i) => (i === actualIndex ? { ...d, status: 'rejected' as const, reason: rejectReason } : d))
    );
    setRejectTarget(null);
    setRejectReason('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">审核管理</h1>
        <p className="text-sm text-muted-foreground">审批待入库的研究文档</p>
      </div>

      <div className="flex gap-1 mb-4">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTab(t.value)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              activeTab === t.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:bg-accent'
            }`}
          >
            {t.label}
            {t.value === 'pending' && pendingCount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <FileTextIcon className="h-8 w-8 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              暂无{tabs.find((t) => t.value === activeTab)?.label}文档
            </p>
          </div>
        ) : (
          filtered.map((doc, i) => (
            <div key={i} className="glass-card p-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                  <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="text-sm font-medium truncate hover:underline text-left"
                    >
                      {doc.name}
                    </button>
                    <StatusBadge status={doc.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {doc.pages} 页 · {doc.size} · 上传者：{doc.uploader} · {doc.date}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <p className="text-muted-foreground">
                      自动分类：
                      <span className="font-medium text-foreground px-1.5 py-0.5 bg-muted rounded ml-1">
                        {doc.category}
                      </span>
                    </p>
                  </div>
                  {doc.reason && <p className="text-xs text-destructive mt-2">拒绝原因：{doc.reason}</p>}
                </div>
                {doc.status === 'pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setPreviewDoc(doc)}>
                      <EyeOpenIcon className="h-3.5 w-3.5" /> 预览
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-destructive hover:text-destructive"
                      onClick={() => {
                        setRejectTarget(i);
                        setRejectReason('');
                      }}
                    >
                      <Cross2Icon className="h-3.5 w-3.5" /> 拒绝
                    </Button>
                    <Button size="sm" className="gap-1.5" onClick={() => handleApprove(i)}>
                      <CheckIcon className="h-3.5 w-3.5" /> 通过
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reject dialog */}
      <Dialog open={rejectTarget !== null} onOpenChange={() => setRejectTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>拒绝文档</DialogTitle>
            <DialogDescription>请输入拒绝原因，以便上传者了解问题所在</DialogDescription>
          </DialogHeader>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="请输入拒绝原因..."
            className="w-full h-24 rounded-md border border-input bg-card p-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectTarget(null)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
              确认拒绝
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview sheet */}
      <Sheet open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>{previewDoc?.name}</SheetTitle>
            <SheetDescription>
              {previewDoc?.category} · {previewDoc?.pages} 页 · {previewDoc?.size}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="bg-muted rounded-lg p-8 text-center">
              <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">文档预览区域</p>
              <p className="text-xs text-muted-foreground mt-1">实际部署后将显示文档内容</p>
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>上传者：{previewDoc?.uploader}</p>
              <p>上传时间：{previewDoc?.date}</p>
              <p>自动分类：{previewDoc?.category}</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
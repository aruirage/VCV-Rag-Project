import { FileTextIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { StatusBadge } from './ui/status-badge';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { useDocuments } from '../../hooks/useDocuments';
import { LoadingCard } from './ui/loading';
import { toast } from 'sonner';

const tabs = [
  { label: '全部', value: 'all' },
  { label: '待审核', value: 'pending' },
  { label: '已入库', value: 'approved' },
  { label: '已拒绝', value: 'rejected' },
];

export function DocumentsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const { documents, loading, error } = useDocuments();

  const filtered = activeTab === 'all' ? documents : documents.filter((d) => d.status === activeTab);

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <LoadingCard message="加载文档中..." />
      </div>
    );
  }

  if (error) {
    toast.error('加载文档时出错');
    return <div className="p-6 max-w-4xl mx-auto">加载文档时出错</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">我的文档</h1>
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
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:bg-accent'
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
          <Button size="sm" onClick={() => navigate('/upload')}>
            去上传
          </Button>
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
                <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">{doc.filename}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{doc.library}</td>
                  <td className="px-4 py-3 text-muted-foreground">{doc.date || doc.uploadTime}</td>
                  <td className="px-4 py-3">
                    {doc.status === 'rejected' && doc.reason ? (
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
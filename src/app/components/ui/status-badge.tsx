interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected' | 'processing';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    approved: { label: '已入库', className: 'bg-success/10 text-success' },
    pending: { label: '待审核', className: 'bg-warning/10 text-warning' },
    rejected: { label: '已拒绝', className: 'bg-destructive/10 text-destructive' },
    processing: { label: '处理中', className: 'bg-info/10 text-info' },
  };

  const { label, className } = config[status];

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}

interface ConfidenceBadgeProps {
  score: number;
}

export function ConfidenceBadge({ score }: ConfidenceBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return 'confidence-high';
    if (score >= 60) return 'confidence-medium';
    return 'confidence-low';
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">置信度</span>
      <span className={`text-xs font-semibold ${getColor(score)}`}>
        {score}%
      </span>
    </div>
  );
}

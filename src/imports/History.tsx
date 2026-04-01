import { ClockIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { useNavigate } from "react-router-dom";

const history = [
  { query: "Tesla's debt-to-equity ratio?", date: "2024-12-15 14:32", confidence: 87, sources: 3 },
  { query: "Compare NVIDIA vs AMD revenue growth 2024", date: "2024-12-15 11:05", confidence: 92, sources: 5 },
  { query: "Fed minutes summary on inflation outlook", date: "2024-12-14 16:48", confidence: 78, sources: 4 },
  { query: "Apple's capex forecast for 2025", date: "2024-12-14 09:22", confidence: 65, sources: 2 },
  { query: "Global EV market share by manufacturer", date: "2024-12-13 15:10", confidence: 91, sources: 6 },
  { query: "Interest rate sensitivity analysis for tech sector", date: "2024-12-13 10:33", confidence: 84, sources: 4 },
];

export default function History() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Search History</h1>
        <p className="text-sm text-muted-foreground">Your recent research queries and results</p>
      </div>

      <div className="space-y-1">
        {history.map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(`/conversations?q=${encodeURIComponent(item.query)}`)}
            className="w-full glass-card p-4 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.query}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {item.date} · {item.sources} sources
              </p>
            </div>
            <ConfidenceBadge score={item.confidence} />
          </button>
        ))}
      </div>
    </div>
  );
}

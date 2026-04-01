import { SearchInput } from "@/components/SearchInput";
import { useNavigate } from "react-router-dom";
import { ClockIcon, FileTextIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

const recentQueries = [
  "What is Tesla's current debt-to-equity ratio?",
  "Compare NVIDIA's revenue growth vs AMD in 2024",
  "Summarize the latest Fed minutes on inflation outlook",
];

const quickFilters = [
  { label: "All Sources", active: true },
  { label: "Public", active: false },
  { label: "Private", active: false },
  { label: "Macro", active: false },
  { label: "Equity", active: false },
];

export default function Index() {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/conversations?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3rem)] px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            What would you like to research?
          </h1>
          <p className="text-sm text-muted-foreground">
            Search across your team's knowledge base with AI-powered insights
          </p>
        </div>

        <SearchInput onSearch={handleSearch} large className="mb-4" />

        <div className="flex items-center gap-2 justify-center flex-wrap mb-8">
          {quickFilters.map((f) => (
            <button
              key={f.label}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                f.active
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 px-1">
              <ClockIcon className="h-3.5 w-3.5" />
              <span className="font-medium uppercase tracking-wider">Recent searches</span>
            </div>
            <div className="space-y-1">
              {recentQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSearch(q)}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-lg hover:bg-card transition-colors text-foreground/80 hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: FileTextIcon, label: "246 Documents", sub: "in knowledge base" },
              { icon: LightningBoltIcon, label: "1,847 Queries", sub: "this month" },
              { icon: ClockIcon, label: "2.3s Avg", sub: "response time" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <stat.icon className="h-4 w-4 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { FileTextIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const categories = ["All", "Equity Research", "Macro", "Fixed Income", "Credit", "ESG", "Industry"];

const docs = [
  { name: "Tesla_10Q_Q3_2024.pdf", category: "Equity Research", uploader: "Sarah Chen", date: "Dec 15", pages: 84 },
  { name: "Fed_Minutes_Nov2024.pdf", category: "Macro", uploader: "Mike Johnson", date: "Dec 14", pages: 32 },
  { name: "Credit_Risk_Report_Nov24.pdf", category: "Credit", uploader: "Lisa Wang", date: "Dec 12", pages: 28 },
  { name: "Global_EV_Market_2024.pdf", category: "Industry", uploader: "James Park", date: "Dec 10", pages: 56 },
  { name: "ESG_Scoring_Methodology.pdf", category: "ESG", uploader: "Anna Lee", date: "Dec 8", pages: 44 },
  { name: "US_Treasury_Outlook_2025.pdf", category: "Fixed Income", uploader: "David Kim", date: "Dec 5", pages: 18 },
  { name: "NVIDIA_Deep_Dive.pdf", category: "Equity Research", uploader: "Sarah Chen", date: "Dec 3", pages: 72 },
  { name: "China_PMI_Analysis.pdf", category: "Macro", uploader: "Mike Johnson", date: "Dec 1", pages: 14 },
];

export default function Library() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = docs.filter(
    (d) =>
      (active === "All" || d.category === active) &&
      d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Public Library</h1>
        <p className="text-sm text-muted-foreground">Browse shared knowledge base documents</p>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="glass-card flex items-center gap-2 px-3 py-2 flex-1 max-w-xs">
          <MagnifyingGlassIcon className="h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="bg-transparent text-sm outline-none w-full"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((doc, i) => (
          <div key={i} className="glass-card p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                <FileTextIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{doc.category}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {doc.pages} pages · by {doc.uploader} · {doc.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

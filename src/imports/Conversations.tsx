import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchInput } from "@/components/SearchInput";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { SourceCard } from "@/components/SourceCard";
import { motion } from "framer-motion";
import { ExclamationTriangleIcon, ChatBubbleIcon } from "@radix-ui/react-icons";

interface Message {
  role: "user" | "assistant";
  content: string;
  confidence?: number;
  sources?: { filename: string; page: number; relevance: number; uploader: string }[];
}

const mockResponse: Message = {
  role: "assistant",
  content: `Based on the latest filings and research reports in the knowledge base, here's what I found:

**Tesla's Debt-to-Equity Ratio** as of Q3 2024 stands at approximately **0.69**, which represents a significant improvement from the 1.08 ratio reported in Q3 2023.

Key factors driving this improvement:
1. **Debt reduction**: Tesla repaid $1.8B in convertible notes
2. **Retained earnings growth**: Net income of $7.1B YTD contributed to equity growth
3. **Cash position**: $26.1B in cash and short-term investments

The ratio is below the auto industry average of 1.2, indicating relatively conservative leverage compared to peers like GM (1.89) and Ford (3.45).

⚠️ **Note**: Some analyst reports suggest adjusting for operating lease liabilities, which would increase the effective ratio to approximately 0.82.`,
  confidence: 87,
  sources: [
    { filename: "Tesla_10Q_Q3_2024.pdf", page: 42, relevance: 96, uploader: "Sarah Chen" },
    { filename: "Auto_Industry_Comp_Analysis.pdf", page: 15, relevance: 84, uploader: "Mike Johnson" },
    { filename: "Credit_Risk_Report_Nov24.pdf", page: 8, relevance: 71, uploader: "Lisa Wang" },
  ],
};

export default function Conversations() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [messages, setMessages] = useState<Message[]>(
    initialQuery
      ? [
          { role: "user", content: initialQuery },
          mockResponse,
        ]
      : []
  );

  const handleSearch = (query: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: query },
      mockResponse,
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ChatBubbleIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">Start a conversation by asking a question below</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {msg.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl rounded-br-md max-w-lg text-sm">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Answer</span>
                      {msg.confidence && <ConfidenceBadge score={msg.confidence} />}
                    </div>

                    {msg.confidence && msg.confidence < 70 && (
                      <div className="flex items-start gap-2 bg-destructive/5 border border-destructive/20 rounded-md p-3 mb-4">
                        <ExclamationTriangleIcon className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                        <p className="text-xs text-destructive">
                          Low confidence — this answer may contain hallucinations. Please verify with source documents.
                        </p>
                      </div>
                    )}

                    <div className="prose prose-sm max-w-none text-sm leading-relaxed whitespace-pre-line">
                      {msg.content}
                    </div>
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
                        Sources ({msg.sources.length})
                      </p>
                      <div className="grid gap-2">
                        {msg.sources.map((src, j) => (
                          <SourceCard key={j} {...src} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-card px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <SearchInput onSearch={handleSearch} placeholder="Ask a follow-up question..." />
        </div>
      </div>
    </div>
  );
}

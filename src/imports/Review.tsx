import { FileTextIcon, CheckIcon, Cross2Icon, EyeOpenIcon } from "@radix-ui/react-icons";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

const pending = [
  { name: "NVIDIA_Competitive_Analysis.pptx", category: "Equity Research", uploader: "Sarah Chen", date: "Dec 15", size: "5.1 MB", pages: 42 },
  { name: "Crypto_Market_Overview_Q4.pdf", category: "Industry", uploader: "James Park", date: "Dec 14", size: "3.8 MB", pages: 28 },
  { name: "Japan_Macro_Outlook.pdf", category: "Macro", uploader: "David Kim", date: "Dec 13", size: "1.2 MB", pages: 16 },
];

export default function Review() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Document Review</h1>
          <p className="text-sm text-muted-foreground">{pending.length} documents pending approval</p>
        </div>
      </div>

      <div className="space-y-3">
        {pending.map((doc, i) => (
          <div key={i} className="glass-card p-4">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center shrink-0">
                <FileTextIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <StatusBadge status="pending" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {doc.category} · {doc.pages} pages · {doc.size} · Uploaded by {doc.uploader} on {doc.date}
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs">
                  <p className="text-muted-foreground">Auto-classified: <span className="font-medium text-foreground">{doc.category}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <EyeOpenIcon className="h-3.5 w-3.5" /> Preview
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                  <Cross2Icon className="h-3.5 w-3.5" /> Reject
                </Button>
                <Button size="sm" className="gap-1.5">
                  <CheckIcon className="h-3.5 w-3.5" /> Approve
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

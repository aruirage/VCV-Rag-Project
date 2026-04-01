import { FileTextIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { StatusBadge } from "@/components/StatusBadge";

const documents = [
  { name: "Tesla_10Q_Q3_2024.pdf", category: "Equity Research", date: "2024-12-15", status: "approved" as const, size: "2.4 MB" },
  { name: "Fed_Minutes_Nov2024.pdf", category: "Macro", date: "2024-12-14", status: "approved" as const, size: "890 KB" },
  { name: "NVIDIA_Competitive_Analysis.pptx", category: "Equity Research", date: "2024-12-13", status: "pending" as const, size: "5.1 MB" },
  { name: "Credit_Risk_Report_Nov24.pdf", category: "Credit", date: "2024-12-12", status: "approved" as const, size: "1.7 MB" },
  { name: "ESG_Framework_2025.docx", category: "ESG", date: "2024-12-11", status: "rejected" as const, size: "3.2 MB" },
];

export default function Documents() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">My Documents</h1>
          <p className="text-sm text-muted-foreground">Manage your uploaded files and track review status</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Document</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Date</th>
              <th className="text-left px-4 py-3 font-medium">Size</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 flex items-center gap-2">
                  <FileTextIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="font-medium truncate">{doc.name}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{doc.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{doc.date}</td>
                <td className="px-4 py-3 text-muted-foreground">{doc.size}</td>
                <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
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
    </div>
  );
}

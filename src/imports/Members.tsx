import { PersonIcon, PlusIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const members = [
  { name: "Sarah Chen", email: "sarah@buyside.com", role: "Super Admin", status: "Active", docs: 34 },
  { name: "Mike Johnson", email: "mike@buyside.com", role: "Admin", status: "Active", docs: 22 },
  { name: "Lisa Wang", email: "lisa@buyside.com", role: "Researcher", status: "Active", docs: 18 },
  { name: "James Park", email: "james@buyside.com", role: "Researcher", status: "Active", docs: 12 },
  { name: "David Kim", email: "david@buyside.com", role: "Researcher", status: "Active", docs: 8 },
  { name: "Anna Lee", email: "anna@buyside.com", role: "Guest", status: "Invited", docs: 0 },
];

const roleBg: Record<string, string> = {
  "Super Admin": "bg-primary text-primary-foreground",
  Admin: "bg-info/10 text-info",
  Researcher: "bg-success/10 text-success",
  Guest: "bg-muted text-muted-foreground",
};

export default function Members() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Team Members</h1>
          <p className="text-sm text-muted-foreground">{members.length} members in your organization</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <PlusIcon className="h-3.5 w-3.5" /> Invite Member
        </Button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
              <th className="text-left px-4 py-3 font-medium">Member</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-left px-4 py-3 font-medium">Documents</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleBg[m.role]}`}>
                    {m.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.status}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.docs}</td>
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Personal Information</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <span className="text-lg font-medium text-muted-foreground">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Senior Research Analyst</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs">Change Photo</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">First Name</Label>
              <Input defaultValue="John" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Last Name</Label>
              <Input defaultValue="Doe" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Email</Label>
              <Input defaultValue="john@buyside.com" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm">Title</Label>
              <Input defaultValue="Senior Research Analyst" className="mt-1" />
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Default Search Scope</Label>
              <select className="mt-1 w-full h-9 rounded-md border border-input bg-card px-3 text-sm">
                <option>All Sources</option>
                <option>Public Only</option>
                <option>Private Only</option>
              </select>
            </div>
            <div>
              <Label className="text-sm">Results per Page</Label>
              <select className="mt-1 w-full h-9 rounded-md border border-input bg-card px-3 text-sm">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Security</h2>
          <div className="space-y-3">
            <Button variant="outline" size="sm">Change Password</Button>
            <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

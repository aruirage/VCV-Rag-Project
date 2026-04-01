import { GearIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">System Settings</h1>
        <p className="text-sm text-muted-foreground">Configure search parameters and system behavior</p>
      </div>

      <div className="space-y-6">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Search Configuration</h2>
          <div className="space-y-5">
            <div>
              <Label className="text-sm">Minimum Confidence Threshold</Label>
              <p className="text-xs text-muted-foreground mb-3">Answers below this score will show a warning</p>
              <Slider defaultValue={[70]} max={100} min={30} step={5} className="w-64" />
              <p className="text-xs text-muted-foreground mt-1">70%</p>
            </div>
            <div>
              <Label className="text-sm">Max Source Documents</Label>
              <p className="text-xs text-muted-foreground mb-3">Number of source documents to retrieve per query</p>
              <Slider defaultValue={[5]} max={20} min={1} step={1} className="w-64" />
              <p className="text-xs text-muted-foreground mt-1">5 documents</p>
            </div>
            <div>
              <Label className="text-sm">Chunk Size (tokens)</Label>
              <p className="text-xs text-muted-foreground mb-3">Size of text chunks for document indexing</p>
              <Slider defaultValue={[512]} max={2048} min={128} step={128} className="w-64" />
              <p className="text-xs text-muted-foreground mt-1">512 tokens</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Hallucination Detection</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Enable Hallucination Detection</Label>
                <p className="text-xs text-muted-foreground">Flag answers that may not be supported by source material</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Auto-cite Sources</Label>
                <p className="text-xs text-muted-foreground">Automatically add inline citations to AI answers</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm">Cross-reference Check</Label>
                <p className="text-xs text-muted-foreground">Verify claims across multiple source documents</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold mb-4">Knowledge Base Partitions</h2>
          <div className="space-y-3">
            {["Equity Research", "Macro", "Fixed Income", "Credit", "ESG", "Industry"].map((p) => (
              <div key={p} className="flex items-center justify-between py-1">
                <span className="text-sm">{p}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

const settingsTabs = [
  { label: "知识库分区", value: "partitions" },
  { label: "检索参数", value: "search" },
  { label: "模型配置", value: "model" },
  { label: "回答风格", value: "style" },
  { label: "联网插件", value: "web" },
  { label: "幻觉检测", value: "hallucination" },
  { label: "系统通知", value: "notifications" },
];

const initialPartitions = ["光伏", "半导体", "医疗器械", "消费电子", "新能源汽车", "银行", "宏观策略"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("partitions");
  const [partitions, setPartitions] = useState(initialPartitions);
  const [newPartition, setNewPartition] = useState("");
  const [topK, setTopK] = useState([10]);
  const [threshold, setThreshold] = useState([70]);
  const [reranker, setReranker] = useState(true);
  const [llm, setLlm] = useState("GPT-4");
  const [apiKey, setApiKey] = useState("");
  const [answerStyle, setAnswerStyle] = useState("balanced");
  const [webPlugin, setWebPlugin] = useState(false);
  const [hallucinationDetection, setHallucinationDetection] = useState(true);
  const [notifyNewDoc, setNotifyNewDoc] = useState(true);
  const [notifyReview, setNotifyReview] = useState(true);
  const [notifySystem, setNotifySystem] = useState(false);

  const addPartition = () => {
    if (newPartition.trim() && !partitions.includes(newPartition.trim())) {
      setPartitions((prev) => [...prev, newPartition.trim()]);
      setNewPartition("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Left tab nav */}
      <div className="w-48 border-r border-border bg-card p-4 shrink-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">系统设置</p>
        {settingsTabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setActiveTab(t.value)}
            className={`w-full text-left text-sm px-3 py-2 rounded-md mb-1 transition-colors ${
              activeTab === t.value
                ? "bg-accent text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Right content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl">

          {activeTab === "partitions" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">知识库分区</h2>
              <p className="text-sm text-muted-foreground mb-4">管理知识库的分区分类</p>
              <div className="glass-card p-5">
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newPartition}
                    onChange={(e) => setNewPartition(e.target.value)}
                    placeholder="新分区名称"
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && addPartition()}
                  />
                  <Button size="sm" onClick={addPartition} className="gap-1.5">
                    <PlusIcon className="h-3.5 w-3.5" /> 添加
                  </Button>
                </div>
                <div className="space-y-2">
                  {partitions.map((p) => (
                    <div key={p} className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/50 transition-colors">
                      <span className="text-sm">{p}</span>
                      <div className="flex gap-1">
                        <button className="text-muted-foreground hover:text-foreground p-1"><Pencil1Icon className="h-3.5 w-3.5" /></button>
                        <button
                          onClick={() => setPartitions((prev) => prev.filter((x) => x !== p))}
                          className="text-muted-foreground hover:text-destructive p-1"
                        >
                          <TrashIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "search" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">检索参数</h2>
              <p className="text-sm text-muted-foreground mb-4">配置知识检索的核心参数</p>
              <div className="glass-card p-5 space-y-6">
                <div>
                  <Label className="text-sm">Top-K 检索数量</Label>
                  <p className="text-xs text-muted-foreground mb-3">每次查询返回的相关文档块数量</p>
                  <Slider value={topK} onValueChange={setTopK} max={20} min={5} step={1} className="w-64" />
                  <p className="text-xs text-muted-foreground mt-1">{topK[0]} 个</p>
                </div>
                <div>
                  <Label className="text-sm">置信度阈值</Label>
                  <p className="text-xs text-muted-foreground mb-3">低于此分数的回答将显示警告</p>
                  <Slider value={threshold} onValueChange={setThreshold} max={90} min={50} step={5} className="w-64" />
                  <p className="text-xs text-muted-foreground mt-1">{threshold[0]}%</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Reranker 重排序</Label>
                    <p className="text-xs text-muted-foreground">对初步检索结果进行精排</p>
                  </div>
                  <Switch checked={reranker} onCheckedChange={setReranker} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "model" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">模型配置</h2>
              <p className="text-sm text-muted-foreground mb-4">选择大语言模型和配置 API</p>
              <div className="glass-card p-5 space-y-4">
                <div>
                  <Label className="text-sm">大语言模型</Label>
                  <select
                    value={llm}
                    onChange={(e) => setLlm(e.target.value)}
                    className="mt-1 w-full h-9 rounded-md border border-input bg-card px-3 text-sm"
                  >
                    <option>GPT-4</option>
                    <option>通义千问</option>
                    <option>DeepSeek</option>
                    <option>自定义</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm">API Key</Label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">密钥将加密存储，不会明文显示</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "style" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">回答风格</h2>
              <p className="text-sm text-muted-foreground mb-4">设置 AI 回答的风格偏好</p>
              <div className="glass-card p-5 space-y-3">
                {[
                  { value: "precise", label: "严谨精确", desc: "优先引用原文，减少推理和发挥，适合合规场景" },
                  { value: "balanced", label: "均衡", desc: "在准确性和可读性之间取得平衡，适合日常研究" },
                  { value: "insight", label: "深度洞察", desc: "鼓励 AI 做更多分析和推理，适合投研讨论" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                      answerStyle === opt.value ? "bg-accent" : "hover:bg-muted/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answerStyle"
                      value={opt.value}
                      checked={answerStyle === opt.value}
                      onChange={(e) => setAnswerStyle(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === "web" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">联网插件</h2>
              <p className="text-sm text-muted-foreground mb-4">允许 AI 在知识库不足时搜索互联网</p>
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">启用联网搜索</Label>
                    <p className="text-xs text-muted-foreground">当知识库中无法找到相关内容时，自动搜索互联网补充回答</p>
                  </div>
                  <Switch checked={webPlugin} onCheckedChange={setWebPlugin} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "hallucination" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">幻觉检测</h2>
              <p className="text-sm text-muted-foreground mb-4">检测 AI 回答中可能存在的幻觉内容</p>
              <div className="glass-card p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">启用幻觉检测</Label>
                    <p className="text-xs text-muted-foreground">标记回答中可能不被原始文档支持的内容</p>
                  </div>
                  <Switch checked={hallucinationDetection} onCheckedChange={setHallucinationDetection} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">系统通知</h2>
              <p className="text-sm text-muted-foreground mb-4">配置邮件通知偏好</p>
              <div className="glass-card p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">新文档上传通知</Label>
                    <p className="text-xs text-muted-foreground">当有新文档上传时发送邮件提醒</p>
                  </div>
                  <Switch checked={notifyNewDoc} onCheckedChange={setNotifyNewDoc} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">审核结果通知</Label>
                    <p className="text-xs text-muted-foreground">文档审核通过或拒绝时发送通知</p>
                  </div>
                  <Switch checked={notifyReview} onCheckedChange={setNotifyReview} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm">系统更新通知</Label>
                    <p className="text-xs text-muted-foreground">系统版本更新和维护公告</p>
                  </div>
                  <Switch checked={notifySystem} onCheckedChange={setNotifySystem} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

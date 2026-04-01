import { useState } from 'react';
import { PlusIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, GearIcon, FileTextIcon, DownloadIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { LoadingSpinner } from './ui/loading';
import { toast } from 'sonner';

interface ResearchSnippet {
  id: string;
  title: string;
  question: string;
  content: string;
  source: { filename: string; page: number }[];
  note: string;
}

const mockSnippets: ResearchSnippet[] = [
  {
    id: '1',
    title: '光伏行业PE估值区间',
    question: '新能源光伏行业PE估值区间是多少？',
    content: '当前A股光伏板块整体PE（TTM）约为 18-25倍，处于近三年估值中枢偏下位置。主要细分领域估值：硅料环节 PE 8-12倍、电池片环节 PE 15-20倍、组件环节 PE 12-18倍、逆变器环节 PE 25-35倍。',
    source: [
      { filename: '光伏行业深度报告2024.pdf', page: 42 },
      { filename: '新能源估值手册.pdf', page: 15 },
    ],
    note: '',
  },
  {
    id: '2',
    title: '医疗器械竞争格局',
    question: '医疗器械行业竞争格局分析',
    content: '国内医疗器械市场呈现"外资主导高端，国产占据中低端"格局。进口替代是核心主题，国产龙头在影像设备、体外诊断等领域加速突破，市场份额从2020年的28%提升至2024年的41%。',
    source: [
      { filename: '医疗器械竞争格局.pdf', page: 12 },
    ],
    note: '需要补充最新的国产替代数据',
  },
];

const reportTemplates = [
  {
    id: 'memo',
    name: '投资备忘录',
    desc: '快速记录要点，500-800字简明版',
    structure: ['核心结论', '关键数据', '风险提示'],
  },
  {
    id: 'company',
    name: '公司研究报告',
    desc: '完整分析框架，2000-3000字标准版',
    structure: ['公司概况', '业务分析', '财务分析', '估值建议', '风险因素'],
  },
  {
    id: 'industry',
    name: '行业简报',
    desc: '宏观行业视角，1500-2500字',
    structure: ['行业概况', '竞争格局', '发展趋势', '投资机会'],
  },
];

export function ResearchBoardPage() {
  const [snippets, setSnippets] = useState(mockSnippets);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [generateOpen, setGenerateOpen] = useState(false);
  // 临时预览的报告（在弹窗中显示）
  const [previewReport, setPreviewReport] = useState<{
    templateName: string;
    sections: { title: string; content: string; sources: { filename: string; page: number }[] }[];
    date: string;
  } | null>(null);

  // 打开生成对话框时生成临时预览
  const openGenerateDialog = () => {
    if (!selectedTemplate || snippets.length === 0) return;
    
    const template = reportTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    // 生成临时预览（不保存到右侧）
    const sections = template.structure.map((section, i) => ({
      title: section,
      content: snippets[i % snippets.length]?.content || '基于研究板素材和知识库检索，本节内容将深入分析该主题。当前市场环境下，相关数据表明行业整体呈现稳健增长态势，头部企业市场份额持续提升。从技术迭代角度看，创新驱动成为核心竞争力的关键因素。建议持续关注政策导向和产业链上下游动态，以便及时把握投资机会。',
      sources: snippets[i % snippets.length]?.source || [],
    }));

    setPreviewReport({
      templateName: template.name,
      sections,
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
    
    setGenerateOpen(true);
  };

  const handleExport = (format: 'word' | 'pdf' | 'ppt') => {
    // 模拟导出文件
    const formatNames = {
      word: 'Word',
      pdf: 'PDF',
      ppt: 'PPT'
    };
    
    toast.success(`正在导出 ${formatNames[format]} 格式报告...`, {
      description: '文件将自动下载到您的下载文件夹',
      duration: 3000,
    });
    
    setGenerateOpen(false);
  };

  const moveSnippet = (index: number, direction: 'up' | 'down') => {
    const newSnippets = [...snippets];
    if (direction === 'up' && index > 0) {
      [newSnippets[index - 1], newSnippets[index]] = [newSnippets[index], newSnippets[index - 1]];
    } else if (direction === 'down' && index < snippets.length - 1) {
      [newSnippets[index], newSnippets[index + 1]] = [newSnippets[index + 1], newSnippets[index]];
    }
    setSnippets(newSnippets);
  };

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter(s => s.id !== id));
  };

  const updateNote = (id: string, note: string) => {
    setSnippets(snippets.map(s => s.id === id ? { ...s, note } : s));
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* 左侧：研究板面板 */}
      <div className="w-[420px] border-r border-border bg-white overflow-y-auto shrink-0">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-semibold text-foreground">研究板</h2>
            <button
              onClick={() => setSnippets([])}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              清空
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {snippets.length} 个片段 · {snippets.reduce((acc, s) => acc + s.source.length, 0)} 个来源
          </p>
        </div>

        <div className="p-3 space-y-3">
          {snippets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <FileTextIcon className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-1">研究板为空</p>
              <p className="text-xs text-muted-foreground">
                在对话页点击"加入研究板"收集素材
              </p>
            </div>
          ) : (
            snippets.map((snippet, i) => (
              <div key={snippet.id} className="glass-card p-3">
                <div className="flex items-start gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium mb-1 truncate">{snippet.title}</p>
                    <p className="text-xs text-muted-foreground mb-2">问题：{snippet.question}</p>
                    <p className="text-xs leading-relaxed line-clamp-3">{snippet.content}</p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => moveSnippet(i, 'up')}
                      disabled={i === 0}
                      className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-30"
                    >
                      <ChevronUpIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => moveSnippet(i, 'down')}
                      disabled={i === snippets.length - 1}
                      className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-30"
                    >
                      <ChevronDownIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => deleteSnippet(snippet.id)}
                      className="p-1 hover:bg-destructive/10 rounded transition-colors"
                    >
                      <TrashIcon className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground mb-2">
                  <span className="font-medium">来源：</span>
                  {snippet.source.map((s, j) => (
                    <span key={j}>
                      {s.filename.split('.')[0]}, p.{s.page}
                      {j < snippet.source.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>

                <textarea
                  value={snippet.note}
                  onChange={(e) => updateNote(snippet.id, e.target.value)}
                  placeholder="添加研究员备注..."
                  className="w-full text-xs p-2 bg-muted/30 border border-border rounded-md outline-none focus:ring-1 focus:ring-ring resize-none"
                  rows={2}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* 右侧：报告生成面板 */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold mb-1 text-foreground">报告生成</h1>
                <p className="text-sm text-muted-foreground">
                  选择模板，基于研究板素材生成报告
                </p>
              </div>
              <Button
                size="sm"
                onClick={openGenerateDialog}
                disabled={snippets.length === 0 || !selectedTemplate}
              >
                生成报告
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">选择报告模板：</p>
            <div className="grid gap-4">
              {reportTemplates.map((template) => (
                <label
                  key={template.id}
                  className={`glass-card p-4 cursor-pointer transition-all ${
                    selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={template.id}
                    checked={selectedTemplate === template.id}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="hidden"
                  />
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">{template.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">{template.desc}</p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">章节结构：</span>
                        {template.structure.join(' / ')}
                      </p>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <span className="text-xs text-primary-foreground">✓</span>
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {snippets.length === 0 && (
              <div className="glass-card p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  研究板为空，请先在对话页添加素材片段
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 生成报告对话框 - 显示完整预览 */}
      <Dialog open={generateOpen} onOpenChange={setGenerateOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-foreground">报告预览</DialogTitle>
            <DialogDescription>
              基于研究板的 {snippets.length} 个素材片段生成的完整报告
            </DialogDescription>
          </DialogHeader>
          
          {/* 报告预览内容 - 可滚动 */}
          <div className="flex-1 overflow-y-auto py-4">
            {previewReport && <ReportPreviewInDialog report={previewReport} />}
          </div>
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setGenerateOpen(false)}>
              返回
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={() => handleExport('ppt')}>
              <DownloadIcon className="h-3.5 w-3.5" /> 导出 PPT
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={() => handleExport('word')}>
              <DownloadIcon className="h-3.5 w-3.5" /> 导出 Word
            </Button>
            <Button className="gap-1.5" onClick={() => handleExport('pdf')}>
              <DownloadIcon className="h-3.5 w-3.5" /> 导出 PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 报告预览组件 - 真实的文档样式
function ReportPreview({ report }: { report: { templateName: string; sections: { title: string; content: string; sources: { filename: string; page: number }[] }[]; date: string } }) {
  return (
    <div className="glass-card p-8 bg-white">
      {/* 报告头部 */}
      <div className="border-b-2 border-primary pb-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">{report.templateName}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>生成时间：{report.date}</span>
          <span>•</span>
          <span>Buy-side Insight 研究系统</span>
        </div>
      </div>

      {/* 报告内容 */}
      <div className="space-y-8">
        {report.sections.map((section, i) => (
          <div key={i} className="space-y-3">
            {/* 章节标题 */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-primary">{i + 1}.</span>
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>

            {/* 章节内容 */}
            <div className="pl-6">
              <p className="text-sm leading-relaxed text-foreground/90">
                {section.content}
              </p>

              {/* 引用来源 */}
              {section.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-2">参考文献：</p>
                  <ul className="space-y-1">
                    {section.sources.map((source, j) => (
                      <li key={j} className="text-xs text-muted-foreground pl-4">
                        [{j + 1}] {source.filename}, 第 {source.page} 页
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 报告尾部 */}
      <div className="mt-12 pt-6 border-t border-border">
        <div className="bg-muted/30 rounded-md p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium">免责声明：</span>
            本报告由 Buy-side Insight 研究系统基于研究板素材自动生成，内容仅供内部研究参考使用，不构成任何投资建议。
            报告中的数据和观点来源于公开资料及知识库文档，我们力求准确可靠，但不对其完整性和时效性作出保证。
            投资者应当充分了解投资风险，审慎决策，自行承担投资结果。
          </p>
        </div>
      </div>
    </div>
  );
}

// 对话框内的报告预览组件
function ReportPreviewInDialog({ report }: { report: { templateName: string; sections: { title: string; content: string; sources: { filename: string; page: number }[] }[]; date: string } }) {
  return (
    <div className="glass-card p-8 bg-white">
      {/* 报告头部 */}
      <div className="border-b-2 border-primary pb-6 mb-8">
        <h1 className="text-2xl font-bold mb-2 text-foreground">{report.templateName}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>生成时间：{report.date}</span>
          <span>•</span>
          <span>Buy-side Insight 研究系统</span>
        </div>
      </div>

      {/* 报告内容 */}
      <div className="space-y-8">
        {report.sections.map((section, i) => (
          <div key={i} className="space-y-3">
            {/* 章节标题 */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-primary">{i + 1}.</span>
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            </div>

            {/* 章节内容 */}
            <div className="pl-6">
              <p className="text-sm leading-relaxed text-foreground/90">
                {section.content}
              </p>

              {/* 引用来源 */}
              {section.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-2">参考文献：</p>
                  <ul className="space-y-1">
                    {section.sources.map((source, j) => (
                      <li key={j} className="text-xs text-muted-foreground pl-4">
                        [{j + 1}] {source.filename}, 第 {source.page} 页
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 报告尾部 */}
      <div className="mt-12 pt-6 border-t border-border">
        <div className="bg-muted/30 rounded-md p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium">免责声明：</span>
            本报告由 Buy-side Insight 研究系统基于研究板素材自动生成，内容仅供内部研究参考使用，不构成任何投资建议。
            报告中的数据和观点来源于公开资料及知识库文档，我们力求准确可靠，但不对其完整性和时效性作出保证。
            投资者应当充分了解投资风险，审慎决策，自行承担投资结果。
          </p>
        </div>
      </div>
    </div>
  );
}
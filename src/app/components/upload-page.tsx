import { useState, useRef } from 'react';
import { UploadIcon, FileTextIcon, ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'parse-error' | 'transcribe-error';
  category?: string;
  library?: string;
  tags?: string[];
}

export function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      file: null as any,
      name: '光伏行业深度报告2024.pdf',
      size: '2.4 MB',
      progress: 100,
      status: 'completed',
      category: '行业研究',
      library: '公共库',
      tags: ['光伏'],
    },
    {
      id: '2',
      file: null as any,
      name: '新能源估值手册.pdf',
      size: '5.1 MB',
      progress: 65,
      status: 'uploading',
      category: '公司研究',
      library: '私有库',
      tags: ['新能源汽车'],
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles: UploadedFile[] = Array.from(fileList).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      name: file.name,
      size: formatFileSize(file.size),
      progress: 0,
      status: 'uploading',
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const updateFileField = (fileId: string, field: keyof UploadedFile, value: any) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, [field]: value } : f));
  };

  const categories = ['行业研究', '公司研究', '专家访谈', '政策法规', '申报材料', '个人笔记'];
  const libraryTypes = ['公共库', '私有库'];
  const tagOptions = ['光伏', '新能源汽车', '半导体', '医疗器械', '消费', '其他'];

  return (
    <div className="p-8">
      {/* 标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-1">上传文档</h1>
        <p className="text-sm text-[#71717a]">添加研究文档到知识库</p>
      </div>

      {/* 上传区域 */}
      <div
        className={`bg-white rounded-lg border-2 border-dashed p-16 text-center mb-8 transition-colors cursor-pointer ${
          isDragging ? 'border-[#3b82f6] bg-[#eff6ff]' : 'border-[#e4e4e7]'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadIcon className="h-12 w-12 mx-auto mb-4 text-[#a1a1aa]" />
        <p className="text-base font-medium mb-2 text-[#18181b]">拖拽文件到此处或点击上传</p>
        <p className="text-sm text-[#71717a]">
          支持 PDF、PPT、Excel、Word、TXT、MP3、MP4，单文件最大 100MB
        </p>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.mp3,.mp4"
        />
      </div>

      {/* 上传队列 */}
      {files.length > 0 && (
        <div>
          <h2 className="text-base font-semibold mb-4 text-[#18181b]">上传队列</h2>

          <div className="space-y-3 mb-6">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-white rounded-lg border border-[#e4e4e7] p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  {/* 文件图标 */}
                  <FileTextIcon className="h-5 w-5 text-[#a1a1aa] shrink-0 mt-0.5" />

                  {/* 文件名和大小 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#18181b] truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-[#71717a]">{file.size}</p>
                  </div>

                  {/* 下拉选择和状态 */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* 分类下拉 */}
                    <select 
                      className="px-3 py-1.5 text-sm border border-[#e4e4e7] rounded-md bg-white text-[#18181b] cursor-pointer"
                      value={file.category || ''}
                      onChange={(e) => updateFileField(file.id, 'category', e.target.value)}
                    >
                      <option value="">选择分类</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    {/* 入库类型下拉 */}
                    <select 
                      className="px-3 py-1.5 text-sm border border-[#e4e4e7] rounded-md bg-white text-[#18181b] cursor-pointer"
                      value={file.library || '公共库'}
                      onChange={(e) => updateFileField(file.id, 'library', e.target.value)}
                    >
                      {libraryTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>

                    {/* 标签下拉 */}
                    <select 
                      className="px-3 py-1.5 text-sm border border-[#e4e4e7] rounded-md bg-white text-[#18181b] cursor-pointer"
                      value={file.tags?.[0] || ''}
                      onChange={(e) => updateFileField(file.id, 'tags', [e.target.value])}
                    >
                      <option value="">选择标签</option>
                      {tagOptions.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>

                    {/* 状态标签 */}
                    {file.status === 'completed' && (
                      <span className="px-3 py-1 text-xs font-medium text-[#10b981] bg-[#d1fae5] rounded-md">
                        已入库
                      </span>
                    )}
                    {(file.status === 'uploading' || file.status === 'processing') && (
                      <span className="px-3 py-1 text-xs font-medium text-[#3b82f6] bg-[#dbeafe] rounded-md">
                        处理中
                      </span>
                    )}
                    {file.status === 'parse-error' && (
                      <span className="px-3 py-1 text-xs font-medium text-[#ef4444] bg-[#fee2e2] rounded-md">
                        解析失败
                      </span>
                    )}
                    {file.status === 'transcribe-error' && (
                      <span className="px-3 py-1 text-xs font-medium text-[#ef4444] bg-[#fee2e2] rounded-md">
                        转写失败
                      </span>
                    )}

                    {/* 删除按钮 */}
                    <button
                      onClick={() => removeFile(file.id)}
                      disabled={file.status === 'uploading' || file.status === 'processing'}
                      className={`p-1 rounded transition-colors ${
                        file.status === 'uploading' || file.status === 'processing'
                          ? 'opacity-40 cursor-not-allowed'
                          : 'hover:bg-[#f4f4f5]'
                      }`}
                    >
                      <Cross2Icon className="h-4 w-4 text-[#71717a]" />
                    </button>
                  </div>
                </div>

                {/* 进度条 */}
                {(file.status === 'uploading' || file.status === 'processing') && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-[#f4f4f5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#71717a] w-10 text-right">{file.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 底部按钮 */}
          <div className="flex items-center justify-end gap-3">
            <button className="px-4 py-2 text-sm text-[#71717a] hover:bg-[#f4f4f5] rounded-md transition-colors">
              取消
            </button>
            <button className="px-4 py-2 text-sm bg-[#18181b] text-white hover:opacity-90 rounded-md transition-opacity">
              提交审核
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
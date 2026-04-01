// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'approver' | 'admin';
  avatar?: string;
}

// 文档相关类型
export interface Document {
  id: string;
  filename: string;
  name?: string; // 别名，兼容旧代码
  size: string;
  uploadTime: string;
  uploader: string;
  status: 'pending' | 'approved' | 'rejected';
  tags: string[];
  category?: string;
  isPublic?: boolean;
  library?: string; // '公共库' | '私有库'
  reason?: string; // 拒绝原因
  date?: string; // 别名，兼容旧代码
}

// 对话消息类型
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: DocumentSource[];
  confidence?: number;
}

export interface DocumentSource {
  filename: string;
  page: number;
  relevance: number;
}

// 研究板片段类型
export interface ResearchSnippet {
  id: string;
  title: string;
  question: string;
  content: string;
  source: { filename: string; page: number }[];
  note: string;
  createdAt?: string;
}

// 报告模板类型
export interface ReportTemplate {
  id: string;
  name: string;
  desc: string;
  structure: string[];
}

// 生成的报告类型
export interface GeneratedReport {
  id?: string;
  templateName: string;
  sections: ReportSection[];
  date: string;
  createdBy?: string;
}

export interface ReportSection {
  title: string;
  content: string;
  sources: { filename: string; page: number }[];
}

// 审批相关类型
export interface ApprovalRequest {
  id: string;
  documentName: string;
  uploader: string;
  uploadTime: string;
  size: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  reviewer?: string;
  reviewTime?: string;
  comment?: string;
}

// 系统设置类型
export interface SystemSettings {
  knowledgeBase: {
    partitions: string[];
    enableAutoTag: boolean;
  };
  retrieval: {
    topK: number;
    similarityThreshold: number;
    enableRerank: boolean;
  };
  model: {
    provider: string;
    modelName: string;
    temperature: number;
    maxTokens: number;
  };
  answerStyle: {
    style: 'precise' | 'balanced' | 'insightful';
    customPrompt?: string;
  };
}
import { createClient } from '@supabase/supabase-js';

// Supabase配置
// 生产环境应该使用环境变量
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 检查Supabase是否已配置
export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// 创建Supabase客户端（仅在配置存在时）
export const supabase = isSupabaseConfigured() 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// 数据库表名常量
export const TABLES = {
  DOCUMENTS: 'documents',
  CONVERSATIONS: 'conversations',
  RESEARCH_SNIPPETS: 'research_snippets',
  APPROVALS: 'approvals',
} as const;
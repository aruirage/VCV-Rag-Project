import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured, TABLES } from '../lib/supabase';
import { Document } from '../types';
import { toast } from 'sonner';

// Mock数据作为后备
const mockDocuments: Document[] = [
  {
    id: '1',
    filename: '光伏行业深度报告2024.pdf',
    name: '光伏行业深度报告2024.pdf',
    size: '12.5MB',
    uploadTime: '2024-03-15 14:30',
    date: '2024-03-15',
    uploader: '张研究员',
    status: 'approved',
    tags: ['公司', '新能源'],
    category: '行业研究',
    isPublic: true,
    library: '公共库',
  },
  {
    id: '2',
    filename: '新能源估值手册.pdf',
    name: '新能源估值手册.pdf',
    size: '8.2MB',
    uploadTime: '2024-03-14 09:15',
    date: '2024-03-14',
    uploader: '李分析师',
    status: 'approved',
    tags: ['行业', '医疗'],
    category: '公司研究',
    isPublic: false,
    library: '私有库',
  },
  {
    id: '3',
    filename: '医疗器械竞争格局.pdf',
    name: '医疗器械竞争格局.pdf',
    size: '15.8MB',
    uploadTime: '2024-03-13 16:45',
    date: '2024-03-13',
    uploader: '王经理',
    status: 'pending',
    tags: ['行业', '科技'],
    category: '行业研究',
    isPublic: true,
    library: '公共库',
  },
  {
    id: '4',
    filename: '半导体供需分析_Q4.pdf',
    name: '半导体供需分析_Q4.pdf',
    size: '1.7MB',
    uploadTime: '2024-03-12 11:20',
    date: '2024-03-12',
    uploader: '赵研究员',
    status: 'approved',
    tags: ['行业', '科技'],
    category: '行业研究',
    isPublic: true,
    library: '公共库',
  },
  {
    id: '5',
    filename: 'ESG评级方法论2025.docx',
    name: 'ESG评级方法论2025.docx',
    size: '3.2MB',
    uploadTime: '2024-03-11 15:30',
    date: '2024-03-11',
    uploader: '孙分析师',
    status: 'rejected',
    tags: ['ESG'],
    category: 'ESG',
    isPublic: false,
    library: '私有库',
    reason: '数据来源不明确，缺少引用标注',
  },
];

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const useSupabase = isSupabaseConfigured();

  // 获取文档列表
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      if (useSupabase && supabase) {
        const { data, error: fetchError } = await supabase
          .from(TABLES.DOCUMENTS)
          .select('*')
          .order('uploadTime', { ascending: false });

        if (fetchError) throw fetchError;
        setDocuments(data || []);
      } else {
        // 使用mock数据
        await new Promise(resolve => setTimeout(resolve, 500)); // 模拟网络延迟
        setDocuments(mockDocuments);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '获取文档列表失败';
      setError(message);
      toast.error(message);
      // 出错时使用mock数据
      setDocuments(mockDocuments);
    } finally {
      setLoading(false);
    }
  };

  // 添加文档
  const addDocument = async (doc: Omit<Document, 'id'>) => {
    try {
      if (useSupabase && supabase) {
        const { data, error: insertError } = await supabase
          .from(TABLES.DOCUMENTS)
          .insert([doc])
          .select()
          .single();

        if (insertError) throw insertError;
        
        setDocuments(prev => [data, ...prev]);
        toast.success('文档上传成功');
        return data;
      } else {
        // Mock模式
        await new Promise(resolve => setTimeout(resolve, 300));
        const newDoc = { ...doc, id: Date.now().toString() };
        setDocuments(prev => [newDoc, ...prev]);
        toast.success('文档上传成功（Mock模式）');
        return newDoc;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '上传文档失败';
      toast.error(message);
      throw err;
    }
  };

  // 更新文档
  const updateDocument = async (id: string, updates: Partial<Document>) => {
    try {
      if (useSupabase && supabase) {
        const { error: updateError } = await supabase
          .from(TABLES.DOCUMENTS)
          .update(updates)
          .eq('id', id);

        if (updateError) throw updateError;
      } else {
        // Mock模式
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setDocuments(prev =>
        prev.map(doc => (doc.id === id ? { ...doc, ...updates } : doc))
      );
      toast.success('文档更新成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '更新文档失败';
      toast.error(message);
      throw err;
    }
  };

  // 删除文档
  const deleteDocument = async (id: string) => {
    try {
      if (useSupabase && supabase) {
        const { error: deleteError } = await supabase
          .from(TABLES.DOCUMENTS)
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;
      } else {
        // Mock模式
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      setDocuments(prev => prev.filter(doc => doc.id !== id));
      toast.success('文档删除成功');
    } catch (err) {
      const message = err instanceof Error ? err.message : '删除文档失败';
      toast.error(message);
      throw err;
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return {
    documents,
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    refetch: fetchDocuments,
    useSupabase,
  };
}
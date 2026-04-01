import { useState } from 'react';
import { Search, ChevronDown, Upload, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router';

export function SearchHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('all');
  const [showScopeMenu, setShowScopeMenu] = useState(false);

  const scopeOptions = [
    { id: 'all', label: '全部文档' },
    { id: 'public', label: '公共文档库' },
    { id: 'private', label: '私有文档库' },
    { id: 'by-category', label: '按分区检索' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Starting new search:', { query: searchQuery, scope: searchScope });
      // Navigate to conversation page
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{ 
        fontFamily: 'Inter, sans-serif',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Top Bar */}
      <div 
        className="w-full flex items-center justify-between px-8 border-b"
        style={{
          height: '64px',
          borderColor: '#e5e7eb'
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-7 h-7 flex items-center justify-center"
            style={{
              backgroundColor: '#000000',
              borderRadius: '6px'
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: 700 }}>B</span>
          </div>
          <span 
            style={{ 
              fontSize: '15px',
              fontWeight: 600,
              color: '#000000'
            }}
          >
            Buy-side Insight
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6b7280'
            }}
          >
            <Upload className="w-4 h-4" strokeWidth={2} />
            上传文件
          </button>
          
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#000000' }}>
              张研究员
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="hover:opacity-70 transition-opacity"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <LogOut className="w-4 h-4 text-[#6b7280]" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-3xl">
          {/* Search Box */}
          <form onSubmit={handleSearch}>
            <div 
              className="flex items-stretch overflow-hidden mb-3"
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Search Icon */}
              <div className="flex items-center pl-5 pr-3">
                <Search className="w-5 h-5 text-[#9ca3af]" strokeWidth={2} />
              </div>

              {/* Input */}
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索知识库..."
                className="flex-1 border-0 focus:ring-0 focus:outline-none p-0 h-auto"
                style={{
                  fontSize: '16px',
                  color: '#000000',
                  backgroundColor: 'transparent',
                  height: '54px'
                }}
              />

              {/* Scope Dropdown */}
              <div className="relative border-l" style={{ borderColor: '#e5e7eb' }}>
                <button
                  type="button"
                  onClick={() => setShowScopeMenu(!showScopeMenu)}
                  className="h-full px-5 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                  style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    minWidth: '130px'
                  }}
                >
                  {scopeOptions.find(s => s.id === searchScope)?.label || '全部文档'}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showScopeMenu && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-52 py-1"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      zIndex: 10
                    }}
                  >
                    {scopeOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSearchScope(option.id);
                          setShowScopeMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#000000',
                          backgroundColor: searchScope === option.id ? '#f9fafb' : 'transparent',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>

          {/* Hint text */}
          <p 
            className="text-center"
            style={{ 
              fontSize: '13px',
              color: '#9ca3af',
              fontWeight: 400
            }}
          >
            例如：新能源行业2024年估值水平如何？
          </p>
        </div>
      </div>
    </div>
  );
}
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from './input';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  large?: boolean;
  className?: string;
}

export function SearchInput({ 
  onSearch, 
  placeholder = '输入问题...', 
  large = false,
  className = '' 
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    if (query.trim()) {
      onSearch(query.trim());
      e.currentTarget.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className={`glass-card flex items-center gap-3 ${large ? 'px-4 py-3' : 'px-3 py-2'}`}>
        <MagnifyingGlassIcon className={`${large ? 'h-5 w-5' : 'h-4 w-4'} text-muted-foreground shrink-0`} />
        <Input
          name="query"
          placeholder={placeholder}
          className={`bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
            large ? 'text-base h-auto py-0' : 'text-sm h-auto py-0'
          }`}
        />
      </div>
    </form>
  );
}

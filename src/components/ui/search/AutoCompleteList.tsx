'use client';

import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

interface AutoCompleteListProps {
  suggestions: string[];
  isVisible: boolean;
  onSelect: (suggestion: string) => void;
  highlightedIndex: number;
}

export default function AutoCompleteList({
  suggestions,
  isVisible,
  onSelect,
  highlightedIndex,
}: AutoCompleteListProps) {
  const router = useRouter();

  if (!isVisible || suggestions.length === 0) return null;

  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);

    const searchParams = new URLSearchParams();
    searchParams.set('query', suggestion);

    router.push(`/result?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className='absolute left-0 right-0 top-full bg-white shadow-lg z-10 max-h-96 overflow-y-auto rounded-b-md border border-gray-100'>
      <ul role='listbox' id='search-suggestions' className='py-1'>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            role='option'
            aria-selected={index === highlightedIndex}
            className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-150 ${
              index === highlightedIndex
                ? 'bg-gray-200 text-primary-200'
                : 'hover:bg-gray-200 text-gray-700 hover:text-primary-200'
            }`}
            onClick={() => handleSelect(suggestion)}
            title={suggestion}
          >
            <SearchIcon
              className={`w-4 h-4 mr-3 flex-shrink-0 ${
                index === highlightedIndex
                  ? 'text-text-primary-200'
                  : 'text-gray-400'
              }`}
            />
            <span className='text-sm font-medium truncate max-w-full'>
              {suggestion}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

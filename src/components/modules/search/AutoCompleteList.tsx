'use client';

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
  if (!isVisible || suggestions.length === 0) return null;

  // router 제거 및 handleSelect 단순화
  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);
  };

  return (
    <div className='absolute left-0 right-0 top-full bg-white shadow-md z-10 max-h-80 overflow-y-auto rounded-b-md'>
      <ul role='listbox' id='search-suggestions' className='py-2'>
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            role='option'
            aria-selected={index === highlightedIndex}
            className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              index === highlightedIndex ? 'bg-gray-100' : ''
            }`}
            onClick={() => handleSelect(suggestion)}
          >
            <SearchIcon className='w-4 h-4 mr-2 text-gray-500' />
            <span className='text-sm'>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

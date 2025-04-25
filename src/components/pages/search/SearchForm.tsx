'use client';
import type React from 'react';
import { Search, X } from 'lucide-react';

import AutoCompleteList from '@/components/ui/search/AutoCompleteList';
import Prev from '@/components/layouts/Header/Prev';
import { useSearch } from '@/hooks/useSearch';

interface SearchFormProps {
  isGuest?: boolean;
  onAddSearch?: (keyword: string) => void;
}

export default function SearchForm({
  isGuest = false,
  onAddSearch,
}: SearchFormProps) {
  const {
    inputValue,
    suggestions,
    showSuggestions,
    highlightedIndex,
    isFocused,
    inputRef,
    formRef,
    suggestionsRef,
    handleSubmitSearch,
    handleClickBack,
    handleInputChange,
    handleKeyDown,
    handleSelectSuggestion,
    handleInputFocus,
    handleInputBlur,
    handleClearInput,
  } = useSearch(isGuest, onAddSearch);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmitSearch}
      className='flex justify-between gap-2 px-6 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.1)] relative'
    >
      {!isGuest && <Prev />}
      <div
        ref={suggestionsRef}
        className={`grid grid-cols-[1fr_auto_auto] items-center w-full bg-[#F7F7F7] placeholder-text-[#d9d9d9] text-[13px] font-semibold px-2 rounded-sm relative`}
      >
        <input
          ref={inputRef}
          type='text'
          name='query'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder='검색어를 입력해주세요'
          className='outline-none px-2 py-2'
          autoComplete='off'
          aria-autocomplete='list'
          aria-controls='search-suggestions'
          role='combobox'
          aria-expanded={showSuggestions}
          aria-haspopup='listbox'
        />

        {inputValue && (
          <button
            type='button'
            onClick={handleClearInput}
            className='flex items-center justify-center'
            aria-label='검색어 지우기'
          >
            <X className='w-4 h-4 text-gray-500' />
          </button>
        )}

        <button
          type='submit'
          className='w-fit flex items-center justify-center'
          aria-label='검색'
        >
          <Search className='w-5 h-5 text-gray-500' />
        </button>

        <AutoCompleteList
          suggestions={suggestions}
          isVisible={showSuggestions && isFocused}
          onSelect={handleSelectSuggestion}
          highlightedIndex={highlightedIndex}
        />
      </div>

      <button
        onClick={handleClickBack}
        type='button'
        className='w-fit cursor-pointer'
        aria-label='닫기'
      >
        <X width={24} height={24} className='text-gray-900' />
      </button>
    </form>
  );
}

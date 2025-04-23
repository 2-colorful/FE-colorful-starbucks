'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

import {
  getAutoCompleteResult,
  addRecentSearchHistory,
} from '@/actions/search-service';
import AutoCompleteList from '@/components/ui/search/AutoCompleteList';
import useDebounce from '@/hooks/useDebounce';

export default function SearchForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const debounce = useDebounce();

  const fetchSuggestions = async (value: string) => {
    if (value.trim()) {
      try {
        const results = await getAutoCompleteResult(value);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const searchParams = new URLSearchParams();
    searchParams.set('query', inputValue);

    try {
      await addRecentSearchHistory(inputValue);
      router.push(`/result?${searchParams.toString()}`, {
        scroll: false,
      });
    } catch (error) {
      console.error('Error submitting search:', error);
    }
  };

  const handleClickBack = () => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
    debouncedFetchSuggestions(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    if (formRef.current) {
      setTimeout(() => formRef.current?.requestSubmit(), 0);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (inputValue.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        setShowSuggestions(false);
      }
    }, 150);
  };

  const handleClearInput = () => {
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isFocused && window.innerWidth < 768) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFocused]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmitSearch}
      className='flex justify-between gap-2 px-6 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.1)] relative'
    >
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

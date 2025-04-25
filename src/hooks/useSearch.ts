import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { getAutoCompleteResult } from '@/actions/search-service';
import useDebounce from '@/hooks/useDebounce';
import { saveSearchKeyword } from '@/lib/search/util';

export function useSearch(
  isGuest: boolean = false,
  onAddSearch?: (keyword: string) => void,
) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const debounce = useDebounce();

  const fetchSuggestions = async (value: string): Promise<void> => {
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

  const debouncedFetchSuggestions = useCallback(
    (value: string) => debounce(() => fetchSuggestions(value), 300),
    [debounce],
  );

  const handleSubmitSearch = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const searchParams = new URLSearchParams();
    searchParams.set('query', inputValue);

    await saveSearchKeyword(inputValue, isGuest, onAddSearch);

    router.push(`/result?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  const handleClickBack = (): void => {
    router.back();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
    debouncedFetchSuggestions(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
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

  const handleSelectSuggestion = (suggestion: string): void => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    if (formRef.current) {
      setTimeout(() => formRef.current?.requestSubmit(), 0);
    }
  };

  const handleInputFocus = (): void => {
    setIsFocused(true);
    if (inputValue.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = (): void => {
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        setShowSuggestions(false);
      }
    }, 150);
  };

  const handleClearInput = (): void => {
    setInputValue('');
    setSuggestions([]);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const handleResize = (): void => {
      if (isFocused && window.innerWidth < 768) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isFocused]);

  return {
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
  };
}

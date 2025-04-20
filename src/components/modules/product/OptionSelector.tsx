import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/common/Select';

interface OptionItem {
  value: string;
  label: string;
}

interface OptionSelectorProps {
  label: string;
  value: string;
  options: OptionItem[];
  placeholder: string;
  onValueChange: (value: string) => void;
}

export default function OptionSelector({
  label,
  value,
  options,
  placeholder,
  onValueChange,
}: OptionSelectorProps) {
  return (
    <div>
      <label className='block text-sm font-medium mb-2'>{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

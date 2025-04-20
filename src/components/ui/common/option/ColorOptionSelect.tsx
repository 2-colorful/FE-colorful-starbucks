import type { ColorOptionType } from '@/types/responseDataTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';
import { Body } from '../Typography';

type ColorOptionSelectProps = {
  selectedOption: number | null;
  setSelectedOption: (sizeId: number) => void;
  options: ColorOptionType[];
};

export default function ColorOptionSelect({
  selectedOption,
  setSelectedOption,
  options,
}: ColorOptionSelectProps) {
  if (options.length === 0) {
    return null;
  }

  const selectedOptionItem =
    selectedOption !== null
      ? options.find((item) => item.colorId === selectedOption)
      : null;

  return (
    <>
      <Body className='pb-2 pt-2'>색상</Body>
      <Select
        value={selectedOption !== null ? selectedOption.toString() : undefined}
        onValueChange={(value: string) => setSelectedOption(Number(value))}
      >
        <SelectTrigger className='w-full'>
          <SelectValue
            className='w-full'
            placeholder={selectedOptionItem?.colorName || '색상을 선택하세요'}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ colorId, colorName }) => (
            <SelectItem key={colorId} value={colorId.toString()}>
              {colorName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

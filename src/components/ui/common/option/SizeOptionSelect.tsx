import type { SizeOptionType } from '@/types/responseDataTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

interface SizeOptionWithInventory extends SizeOptionType {
  inventoryQuantity?: number;
  disabled?: boolean;
}

type SizeOptionSelectProps = {
  selectedOption: number | null;
  setSelectedOption: (sizeId: number) => void;
  options: SizeOptionWithInventory[];
};

export default function SizeOptionSelect({
  selectedOption,
  setSelectedOption,
  options,
}: SizeOptionSelectProps) {
  if (options.length === 0) {
    return null;
  }

  const selectedOptionItem =
    selectedOption !== null
      ? options.find((item) => item.sizeId === selectedOption)
      : null;

  return (
    <>
      <Select
        value={selectedOption !== null ? selectedOption.toString() : undefined}
        onValueChange={(value: string) => setSelectedOption(Number(value))}
      >
        <SelectTrigger className='w-full'>
          <SelectValue
            className='w-full'
            placeholder={selectedOptionItem?.sizeName || '사이즈를 선택하세요'}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ sizeId, sizeName, inventoryQuantity, disabled }) => (
            <SelectItem
              key={sizeId}
              value={sizeId.toString()}
              disabled={disabled}
              className='flex justify-between items-center'
            >
              <span>{sizeName}</span>
              {inventoryQuantity !== undefined && (
                <span
                  className={`text-sm ml-2 ${
                    inventoryQuantity <= 10
                      ? 'text-red-500'
                      : inventoryQuantity <= 50
                        ? 'text-orange-500'
                        : 'text-green-500'
                  }`}
                >
                  {inventoryQuantity === 0
                    ? '품절'
                    : `${inventoryQuantity}개 남음`}
                </span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

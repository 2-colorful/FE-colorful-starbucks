import React, { useMemo } from 'react';

import type { ProductOptionDataType } from '@/types/responseDataTypes';
import { Body } from '@/components/ui/common';
import ColorOptionSelect from '@/components/ui/common/option/ColorOptionSelect';
import SizeOptionSelect from '@/components/ui/common/option/SizeOptionSelect';

type SelectOptionsState = {
  colorId: number | null;
  sizeId: number | null;
};

type OptionSelectionSectionProps = {
  productOptions: ProductOptionDataType;
  selectOptions: SelectOptionsState;
  sizeInventory: Record<number, number>;
  onColorSelect: (colorId: number) => void;
  onSizeSelect: (sizeId: number) => void;
};

export default function OptionSelectionSection({
  productOptions,
  selectOptions,
  sizeInventory,
  onColorSelect,
  onSizeSelect,
}: OptionSelectionSectionProps) {
  const hasColorOptions =
    productOptions?.color && productOptions.color.length > 0;
  const hasSizeOptions = productOptions?.size && productOptions.size.length > 0;
  const isColorSelected = selectOptions.colorId !== null;

  const sizeOptionsWithInventory = useMemo(() => {
    return (
      productOptions.size?.map((size) => ({
        ...size,
        inventoryQuantity: sizeInventory[size.sizeId] || 0,
        disabled: sizeInventory[size.sizeId] === 0,
      })) || []
    );
  }, [productOptions.size, sizeInventory]);

  return (
    <div className='space-y-6 mb-6'>
      {hasColorOptions && (
        <div>
          <Body className='pb-2'>색상 (필수)</Body>
          <ColorOptionSelect
            selectedOption={selectOptions.colorId}
            setSelectedOption={onColorSelect}
            options={productOptions.color || []}
          />
        </div>
      )}

      {hasSizeOptions && (
        <div
          className={isColorSelected ? '' : 'opacity-50 pointer-events-none'}
        >
          <Body className='pb-2'>
            사이즈 {!isColorSelected && '(색상을 먼저 선택해주세요)'}
          </Body>
          <SizeOptionSelect
            options={sizeOptionsWithInventory}
            selectedOption={selectOptions.sizeId}
            setSelectedOption={onSizeSelect}
          />
        </div>
      )}
    </div>
  );
}

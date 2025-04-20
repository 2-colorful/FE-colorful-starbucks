import React from 'react';

import OptionSelector from '@/components/modules/product/OptionSelector';
import QuantityControl from '@/components/ui/products/QuantityControl';
import { useProductOptions } from '@/context/ProductOptionsContext';

export default function OptionSelectionForm() {
  const {
    currentSelections,
    quantity,
    setOptionValue,
    increaseQuantity,
    decreaseQuantity,
    isOptionComplete,
    addOptionToSelection,
    hasOptions,
    productOptions,
  } = useProductOptions();

  // 모든 옵션이 선택되었을 때 버튼 클릭으로 옵션 추가
  const handleAddOption = () => {
    if (isOptionComplete()) {
      addOptionToSelection();
    }
  };

  if (!hasOptions) {
    return (
      <div className='text-center py-4'>
        <p>이 상품은 선택할 옵션이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {/* 사이즈 옵션 */}
      {productOptions.size && productOptions.size.length > 0 && (
        <OptionSelector
          key='size-selector'
          label='사이즈'
          value={currentSelections['size']?.name || ''}
          options={productOptions.size.map((size) => ({
            value: size.sizeId.toString(),
            label: size.sizeName,
          }))}
          placeholder='사이즈를 선택해주세요'
          onValueChange={(value: string) => {
            const selectedSize = productOptions.size?.find(
              (s) => s.sizeId.toString() === value,
            );
            if (selectedSize) {
              setOptionValue(
                'size',
                selectedSize.sizeId,
                selectedSize.sizeName,
              );
            }
          }}
        />
      )}

      {/* 컬러 옵션 */}
      {productOptions.color && productOptions.color.length > 0 && (
        <OptionSelector
          key='color-selector'
          label='색상'
          value={currentSelections['color']?.name || ''}
          options={productOptions.color.map((color) => ({
            value: color.colorId.toString(),
            label: color.colorName,
          }))}
          placeholder='색상을 선택해주세요'
          onValueChange={(value: string) => {
            const selectedColor = productOptions.color?.find(
              (c) => c.colorId.toString() === value,
            );
            if (selectedColor) {
              setOptionValue(
                'color',
                selectedColor.colorId,
                selectedColor.colorName,
              );
            }
          }}
        />
      )}

      {/* 모든 옵션이 선택되었을 때만 수량 선택 표시 */}
      {isOptionComplete() && (
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <span>수량</span>
            <QuantityControl
              quantity={quantity}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          </div>

          <button
            type='button'
            className='bg-blue-500 text-white px-4 py-2 rounded w-full'
            onClick={handleAddOption}
          >
            옵션 추가
          </button>
        </div>
      )}
    </div>
  );
}

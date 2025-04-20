import React from 'react';

import SelectedOptionItem from '@/components/ui/products/SelectOptionItem';
import { useProductOptions } from '@/context/ProductOptionsContext';

export default function SelectedOptionList() {
  const { selectedOptions, removeOption, updateOptionQuantity, productPrice } =
    useProductOptions();

  if (selectedOptions.length === 0) return null;

  const totalQuantity = selectedOptions.reduce(
    (sum, option) => sum + option.quantity,
    0,
  );
  const totalPrice = productPrice * totalQuantity;

  const formattedPrice = totalPrice.toLocaleString();

  return (
    <div className='space-y-3'>
      <h3 className='font-medium'>선택된 옵션</h3>
      <div className='divide-y border rounded-md'>
        {selectedOptions.map((option) => {
          const optionText = [];

          if (option.options.size) {
            optionText.push(`사이즈: ${option.options.size.name}`);
          }

          if (option.options.color) {
            optionText.push(`색상: ${option.options.color.name}`);
          }

          const displayText =
            optionText.length > 0 ? optionText.join(', ') : '기본 옵션';

          return (
            <SelectedOptionItem
              key={option.id}
              option={{
                ...option,
                displayText,
              }}
              onRemove={removeOption}
              onQuantityChange={updateOptionQuantity}
            />
          );
        })}
      </div>
      <div className='bg-gray-50 p-3 rounded-md'>
        <p className='font-bold'>총 금액: {formattedPrice}원</p>
      </div>
    </div>
  );
}

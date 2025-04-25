'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

import {
  SelectedOptionType,
  SelectedOptionValueType,
} from '@/types/products/productPurchaseTypes';
import { useCallback } from 'react';
import { ProductOptionDataType } from '@/types/responseDataTypes';

interface ProductOptionsContextType {
  currentSelections: SelectedOptionValueType;
  quantity: number;
  selectedOptions: SelectedOptionType[];
  productPrice: number;
  productOptions: ProductOptionDataType;

  setOptionValue: (
    optionType: string,
    optionId: number,
    optionName: string,
  ) => void;
  setQuantity: (quantity: number) => void;
  removeOption: (optionId: string) => void;
  updateOptionQuantity: (optionId: string, newQuantity: number) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  resetSelections: () => void;
  addOptionToSelection: () => void;

  isOptionComplete: () => boolean;
  hasOptions: boolean;
  checkInventory: (
    sizeId?: number,
    colorId?: number,
  ) => Promise<{ productDetailCode: number; inventoryQuantity: number }>;
}

const ProductOptionsContext = createContext<
  ProductOptionsContextType | undefined
>(undefined);

interface ProductOptionsProviderProps {
  children: ReactNode;
  productId: number;
  productPrice: number;
  productOptions: ProductOptionDataType;
}

export function ProductOptionsProvider({
  children,
  productId,
  productPrice,
  productOptions,
}: ProductOptionsProviderProps) {
  // 현재 선택 중인 옵션 값들
  const [currentSelections, setCurrentSelections] =
    useState<SelectedOptionValueType>({});
  const [quantity, setQuantity] = useState(1);

  // 확정된 옵션 목록
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType[]>(
    [],
  );

  // 옵션이 있는지 확인 (사이즈나 컬러 옵션이 하나라도 있으면 true)
  const hasOptions =
    productOptions?.size?.length > 0 ||
    productOptions?.color?.length > 0 ||
    false;

  // 모든 필수 옵션이 선택되었는지 확인
  const isOptionComplete = useCallback(() => {
    if (!hasOptions) return true;

    // 사이즈 옵션이 있으면 선택되었는지 확인
    const isSizeComplete =
      productOptions?.size?.length > 0
        ? currentSelections['size'] !== undefined
        : true;

    // 컬러 옵션이 있으면 선택되었는지 확인
    const isColorComplete =
      productOptions?.color?.length > 0
        ? currentSelections['color'] !== undefined
        : true;

    return isSizeComplete && isColorComplete;
  }, [currentSelections, productOptions, hasOptions]);

  // 옵션 값 변경 (옵션 타입, 옵션 ID, 옵션 이름)
  const setOptionValue = (
    optionType: string,
    optionId: number,
    optionName: string,
  ) => {
    const newSelections = {
      ...currentSelections,
      [optionType]: { id: optionId, name: optionName },
    };

    // 이미 동일한 옵션 조합이 있는지 확인
    const existingOption = findExistingOption(newSelections);
    if (existingOption) {
      setQuantity(existingOption.quantity);
    } else {
      setQuantity(1);
    }

    setCurrentSelections(newSelections);
  };

  // 옵션 값에 해당하는 기존 옵션 찾기
  const findExistingOption = (optionValues: SelectedOptionValueType) => {
    if (!isOptionComplete()) return null;

    // 동일한 옵션 조합 찾기
    return selectedOptions.find((option) => {
      // 사이즈 옵션 비교
      const isSizeMatch =
        !productOptions?.size?.length ||
        JSON.stringify(option.options['size']) ===
          JSON.stringify(optionValues['size']);

      // 컬러 옵션 비교
      const isColorMatch =
        !productOptions?.color?.length ||
        JSON.stringify(option.options['color']) ===
          JSON.stringify(optionValues['color']);

      return isSizeMatch && isColorMatch;
    });
  };

  // 현재 선택된 옵션으로 고유 ID 생성
  const generateOptionId = (optionValues: SelectedOptionValueType) => {
    const sizeId = optionValues['size']?.id || 'none';
    const colorId = optionValues['color']?.id || 'none';
    return `size-${sizeId}_color-${colorId}`;
  };

  // 현재 선택한 옵션을 옵션 목록에 추가
  const addOptionToSelection = useCallback(() => {
    if (!isOptionComplete()) return;

    const optionId = generateOptionId(currentSelections);
    const existingIndex = selectedOptions.findIndex(
      (opt) => generateOptionId(opt.options) === optionId,
    );

    if (existingIndex >= 0) {
      // 이미 있는 옵션이면 수량만 업데이트
      const updatedOptions = [...selectedOptions];
      updatedOptions[existingIndex].quantity = quantity;
      setSelectedOptions(updatedOptions);
    } else {
      // 새 옵션 추가
      const newOption: SelectedOptionType = {
        id: optionId,
        options: { ...currentSelections },
        quantity,
      };
      setSelectedOptions((prev) => [...prev, newOption]);

      // 새 옵션이 추가되면 초기화
      setCurrentSelections({});
      setQuantity(1);
    }
  }, [currentSelections, quantity, isOptionComplete, selectedOptions]);

  // 옵션 제거
  const removeOption = (optionId: string) => {
    setSelectedOptions(selectedOptions.filter((opt) => opt.id !== optionId));
  };

  // 옵션 수량 업데이트
  const updateOptionQuantity = (optionId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setSelectedOptions(
      selectedOptions.map((opt) => {
        if (opt.id === optionId) {
          return { ...opt, quantity: newQuantity };
        }
        return opt;
      }),
    );
  };

  // 수량 증가
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // 수량 감소
  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  // 선택 초기화
  const resetSelections = () => {
    setCurrentSelections({});
    setQuantity(1);
  };

  // 재고 확인 API 호출
  const checkInventory = async (sizeId?: number, colorId?: number) => {
    try {
      const response = await fetch(
        `/api/products/${productId}/inventory?${sizeId ? `sizeId=${sizeId}` : ''}${colorId ? `&colorId=${colorId}` : ''}`,
      );
      const data = await response.json();
      return data.data; // { productDetailCode: number, inventoryQuantity: number }
    } catch (error) {
      console.error('재고 확인 중 오류 발생:', error);
      return { productDetailCode: 0, inventoryQuantity: 0 };
    }
  };

  return (
    <ProductOptionsContext.Provider
      value={{
        currentSelections,
        quantity,
        selectedOptions,
        productPrice,
        productOptions,
        hasOptions,

        setOptionValue,
        setQuantity,
        removeOption,
        updateOptionQuantity,
        increaseQuantity,
        decreaseQuantity,
        resetSelections,
        addOptionToSelection,
        isOptionComplete,
        checkInventory,
      }}
    >
      {children}
    </ProductOptionsContext.Provider>
  );
}

export function useProductOptions() {
  const context = useContext(ProductOptionsContext);
  if (context === undefined) {
    throw new Error(
      'useProductOptions must be used within a ProductOptionsProvider',
    );
  }
  return context;
}

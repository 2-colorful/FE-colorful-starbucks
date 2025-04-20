'use client';
import React from 'react';

import { SelectedOption } from '@/types/products/productPurchaseTypes';
import { Modal, useModal } from '../common/Modal/LegacyModal';
import { ProductOptionsProvider } from '@/context/ProductOptionsContext';
import PurchaseForm from '@/components/modules/product/PurchaseForm';
import { ProductOptionDataType } from '@/types/responseDataTypes';

interface PurchaseModalProps {
  productId: number;
  productPrice: number;
  productOptions: ProductOptionDataType;
}

export default function PurchaseModal({
  productId,
  productPrice,
  productOptions,
}: PurchaseModalProps) {
  const { closeModal } = useModal();

  const handleAddToCart = async (options: SelectedOption[]) => {
    try {
      // 옵션이 있는 경우 각 옵션별로 처리
      for (const option of options) {
        const sizeId = option.options['size']?.id;
        const colorId = option.options['color']?.id;

        // 재고 확인 API 호출
        const queryParams = [];
        if (sizeId) queryParams.push(`sizeId=${sizeId}`);
        if (colorId) queryParams.push(`colorId=${colorId}`);

        const url = `/api/products/${productId}/inventory${queryParams.length ? `?${queryParams.join('&')}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.data.inventoryQuantity >= option.quantity) {
          console.log(`상품 ${productId} 장바구니 추가:`, {
            productDetailCode: data.data.productDetailCode,
            quantity: option.quantity,
            options: option.options,
          });
        } else {
          alert(
            `선택하신 옵션의 재고가 부족합니다. (재고: ${data.data.inventoryQuantity})`,
          );
          return;
        }
      }

      alert('장바구니에 추가되었습니다.');
      closeModal();
    } catch (error) {
      console.error('장바구니 추가 중 오류 발생:', error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    }
  };

  const handlePurchase = async (options: SelectedOption[]) => {
    try {
      // 옵션이 있는 경우 각 옵션별로 처리
      const purchaseItems = [];

      for (const option of options) {
        const sizeId = option.options['size']?.id;
        const colorId = option.options['color']?.id;

        // 재고 확인 API 호출
        const queryParams = [];
        if (sizeId) queryParams.push(`sizeId=${sizeId}`);
        if (colorId) queryParams.push(`colorId=${colorId}`);

        const url = `/api/products/${productId}/inventory${queryParams.length ? `?${queryParams.join('&')}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.data.inventoryQuantity >= option.quantity) {
          purchaseItems.push({
            productDetailCode: data.data.productDetailCode,
            quantity: option.quantity,
            options: option.options,
          });
        } else {
          alert(
            `선택하신 옵션의 재고가 부족합니다. (재고: ${data.data.inventoryQuantity})`,
          );
          return;
        }
      }

      console.log(`상품 ${productId} 즉시구매:`, purchaseItems);
      // 여기에 구매 페이지로 이동하는 로직 추가
      closeModal();
    } catch (error) {
      console.error('구매 처리 중 오류 발생:', error);
      alert('구매 처리 중 오류가 발생했습니다.');
    }
  };

  // 옵션 데이터의 불필요한 참조 끊기
  const formattedOptions = {
    size: productOptions.size ? [...productOptions.size] : [],
    color: productOptions.color ? [...productOptions.color] : [],
  };

  return (
    <Modal
      type='purchase-modal'
      variant='slide'
      className='max-h-[80vh] overflow-y-auto'
    >
      <ProductOptionsProvider
        productId={productId}
        productPrice={productPrice}
        productOptions={formattedOptions}
      >
        <PurchaseForm
          onAddToCart={handleAddToCart}
          onPurchase={handlePurchase}
        />
      </ProductOptionsProvider>
    </Modal>
  );
}

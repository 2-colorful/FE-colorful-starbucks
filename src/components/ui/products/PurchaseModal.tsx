'use client';
import React from 'react';

import { SelectedOptionType } from '@/types/products/productPurchaseTypes';
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

  const handleAddToCart = async (options: SelectedOptionType[]) => {
    try {
      for (const option of options) {
        const sizeId = option.options['size']?.id;
        const colorId = option.options['color']?.id;

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

  const handlePurchase = async (options: SelectedOptionType[]) => {
    try {
      const purchaseItems = [];

      for (const option of options) {
        const sizeId = option.options['size']?.id;
        const colorId = option.options['color']?.id;

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

      closeModal();
    } catch (error) {
      console.error('구매 처리 중 오류 발생:', error);
      alert('구매 처리 중 오류가 발생했습니다.');
    }
  };

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

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { ProductOptionDataType } from '@/types/responseDataTypes';
import { Modal } from '@/components/ui/common/Modal';
import { useModalContext } from '@/context/ModalContext';
import QuantityCounter from '@/components/ui/common/option/QuantityCounter';
import { getProductDetailWithOptions } from '@/actions/product-service';
import { addToCart } from '@/actions/cart-service';
import ProductInfoHeader from './ProductInfoHeader';
import OptionSelectionSection from './OptionSelectionSection';
import TotalPriceSection from './TotalPriceSection';
import ActionButtonSection from './ActionButtonSection';

type SelectOptionsState = {
  colorId: number | null;
  sizeId: number | null;
};

type ProductOptionsModalProps = {
  productId: number;
  productPrice: number;
  productOptions: ProductOptionDataType;
  productName: string;
  productThumbnailUrl: string;
};

export default function ProductOptionsModal({
  productId,
  productPrice,
  productOptions,
  productName,
  productThumbnailUrl,
}: ProductOptionsModalProps) {
  const router = useRouter();
  const { closeModal } = useModalContext();

  const [isPending, setIsPending] = useState(false);

  const [selectOptions, setSelectOptions] = useState<SelectOptionsState>({
    colorId: null,
    sizeId: null,
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [maxQuantity, setMaxQuantity] = useState<number>(10);
  const [sizeInventory, setSizeInventory] = useState<Record<number, number>>(
    {},
  );

  const hasSizeOptions = productOptions?.size && productOptions.size.length > 0;
  const hasColorOptions =
    productOptions?.color && productOptions.color.length > 0;

  const isColorSelected = selectOptions.colorId !== null;

  const isOptionComplete = useMemo(() => {
    if (hasSizeOptions && selectOptions.sizeId === null) return false;
    if (hasColorOptions && selectOptions.colorId === null) return false;
    return true;
  }, [
    hasSizeOptions,
    hasColorOptions,
    selectOptions.sizeId,
    selectOptions.colorId,
  ]);

  useEffect(() => {
    const checkSizeInventory = async () => {
      if (!isColorSelected || !hasSizeOptions) return;

      const inventoryMap: Record<number, number> = {};

      for (const size of productOptions.size || []) {
        try {
          const productDetail = await getProductDetailWithOptions(
            productId,
            size.sizeId,
            selectOptions.colorId,
          );

          if (productDetail) {
            inventoryMap[size.sizeId] = productDetail.inventoryQuantity;
          }
        } catch (error) {
          console.error(`사이즈 ${size.sizeName} 재고 확인 중 오류:`, error);
        }
      }

      setSizeInventory(inventoryMap);
    };

    checkSizeInventory();
  }, [
    productId,
    selectOptions.colorId,
    isColorSelected,
    hasSizeOptions,
    productOptions.size,
  ]);

  useEffect(() => {
    const checkInventory = async () => {
      if (!isOptionComplete) return;

      const productDetail = await getProductDetailWithOptions(
        productId,
        selectOptions.sizeId,
        selectOptions.colorId,
      );

      if (productDetail && productDetail.inventoryQuantity) {
        setMaxQuantity(productDetail.inventoryQuantity);
        if (quantity > productDetail.inventoryQuantity) {
          setQuantity(productDetail.inventoryQuantity);
        }
      }
    };

    checkInventory();
  }, [productId, selectOptions, isOptionComplete, quantity]);

  const handleColorSelect = (colorId: number) => {
    setSelectOptions((_prev) => ({
      colorId: colorId,
      sizeId: null,
    }));
  };

  const handleSizeSelect = (sizeId: number) => {
    setSelectOptions((prev) => ({
      ...prev,
      sizeId: sizeId,
    }));
  };

  const handleAddToCart = async () => {
    if (!isOptionComplete || isPending) {
      if (!isOptionComplete) {
        alert('옵션을 모두 선택해주세요.');
      }
      return;
    }

    try {
      setIsPending(true);

      const productDetail = await getProductDetailWithOptions(
        productId,
        selectOptions.sizeId,
        selectOptions.colorId,
      );

      if (!productDetail) {
        alert('상품 정보를 찾을 수 없습니다.');
        return;
      }

      await addToCart({
        productCode: productId,
        productDetailCode: productDetail.productDetailCode,
        quantity,
      });

      alert('장바구니에 추가되었습니다.');
      closeModal();
    } catch (error) {
      console.error('장바구니 추가 중 오류:', error);
      alert('장바구니 추가 중 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  const handlePurchase = async () => {
    if (!isOptionComplete || isPending) {
      if (!isOptionComplete) {
        alert('옵션을 모두 선택해주세요.');
      }
      return;
    }

    try {
      setIsPending(true);

      const productDetail = await getProductDetailWithOptions(
        productId,
        selectOptions.sizeId,
        selectOptions.colorId,
      );

      if (!productDetail) {
        alert('상품 정보를 찾을 수 없습니다.');
        return;
      }

      await addToCart({
        productCode: productId,
        productDetailCode: productDetail.productDetailCode,
        quantity,
      });

      closeModal();
      router.push('/cart');
    } catch (error) {
      console.error('구매 처리 중 오류:', error);
      alert('구매 처리 중 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  const totalPrice = useMemo(() => {
    return productPrice * quantity;
  }, [quantity, productPrice]);

  return (
    <Modal variant='bottomSheet' className='px-6 pt-6 pb-10'>
      <ProductInfoHeader
        productName={productName}
        productPrice={productPrice}
        productThumbnailUrl={productThumbnailUrl}
        onClose={closeModal}
      />

      <OptionSelectionSection
        productOptions={productOptions}
        selectOptions={selectOptions}
        sizeInventory={sizeInventory}
        onColorSelect={handleColorSelect}
        onSizeSelect={handleSizeSelect}
      />

      {isOptionComplete && (
        <div>
          <QuantityCounter
            quantity={quantity}
            setQuantity={setQuantity}
            min={1}
            max={maxQuantity}
          />
        </div>
      )}

      <TotalPriceSection quantity={quantity} totalPrice={totalPrice} />

      <ActionButtonSection
        isOptionComplete={isOptionComplete}
        isPending={isPending}
        onAddToCart={handleAddToCart}
        onPurchase={handlePurchase}
      />
    </Modal>
  );
}

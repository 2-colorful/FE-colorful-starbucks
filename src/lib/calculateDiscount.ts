export const calculateDiscount = (
  totalPrice: number,
  percent?: number,
  maxDiscount?: number,
) => {
  if (!totalPrice || !percent) return 0;

  const discount = Math.floor((totalPrice * percent) / 100);

  return maxDiscount !== undefined ? Math.min(maxDiscount, discount) : discount;
};

export const dateFormatter = (initDate: Date | string) => {
  const date = new Date(initDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const getRemainingDays = (expiredAt: Date | string) => {
  const now = new Date();
  const expiryDate = new Date(expiredAt);

  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

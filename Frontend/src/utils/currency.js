const PKR_FORMATTER = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  minimumFractionDigits: 2,
});

export const formatPriceInPKR = (value) => {
  const numericValue = Number(value);
  if (Number.isNaN(numericValue)) {
    return PKR_FORMATTER.format(0);
  }
  return PKR_FORMATTER.format(numericValue);
};



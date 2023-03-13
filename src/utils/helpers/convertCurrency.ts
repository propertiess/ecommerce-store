export const convertCurrency = (
  value: number,
  locales = 'ru-Ru',
  currency = 'RUB'
) => {
  return new Intl.NumberFormat(locales, {
    maximumFractionDigits: 0,
    style: 'currency',
    currency
  }).format(value);
};

export function euros(n) {
  return Number(n || 0).toLocaleString('en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  });
}

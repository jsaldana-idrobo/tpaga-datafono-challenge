const COP_GROUP_SEPARATOR = '.';

export const parseCOPInput = (value: string): number => {
  const digits = value.replace(/\D/g, '');
  return digits.length === 0 ? 0 : Number(digits);
};

export const formatCOP = (amount: number): string => {
  const safeAmount =
    Number.isFinite(amount) && amount > 0 ? Math.trunc(amount) : 0;
  const amountText = String(safeAmount).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    COP_GROUP_SEPARATOR,
  );

  return `$ ${amountText}`;
};

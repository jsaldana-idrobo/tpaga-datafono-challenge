const COP_GROUP_SEPARATOR = '.';

const formatDigitGroups = (digits: string): string => {
  const chunks: string[] = [];

  for (let end = digits.length; end > 0; end -= 3) {
    chunks.unshift(digits.slice(Math.max(0, end - 3), end));
  }

  return chunks.join(COP_GROUP_SEPARATOR);
};

export const parseCOPInput = (value: string): number => {
  const digits = value.replace(/\D/g, '');
  return digits.length === 0 ? 0 : Number(digits);
};

export const formatCOP = (amount: number): string => {
  const safeAmount =
    Number.isFinite(amount) && amount > 0 ? Math.trunc(amount) : 0;
  const amountText = formatDigitGroups(String(safeAmount));

  return `$ ${amountText}`;
};

import {formatCOP, parseCOPInput} from '../../src/domain/currency';

describe('currency helpers', () => {
  it('formats integer COP amounts without decimals', () => {
    expect(formatCOP(0)).toBe('$ 0');
    expect(formatCOP(1200)).toBe('$ 1.200');
    expect(formatCOP(2500000)).toBe('$ 2.500.000');
    expect(formatCOP(1234567890)).toBe('$ 1.234.567.890');
  });

  it('keeps only digits when parsing a formatted input', () => {
    expect(parseCOPInput('')).toBe(0);
    expect(parseCOPInput('$ 12.300 COP')).toBe(12300);
    expect(parseCOPInput('abc987xyz')).toBe(987);
  });
});

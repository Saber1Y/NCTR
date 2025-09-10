import { formatTokenAmount } from '@/hooks/useNECTR';

describe('NECTR Token Utils', () => {
  describe('formatTokenAmount', () => {
    it('should format 1 NECTR correctly', () => {
      const oneToken = BigInt('1000000000000000000'); // 1 NECTR
      const result = formatTokenAmount(oneToken);
      expect(result).toBe('1.00');
    });

    it('should format 0.5 NECTR correctly', () => {
      const halfToken = BigInt('500000000000000000'); // 0.5 NECTR
      const result = formatTokenAmount(halfToken);
      expect(result).toBe('0.50');
    });

    it('should format large amounts correctly', () => {
      const largeAmount = BigInt('1000000000000000000000'); // 1000 NECTR
      const result = formatTokenAmount(largeAmount);
      expect(result).toBe('1000.00');
    });

    it('should handle small amounts correctly', () => {
      const smallAmount = BigInt('1000000000000000'); // 0.001 NECTR
      const result = formatTokenAmount(smallAmount);
      expect(result).toBe('0.00'); // Should round to 2 decimals
    });

    it('should handle undefined amounts', () => {
      const result = formatTokenAmount(undefined);
      expect(result).toBe('0.00');
    });

    it('should handle zero amounts', () => {
      const result = formatTokenAmount(BigInt(0));
      expect(result).toBe('0.00');
    });
  });
});

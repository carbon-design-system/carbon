import { getCellId } from '../cells';

describe('cells tools', () => {
  describe('getCellId', () => {
    it('should return a string for the given rowId and header', () => {
      expect(getCellId('a', 'header')).toBe('a:header');
    });
  });
});

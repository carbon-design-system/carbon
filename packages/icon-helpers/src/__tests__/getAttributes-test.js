/**
 * @jest-environment jsdom
 */

'use strict';

describe('getAttributes', () => {
  let getAttributes;

  beforeEach(() => {
    getAttributes = require('../getAttributes').default;
  });

  it('should default `aria-hidden="true"` and `focusable="false"` for SVGs', () => {
    const attrs = getAttributes();
    expect(attrs['aria-hidden']).toBe(true);
    expect(attrs.focusable).toBe(false);
    expect(attrs.role).not.toBeDefined();
  });

  test.each(['aria-label', 'aria-labelledby', 'title'])(
    'should set role and remove aria-hidden if `%s` is set',
    attr => {
      const attrs = getAttributes({
        [attr]: 'attribute',
      });
      expect(attrs.role).toBe('img');
      expect(attrs.focusable).toBe(true);
      expect(attrs['aria-hidden']).not.toBeDefined();
    }
  );
});

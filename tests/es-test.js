/* global describe it expect */

import { settings } from '../es/index';

const { prefix } = settings;

describe('ES build', () => {
  it('should be able to bring in prefix', () => {
    expect(prefix).toBe('bx');
  });
});

/**
 * @jest-environment node
 */

import { spacing } from '../spacing';

describe('spacing', () => {
  test.each(Object.keys(spacing))('%s should be defined', key => {
    const step = spacing[key];
    expect(step).toBeDefined();
  });
});

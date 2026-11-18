/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getAnnouncement } from '../getAnnouncement';

const translationIds = {
  remaining: 'test.remaining',
  maxReached: 'test.max-reached',
};

describe('getAnnouncement', () => {
  it('should return `null` when `maxCount` is undefined', () => {
    const t = jest.fn(() => 'translated');

    expect(getAnnouncement(9, undefined, translationIds, t)).toBeNull();
    expect(t).not.toHaveBeenCalled();
  });

  it('should return `null` when more than 10 entities remain', () => {
    const t = jest.fn(() => 'translated');

    expect(getAnnouncement(0, 11, translationIds, t)).toBeNull();
    expect(getAnnouncement(89, 100, translationIds, t)).toBeNull();
    expect(t).not.toHaveBeenCalled();
  });

  it.each([
    [0, 10, 10],
    [9, 10, 1],
    [90, 100, 10],
  ])(
    'should translate the remaining announcement for count %i and maxCount %i',
    (count, maxCount, remaining) => {
      const t = jest.fn(() => 'translated');

      expect(getAnnouncement(count, maxCount, translationIds, t)).toBe(
        'translated'
      );
      expect(t).toHaveBeenCalledTimes(1);
      expect(t).toHaveBeenCalledWith('test.remaining', {
        count: remaining,
        maxCount,
      });
    }
  );

  it.each([
    [10, 10],
    [12, 10],
    [0, 0],
  ])(
    'should translate the maximum reached announcement for count %i and maxCount %i',
    (count, maxCount) => {
      const t = jest.fn(() => 'translated');

      expect(getAnnouncement(count, maxCount, translationIds, t)).toBe(
        'translated'
      );
      expect(t).toHaveBeenCalledTimes(1);
      expect(t).toHaveBeenCalledWith('test.max-reached', {
        count: maxCount,
        maxCount,
      });
    }
  );
});

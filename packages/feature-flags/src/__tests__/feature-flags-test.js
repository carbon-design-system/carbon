/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('@carbon/feature-flags', () => {
  let FeatureFlag;

  beforeEach(() => {
    jest.resetModules();
    FeatureFlag = require('../');
  });

  describe('add', () => {
    it('should add the given flag and set whether its enabled', () => {
      FeatureFlag.add('flag-a', true);
      FeatureFlag.add('flag-b', false);

      expect(FeatureFlag.enabled('flag-a')).toBe(true);
      expect(FeatureFlag.enabled('flag-b')).toBe(false);
    });

    it('should throw if a duplicate flag name is given', () => {
      FeatureFlag.add('flag-a', true);

      expect(() => {
        FeatureFlag.add('flag-a', true);
      }).toThrow();
    });
  });

  describe('enable', () => {
    it('should enable the given feature flag', () => {
      FeatureFlag.add('flag-a', false);
      expect(FeatureFlag.enabled('flag-a')).toBe(false);

      FeatureFlag.enable('flag-a');
      expect(FeatureFlag.enabled('flag-a')).toBe(true);
    });

    it('should throw if the given flag does not exist', () => {
      expect(() => {
        FeatureFlag.enable('flag-a');
      }).toThrow();
    });
  });

  describe('disable', () => {
    it('should disable the given feature flag', () => {
      FeatureFlag.add('flag-a', true);
      expect(FeatureFlag.enabled('flag-a')).toBe(true);

      FeatureFlag.disable('flag-a');
      expect(FeatureFlag.enabled('flag-a')).toBe(false);
    });

    it('should throw if the given flag does not exist', () => {
      expect(() => {
        FeatureFlag.disable('flag-a');
      }).toThrow();
    });
  });

  describe('enabled', () => {
    it('should return whether a flag is enabled or disabled', () => {
      FeatureFlag.add('flag-a', true);
      FeatureFlag.add('flag-b', false);

      expect(FeatureFlag.enabled('flag-a')).toBe(true);
      expect(FeatureFlag.enabled('flag-b')).toBe(false);
    });

    it('should throw if the given flag does not exist', () => {
      expect(() => {
        FeatureFlag.enabled('flag-a');
      }).toThrow();
    });
  });

  describe('merge', () => {
    it('should set each feature flag given', () => {
      FeatureFlag.merge({
        'flag-a': true,
        'flag-b': false,
      });

      expect(FeatureFlag.enabled('flag-a')).toBe(true);
      expect(FeatureFlag.enabled('flag-b')).toBe(false);
    });

    it('should override duplicate keys with the given flag', () => {
      FeatureFlag.add('flag-b', true);
      FeatureFlag.merge({
        'flag-a': true,
        'flag-b': false,
      });

      expect(FeatureFlag.enabled('flag-a')).toBe(true);
      expect(FeatureFlag.enabled('flag-b')).toBe(false);
    });
  });
});

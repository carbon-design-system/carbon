/**
 * Copyright IBM Corp. 2015, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('@carbon/feature-flags', () => {
  let FeatureFlags;

  beforeEach(() => {
    jest.resetModules();
    FeatureFlags = require('../');
  });

  describe('add', () => {
    it('should add the given flag and set whether its enabled', () => {
      FeatureFlags.add('flag-a', true);
      FeatureFlags.add('flag-b', false);

      expect(FeatureFlags.enabled('flag-a')).toBe(true);
      expect(FeatureFlags.enabled('flag-b')).toBe(false);
    });

    it('should throw if a duplicate flag name is given', () => {
      FeatureFlags.add('flag-a', true);

      expect(() => {
        FeatureFlags.add('flag-a', true);
      }).toThrow();
    });
  });

  describe('enable', () => {
    it('should enable the given feature flag', () => {
      FeatureFlags.add('flag-a', false);
      expect(FeatureFlags.enabled('flag-a')).toBe(false);

      FeatureFlags.enable('flag-a');
      expect(FeatureFlags.enabled('flag-a')).toBe(true);
    });

    it('should throw if the given flag does not exist', () => {
      expect(() => {
        FeatureFlags.enable('flag-a');
      }).toThrow();
    });
  });

  describe('disable', () => {
    it('should disable the given feature flag', () => {
      FeatureFlags.add('flag-a', true);
      expect(FeatureFlags.enabled('flag-a')).toBe(true);

      FeatureFlags.disable('flag-a');
      expect(FeatureFlags.enabled('flag-a')).toBe(false);
    });

    it('should throw if the given flag does not exist', () => {
      expect(() => {
        FeatureFlags.disable('flag-a');
      }).toThrow();
    });
  });

  describe('enabled', () => {
    it('should return whether a flag is enabled or disabled', () => {
      FeatureFlags.add('flag-a', true);
      FeatureFlags.add('flag-b', false);

      expect(FeatureFlags.enabled('flag-a')).toBe(true);
      expect(FeatureFlags.enabled('flag-b')).toBe(false);
    });

    it('should enable v12 flags when the v12 release flag is enabled', () => {
      FeatureFlags.merge({
        'enable-v12-release': true,
        'enable-v12-example': false,
        'enable-not-v12-example': false,
      });

      expect(FeatureFlags.enabled('enable-v12-example')).toBe(true);
      expect(FeatureFlags.enabled('enable-not-v12-example')).toBe(false);
    });

    it('should allow v12 flags to be enabled independently of the v12 release flag', () => {
      FeatureFlags.merge({
        'enable-v12-release': false,
        'enable-v12-example': true,
      });

      expect(FeatureFlags.enabled('enable-v12-example')).toBe(true);
    });

    it('should throw if the given flag does not exist', () => {
      expect(() => {
        FeatureFlags.enabled('flag-a');
      }).toThrow();
    });
  });

  describe('merge', () => {
    it('should set each feature flag given', () => {
      FeatureFlags.merge({
        'flag-a': true,
        'flag-b': false,
      });

      expect(FeatureFlags.enabled('flag-a')).toBe(true);
      expect(FeatureFlags.enabled('flag-b')).toBe(false);
    });

    it('should override duplicate keys with the given flag', () => {
      FeatureFlags.add('flag-b', true);
      FeatureFlags.merge({
        'flag-a': true,
        'flag-b': false,
      });

      expect(FeatureFlags.enabled('flag-a')).toBe(true);
      expect(FeatureFlags.enabled('flag-b')).toBe(false);
    });
  });
});

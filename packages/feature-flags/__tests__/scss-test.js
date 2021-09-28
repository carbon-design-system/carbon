/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/feature-flags', () => {
  describe('add', () => {
    it('should add the given flag and set whether its enabled', async () => {
      const { getValue } = await render(`
        @use '../index.scss' as feature-flags;

        @include feature-flags.add(flag-a, true);
        @include feature-flags.add(flag-b, false);

        $_: get-value(feature-flags.enabled(flag-a));
        $_: get-value(feature-flags.enabled(flag-b));
      `);

      // flag-a
      expect(getValue(0)).toBe(true);
      // flag-b
      expect(getValue(1)).toBe(false);
    });
  });

  describe('enable', () => {
    it('should enable the given feature flag', async () => {
      const { getValue } = await render(`
        @use '../index.scss' as feature-flags;

        @include feature-flags.add(flag-a, false);

        $_: get-value(feature-flags.enabled(flag-a));

        @include feature-flags.enable(flag-a);

        $_: get-value(feature-flags.enabled(flag-a));
      `);

      expect(getValue(0)).toBe(false);
      expect(getValue(1)).toBe(true);
    });
  });

  describe('disable', () => {
    it('should disable the given feature flag', async () => {
      const { getValue } = await render(`
        @use '../index.scss' as feature-flags;

        @include feature-flags.add(flag-a, true);

        $_: get-value(feature-flags.enabled(flag-a));

        @include feature-flags.disable(flag-a);

        $_: get-value(feature-flags.enabled(flag-a));
      `);

      expect(getValue(0)).toBe(true);
      expect(getValue(1)).toBe(false);
    });
  });

  describe('enabled', () => {
    it('should return whether a flag is enabled or disabled', async () => {
      const { getValue } = await render(`
        @use '../index.scss' as feature-flags;

        @include feature-flags.add(flag-a, true);
        @include feature-flags.add(flag-b, false);

        $_: get-value(feature-flags.enabled(flag-a));
        $_: get-value(feature-flags.enabled(flag-b));
      `);

      // flag-a
      expect(getValue(0)).toBe(true);
      // flag-b
      expect(getValue(1)).toBe(false);
    });
  });

  describe('merge', () => {
    it('should set each feature flag given', async () => {
      const { getValue } = await render(`
        @use '../index.scss' as feature-flags;

        @include feature-flags.add(flag-c, false);
        @include feature-flags.merge((
          flag-a: true,
          flag-b: false,
          flag-c: true,
        ));

        $_: get-value(feature-flags.enabled(flag-a));
        $_: get-value(feature-flags.enabled(flag-b));
        $_: get-value(feature-flags.enabled(flag-c));
      `);

      // flag-a
      expect(getValue(0)).toBe(true);
      // flag-b
      expect(getValue(1)).toBe(false);
      // flag-c
      expect(getValue(2)).toBe(true);
    });
  });
});

/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { createSassRenderer, convert } = require('@carbon/test-utils/scss');

const render = createSassRenderer(__dirname);

describe('_component-tokens.scss', () => {
  it('should emit the correct value for a token in a given theme', async () => {
    const { calls } = await render(`
      @import '../component-tokens';
      $tokens: (
        component-token-01: (
          fallback: #fafafa,
          values: (
            (
              theme: $carbon--theme--white,
              value: #ffffff,
            ),
            (
              theme: $carbon--theme--g10,
              value: #000000,
            ),
          ),
        ),
      );

      // Default, intended usage with our stock themes
      @include carbon--theme($carbon--theme--white) {
        $t: test(get-token-value($tokens, 'component-token-01'));
      }

      @include carbon--theme($carbon--theme--g10) {
        $t: test(get-token-value($tokens, 'component-token-01'));
      }

      // Custom theme that is built on top of the white theme. This
      // custom should still apply as long as it does not override
      // any values of the base theme
      $derived-theme: map-merge($carbon--theme--white, (
        token-01: #ededed,
      ));

      @include carbon--theme($derived-theme) {
        $t: test(get-token-value($tokens, 'component-token-01'));
      }

      // Fallback value should be used if the theme is completely custom
      $custom-theme: (
        token-01: #efefef,
        token-02: #efefef,
        token-03: #efefef,
      );
      @include carbon--theme($custom-theme) {
        $t: test(get-token-value($tokens, 'component-token-01'));
      }
    `);

    const values = calls.map((call) => convert(call[0]));
    expect(values[0]).toBe('#ffffff');
    expect(values[1]).toBe('#000000');
    expect(values[2]).toBe('#ffffff');
    expect(values[3]).toBe('#fafafa');
  });

  it('should error if unable to find the given token in the token map', async () => {
    const { output } = await render(`
      @import '../component-tokens';
      $tokens: (
        component-token-01: (
          fallback: #000000,
          values: (),
        ),
      );
      $t: test(get-token-value($tokens, 'component-token-02'));
    `);

    expect(output.error).toHaveBeenCalledTimes(1);
  });

  it('should emit a CSS Custom Property if the feature flag is set', async () => {
    const { calls } = await render(`
      $feature-flags: (enable-css-custom-properties: true);
      @import '../component-tokens';
      $theme: (token-01: #000000);
      $tokens: (
        component-token-01: (
          fallback: #000000,
          values: (
            (
              theme: $theme,
              value: #ffffff,
            ),
          ),
        ),
      );
      $t: test(get-token-value($tokens, 'component-token-01'));

      @include carbon--theme($theme) {
        $t: test(get-token-value($tokens, 'component-token-01'));
      }
    `);

    expect(convert(calls[0][0])).toBe('var(--cds-component-token-01, #000000)');
    expect(convert(calls[1][0])).toBe('var(--cds-component-token-01, #ffffff)');
  });

  describe('is-subset-of-theme', () => {
    it('should return true if a theme is a subset of a given theme map', async () => {
      const { calls } = await render(`
        @import '../component-tokens';
        $theme-a: (
          token-01: #000000,
          token-02: #ffffff,
          token-03: #ededed,
        );
        $theme-b: map-merge($theme-a, (
          token-04: #efefef,
        ));
        $t: test(is-subset-of-theme($theme-b, $theme-a));
      `);

      expect(convert(calls[0][0])).toBe(true);
    });

    it('should return false if a theme is not a subset of a given theme map', async () => {
      const { calls } = await render(`
        @import '../component-tokens';
        $theme-a: (
          token-01: #000000,
          token-02: #ffffff,
          token-03: #ededed,
        );
        $theme-b: (
          token-01: #ffffff,
          token-02: #000000,
          token-03: #ededed,
          token-04: #efefef,
        );
        $t: test(is-subset-of-theme($theme-b, $theme-a));
      `);

      expect(convert(calls[0][0])).toBe(false);
    });
  });
});

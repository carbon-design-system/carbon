/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

/**
 * Tests for the $enable-oklch-fallback feature.
 *
 * When the flag is enabled, every CSS custom property whose value is an
 * oklch() string must be emitted twice:
 *   1. A hex (solid) or rgba() (alpha) fallback for legacy browsers
 *   2. The original oklch() value for modern browsers
 *
 * This gives browsers that predate CSS Color Level 4 (Chrome < 111,
 * Firefox < 113, Safari < 15.4) a usable colour via the cascade.
 *
 * The test compiles a minimal Sass snippet with the flag set to true and
 * asserts the exact dual-declaration output for both solid and alpha tokens.
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/themes oklch fallback ($enable-oklch-fallback: true)', () => {
  /**
   * Compile the theme mixin with the fallback flag enabled and return the
   * raw CSS string.
   */
  async function renderWithFallback(extraScss = '') {
    const { result } = await render(`
      @use '../scss/config' with ($enable-oklch-fallback: true);
      @use '../scss/theme' as carbon-theme;
      @use '../scss/themes';

      :root {
        @include carbon-theme.theme(themes.$white);
      }
      ${extraScss}
    `);
    return result.css.toString();
  }

  test('solid token emits hex fallback then oklch', async () => {
    const css = await renderWithFallback();

    // background in white theme = white.default = #ffffff
    // Sass normalises oklch(1 0 0) to oklch(100% 0 0deg) during CSS emission.
    // Expected pair:
    //   --cds-background: #ffffff;
    //   --cds-background: oklch(100% 0 0deg);
    expect(css).toMatch(/--cds-background:\s*#ffffff;/);
    expect(css).toMatch(/--cds-background:\s*oklch\(100% 0 0deg\);/);

    // The hex declaration must appear BEFORE the oklch declaration (cascade order).
    const hexPos = css.indexOf('--cds-background: #ffffff');
    const oklchPos = css.indexOf('--cds-background: oklch(100% 0 0deg)');
    expect(hexPos).toBeGreaterThanOrEqual(0);
    expect(oklchPos).toBeGreaterThanOrEqual(0);
    expect(hexPos).toBeLessThan(oklchPos);
  });

  test('solid token with chromatic hue emits correct hex fallback', async () => {
    const css = await renderWithFallback();

    // background-brand in white = blue.60 = #0f62fe
    // Sass normalises oklch(0.5565 0.243 261.95) to oklch(55.65% 0.243 261.95deg).
    expect(css).toMatch(/--cds-background-brand:\s*#0f62fe;/);
    expect(css).toMatch(
      /--cds-background-brand:\s*oklch\(55\.65% 0\.243 261\.95deg\);/
    );

    const hexPos = css.indexOf('--cds-background-brand: #0f62fe');
    const oklchPos = css.indexOf('--cds-background-brand: oklch');
    expect(hexPos).toBeGreaterThanOrEqual(0);
    expect(hexPos).toBeLessThan(oklchPos);
  });

  test('alpha token emits rgba() fallback then oklch with alpha', async () => {
    const css = await renderWithFallback();

    // background-hover in white = gray.50 @ 0.12 alpha
    //   solid gray.50 = #8d8d8d
    //   Sass emits: rgba(#8d8d8d, 0.12) as the legacy fallback
    //   Sass emits: oklch(64.34% 0 0deg / 0.12) as the modern value
    expect(css).toMatch(/--cds-background-hover:\s*rgba\(#8d8d8d, 0\.12\);/);
    expect(css).toMatch(
      /--cds-background-hover:\s*oklch\(64\.34% 0 0deg \/ 0\.12\);/
    );

    const rgbaPos = css.indexOf('--cds-background-hover: rgba');
    const oklchPos = css.indexOf('--cds-background-hover: oklch');
    expect(rgbaPos).toBeGreaterThanOrEqual(0);
    expect(rgbaPos).toBeLessThan(oklchPos);
  });

  test('non-oklch values are emitted only once (unchanged)', async () => {
    const css = await renderWithFallback();

    // Non-oklch values (e.g. hardcoded hex like #eaf1ff) must not be duplicated.
    // We count occurrences of --cds-ai-popover-caret-bottom-background to confirm.
    const matches =
      css.match(/--cds-ai-popover-caret-bottom-background:/g) || [];
    expect(matches.length).toBe(1);
  });

  test('flag off: no duplicate declarations (default behaviour)', async () => {
    // With flag off (default), background emits exactly once.
    const { result } = await render(`
      @use '../scss/theme' as carbon-theme;
      @use '../scss/themes';
      :root {
        @include carbon-theme.theme(themes.$white);
      }
    `);
    const css = result.css.toString();
    const matches = css.match(/--cds-background:/g) || [];
    // Only one --cds-background declaration (no fallback duplication).
    expect(matches.length).toBe(1);
  });
});

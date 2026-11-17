/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const sass = require('sass');
const generateColorFallbacks = require('../../tasks/builders/generate-color-fallbacks');
const colorFlatten = require('../../style-dictionary/transforms/color-flatten');
const {
  generateV12Tokens,
} = require('../../src/theme-generator/generate-tokens');

describe('V12 theme build pipeline', () => {
  it.each(['light', 'dark'])(
    'keeps the %s token file in sync with the OKLCH specification',
    (mode) => {
      const file = path.resolve(
        __dirname,
        `../../tokens/next/themes/${mode}/theme.tokens.json`
      );

      // Out of sync? Run `yarn generate:v12` in `packages/themes`
      expect(fs.readFileSync(file, 'utf8')).toBe(
        JSON.stringify(generateV12Tokens()[mode], null, 2) + '\n'
      );
    }
  );

  it('flattens DTCG OKLCH values for Style Dictionary outputs', () => {
    expect(
      colorFlatten.transform({
        $type: 'color',
        $value: {
          colorSpace: 'oklch',
          components: [0.97, 0.004, 262],
          alpha: 1,
        },
      })
    ).toBe('oklch(0.97 0.004 262)');
  });

  describe('color fallbacks', () => {
    // Compiles the generated Sass the way a consumer would. `url` places the
    // virtual stylesheet next to the real generated files so `../config`
    // resolves to `scss/_config.scss`. `prelude` runs before the generated
    // source and can configure the shared `config` module, exactly like a
    // consumer's `@use '@carbon/themes/scss/config' with ($prefix: ...)`.
    function compileFallbacks(prelude = '') {
      return sass.compileString(`${prelude}\n${generateColorFallbacks()}`, {
        url: pathToFileURL(
          path.resolve(__dirname, '../../scss/generated/_virtual.scss')
        ),
        quietDeps: true,
      }).css;
    }

    it('emits Sass that reads the prefix from the shared config module', () => {
      const output = generateColorFallbacks();

      expect(output).toContain("@use '../config';");
      expect(output).toContain('--#{config.$prefix}-layer-01: #f4f5f8;');
      // The prefix is never baked in at build time.
      expect(output).not.toMatch(/--cds-/);
    });

    it('generates light and dark fallback declarations including interactive states', () => {
      const css = compileFallbacks();

      // Sass re-serialises the `oklch(0 0 0)` feature query as `oklch(0% 0 0deg)`.
      expect(css).toMatch(/@supports not \(color: oklch\(0%? 0 0(deg)?\)\)/);
      expect(css).toContain('[data-carbon-theme=light]');
      expect(css).toContain('[data-carbon-theme=dark]');
      expect(css).toContain('--cds-layer-01: #f4f5f8;');
      expect(css).toContain('--cds-layer-01: #151618;');
      expect(css).toContain('--cds-state-hover:');
      expect(css).toContain('--cds-state-active:');
      expect(css).toContain('--cds-state-selected:');
      // The disabled state carries alpha=0.25.  The fallback must be rgba() to
      // preserve the opacity in browsers without OKLCH support — a bare hex value
      // would silently discard the alpha and render as a fully opaque surface color.
      expect(css).toContain('--cds-state-disabled: rgba(244, 245, 248, 0.25);');
      expect(css).toContain('--cds-state-disabled: rgba(21, 22, 24, 0.25);');
    });

    it('uses the configured Carbon prefix instead of `cds`', () => {
      const css = compileFallbacks(
        "@use '../config' as carbon-config with ($prefix: 'acme');"
      );

      expect(css).toContain('--acme-layer-01: #f4f5f8;');
      expect(css).toContain('--acme-layer-01: #151618;');
      expect(css).toContain(
        '--acme-state-disabled: rgba(244, 245, 248, 0.25);'
      );
      expect(css).not.toMatch(/--cds-/);
    });

    describe('through the published package entry points', () => {
      // Resolves `@carbon/themes` and `@carbon/styles` the way a consumer's
      // build does (workspace-linked node_modules), not via relative paths.
      const compilePackage = (source) =>
        sass.compileString(source, {
          loadPaths: [path.resolve(__dirname, '../../../../node_modules')],
          quietDeps: true,
          logger: sass.Logger.silent,
        }).css;
      const fallbackBlock = (css) =>
        css.slice(css.indexOf('@supports not (color: oklch'));
      const fallbacks = "@use '@carbon/themes/scss/generated/v12-fallbacks';";

      it('follows $prefix set on the @carbon/themes entry point', () => {
        const css = fallbackBlock(
          compilePackage(
            `@use '@carbon/themes' with ($prefix: 'acme'); ${fallbacks}`
          )
        );

        expect(css).toContain('--acme-layer-01: #f4f5f8;');
        expect(css).not.toMatch(/--cds-/);
      });

      it('follows $prefix set on @carbon/styles/scss/config', () => {
        const css = fallbackBlock(
          compilePackage(
            `@use '@carbon/styles/scss/config' with ($prefix: 'acme');
             @use '@carbon/styles/scss/theme';
             ${fallbacks}`
          )
        );

        expect(css).toContain('--acme-layer-01: #f4f5f8;');
        expect(css).not.toMatch(/--cds-/);
      });

      it('defaults to `cds` and matches the prefix theme.theme() emits', () => {
        const css = compilePackage(`
          @use '@carbon/themes';
          @use '@carbon/themes/scss/generated/v12-light' as light;
          ${fallbacks}
          :root { @include themes.theme(light.$light); }
        `);
        const fallbackNames = new Set(
          fallbackBlock(css).match(/--cds-[\w-]+(?=:)/g)
        );
        const themeBlock = css.slice(
          css.indexOf(':root', css.indexOf('@supports'))
        );

        expect(fallbackNames.size).toBeGreaterThan(0);
        expect(css).not.toMatch(/--(?!cds-)[a-z]+-layer-01:/);
        // Every fallback variable is one the OKLCH theme also declares.
        for (const name of fallbackNames) {
          expect(themeBlock).toContain(`${name}:`);
        }
      });
    });
  });
});

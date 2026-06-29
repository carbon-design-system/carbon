/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const css = require('css');
const { camelCase, paramCase } = require('change-case-all');
const { productiveHeading01, fontFamilies } = require('../src');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/type', () => {
  it('should emit the CSS properties and values for a type token', async () => {
    const { result } = await render(`
        @import '../index';

        .selector {
          @include type-style('productive-heading-01');
        }
      `);
    const { stylesheet } = css.parse(result.css.toString());
    const { declarations } = stylesheet.rules[0];

    expect(declarations.length).toBe(Object.keys(productiveHeading01).length);

    Object.keys(productiveHeading01).forEach((key) => {
      const property = paramCase(key);
      const match = declarations.find((declaration) => {
        if (declaration.property !== property) {
          return false;
        }
        // Note: the value on the CSS side is a CSS Custom Property. This makes
        // equality based on value hard so we do a substring check
        return declaration.value.includes(productiveHeading01[key]);
      });

      expect(match).toBeDefined();
    });
  });

  it('should emit CSS Custom Properties', async () => {
    const { result } = await render(`
        @import '../index';

        .selector {
          @include type-style('productive-heading-01');
        }
      `);
    const { stylesheet } = css.parse(result.css.toString());
    const { declarations } = stylesheet.rules[0];

    for (const declaration of declarations) {
      const { property, value } = declaration;
      const key = camelCase(property);

      // Make sure it's a custom property
      expect(value).toEqual(expect.stringContaining('var(--'));
      // Make sure the fallback value is included
      expect(value).toEqual(
        expect.stringContaining('' + productiveHeading01[key])
      );
    }
  });

  it('should preserve the raw font-family stack from the Sass function', async () => {
    const { result } = await render(`
      @use '../index' as type;

      .selector {
        font-family: type.font-family('sans');
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());
    const { declarations } = stylesheet.rules[0];

    expect(declarations.length).toBe(1);

    const [declaration] = declarations;
    // The compiled value should be wrapped in a CSS custom property
    expect(declaration.value).toEqual(
      expect.stringContaining('var(--cds-font-family-sans,')
    );
    // The raw font stack must be present as the fallback value
    expect(declaration.value).toEqual(
      expect.stringContaining(
        "'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif"
      )
    );
  });

  it('should emit a CSS custom property fallback from the font-family mixin', async () => {
    const { result } = await render(`
      @use '../index' as type;

      .selector {
        @include type.font-family('mono');
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());
    const { declarations } = stylesheet.rules[0];

    expect(declarations.length).toBe(1);

    const [declaration] = declarations;
    // The mixin should set the font-family property
    expect(declaration.property).toBe('font-family');
    // The value should be a CSS custom property for the named font
    expect(declaration.value).toEqual(
      expect.stringContaining('var(--cds-font-family-mono,')
    );
    // The raw mono font stack should be present as the fallback
    expect(declaration.value).toEqual(
      expect.stringContaining(
        "'IBM Plex Mono', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', monospace"
      )
    );
  });

  it('should omit unsupported font-family keys', async () => {
    const { result } = await render(`
      @use '../index' as type;

      .selector {
        font-family: type.font-family('does-not-exist');
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());

    expect(stylesheet.rules).toEqual([]);
  });
});

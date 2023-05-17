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
const { camelCase, paramCase } = require('change-case');
const { productiveHeading01 } = require('../src');

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
});

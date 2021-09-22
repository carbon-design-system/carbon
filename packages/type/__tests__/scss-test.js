/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createSassRenderer } = require('@carbon/test-utils/scss');
const { camelCase, paramCase } = require('change-case');
const { productiveHeading01 } = require('../src');

const render = createSassRenderer(__dirname);

function renderIntoDocument(css) {
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
  return document.styleSheets[document.styleSheets.length - 1];
}

describe('type.scss', () => {
  describe('styles', () => {
    it('should emit the CSS properties and values for a type token', async () => {
      const { result } = await render(`
        @import '../scss/index';

        .selector {
          @include carbon--type-style('productive-heading-01');
        }
      `);
      const stylesheet = renderIntoDocument(result.css.toString());
      const { style } = stylesheet.cssRules[0];

      expect(style.length).toBe(Object.keys(productiveHeading01).length);

      Object.keys(productiveHeading01).forEach((key) => {
        const property = paramCase(key);
        // We stringify the value from JS due to the fact that most of these
        // values (like numbers) are represented as strings when we get the
        // value from the CSSStyleDeclaration
        expect('' + productiveHeading01[key]).toBe(
          style.getPropertyValue(property)
        );
      });
    });

    it('should emit CSS Custom Properties when the feature flag is set', async () => {
      const { result } = await render(`
        $feature-flags: (enable-css-custom-properties: true);
        @import '../scss/index';

        .selector {
          @include carbon--type-style('productive-heading-01');
        }
      `);
      const stylesheet = renderIntoDocument(result.css.toString());
      const { style } = stylesheet.cssRules[0];

      for (let i = 0; i < style.length; i++) {
        const property = style[i];
        const key = camelCase(property);
        const value = style.getPropertyValue(property);

        // Make sure it's a custom property
        expect(value).toEqual(expect.stringContaining('var(--'));
        // Make sure the fallback value is included
        expect(value).toEqual(
          expect.stringContaining('' + productiveHeading01[key])
        );
      }
    });
  });
});

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

const { render } = SassRenderer.create(__dirname);

describe('scss/utilities/custom-property', () => {
  it('should support getting the property name from a value', async () => {
    const { unwrap } = await render(`
      @use '../../config' with (
        $prefix: 'cds',
      );
      @use '../custom-property';

      $_: get('name', custom-property.get-name('test'));
    `);
    expect(unwrap('name')).toBe('--cds-test');
  });

  it('should support emitting a declaration for a CSS Custom Property', async () => {
    const { result } = await render(`
      @use '../../config' with (
        $prefix: 'cds',
      );
      @use '../custom-property';

      .test {
        @include custom-property.declaration(test, #000000);
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());
    const selector = stylesheet.rules.find((rule) => {
      return rule.selectors.includes('.test');
    });
    const [declaration] = selector.declarations;

    expect(declaration.property).toBe('--cds-test');
    expect(declaration.value).toBe('#000000');
  });
});

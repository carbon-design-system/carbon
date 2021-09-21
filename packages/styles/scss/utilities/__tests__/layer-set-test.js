/**
 * Copyright IBM Corp. 2018, 2018
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

describe('scss/utilities/layer-set', () => {
  it('should map layer set values to scoped $prefix--layer selectors', async () => {
    const { result } = await render(`
      @use '../../config' with (
        $prefix: 'cds',
      );
      @use '../layer-set' with (
        $layer-sets: (
          field: (
            rgba(0, 0, 0, 0.3),
            rgba(0, 0, 0, 0.2),
            rgba(0, 0, 0, 0.1),
          ),
          background: (
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.7),
            rgba(0, 0, 0, 0.6),
          ),
        )
      );
    `);
    const { stylesheet } = css.parse(result.css.toString());

    function findSelector(stylesheet, matcher) {
      return stylesheet.rules.find((rule) => {
        return rule.selectors.some((selector) => {
          return selector.includes(matcher);
        });
      });
    }

    function findDeclaration(rule, property) {
      return rule.declarations.find((declaration) => {
        return declaration.property.includes(property);
      });
    }

    const layer1 = findSelector(stylesheet, ':root');
    const layer2 = findSelector(stylesheet, '.cds--layer');
    const layer3 = findSelector(stylesheet, '.cds--layer .cds--layer');

    expect(findDeclaration(layer1, '--cds-field').value).toBe(
      'rgba(0, 0, 0, 0.3)'
    );
    expect(findDeclaration(layer2, '--cds-field').value).toBe(
      'rgba(0, 0, 0, 0.2)'
    );
    expect(findDeclaration(layer3, '--cds-field').value).toBe(
      'rgba(0, 0, 0, 0.1)'
    );

    expect(findDeclaration(layer1, '--cds-background').value).toBe(
      'rgba(0, 0, 0, 0.8)'
    );
    expect(findDeclaration(layer2, '--cds-background').value).toBe(
      'rgba(0, 0, 0, 0.7)'
    );
    expect(findDeclaration(layer3, '--cds-background').value).toBe(
      'rgba(0, 0, 0, 0.6)'
    );
  });
});

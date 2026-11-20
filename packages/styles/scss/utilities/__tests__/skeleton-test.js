/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const postcss = require('postcss');

const { render } = SassRenderer.create(__dirname);

function findDeclaration(rule, property) {
  return rule.nodes.find((declaration) => {
    return declaration.prop === property;
  });
}

describe('scss/utilities/skeleton', () => {
  it('does not emit border-radius by default', async () => {
    const { result } = await render(`
      @use '../skeleton';

      .test {
        @include skeleton.skeleton;
      }
    `);
    const stylesheet = postcss.parse(result.css.toString());
    const rule = stylesheet.nodes.find((candidate) => {
      return candidate.selectors && candidate.selectors.includes('.test');
    });

    expect(findDeclaration(rule, 'border-radius')).toBeUndefined();
    expect(findDeclaration(rule, 'overflow')).toBeUndefined();
  });

  it('applies the border-radius token', async () => {
    const { result } = await render(`
      @use '../skeleton';
      @use '../../border-radius';

      .test {
        @include skeleton.skeleton($border-radius: border-radius.$border-radius-04);
      }
    `);
    const stylesheet = postcss.parse(result.css.toString());
    const rule = stylesheet.nodes.find((candidate) => {
      return candidate.selectors && candidate.selectors.includes('.test');
    });

    expect(findDeclaration(rule, 'overflow').value).toBe('hidden');
    expect(findDeclaration(rule, 'border-radius').value).toBe('0.25rem');
  });
});

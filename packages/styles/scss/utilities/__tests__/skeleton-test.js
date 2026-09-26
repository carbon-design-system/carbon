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
const css = require('css');

const { render } = SassRenderer.create(__dirname);

function findDeclaration(rule, property) {
  return rule.declarations.find((declaration) => {
    return declaration.property === property;
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
    const { stylesheet } = css.parse(result.css.toString());
    const rule = stylesheet.rules.find((candidate) => {
      return candidate.selectors && candidate.selectors.includes('.test');
    });

    expect(findDeclaration(rule, 'border-radius')).toBeUndefined();
    expect(findDeclaration(rule, 'overflow')).toBeUndefined();
  });

  it('does not emit border-radius in v11 when a token is passed', async () => {
    const { result } = await render(`
      @use '../skeleton';
      @use '../../border-radius';

      .test {
        @include skeleton.skeleton($border-radius: border-radius.$border-radius-04);
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());
    const rule = stylesheet.rules.find((candidate) => {
      return candidate.selectors && candidate.selectors.includes('.test');
    });

    expect(findDeclaration(rule, 'border-radius')).toBeUndefined();
  });

  it('applies the configured token in v12', async () => {
    const { result } = await render(`
      @use '../../feature-flags' with (
        $feature-flags: (
          'enable-v12-release': true,
        )
      );
      @use '../skeleton';
      @use '../../border-radius';

      .test {
        @include skeleton.skeleton($border-radius: border-radius.$border-radius-04);
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());
    const rule = stylesheet.rules.find((candidate) => {
      return candidate.selectors && candidate.selectors.includes('.test');
    });

    expect(findDeclaration(rule, 'overflow').value).toBe('hidden');
    expect(findDeclaration(rule, 'border-radius').value).toBe('0.25rem');
  });
});

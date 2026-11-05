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

describe('@carbon/styles/scss/reset', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:meta';
      @use '../reset';

      $_: get('mixin', meta.mixin-exists('reset', 'reset'));
    `);

    const { value: mixin } = get('mixin');
    expect(mixin).toBe(true);
  });

  test.each([
    ['default reset', "@use '../reset';", ''],
    [
      'scoped reset mixin',
      `
        @use '../config' with ($css--reset: false);
        @use '../reset';

        .content {
          @include reset.reset();
        }
      `,
      '.content ',
    ],
  ])(
    '%s preserves subscript and superscript alignment',
    async (_, source, scope) => {
      const { result } = await render(source);
      const { stylesheet } = css.parse(result.css.toString());

      for (const [element, alignment] of [
        ['sub', 'sub'],
        ['sup', 'super'],
      ]) {
        const declarations = stylesheet.rules
          .filter((rule) => rule.selectors?.includes(`${scope}${element}`))
          .flatMap((rule) => rule.declarations)
          .filter((declaration) => declaration.property === 'vertical-align');

        expect(declarations.at(-1)?.value).toBe(alignment);
      }
    }
  );

  test('does not emit reset styles when disabled', async () => {
    const { result } = await render(`
      @use '../config' with (
        $css--reset: false,
        $css--default-type: false,
      );
      @use '../reset';
    `);
    const { stylesheet } = css.parse(result.css.toString());

    expect(stylesheet.rules.filter((rule) => rule.type === 'rule')).toEqual([]);
  });
});

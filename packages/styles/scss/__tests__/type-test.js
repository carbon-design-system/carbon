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

describe('@carbon/styles/scss/type', () => {
  test('Public API', async () => {
    const { get } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../type';

      $_: get('api', (
        variables: map.keys(meta.module-variables('type')),
        mixins: (
          reset: meta.mixin-exists('reset', 'type'),
          type-style: meta.mixin-exists('type-style', 'type'),
          font-family: meta.mixin-exists('font-family', 'type'),
          font-weight: meta.mixin-exists('font-family', 'type'),
          default-type: meta.mixin-exists('default-type', 'type'),
          type-classes: meta.mixin-exists('type-classes', 'type'),
        ),
        functions: (
          font-weight: meta.function-exists('font-family', 'type'),
        ),
      ));
    `);

    const { value: api } = get('api');
    expect(api.functions).toEqual({
      'font-weight': true,
    });
    expect(api.mixins).toEqual({
      reset: true,
      'type-style': true,
      'font-family': true,
      'default-type': true,
      'type-classes': true,
      'font-weight': true,
    });
    expect(api.variables).toMatchInlineSnapshot(`
      Array [
        "label-01",
        "helper-text-01",
        "helper-text-02",
        "body-short-01",
        "body-short-02",
        "body-long-01",
        "body-long-02",
        "code-01",
        "code-02",
        "heading-01",
        "heading-02",
        "productive-heading-01",
        "productive-heading-02",
        "productive-heading-03",
        "productive-heading-04",
        "productive-heading-05",
        "productive-heading-06",
        "productive-heading-07",
        "expressive-paragraph-01",
        "expressive-heading-01",
        "expressive-heading-02",
        "expressive-heading-03",
        "expressive-heading-04",
        "expressive-heading-05",
        "expressive-heading-06",
        "quotation-01",
        "quotation-02",
        "display-01",
        "display-02",
        "display-03",
        "display-04",
        "font-families",
        "font-weights",
        "tokens",
      ]
    `);
  });

  test('prefix', async () => {
    const { result } = await render(`
      @use '../config' with (
        $prefix: 'custom',
      );
      @use '../type';

      .my-selector {
        @include type.type-style('label-01');
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());
    const [rule] = stylesheet.rules;
    for (const declaration of rule.declarations) {
      expect(declaration.value).toEqual(
        expect.stringContaining('var(--custom-')
      );
    }
  });

  test('type-classes mixin', async () => {
    const { result } = await render(`
      @use '../type';

      @include type.type-classes();

      .my-selector {
        @include type.type-style('label-01');
      }
    `);
    const { stylesheet } = css.parse(result.css.toString());
    expect(stylesheet).toMatchSnapshot();
  });
});

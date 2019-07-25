/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { createSassUtil } = require('@carbon/test-utils/scss');

const tests = useDartSass => {
  let sassUtil = createSassUtil(require('node-sass'));
  if (useDartSass) {
    sassUtil = createSassUtil(require('sass'));
  }

  const { createSassRenderer } = sassUtil;

  const { renderer: render, types } = createSassRenderer(__dirname, '');

  describe('colors.scss', () => {
    it('should emit no side-effects if mixins are included', async () => {
      /**
       * from https://github.com/carbon-design-system/carbon/pull/3174#discussion_r301828032
       *
       * Mixin variable hiding is currently somewhat broken in dart-sass
       *
       * Example:
       *
       * `_mixin.scss`
       *
       * ```
       * @mixin foo() {
       *  $var-foo: green !global;
       * }
       * ```
       *
       * `index.scss`
       *
       * ```
       * @import "mixin";
       *
       * @debug "$var-foo: #{$var-foo}";
       * @debug "type-of($var-foo): #{type-of($var-foo)}";
       * ```
       *
       * dart-sass would return:
       *
       * ```
       * index.scss: 3 Debug: $var-foo:
       * index.scss: 4 Debug: type-of($var-foo): null
       * ```
       *
       * While node-sass would throw an error
       *
       */
      const { calls } = await render(`
@import '../scss/mixins';

$test: test(mixin-exists(carbon--colors));
$test: test(global-variable-exists(carbon--blue-50));

// dart-sass test to show that mixin hiding _does work_
@mixin global-foo-test {
  $foo: "bar" !default !global;
}

$test: test(global-variable-exists(foo));
`);
      expect(calls[0][0].getValue()).toBe(true);
      if (useDartSass) {
        console.warn(`
mixin hiding does seem to work in dart-sass (as this test shows)
however the @import plus global-variable-exists test seems to break.`);
        expect(calls[2][0].getValue()).toBe(false);
      } else {
        expect(calls[1][0].getValue()).toBe(false);
      }
    });

    it('should include color variables as globals if the mixin is called', async () => {
      const { calls } = await render(`
@import '../scss/mixins';

@include carbon--colors();
$test: test(variable-exists(carbon--blue-50));
$test: test(global-variable-exists(carbon--blue-50));
`);
      expect(calls[0][0].getValue()).toBe(true);
      expect(calls[1][0].getValue()).toBe(true);
    });

    it('should include color variables in the default entrypoint', async () => {
      const { calls } = await render(`
@import '../scss/colors';

$test: test(mixin-exists(carbon--colors));
$test: test(variable-exists(carbon--blue-50));
$test: test(global-variable-exists(carbon--blue-50));
`);
      expect(calls[0][0].getValue()).toBe(true);
      expect(calls[1][0].getValue()).toBe(true);
      expect(calls[2][0].getValue()).toBe(true);
    });

    describe('deprecated', () => {
      it('should provide a map of color values', async () => {
        const { calls } = await render(`
@import '../scss/colors';

$map: test($ibm-color-map);
$swatch: test(map-get($ibm-color-map, 'black'));
$value: test(map-get(map-get($ibm-color-map, 'black'), 100));
$null: test(map-get($ibm-color-map, black));
`);

        expect(calls[0][0]).toBeInstanceOf(types.Map);
        expect(calls[1][0]).toBeInstanceOf(types.Map);
        expect(calls[2][0]).toBeInstanceOf(types.Color);
        expect(calls[3][0]).toBeInstanceOf(types.Null);
      });
    });
  });
};

tests(false);
tests(true);

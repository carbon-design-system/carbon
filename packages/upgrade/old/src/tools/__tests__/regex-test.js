/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { createFunctionRegex, createVariableRegex } = require('../regex');

describe('regex', () => {
  describe('createFunctionRegex', () => {
    it('should match a function or mixin', () => {
      const regex = createFunctionRegex('foo');
      expect('@function foo() {}'.match(regex)).not.toBe(null);
      expect('@mixin foo() {}'.match(regex)).not.toBe(null);
      expect('foo'.match(regex)).toBe(null);
    });

    it('should not match with a partial match', () => {
      const regex = createFunctionRegex('em');
      expect('@function em() {}'.match(regex)).not.toBe(null);
      expect('@mixin em() {}'.match(regex)).not.toBe(null);

      expect('@function rem() {}'.match(regex)).toBe(null);
      expect('@mixin rem() {}'.match(regex)).toBe(null);
    });

    it('should match a multiline function or mixin', () => {
      const regex = createFunctionRegex('foo');
      expect(
        `@function foo(
$a,
$b
) {}`.match(regex)
      ).not.toBe(null);
      expect(
        `@mixin foo(
$a,
$b
) {}`.match(regex)
      ).not.toBe(null);
    });

    it('should match when called in an expression', () => {
      const regex = createFunctionRegex('foo');
      expect(
        `
.selector {
  @include foo();
}
`.match(regex)
      ).not.toBe(null);

      expect(
        `
.selector {
  @include foo(
    1
  );
}
`.match(regex)
      ).not.toBe(null);

      expect(
        `
.selector {
  color: foo();
}
`.match(regex)
      ).not.toBe(null);

      expect(
        `
.selector {
  color: foo(
    1
  );
}
`.match(regex)
      ).not.toBe(null);
    });

    it('should work in a nested function call', () => {
      const regex = createFunctionRegex('foo');
      expect(
        `
.selector {
  color: bar(foo());
}
`.match(regex)
      ).not.toBe(null);
    });
  });

  describe('createVariableRegex', () => {
    it('should match variables in a source file', () => {
      const regex = createVariableRegex('some-variable');

      expect(regex.test('$some-variable: 1;')).toBe(true);
      expect(
        regex.test(`
.foo {
  color: $some-variable;
};
      `)
      ).toBe(true);
    });
  });
});

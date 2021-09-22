/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const prettier = require('prettier');
const { generate, types: t } = require('../src');

const prettierOptions = {
  parser: 'scss',
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
};

describe('@carbon/scss', () => {
  describe('assignments', () => {
    const assignment = [
      ['boolean', t.SassBoolean({ value: true }), '$variable: true;'],
      [
        'list',
        t.SassList({
          elements: [
            t.SassNumber({ value: 1 }),
            t.SassNumber({ value: 2 }),
            t.SassNumber({ value: 3 }),
          ],
        }),
        '$variable: (1, 2, 3);',
      ],
      [
        'map',
        t.SassMap({
          properties: [
            t.SassMapProperty({
              key: t.Identifier({ name: 'a' }),
              value: t.SassNumber({ value: 1 }),
            }),
            t.SassMapProperty({
              key: t.Identifier({ name: 'b' }),
              value: t.SassNumber({ value: 2 }),
              quoted: true,
            }),
            t.SassMapProperty({
              key: t.Identifier({ name: 'c' }),
              value: t.SassNumber({ value: 3 }),
            }),
          ],
        }),
        `$variable: (
  a: 1,
  'b': 2,
  c: 3
);`,
      ],
      ['number', t.SassNumber({ value: 1 }), '$variable: 1;'],
      ['string', t.SassString({ value: 'string' }), `$variable: 'string';`],
      [
        'flags',
        t.SassString({ value: 'string' }),
        `$variable: 'string' !default !global;`,
        {
          default: true,
          global: true,
        },
      ],
    ];

    test.each(assignment)('%s', (_, init, expected, options = {}) => {
      const { code } = generate(
        t.StyleSheet({
          children: [
            t.Assignment({
              id: t.Identifier({ name: 'variable' }),
              init,
              ...options,
            }),
          ],
        })
      );
      expect(code).toEqual(prettier.format(expected.trim(), prettierOptions));
    });
  });

  describe('rules', () => {
    const rules = [
      [
        'selector',

        t.Rule({
          selectors: ['ul'],
          declarations: [
            t.Declaration({
              property: 'display',
              value: 'block',
            }),
          ],
        }),
        `ul {
  display: block;
}`,
      ],
      [
        'multiple declarations',
        t.Rule({
          selectors: ['ul'],
          declarations: [
            t.Declaration({
              property: 'display',
              value: 'block',
            }),
            t.Declaration({
              property: 'position',
              value: 'absolute',
            }),
          ],
        }),
        `ul {
  display: block;
  position: absolute;
}`,
      ],
      [
        'selectors',
        t.Rule({
          selectors: ['.selector-a', '.selector-b'],
          declarations: [
            t.Declaration({
              property: 'display',
              value: 'block',
            }),
          ],
        }),
        `.selector-a, .selector-b {
  display: block;
}`,
      ],
    ];

    test.each(rules)('%s', (_, rule, expected) => {
      const { code } = generate(
        t.StyleSheet({
          children: [rule],
        })
      );
      expect(code).toEqual(prettier.format(expected.trim(), prettierOptions));
    });
  });

  describe('function', () => {
    const functions = [
      [
        'no arguments, no body',
        t.SassFunction({
          id: t.Identifier({ name: 'test' }),
          body: t.BlockStatement({
            body: [],
          }),
        }),
        `@function test() {
}`,
      ],
      [
        'no arguments',
        t.SassFunction({
          id: t.Identifier({ name: 'test' }),
          body: t.BlockStatement({
            body: [t.AtReturn({ argument: t.SassNumber({ value: 1 }) })],
          }),
        }),
        `@function test() {
  @return 1;
}`,
      ],
      [
        'argument',
        t.SassFunction({
          id: t.Identifier({ name: 'test' }),
          params: [t.Identifier({ name: 'a' })],
          body: t.BlockStatement({
            body: [t.AtReturn({ argument: t.SassNumber({ value: 1 }) })],
          }),
        }),
        `@function test($a) {
  @return 1;
}`,
      ],
      [
        'arguments',
        t.SassFunction({
          id: t.Identifier({ name: 'test' }),
          params: [
            t.Identifier({ name: 'a' }),
            t.Identifier({ name: 'b' }),
            t.Identifier({ name: 'c' }),
          ],
          body: t.BlockStatement({
            body: [t.AtReturn({ argument: t.SassNumber({ value: 1 }) })],
          }),
        }),
        `@function test($a, $b, $c) {
  @return 1;
}`,
      ],
      [
        'default argument',
        t.SassFunction({
          id: t.Identifier({ name: 'test' }),
          params: [
            t.AssignmentPattern({
              left: t.Identifier({ name: 'a' }),
              right: t.SassNumber({ value: 1 }),
            }),
            t.Identifier({ name: 'b' }),
            t.Identifier({ name: 'c' }),
          ],
          body: t.BlockStatement({
            body: [t.AtReturn({ argument: t.SassNumber({ value: 1 }) })],
          }),
        }),
        `@function test($a: 1, $b, $c) {
  @return 1;
}`,
      ],
      [
        'rest argument',
        t.SassFunction({
          id: t.Identifier({ name: 'test' }),
          params: [
            t.AssignmentPattern({
              left: t.Identifier({ name: 'a' }),
              right: t.SassNumber({ value: 1 }),
            }),
            t.Identifier({ name: 'b' }),
            t.RestPattern({
              id: t.Identifier({ name: 'c' }),
            }),
          ],
          body: t.BlockStatement({
            body: [t.AtReturn({ argument: t.SassNumber({ value: 1 }) })],
          }),
        }),
        `@function test($a: 1, $b, $c...) {
  @return 1;
}`,
      ],
    ];

    test.each(functions)('%s', (_, ast, expected) => {
      const { code } = generate(
        t.StyleSheet({
          children: [ast],
        })
      );
      expect(code).toEqual(prettier.format(expected.trim(), prettierOptions));
    });
  });

  describe('mixin', () => {
    const mixins = [
      [
        'no arguments, no body',
        t.SassMixin({
          id: t.Identifier({ name: 'test' }),
          body: t.BlockStatement({
            body: [],
          }),
        }),
        `@mixin test() {
}`,
      ],
      [
        'no arguments',
        t.SassMixin({
          id: t.Identifier({ name: 'test' }),
          body: t.BlockStatement({
            body: [t.AtContent()],
          }),
        }),
        `@mixin test() {
  @content;
}`,
      ],
      [
        'argument',
        t.SassMixin({
          id: t.Identifier({ name: 'test' }),
          params: [t.Identifier({ name: 'a' })],
          body: t.BlockStatement({
            body: [t.AtContent()],
          }),
        }),
        `@mixin test($a) {
  @content;
}`,
      ],
      [
        'arguments',
        t.SassMixin({
          id: t.Identifier({ name: 'test' }),
          params: [
            t.Identifier({ name: 'a' }),
            t.Identifier({ name: 'b' }),
            t.Identifier({ name: 'c' }),
          ],
          body: t.BlockStatement({
            body: [t.AtContent()],
          }),
        }),
        `@mixin test($a, $b, $c) {
  @content;
}`,
      ],
      [
        'default argument',
        t.SassMixin({
          id: t.Identifier({ name: 'test' }),
          params: [
            t.AssignmentPattern({
              left: t.Identifier({ name: 'a' }),
              right: t.SassNumber({ value: 1 }),
            }),
            t.Identifier({ name: 'b' }),
            t.Identifier({ name: 'c' }),
          ],
          body: t.BlockStatement({
            body: [t.AtContent()],
          }),
        }),
        `@mixin test($a: 1, $b, $c) {
  @content;
}`,
      ],
      [
        'rest argument',
        t.SassMixin({
          id: t.Identifier({ name: 'test' }),
          params: [
            t.AssignmentPattern({
              left: t.Identifier({ name: 'a' }),
              right: t.SassNumber({ value: 1 }),
            }),
            t.Identifier({ name: 'b' }),
            t.RestPattern({
              id: t.Identifier({ name: 'c' }),
            }),
          ],
          body: t.BlockStatement({
            body: [t.AtContent()],
          }),
        }),
        `@mixin test($a: 1, $b, $c...) {
  @content;
}`,
      ],
    ];

    test.each(mixins)('%s', (_, ast, expected) => {
      const { code } = generate(
        t.StyleSheet({
          children: [ast],
        })
      );
      expect(code).toEqual(prettier.format(expected.trim(), prettierOptions));
    });
  });

  describe('calls', () => {
    const calls = [
      [
        'mixin',
        t.SassMixinCall({
          id: t.Identifier({ name: 'some-mixin' }),
        }),
        '@include some-mixin();',
      ],
      [
        'mixin with args',
        t.SassMixinCall({
          id: t.Identifier({ name: 'some-mixin' }),
          params: [
            t.Identifier({ name: 'a' }),
            t.Identifier({ name: 'b' }),
            t.Identifier({ name: 'c' }),
          ],
        }),
        '@include some-mixin($a, $b, $c);',
      ],
      [
        'mixin with body',
        t.SassMixinCall({
          id: t.Identifier({ name: 'some-mixin' }),
          params: [
            t.Identifier({ name: 'a' }),
            t.Identifier({ name: 'b' }),
            t.Identifier({ name: 'c' }),
          ],
          body: t.BlockStatement({
            body: [
              t.Assignment({
                id: t.Identifier({ name: 'test' }),
                init: t.SassNumber({ value: 1 }),
              }),
            ],
          }),
        }),
        `@include some-mixin($a, $b, $c) {
  $test: 1;
};`,
      ],
      [
        'function in assignment',
        t.Assignment(
          t.Identifier('value'),
          t.SassFunctionCall(t.Identifier('map-get'), [
            t.Identifier('map'),
            t.SassString('key'),
          ])
        ),
        `$value: map-get($map, 'key');`,
      ],
    ];

    test.each(calls)('%s', (_, ast, expected) => {
      const { code } = generate(
        t.StyleSheet({
          children: [ast],
        })
      );
      expect(code).toEqual(prettier.format(expected.trim(), prettierOptions));
    });
  });

  describe('Control structures', () => {
    const structures = [
      [
        'if statement',
        t.IfStatement({
          test: t.SassBoolean(true),
          consequent: t.BlockStatement([]),
        }),
        `@if true {
}`,
      ],

      [
        'if else',
        t.IfStatement({
          test: t.SassBoolean(false),
          consequent: t.BlockStatement([]),
          alternate: t.BlockStatement([]),
        }),
        `@if false {
} @else {
}`,
      ],

      [
        'if > else if > else',
        t.IfStatement({
          test: t.SassBoolean(false),
          consequent: t.BlockStatement([]),
          alternate: t.IfStatement({
            test: t.SassBoolean(false),
            consequent: t.BlockStatement([]),
            alternate: t.BlockStatement([]),
          }),
        }),
        `@if false {
} @else if false {
} @else {
}`,
      ],
    ];

    test.each(structures)('%s', (_, ast, expected) => {
      const { code } = generate(ast);
      expect(code.trim()).toEqual(expected.trim());
    });
  });

  describe('Expressions', () => {
    const expressions = [
      [
        'no arguments',
        t.Assignment({
          id: t.Identifier('test'),
          init: t.CallExpression({
            callee: t.Identifier('foo'),
          }),
        }),
        '$test: foo();',
      ],
      [
        'single arguments',
        t.Assignment({
          id: t.Identifier('test'),
          init: t.CallExpression({
            callee: t.Identifier('foo'),
            arguments: [t.Identifier('bar')],
          }),
        }),
        '$test: foo($bar);',
      ],
      [
        'multiple arguments',
        t.Assignment({
          id: t.Identifier('test'),
          init: t.CallExpression({
            callee: t.Identifier('foo'),
            arguments: [t.Identifier('bar'), t.Identifier('baz')],
          }),
        }),
        '$test: foo($bar, $baz);',
      ],
    ];

    test.each(expressions)('%s', (_, ast, expected) => {
      const { code } = generate(ast);
      expect(code.trim()).toEqual(expected.trim());
    });
  });

  describe('formatting', () => {
    test('newline', () => {
      const { code } = generate(
        t.StyleSheet([t.Comment('start'), t.Newline(), t.Comment('end')])
      );
      expect(code).toBe(`//start

//end
`);
    });
  });
});

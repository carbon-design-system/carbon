/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { formatTokenName } = require('../../lib');
const { FILE_BANNER } = require('./shared');

function buildMixinsFile(themes, tokens, defaultTheme, defaultThemeMapName) {
  const comment = t.Comment(`/ Define theme variables from a map of tokens
/ @access public
/ @param {Map} $theme [$${defaultThemeMapName}] - Map of theme tokens
/ @param {Bool} $emit-custom-properties [false] - Output CSS Custom Properties for theme tokens
/ @content Pass in your custom declaration blocks to be used after the token maps set theming variables.
/
/ @example scss
/   // Default usage
/   @include carbon--theme();
/
/   // Alternate styling (not white theme)
/   @include carbon--theme($carbon--theme--g90) {
/     // declarations...
/   }
/
/   // Inline styling
/   @include carbon--theme($carbon--theme--g90) {
/     .my-dark-theme {
/       // declarations...
/     }
/   }
/
/ @group @carbon/themes`);

  // Create carbon--theme mixin, takes a theme as input and assigns all theme
  // variables using the `!global` flag before resetting at the end of the
  // function block
  const mixin = t.SassMixin({
    id: t.Identifier('carbon--theme'),
    params: [
      t.AssignmentPattern({
        left: t.Identifier('theme'),
        right: t.Identifier(defaultThemeMapName),
      }),
      t.AssignmentPattern({
        left: t.Identifier('emit-custom-properties'),
        right: t.SassBoolean(false),
      }),
      t.AssignmentPattern({
        left: t.Identifier('emit-difference'),
        right: t.SassBoolean(false),
      }),
    ],
    body: t.BlockStatement({
      body: [
        ...Object.keys(tokens).flatMap(group => {
          return tokens[group].flatMap(token => {
            const name = formatTokenName(token);

            return t.Assignment({
              id: t.Identifier(name),
              init: t.CallExpression({
                callee: t.Identifier('map-get'),
                arguments: [t.Identifier('theme'), t.SassString(name)],
              }),
              global: true,
            });
          });
        }),
        t.IfStatement({
          test: t.LogicalExpression({
            left: t.SassFunctionCall(t.Identifier('global-variable-exists'), [
              t.SassString('feature-flags'),
            ]),
            operator: 'and',
            right: t.SassFunctionCall(t.Identifier('map-get'), [
              t.Identifier('feature-flags'),
              t.SassString('enable-css-custom-properties'),
            ]),
          }),
          consequent: t.BlockStatement(
            Object.keys(tokens).flatMap(group => {
              return tokens[group]
                .filter(token => {
                  // We don't want to inline CSS Custom Properties for tokens
                  // that are maps, we'll need to use a corresponding mixin for
                  // that token to embed CSS Custom Properties
                  return typeof themes[defaultTheme][token] !== 'object';
                })
                .flatMap(token => {
                  const name = formatTokenName(token);
                  return t.Assignment({
                    id: t.Identifier(name),
                    init: t.CallExpression({
                      callee: t.Identifier('var'),
                      arguments: [
                        t.SassValue({
                          value: `--#{$custom-property-prefix}-${name}`,
                        }),
                        t.CallExpression({
                          callee: t.Identifier('map-get'),
                          arguments: [
                            t.Identifier('theme'),
                            t.SassString(name),
                          ],
                        }),
                      ],
                    }),
                    global: true,
                  });
                });
            })
          ),
        }),
        t.IfStatement({
          test: t.LogicalExpression({
            left: t.Identifier('emit-custom-properties'),
            operator: '==',
            right: t.SassBoolean(true),
          }),
          consequent: t.BlockStatement(
            Object.keys(tokens).flatMap(group => {
              return tokens[group].flatMap(token => {
                const name = formatTokenName(token);
                return [
                  t.Newline(),
                  t.IfStatement({
                    test: t.SassFunctionCall(t.Identifier('should-emit'), [
                      t.Identifier('theme'),
                      t.Identifier('carbon--theme'),
                      t.SassString(name),
                      t.Identifier('emit-difference'),
                    ]),
                    consequent: t.BlockStatement([
                      t.SassMixinCall(t.Identifier('custom-property'), [
                        t.SassString(name),
                        t.SassFunctionCall(t.Identifier('map-get'), [
                          t.Identifier('theme'),
                          t.SassString(name),
                        ]),
                      ]),
                    ]),
                  }),
                ];
              });
            })
          ),
        }),
        t.AtContent(),
        t.Comment(' Reset to default theme after apply in content'),
        t.IfStatement({
          test: t.LogicalExpression({
            left: t.Identifier('theme'),
            operator: '!=',
            right: t.Identifier(defaultThemeMapName),
          }),
          consequent: t.BlockStatement([
            t.SassMixinCall(t.Identifier('carbon--theme')),
          ]),
        }),
      ],
    }),
  });

  return t.StyleSheet([
    FILE_BANNER,
    t.Newline(),
    t.SassImport('./themes'),
    t.Newline(),
    comment,
    mixin,
  ]);
}

module.exports = buildMixinsFile;

/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { formatTokenName } = require('../../lib');
const { FILE_BANNER, primitive } = require('./shared');

/**
 * Build the AST for a _tokens.scss file with a structure similar to:
 *
 * $token-name-01: <some-value>;
 * $token-name-02: <some-value>;
 *
 * By default, these tokens are assigned to their value in the given
 * `defaultTheme`
 * @param {object} tokens
 * @param {object} metadata
 * @param {object} defaultTheme
 * @returns {SassAST}
 */
function buildTokensFile(tokens, metadata, defaultTheme) {
  const typesByGroup = {
    color: 'Color',
    type: 'Number',
    layout: 'Number',
  };

  const assignments = Object.keys(tokens).flatMap(group => {
    return tokens[group].flatMap(token => {
      const name = formatTokenName(token);
      const tokenData =
        (metadata.tokens &&
          metadata.tokens.find(tok => {
            return tok.name === token;
          })) ||
        {};

      return [
        t.Newline(),
        tokenData.role && t.Comment(`/ ${tokenData.role.join('; ')}`),
        t.Comment(`/ @type {${typesByGroup[group]}}
/ @access public
/ @group @carbon/themes`),
        tokenData.alias && t.Comment(`/ @alias ${tokenData.alias}`),
        tokenData.deprecated && t.Comment(`/ @deprecated`),
        t.Assignment({
          id: t.Identifier(name),
          init: t.SassFunctionCall(t.Identifier('if'), [
            t.LogicalExpression({
              left: t.SassFunctionCall(t.Identifier('global-variable-exists'), [
                t.SassString('carbon--theme'),
              ]),
              operator: 'and',
              right: t.SassFunctionCall(t.Identifier('map-has-key'), [
                t.Identifier('carbon--theme'),
                t.SassString(name),
              ]),
            }),
            t.SassFunctionCall(t.Identifier('map-get'), [
              t.Identifier('carbon--theme'),
              t.SassString(name),
            ]),
            primitive(defaultTheme[token]),
          ]),
          default: true,
        }),
      ].filter(Boolean);
    });
  });

  return t.StyleSheet([FILE_BANNER, t.Newline(), ...assignments]);
}

module.exports = buildTokensFile;

/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { formatTokenName } = require('../../lib');
const {
  FILE_BANNER,
  primitive,
  defaultTheme,
  defaultThemeMapName,
} = require('./shared');

function buildThemesFile(themes, tokens) {
  // Create maps for each theme:
  // $carbon--theme--name: (
  //   token-name: token-value
  // ) !default;
  const themeMaps = Object.keys(themes).flatMap(name => {
    const theme = themes[name];
    const comment = t.Comment(`/ Carbon's ${name} color theme
/ @type Map
/ @access public
/ @group @carbon/themes`);
    const variable = t.Assignment({
      id: t.Identifier(`carbon--theme--${name}`),
      init: t.SassMap({
        properties: Object.keys(theme).map(token =>
          t.SassMapProperty(
            t.Identifier(formatTokenName(token)),
            primitive(theme[token])
          )
        ),
      }),
      default: true,
    });
    return [t.Newline(), comment, variable];
  });

  const carbonTheme = t.Assignment({
    id: t.Identifier(defaultThemeMapName),
    init: t.SassMap({
      properties: Object.keys(tokens).flatMap(group => {
        return tokens[group].flatMap(token => {
          const name = formatTokenName(token);
          return t.SassMapProperty(
            t.Identifier(name),
            t.SassFunctionCall(t.Identifier('if'), [
              t.SassFunctionCall(t.Identifier('global-variable-exists'), [
                t.SassString(name),
              ]),
              t.Identifier(name),
              t.SassFunctionCall(t.Identifier('map-get'), [
                t.Identifier('carbon--theme--white'),
                t.SassString(name),
              ]),
            ])
          );
        });
      }),
    }),
    default: true,
  });

  return t.StyleSheet([
    FILE_BANNER,
    t.Newline(),
    ...themeMaps,
    t.Newline(),
    t.Comment(`/ Carbon's default theme
/ @type Map
/ @access public
/ @alias carbon--theme--${defaultTheme}
/ @group @carbon/themes`),
    carbonTheme,
  ]);
}

module.exports = buildThemesFile;

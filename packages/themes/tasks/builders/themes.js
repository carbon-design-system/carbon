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

function buildThemesFile(
  themes,
  tokens,
  defaultThemeName,
  defaultThemeMapName
) {
  const defaultTheme = themes[defaultThemeName];
  const defaultThemeMap = t.Assignment({
    id: t.Identifier(`carbon--theme--${defaultThemeName}`),
    init: t.SassMap({
      properties: Object.keys(defaultTheme).map(token => {
        return t.SassMapProperty(
          t.Identifier(formatTokenName(token)),
          primitive(defaultTheme[token])
        );
      }),
    }),
    default: true,
  });
  const themeMaps = Object.keys(themes)
    .filter(name => name !== defaultThemeName)
    .flatMap(name => {
      const theme = themes[name];
      const comment = t.Comment(`/ Carbon's ${name} color theme
/ @type Map
/ @access public
/ @group @carbon/themes`);
      return [
        t.Newline(),
        comment,
        t.Assignment({
          id: t.Identifier(`carbon--theme--${name}`),
          init: t.SassFunctionCall(t.Identifier('map-merge'), [
            t.Identifier(`carbon--theme--${defaultThemeName}`),
            t.SassMap({
              properties: Object.keys(theme)
                .filter(token => {
                  return theme[token] !== defaultTheme[token];
                })
                .map(token => {
                  return t.SassMapProperty(
                    t.Identifier(formatTokenName(token)),
                    primitive(theme[token])
                  );
                }),
            }),
          ]),
          default: true,
        }),
      ];
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
    defaultThemeMap,
    ...themeMaps,
    t.Newline(),
    t.Comment(`/ Carbon's default theme
/ @type Map
/ @access public
/ @alias carbon--theme--${defaultThemeName}
/ @group @carbon/themes`),
    carbonTheme,
  ]);
}

module.exports = buildThemesFile;

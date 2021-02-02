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

function buildThemesFile(themes, tokens, defaultThemeName) {
  const defaultTheme = themes[defaultThemeName];
  const defaultThemeMap = t.Assignment({
    id: t.Identifier(defaultThemeName),
    init: t.SassFunctionCall(t.Identifier('utilities.merge'), [
      t.SassValue('layout.$spacing'),
      t.SassValue('layout.$fluid-spacing'),
      t.SassValue('type.$tokens'),
      t.SassMap({
        properties: Object.keys(defaultTheme)
          .filter((token) => {
            return tokens.colors.includes(token);
          })
          .map((token) => {
            return t.SassMapProperty(
              t.Identifier(formatTokenName(token)),
              primitive(defaultTheme[token])
            );
          }),
      }),
    ]),
    default: true,
  });
  const themeMaps = Object.keys(themes)
    .filter((name) => {
      return name !== defaultThemeName && name !== 'v9';
    })
    .flatMap((name) => {
      const theme = themes[name];
      const comment = t.Comment(`/ Carbon's ${name} color theme
/ @type Map
/ @access public
/ @group @carbon/themes`);
      return [
        t.Newline(),
        comment,
        t.Assignment({
          id: t.Identifier(name),
          init: t.SassFunctionCall(t.Identifier('map.merge'), [
            t.Identifier(defaultThemeName),
            t.SassMap({
              properties: Object.keys(theme)
                .filter((token) => {
                  return theme[token] !== defaultTheme[token];
                })
                .map((token) => {
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

  return t.StyleSheet([
    FILE_BANNER,
    t.Newline(),
    t.SassModule('sass:map'),
    t.SassModule('@carbon/layout'),
    t.SassModule('@carbon/type'),
    t.SassModule('../utilities'),
    t.Newline(),
    defaultThemeMap,
    ...themeMaps,
  ]);
}

module.exports = buildThemesFile;

/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { TokenFormat, themes, group } = require('../../src/next');
const { FILE_BANNER, primitive } = require('./shared');

function buildThemesFile() {
  const imports = [
    t.SassModule('sass:map'),
    t.SassModule('@carbon/layout'),
    t.SassModule('@carbon/type'),
    t.SassModule('../utilities'),
  ];
  const variables = Object.entries(themes).flatMap(([key, theme]) => {
    return [
      t.Newline(),
      t.Assignment({
        id: t.Identifier(key),
        init: t.SassMap({
          properties: Object.entries(theme)
            .filter(([token]) => {
              return group.getToken(
                TokenFormat.convert({
                  name: token,
                  format: TokenFormat.formats.scss,
                })
              );
            })
            .map(([token, value]) => {
              const id = TokenFormat.convert({
                name: token,
                format: TokenFormat.formats.scss,
              });
              return t.SassMapProperty(t.Identifier(id), primitive(value));
            }),
        }),
        default: true,
      }),
      t.Assignment({
        id: t.Identifier(key),
        init: t.SassFunctionCall({
          id: t.Identifier('utilities.merge'),
          params: [
            t.Identifier(key),
            t.SassValue('layout.$spacing'),
            t.SassValue('layout.$fluid-spacing'),
            t.SassValue('type.$tokens'),
          ],
        }),
      }),
    ];
  });

  return t.StyleSheet([FILE_BANNER, t.Newline(), ...imports, ...variables]);
}

module.exports = buildThemesFile;

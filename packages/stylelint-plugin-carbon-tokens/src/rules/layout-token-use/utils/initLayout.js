/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import postcss from 'postcss';
import scss from 'postcss-scss';
import fs from 'fs';
import { getCarbonFilePath } from '../../../utils';

const layoutTokens = [];

const fileName = getCarbonFilePath('layout', '_layout.scss');
const scssFromFile = fs.readFileSync(fileName, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${fileName}`,
  syntax: scss,
  stringifier: scss.stringify,
});

result.root.walkDecls((decl) => {
  // matches form $carbon--layout, $carbon--layout-NN or $layout-NN
  if (/^\$(carbon--){0,1}layout(-[0-9]{2})*/.test(decl.prop)) {
    layoutTokens.push(decl.prop);
    layoutTokens.push(`-${decl.prop}`); // allow negative tokens
  }
});

// permitted carbon layout functions
// TODO: read this from carbon
const layoutFunctions = ['carbon--mini-units', 'mini-units'];

export { layoutTokens, layoutFunctions };

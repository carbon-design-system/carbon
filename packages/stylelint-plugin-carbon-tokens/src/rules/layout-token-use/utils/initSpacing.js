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

const spacingTokens = [];

const filename = getCarbonFilePath('layout', '_spacing.scss');
const scssFromFile = fs.readFileSync(filename, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${filename}`,
  syntax: scss,
  stringifier: scss.stringify,
});

result.root.walkDecls((decl) => {
  // matches form $carbon--spacing, $carbon--spacing-NN or $spacing-NN
  if (/^\$(carbon--){0,1}spacing(-[0-9]{2})*/.test(decl.prop)) {
    spacingTokens.push(decl.prop);
    spacingTokens.push(`-${decl.prop}`); // allow negative tokens
  }
});

export { spacingTokens };

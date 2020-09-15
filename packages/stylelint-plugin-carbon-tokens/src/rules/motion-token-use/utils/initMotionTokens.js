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

const motionTokens = [];

const filename = getCarbonFilePath('motion', '_motion.scss');

const scssFromFile = fs.readFileSync(filename, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${filename}`,
  syntax: scss,
  stringifier: scss.stringify,
});

result.root.walkDecls((decl) => {
  // matches form $duration--speed-nn
  if (/^\$duration--([a-z]*)(-[0-9]{2})*/.test(decl.prop)) {
    motionTokens.push(decl.prop);
  }
});

// permitted carbon motion functions
// TODO: read this from carbon
// const motionFunctions = ["motion", "carbon--motion"];

export { motionTokens };

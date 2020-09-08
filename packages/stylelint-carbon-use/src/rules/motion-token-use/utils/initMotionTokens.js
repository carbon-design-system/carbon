import postcss from 'postcss';
import scss from 'postcss-scss';
import fs from 'fs';
import { getCarbonFilePath } from '../../../utils';

const motionTokens = [];

const fileName = getCarbonFilePath('motion', '_motion.scss');
const scssFromFile = fs.readFileSync(fileName, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${fileName}`,
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

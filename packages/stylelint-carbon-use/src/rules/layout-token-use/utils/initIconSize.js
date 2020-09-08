import postcss from 'postcss';
import scss from 'postcss-scss';
import fs from 'fs';
import { getCarbonFilePath } from '../../../utils';

const iconSizeTokens = [];

const fileName = getCarbonFilePath('layout', '_icon-size.scss');
const scssFromFile = fs.readFileSync(fileName, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${fileName}`,
  syntax: scss,
  stringifier: scss.stringify,
});

result.root.walkDecls((decl) => {
  // matches form $carbon--iconSize, $carbon--iconSize-NN or $iconSize-NN
  if (/^\$(carbon--){0,1}icon-size(-[0-9]{2})*/.test(decl.prop)) {
    iconSizeTokens.push(decl.prop);
    iconSizeTokens.push(`-${decl.prop}`); // allow negative tokens
  }
});

export { iconSizeTokens };

import postcss from 'postcss';
import scss from 'postcss-scss';
import fs from 'fs';
import { getCarbonFilePath } from '../../../utils';

const containerTokens = [];

const fileName = getCarbonFilePath('layout', '_container.scss');
const scssFromFile = fs.readFileSync(fileName, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${fileName}`,
  syntax: scss,
  stringifier: scss.stringify,
});

result.root.walkDecls((decl) => {
  // matches form $carbon--container, $carbon--container-NN or $container-NN
  if (/^\$(carbon--){0,1}container(-[0-9]{2})*/.test(decl.prop)) {
    containerTokens.push(decl.prop);
    containerTokens.push(`-${decl.prop}`); // allow negative tokens
  }
});

export { containerTokens };

import postcss from 'postcss';
import scss from 'postcss-scss';
import fs from 'fs';
import { getCarbonFilePath } from '../../../utils';

const spacingTokens = [];

const fileName = getCarbonFilePath('layout', '_spacing.scss');
const scssFromFile = fs.readFileSync(fileName, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${fileName}`,
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

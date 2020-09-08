import postcss from 'postcss';
import scss from 'postcss-scss';
import fs from 'fs';
import { getCarbonFilePath } from '../../../utils';

const fluidSpacingTokens = [];

const fileName = getCarbonFilePath('layout', '_fluid-spacing.scss');
const scssFromFile = fs.readFileSync(fileName, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${fileName}`,
  syntax: scss,
  stringifier: scss.stringify,
});

result.root.walkDecls((decl) => {
  // matches form $carbon--fluid-spacing, $carbon--fluid-spacing-NN or $fluid-spacing-NN
  if (/^\$(carbon--){0,1}fluid-spacing(-[0-9]{2})*/.test(decl.prop)) {
    fluidSpacingTokens.push(decl.prop);
    fluidSpacingTokens.push(`-${decl.prop}`); // allow negative tokens
  }
});

export { fluidSpacingTokens };

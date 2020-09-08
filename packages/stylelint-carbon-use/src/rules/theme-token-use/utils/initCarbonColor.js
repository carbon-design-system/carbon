import postcss from 'postcss';
import scss from 'postcss-scss';
import fs from 'fs';
import { getCarbonFilePath } from '../../../utils';

const carbonColorsMixin = 'carbon--colors()';
const ibmColorsMixin = 'ibm--colors()';
let carbonColorTokens = [];
let ibmColorTokens = []; // deprecated

const fileName = getCarbonFilePath('colors', 'mixins.scss');
const scssFromFile = fs.readFileSync(fileName, 'utf8');

const result = postcss().process(`${scssFromFile}`, {
  from: `${fileName}`,
  syntax: scss,
  stringifier: scss.stringify,
});

result.root.walkAtRules((atRule) => {
  if (atRule.name === 'mixin') {
    if ([ibmColorsMixin, carbonColorsMixin].includes(atRule.params)) {
      const processedResults = [];

      atRule.each((rule) => {
        processedResults.push(rule.prop);
      });

      if (atRule.params === ibmColorsMixin) {
        ibmColorTokens = processedResults;
      } else {
        carbonColorTokens = processedResults;
      }
    }
  }
});

export { carbonColorTokens, ibmColorTokens };

const { execSync } = require('child_process');
const path = require('path');

const docgenPath = path
  .resolve(__dirname, '../node_modules/.bin/react-docgen')
  .replace(/ /g, '\\ ');

const outFile = 'docs/data/react-docgen.json';

const ignoreDirs = ['DataTable', 'tools', 'UIShell'].join(' -i ');
const excludeFiles = ['test', 'story', 'index', 'util', 'PropTypes'].join('|');

try {
  execSync(
    `${docgenPath} src/components -i ${ignoreDirs} -o ${outFile} -e '/(${excludeFiles})/'`
  );
} catch (e) {
  console.log('test');
}

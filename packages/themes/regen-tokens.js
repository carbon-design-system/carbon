const { generate } = require('@carbon/scss-generator');
const fs = require('fs-extra');
const path = require('path');
const buildDTCGTokens = require('./tasks/builders/dtcg-tokens.js');
const ast = buildDTCGTokens();
generate(ast)
  .then(({ code }) => {
    const src = code.toString();
    const out = path.resolve(__dirname, 'scss/generated/_tokens.scss');
    fs.writeFileSync(out, src, 'utf8');
  })
  .catch(() => {
    process.exit(1);
  });

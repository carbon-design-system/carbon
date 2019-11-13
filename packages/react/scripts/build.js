'use strict';

const { execSync } = require('child_process');
const { inInstall } = require('in-publish');
const path = require('path');
const fs = require('fs');
const mapValues = require('lodash/mapValues');

if (inInstall()) {
  process.exit(0);
}

const babelPath = path
  .resolve(__dirname, '../node_modules/.bin/babel')
  .replace(/ /g, '\\ ');
const rollupPath = path
  .resolve(__dirname, '../node_modules/.bin/rollup')
  .replace(/ /g, '\\ ');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

const ignoreGlobs = ['**/__tests__/*', '**/*-test.js', '**/*-story.js'].join(
  ','
);

try {
  exec(`${babelPath} src -q -d es --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'es',
  });
  exec(`${babelPath} src -q -d lib --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'cjs',
  });

  // Create docgen metadata
  exec(`${babelPath} src -q -d build/docgen --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'docgen',
  });
  fs.writeFileSync(
    'react-docgen.json',
    JSON.stringify(mapValues(require(`../build/docgen`), '__docgenInfo'))
  );

  exec(
    `${rollupPath} -c scripts/rollup.config.js -o umd/carbon-components-react.js`,
    {
      NODE_ENV: 'development',
    }
  );
  exec(
    `${rollupPath} -c scripts/rollup.config.js -o umd/carbon-components-react.min.js`,
    {
      NODE_ENV: 'production',
    }
  );
} catch (error) {
  console.error('One of the commands failed:', error.stack); // eslint-disable-line no-console
  process.exit(1);
}

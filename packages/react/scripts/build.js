'use strict';

const { execSync } = require('child_process');
const { inInstall } = require('in-publish');
const fs = require('fs');
const mapValues = require('lodash/mapValues');
const which = require('npm-which')(__dirname);

if (inInstall()) {
  process.exit(0);
}

const babelPath = which.sync('babel');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

const ignoreGlobs = ['**/__tests__/*', '**/*-test.js', '**/*-story.js'].join(
  ','
);

try {
  exec(`${babelPath} src --quiet -d es --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'es',
  });
  exec(`${babelPath} src --quiet -d lib --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'cjs',
  });

  // Create docgen metadata
  exec(`${babelPath} src --quiet -d build/docgen --ignore "${ignoreGlobs}"`, {
    BABEL_ENV: 'docgen',
  });
  fs.writeFileSync(
    'react-docgen.json',
    JSON.stringify(mapValues(require(`../build/docgen`), '__docgenInfo'))
  );
} catch (error) {
  console.error('One of the commands failed:', error.stack); // eslint-disable-line no-console
  process.exit(1);
}

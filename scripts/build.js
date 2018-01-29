'use strict';

const { execSync } = require('child_process');
const { inInstall } = require('in-publish');
const path = require('path');
const rimraf = require('rimraf');
const { promisify } = require('util');

if (inInstall()) {
  process.exit(0);
}

const rootDir = path.resolve(__dirname, '../');
const babelPath = path
  .resolve(__dirname, '../node_modules/.bin/babel')
  .replace(/ /g, '\\ ');
const rimrafAsync = promisify(rimraf);

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

const ignoreGlobs = ['**/__tests__/*', '**/*-test.js', '**/*-story.js'].join(
  ','
);

console.log('Deleting old build folders...');
Promise.all([rimrafAsync(`${rootDir}/lib`), rimrafAsync(`${rootDir}/es`)])
  .then(() => {
    exec(`${babelPath} src -q -d es --ignore "${ignoreGlobs}"`, {
      BABEL_ENV: 'es',
    });
    exec(`${babelPath} src -q -d lib --ignore "${ignoreGlobs}"`, {
      BABEL_ENV: 'cjs',
    });
  })
  .catch(error => {
    throw error;
  });

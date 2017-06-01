const fs = require('fs');
const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');
const path = require('path');

if (inInstall()) process.exit(0);

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

console.log('Building CommonJS modules ...');

const babelPath = path.resolve(__dirname, '../node_modules/.bin/babel');

exec(`${babelPath} components internal lib index.js -d cjs`, {
  BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec(`${babelPath} components internal lib index.js -d es`, {
  BABEL_ENV: 'es',
});

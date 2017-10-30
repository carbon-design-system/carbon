const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const path = require('path');
const rimraf = require('rimraf');

if (inInstall()) process.exit(0);

let babelPath = path.resolve(__dirname, '../node_modules/.bin/babel');
babelPath = babelPath.replace(/ /g, '\\ ');
const dirs = ['components', 'lib', 'internal'];
const rootDir = path.resolve(__dirname, '../');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

const compile = (dirs, type) => {
  dirs.forEach(dir => {
    exec(`${babelPath} ${dir} --out-dir ${type}/${dir} --ignore __tests__`, {
      BABEL_ENV: type,
    });
  });

  exec(`${babelPath} index.js -d ${type}`, {
    BABEL_ENV: type,
  });
};

console.log('Deleting old build folders ...');
rimraf(`${rootDir}/cjs`, err => {
  if (err) throw err;

  rimraf(`${rootDir}/es`, err => {
    if (err) throw err;

    console.log('Building CommonJS modules ...');
    compile(dirs, 'cjs');

    console.log('\nBuilding ES modules ...');
    compile(dirs, 'es');
  });
});

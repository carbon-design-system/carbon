const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const path = require('path');

if (inInstall()) process.exit(0);

const babelPath = path.resolve(__dirname, '../node_modules/.bin/babel');
const dirs = ['components', 'lib', 'internal'];

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

console.log('Building CommonJS modules ...');
compile(dirs, 'cjs');

console.log('\nBuilding ES modules ...');
compile(dirs, 'es');

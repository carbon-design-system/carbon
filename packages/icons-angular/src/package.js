const fs = require('fs-extra');
const { resolve } = require('path');
const paths = require('./paths');

const packageBuild = async () => {
  await fs.ensureDir(paths.PACKAGE);
  await fs.emptyDir(paths.PACKAGE);
  await fs.copy(paths.NPM_PACKAGE, paths.PACKAGE);
  await fs.copy(
    resolve(paths.PACKAGE, 'bundles'),
    resolve(paths.PACKAGE, 'umd')
  );
  await fs.copy(paths.LIB, `${paths.PACKAGE}/lib`);
  await fs.copy('README.md', `${paths.PACKAGE}/README.md`);
};

module.exports = packageBuild;

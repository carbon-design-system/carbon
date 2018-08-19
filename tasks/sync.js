'use strict';

const fs = require('fs-extra');
const path = require('path');
const lerna = require('../lerna.json');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const REPO_URL_BASE =
  'https://github.com/IBM/carbon-elements/tree/master/packages';

async function sync() {
  const packages = await fs.readdir(PACKAGES_DIR);
  const packageJsons = await Promise.all(
    packages.map(async pkg => {
      const packageJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
      return {
        basename: pkg,
        filepath: packageJsonPath,
        file: await fs.readJson(packageJsonPath),
      };
    })
  );

  await Promise.all(
    packageJsons.map(async ({ basename, filepath, file }) => {
      file.version = lerna.version;
      file.repository = `${REPO_URL_BASE}/${basename}`;
      file.bugs = 'https://github.com/IBM/carbon-elements/issues';
      file.license = 'Apache-2.0';
      file.publishConfig = {
        access: 'public',
      };

      return fs.writeJson(filepath, file, { spaces: 2 });
    })
  );
}

// eslint-disable-next-line no-console
sync().catch(error => console.error(error));

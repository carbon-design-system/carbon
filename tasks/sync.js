/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const lerna = require('../lerna.json');
const packageJson = require('../package.json');

const prettierOptions = {
  ...packageJson.prettier,
  parser: 'markdown',
};

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const REPO_URL_BASE =
  'https://github.com/carbon-design-system/carbon/tree/master/packages';

// This is our default set of keywords to include in each `package.json` file
const DEFAULT_KEYWORDS = [
  'ibm',
  'carbon',
  'carbon-design-system',
  'components',
  'react',
];

// We're going to use this in our `sortFields` method. The idea is that we want
// our `package.json` files to be ordered in the order given in this array. To
// accomplish this, we create an object where we can reference the value
// assigned to a field when sorting. By default, highest priority fields start
// with 1 and go up. Unknown fields are all given the same priority, which is
// just the length of the array + 1. When we use `sortFields` we are checking
// for the value from `packageJsonFields` and comparing it with the other value.
const packageJsonFields = [
  'name',
  'private',
  'description',
  'version',
  'license',
  'bin',
  'main',
  'module',
  'repository',
  'bugs',
  'homepage',
  'engines',
  'files',
  'keywords',
  'publishConfig',
  'scripts',
  'resolutions',
  'peerDependencies',
  'dependencies',
  'devDependencies',
  'sideEffects',
  'eyeglass',
  'eslintConfig',
  'prettier',
  'babel',
  'jest',
].reduce(
  (acc, key, index) => ({
    ...acc,
    [key]: index + 1,
  }),
  {}
);
const UNKNOWN_FIELD = Object.keys(packageJsonFields).length + 1;
function sortFields(a, b) {
  const aValue = packageJsonFields[a] || UNKNOWN_FIELD;
  const bValue = packageJsonFields[b] || UNKNOWN_FIELD;
  return aValue - bValue;
}

async function sync() {
  const packagePaths = await Promise.all(
    (await fs.readdir(PACKAGES_DIR)).map(async (pkg) => {
      const packageJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
      return {
        basename: pkg,
        filepath: packageJsonPath,
        file: await fs.readJson(packageJsonPath),
        packagePath: path.join(PACKAGES_DIR, pkg),
      };
    })
  );

  const packages = await Promise.all(
    packagePaths.map(async ({ basename, filepath, file, ...rest }) => {
      file.repository = `${REPO_URL_BASE}/${basename}`;
      file.bugs = 'https://github.com/carbon-design-system/carbon/issues';
      file.license = 'Apache-2.0';
      file.publishConfig = {
        access: 'public',
      };

      if (Array.isArray(file.keywords)) {
        const keywordsToAdd = DEFAULT_KEYWORDS.filter((keyword) => {
          return file.keywords.indexOf(keyword) === -1;
        });
        if (keywordsToAdd.length > 0) {
          file.keywords = [...file.keywords, ...keywordsToAdd];
        }
      } else {
        file.keywords = DEFAULT_KEYWORDS;
      }

      // Construct our new packageJson file with sorted fields
      const packageJson = Object.keys(file)
        .sort(sortFields)
        .reduce(
          (acc, key) => ({
            ...acc,
            [key]: file[key],
          }),
          {}
        );

      await fs.writeJson(filepath, packageJson, { spaces: 2 });
      return {
        ...rest,
        basename,
        filepath,
        packageJson,
      };
    })
  );

  // Sync `.npmignore` files
  const defaultIgnorePatterns = [
    '**/__mocks__/**',
    '**/__tests__/**',
    '**/examples/**',
    '**/tasks/**',
  ];
  await Promise.all(
    packages.map(async ({ packageJson, packagePath }) => {
      const ignorePath = path.join(packagePath, '.npmignore');
      const ignorePatterns = [...defaultIgnorePatterns];

      if (await fs.pathExists(ignorePath)) {
        const ignoreFile = await fs.readFile(ignorePath, 'utf8');
        const localIgnorePatterns = ignoreFile.split('\n').filter((pattern) => {
          return ignorePatterns.indexOf(pattern) === -1;
        });

        ignorePatterns.push(...localIgnorePatterns);
      }

      await fs.writeFile(ignorePath, ignorePatterns.join('\n'));
    })
  );
}

sync().catch((error) => console.error(error));

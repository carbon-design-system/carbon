/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE packageJson in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');

// This is our default set of keywords to include in each `package.json` packageJson
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
  'type',
  'exports',
  'repository',
  'sideEffects',
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

function run({ packagePaths }) {
  return Promise.all(
    packagePaths.map(
      async ({ packageJsonPath, packageJson, packageFolder }) => {
        packageJson.repository = {
          type: 'git',
          url: 'https://github.com/carbon-design-system/carbon.git',
          directory: packageFolder,
        };
        packageJson.bugs =
          'https://github.com/carbon-design-system/carbon/issues';
        packageJson.license = 'Apache-2.0';

        if (!packageJson.private) {
          packageJson.publishConfig = {
            access: 'public',
          };
        }

        if (Array.isArray(packageJson.keywords)) {
          const keywordsToAdd = DEFAULT_KEYWORDS.filter((keyword) => {
            return packageJson.keywords.indexOf(keyword) === -1;
          });
          if (keywordsToAdd.length > 0) {
            packageJson.keywords = [...packageJson.keywords, ...keywordsToAdd];
          }
        } else {
          packageJson.keywords = DEFAULT_KEYWORDS;
        }

        // Construct our new packageJson packageJson with sorted fields
        const file = Object.keys(packageJson)
          .sort(sortFields)
          .reduce(
            (acc, key) => ({
              ...acc,
              [key]: packageJson[key],
            }),
            {}
          );

        await fs.writeJson(packageJsonPath, file, { spaces: 2 });
      }
    )
  );
}

module.exports = {
  name: 'package',
  run,
};

/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs-extra';
import path from 'path';
import prettier from 'prettier';
import prettierConfig from 'prettier-config-carbon';
import { remark } from 'remark';
import monorepo from './remark/remark-monorepo.js';

const packageDenyList = new Set([
  'carbon-components',
  'carbon-components-react',
  '@carbon/react',
  '@carbon/styles',
]);

export default async function run({ root, packagePaths }) {
  const remarkInstance = remark().use(monorepo, {
    root: root.directory,
  });
  const prettierOptions = {
    ...prettierConfig,
    parser: 'markdown',
  };

  return Promise.all(
    packagePaths
      .filter((pkg) => !packageDenyList.has(pkg.packageJson.name))
      .map(async ({ packagePath }) => {
        const README_PATH = path.join(packagePath, 'README.md');
        if (!(await fs.pathExists(README_PATH))) {
          return;
        }

        const readme = await fs.readFile(README_PATH, 'utf8');
        const file = await process(remarkInstance, packagePath, readme);
        await fs.writeFile(
          README_PATH,
          prettier.format(String(file), prettierOptions)
        );
      })
  );
}

function process(remarkInstance, cwd, contents) {
  return new Promise((resolve, reject) => {
    remarkInstance.process({ cwd, contents }, (error, file) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(file);
    });
  });
}

export const name = 'readme';

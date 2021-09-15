/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { reporter } = require('@carbon/cli-reporter');
const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');

const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const BUILD_DIR = path.resolve(__dirname, '../build');

const PACKAGES_TO_BUILD = new Set([
  'colors',
  'grid',
  'icons',
  'layout',
  'motion',
  'pictograms',
  'themes',
  'type',
]);
const IGNORE_EXAMPLE_DIRS = new Set([
  'styled-components',
  'vue-cli',
  'storybook',
  'sass-modules',
]);

/**
 * The goal here is to create a top-level `build` folder with content to be
 * displayed in the `gh-pages` branch. Specifically we want packages available
 * at: `packages/<package-name>/examples/<example-name>` to be mirrored over in
 * the `build` folder at: `build/<package-name>/examples/<example-name>`.
 */
async function main() {
  reporter.info('Building examples...');

  await fs.remove(BUILD_DIR);
  await fs.ensureDir(BUILD_DIR);

  const packageNames = await fs.readdir(PACKAGES_DIR);

  const packages = await Promise.all(
    packageNames
      .filter((name) => PACKAGES_TO_BUILD.has(name))
      .map(async (name) => {
        // Verify that each file that we read from the packages directory is
        // actually a folder. Typically used to catch `.DS_store` files that
        // accidentally appear when opening with MacOS Finder
        const filepath = path.join(PACKAGES_DIR, name);
        const stat = await fs.lstat(filepath);
        const descriptor = {
          filepath,
          name,
        };
        if (!stat.isDirectory()) {
          throw new Error(`Unexpected file: ${name} at ${filepath}`);
        }

        // Try and figure out if the package has an examples directory, if not
        // then we can skip it
        const examplesDir = path.join(filepath, 'examples');
        if (!(await fs.pathExists(examplesDir))) {
          return descriptor;
        }

        const examples = (await fs.readdir(examplesDir)).filter((example) => {
          return (
            example !== '.yarnrc' &&
            example !== '.yarnrc.yml' &&
            !IGNORE_EXAMPLE_DIRS.has(example) &&
            example !== '.DS_Store'
          );
        });

        return {
          ...descriptor,
          examples: examples.map((name) => ({
            filepath: path.join(examplesDir, name),
            name,
          })),
        };
      })
  );

  const packagesWithExamples = packages.filter(
    (pkg) => Array.isArray(pkg.examples) && pkg.examples.length !== 0
  );

  await Promise.all(
    packagesWithExamples.map(async (pkg) => {
      reporter.info(`Building examples in package \`${pkg.name}\``);

      const { examples, name } = pkg;
      const packageDir = path.join(BUILD_DIR, name, 'examples');

      await fs.ensureDir(packageDir);

      await Promise.all(
        examples.map(async (example) => {
          reporter.info(
            `Building example \`${example.name}\` in package \`${pkg.name}\``
          );

          const exampleDir = path.join(packageDir, example.name);
          const exampleBuildDir = path.join(example.filepath, 'build');
          const packageJsonPath = path.join(example.filepath, 'package.json');
          const packageJson = await fs.readJson(packageJsonPath);

          await fs.ensureDir(exampleDir);

          if (packageJson.scripts.build) {
            const installResult = spawn.sync('yarn', ['install'], {
              stdio: 'inherit',
              cwd: example.filepath,
            });
            if (installResult.status !== 0) {
              throw new Error(
                `Error installing dependencies for ${pkg.name}:${example.name}`
              );
            }

            const buildResult = spawn.sync('yarn', ['build'], {
              stdio: 'inherit',
              cwd: example.filepath,
            });
            if (buildResult.status !== 0) {
              throw new Error(
                `Error building example ${example.name} for ${pkg.name}`
              );
            }
          }

          if (await fs.pathExists(exampleBuildDir)) {
            await fs.copy(exampleBuildDir, exampleDir);
            return;
          }

          await fs.copy(example.filepath, exampleDir, {
            filter(src) {
              const relativePath = path.relative(example.filepath, src);
              if (relativePath.includes('node_modules')) {
                return false;
              }
              if (relativePath[0] === '.') {
                return false;
              }
              return true;
            },
          });
          reporter.success(
            `Built example \`${example.name}\` in package \`${pkg.name}\``
          );
        })
      );

      reporter.success(`Built examples in package \`${pkg.name}\``);
    })
  );

  const links = packagesWithExamples.reduce((html, pkg) => {
    const links = pkg.examples.reduce((acc, example) => {
      const href = `./${pkg.name}/examples/${example.name}/`;
      return acc + `<li><a href="${href}">${example.name}</a></li>`;
    }, '');

    return (
      html +
      '\n' +
      `<section>
  <header>
    <h2><pre style="display:inline;"><code>@carbon/${pkg.name}</code></pre></h2>
  </header>
  <ul>
    ${links}
  </ul>
</section>`
    );
  }, '');

  const indexFile = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet">
  <title>Carbon Elements</title>
  <style>body { font-family: 'IBM Plex Mono', monospaces; }</style>
</head>
<body>${links}</body>
</html>
`;

  await fs.writeFile(path.join(BUILD_DIR, 'index.html'), indexFile);

  // Copy icons over, useful for adding download links
  await fs.copy(
    path.resolve(__dirname, '../packages/icons/svg'),
    path.join(BUILD_DIR, 'icons/svg')
  );
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});

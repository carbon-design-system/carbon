/**
 * Copyright IBM Corp. 2018, 2026
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
  'token-explorer',
  'colors-explorer',
]);

// Install example app deps. Example lockfiles intentionally not committed.
// Since Yarn defaults `enableImmutableInstalls` to true on CI, which would
// fail with YN0028 as soon as the install populates, so the install has to opt
// out with `--no-immutable`
async function installExample(filepath, label) {
  await fs.ensureFile(path.join(filepath, 'yarn.lock'));

  const result = spawn.sync('yarn', ['install', '--no-immutable'], {
    stdio: 'inherit',
    cwd: filepath,
  });

  if (result.status !== 0) {
    throw new Error(`Error installing dependencies for ${label}`);
  }
}

/**
 * The goal here is to create a top-level `build` folder with content to be
 * displayed in the `gh-pages` branch. Specifically we want packages available
 * at: `packages/<package-name>/examples/<example-name>` to be mirrored over in
 * the `build` folder at: `build/<package-name>/examples/<example-name>`.
 */
async function main() {
  reporter.info('Building examples...');

  const lastBuiltOn = new Date().toISOString();

  await fs.remove(BUILD_DIR);
  await fs.ensureDir(BUILD_DIR);

  const packageNames = await fs.readdir(PACKAGES_DIR);

  const packages = await Promise.all(
    packageNames
      .filter((name) => PACKAGES_TO_BUILD.has(name))
      .map(async (name) => {
        // Verify that each file that we read from the packages directory is
        // actually a folder. Typically used to catch `.DS_store` files that
        // accidentally appear when opening with macOS Finder
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
            await installExample(
              example.filepath,
              `${pkg.name}:${example.name}`
            );

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

  // Build colors-explorer separately (same pattern as the themes token-explorer).
  const colorsExplorerExample = {
    filepath: path.join(PACKAGES_DIR, 'colors', 'examples', 'colors-explorer'),
    name: 'colors-explorer',
  };
  reporter.info('Building example `colors-explorer` in package `colors`');
  const colorsExplorerDir = path.join(
    BUILD_DIR,
    'colors',
    'examples',
    'colors-explorer'
  );
  await fs.ensureDir(colorsExplorerDir);
  await installExample(
    colorsExplorerExample.filepath,
    'colors:colors-explorer'
  );
  const colorsExplorerBuild = spawn.sync('yarn', ['build'], {
    stdio: 'inherit',
    cwd: colorsExplorerExample.filepath,
  });
  if (colorsExplorerBuild.status !== 0) {
    throw new Error('Error building example colors-explorer for colors');
  }
  await fs.copy(
    path.join(colorsExplorerExample.filepath, 'build'),
    colorsExplorerDir
  );
  reporter.success('Built example `colors-explorer` in package `colors`');

  // Build the motion token-explorer separately (same pattern as colors-explorer).
  const motionExplorerExample = {
    filepath: path.join(PACKAGES_DIR, 'motion', 'examples', 'token-explorer'),
    name: 'token-explorer',
  };
  reporter.info('Building example `token-explorer` in package `motion`');
  const motionExplorerDir = path.join(
    BUILD_DIR,
    'motion',
    'examples',
    'token-explorer'
  );
  await fs.ensureDir(motionExplorerDir);
  await installExample(motionExplorerExample.filepath, 'motion:token-explorer');
  const motionExplorerBuild = spawn.sync('yarn', ['build'], {
    stdio: 'inherit',
    cwd: motionExplorerExample.filepath,
  });
  if (motionExplorerBuild.status !== 0) {
    throw new Error('Error building example token-explorer for motion');
  }
  await fs.copy(
    path.join(motionExplorerExample.filepath, 'build'),
    motionExplorerDir
  );
  reporter.success('Built example `token-explorer` in package `motion`');

  // Build token-explorer separately (it's a Next.js app excluded from the
  // auto-generated links above, but its static export goes into the same build tree).
  const tokenExplorerExample = {
    filepath: path.join(PACKAGES_DIR, 'themes', 'examples', 'token-explorer'),
    name: 'token-explorer',
  };
  reporter.info('Building example `token-explorer` in package `themes`');
  const tokenExplorerDir = path.join(
    BUILD_DIR,
    'themes',
    'examples',
    'token-explorer'
  );
  await fs.ensureDir(tokenExplorerDir);
  await installExample(tokenExplorerExample.filepath, 'themes:token-explorer');
  const tokenExplorerBuild = spawn.sync('yarn', ['build'], {
    stdio: 'inherit',
    cwd: tokenExplorerExample.filepath,
  });
  if (tokenExplorerBuild.status !== 0) {
    throw new Error('Error building example token-explorer for themes');
  }
  await fs.copy(
    path.join(tokenExplorerExample.filepath, 'build'),
    tokenExplorerDir
  );
  reporter.success('Built example `token-explorer` in package `themes`');

  const links = packagesWithExamples.reduce((html, pkg) => {
    let pkgLinks = pkg.examples.reduce((acc, example) => {
      const href = `./${pkg.name}/examples/${example.name}/`;
      return acc + `<li><a href="${href}">${example.name}</a></li>`;
    }, '');

    if (pkg.name === 'colors') {
      pkgLinks += `\n    <li><a href="./colors/examples/colors-explorer/">preview (v12)</a></li>`;
    }
    if (pkg.name === 'themes') {
      pkgLinks += `\n    <li><a href="./themes/examples/token-explorer/">preview (v12)</a></li>`;
    }

    return (
      html +
      '\n' +
      `<section>
  <header>
    <h2><pre style="display:inline;"><code>@carbon/${pkg.name}</code></pre></h2>
  </header>
  <ul>
    ${pkgLinks}
  </ul>
</section>`
    );
  }, '');

  // motion has no regular examples — append its section separately
  const motionSection = `
<section>
  <header>
    <h2><pre style="display:inline;"><code>@carbon/motion</code></pre></h2>
  </header>
  <ul>
    <li><a href="./motion/examples/token-explorer/">preview (v12)</a></li>
  </ul>
</section>`;

  const indexFile = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono" rel="stylesheet">
  <title>Carbon Elements</title>
  <style>body { font-family: 'IBM Plex Mono', monospaces; }</style>
</head>
<body>${links}${motionSection}<footer>Last built on ${lastBuiltOn}</footer></body>
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

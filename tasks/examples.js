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
  'theme-tokens-dtcg',
  'motion-tokens-dtcg',
  'colors-explorer',
]);

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

  // Build colors-explorer separately (same pattern as theme-tokens-dtcg).
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
  const colorsExplorerInstall = spawn.sync('yarn', ['install'], {
    stdio: 'inherit',
    cwd: colorsExplorerExample.filepath,
  });
  if (colorsExplorerInstall.status !== 0) {
    throw new Error('Error installing dependencies for colors:colors-explorer');
  }
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

  // Build motion-tokens-dtcg separately (same pattern as theme-tokens-dtcg).
  const motionDtcgExample = {
    filepath: path.join(
      PACKAGES_DIR,
      'motion',
      'examples',
      'motion-tokens-dtcg'
    ),
    name: 'motion-tokens-dtcg',
  };
  reporter.info('Building example `motion-tokens-dtcg` in package `motion`');
  const motionDtcgDir = path.join(
    BUILD_DIR,
    'motion',
    'examples',
    'motion-tokens-dtcg'
  );
  await fs.ensureDir(motionDtcgDir);
  const motionDtcgInstall = spawn.sync('yarn', ['install'], {
    stdio: 'inherit',
    cwd: motionDtcgExample.filepath,
  });
  if (motionDtcgInstall.status !== 0) {
    throw new Error(
      'Error installing dependencies for motion:motion-tokens-dtcg'
    );
  }
  const motionDtcgBuild = spawn.sync('yarn', ['build'], {
    stdio: 'inherit',
    cwd: motionDtcgExample.filepath,
  });
  if (motionDtcgBuild.status !== 0) {
    throw new Error('Error building example motion-tokens-dtcg for motion');
  }
  await fs.copy(path.join(motionDtcgExample.filepath, 'build'), motionDtcgDir);
  reporter.success('Built example `motion-tokens-dtcg` in package `motion`');

  // Build theme-tokens-dtcg separately (it's a Next.js app excluded from the
  // auto-generated links above, but its static export goes into the same build tree).
  const dtcgExample = {
    filepath: path.join(
      PACKAGES_DIR,
      'themes',
      'examples',
      'theme-tokens-dtcg'
    ),
    name: 'theme-tokens-dtcg',
  };
  reporter.info('Building example `theme-tokens-dtcg` in package `themes`');
  const dtcgDir = path.join(
    BUILD_DIR,
    'themes',
    'examples',
    'theme-tokens-dtcg'
  );
  await fs.ensureDir(dtcgDir);
  const dtcgInstall = spawn.sync('yarn', ['install'], {
    stdio: 'inherit',
    cwd: dtcgExample.filepath,
  });
  if (dtcgInstall.status !== 0) {
    throw new Error(
      'Error installing dependencies for themes:theme-tokens-dtcg'
    );
  }
  const dtcgBuild = spawn.sync('yarn', ['build'], {
    stdio: 'inherit',
    cwd: dtcgExample.filepath,
  });
  if (dtcgBuild.status !== 0) {
    throw new Error('Error building example theme-tokens-dtcg for themes');
  }
  await fs.copy(path.join(dtcgExample.filepath, 'build'), dtcgDir);
  reporter.success('Built example `theme-tokens-dtcg` in package `themes`');

  const links = packagesWithExamples.reduce((html, pkg) => {
    let pkgLinks = pkg.examples.reduce((acc, example) => {
      const href = `./${pkg.name}/examples/${example.name}/`;
      return acc + `<li><a href="${href}">${example.name}</a></li>`;
    }, '');

    if (pkg.name === 'colors') {
      pkgLinks += `\n    <li><a href="./colors/examples/colors-explorer/">preview (v12)</a></li>`;
    }
    if (pkg.name === 'themes') {
      pkgLinks += `\n    <li><a href="./themes/examples/theme-tokens-dtcg/">preview (v12)</a></li>`;
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
    <li><a href="./motion/examples/motion-tokens-dtcg/">preview (v12)</a></li>
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

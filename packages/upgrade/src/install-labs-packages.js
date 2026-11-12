/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { spawn } from 'child_process';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import { logger } from './logger';

const LOCKFILES = [
  ['pnpm-lock.yaml', 'pnpm'],
  ['yarn.lock', 'yarn'],
  ['bun.lock', 'bun'],
  ['bun.lockb', 'bun'],
  ['package-lock.json', 'npm'],
  ['npm-shrinkwrap.json', 'npm'],
];

const INSTALL_ARGS = {
  npm: ['install'],
  yarn: ['add'],
  pnpm: ['add'],
  bun: ['add'],
};

/**
 * Detects the package manager of a project. The `packageManager` field of the
 * closest `package.json` wins, then the closest lockfile, walking up from the
 * directory so that packages inside a monorepo are handled. Falls back to npm.
 *
 * @param {string} directory
 * @returns {Promise<'npm' | 'yarn' | 'pnpm' | 'bun'>}
 */
export async function detectPackageManager(directory) {
  let current = path.resolve(directory);

  while (true) {
    const packageJsonPath = path.join(current, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      try {
        const { packageManager } = await fs.readJson(packageJsonPath);
        const name =
          typeof packageManager === 'string' && packageManager.split('@')[0];
        if (name && INSTALL_ARGS[name]) {
          return name;
        }
      } catch {
        // An unreadable package.json is reported elsewhere, keep looking
      }
    }

    for (const [lockfile, manager] of LOCKFILES) {
      if (await fs.pathExists(path.join(current, lockfile))) {
        return manager;
      }
    }

    const parent = path.dirname(current);
    if (parent === current) {
      return 'npm';
    }
    current = parent;
  }
}

/**
 * @param {'npm' | 'yarn' | 'pnpm' | 'bun'} packageManager
 * @param {Array<string>} packages
 * @returns {{ command: string, args: Array<string> }}
 */
export function getInstallCommand(packageManager, packages) {
  return {
    command: packageManager,
    args: [...INSTALL_ARGS[packageManager], ...packages],
  };
}

/**
 * Returns the Carbon Labs packages that are imported by the given files but
 * are not listed in the `package.json` of the workspace.
 *
 * @param {object} options
 * @param {string} options.workspaceDir
 * @param {Array<string>} options.files - absolute or workspace relative paths
 * @param {Array<string>} options.labsPackages - package names to look for
 * @returns {Promise<Array<string>>}
 */
export async function findMissingLabsPackages({
  workspaceDir,
  files,
  labsPackages,
}) {
  const packageJson = await fs.readJson(
    path.join(workspaceDir, 'package.json')
  );
  const declared = new Set(
    ['dependencies', 'devDependencies', 'peerDependencies'].flatMap((type) =>
      Object.keys(packageJson[type] || {})
    )
  );
  const candidates = new Set(labsPackages.filter((pkg) => !declared.has(pkg)));
  const used = new Set();

  for (const file of files) {
    if (candidates.size === used.size) {
      break;
    }
    const source = await fs.readFile(path.resolve(workspaceDir, file), 'utf8');
    for (const pkg of candidates) {
      if (source.includes(`'${pkg}'`) || source.includes(`"${pkg}"`)) {
        used.add(pkg);
      }
    }
  }

  return labsPackages.filter((pkg) => used.has(pkg));
}

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`\`${command} ${args.join(' ')}\` exited with ${code}`)
        );
      }
    });
  });
}

/**
 * Offers to install the Carbon Labs packages that the migrated source files
 * now import. Nothing is installed without the approval of the user. In a dry
 * run, or when there is no terminal to ask in, the command is printed instead.
 *
 * @param {object} options
 * @param {string} options.workspaceDir
 * @param {Array<string>} options.files
 * @param {Array<string>} options.labsPackages
 * @param {boolean} options.write - whether the codemods changed the files
 * @returns {Promise<void>}
 */
export async function offerToInstallLabsPackages({
  workspaceDir,
  files,
  labsPackages,
  write,
}) {
  if (!write) {
    // In a dry run nothing was rewritten, so there is nothing to install yet
    return;
  }

  const missing = await findMissingLabsPackages({
    workspaceDir,
    files,
    labsPackages,
  });
  if (missing.length === 0) {
    return;
  }

  const packageManager = await detectPackageManager(workspaceDir);
  const { command, args } = getInstallCommand(packageManager, missing);
  const printable = [command, ...args].join(' ');

  logger.log(
    '\nThe migrated code imports Carbon Labs packages that are not in your package.json:'
  );
  missing.forEach((pkg) => logger.log('  - %s', pkg));

  if (!process.stdin.isTTY) {
    logger.log('\nInstall them with:\n  %s', printable);
    return;
  }

  const { install } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'install',
      message: `Install them now with \`${printable}\`?`,
      default: true,
    },
  ]);

  if (!install) {
    logger.log('\nInstall them later with:\n  %s', printable);
    return;
  }

  try {
    await run(command, args, workspaceDir);
  } catch (error) {
    // Labs packages are still pre-release, so the registry may not have all
    // of them yet. Do not fail a migration that already rewrote the code.
    logger.warn('Unable to install the packages: %s', error.message);
    logger.log('\nInstall them manually with:\n  %s', printable);
  }
}

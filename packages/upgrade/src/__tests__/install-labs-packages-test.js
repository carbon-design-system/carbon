/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'events';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { spawn } from 'child_process';
import inquirer from 'inquirer';
import { logger } from '../logger';
import {
  detectPackageManager,
  findMissingLabsPackages,
  getInstallCommand,
  offerToInstallLabsPackages,
} from '../install-labs-packages';

jest.mock('inquirer', () => ({ prompt: jest.fn() }));
jest.mock('child_process', () => ({ spawn: jest.fn() }));
jest.mock('../logger');

const CASCADE = '@carbon-labs/react-cascade';
const CHECKLIST = '@carbon-labs/react-checklist';
const LABS = [CASCADE, CHECKLIST];

let directory;

async function createProject({ packageJson = {}, files = {}, lockfile } = {}) {
  await fs.writeJson(path.join(directory, 'package.json'), {
    name: 'app',
    ...packageJson,
  });
  if (lockfile) {
    await fs.writeFile(path.join(directory, lockfile), '');
  }
  for (const [file, source] of Object.entries(files)) {
    await fs.outputFile(path.join(directory, file), source);
  }
}

function mockSpawn(code = 0) {
  spawn.mockImplementation(() => {
    const child = new EventEmitter();
    process.nextTick(() => child.emit('close', code));
    return child;
  });
}

describe('install-labs-packages', () => {
  let isTTY;

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'labs-'));
    isTTY = process.stdin.isTTY;
    process.stdin.isTTY = true;
    jest.clearAllMocks();
  });

  afterEach(async () => {
    process.stdin.isTTY = isTTY;
    await fs.remove(directory);
  });

  describe('detectPackageManager', () => {
    it.each([
      ['pnpm-lock.yaml', 'pnpm'],
      ['yarn.lock', 'yarn'],
      ['bun.lock', 'bun'],
      ['package-lock.json', 'npm'],
    ])('detects the lockfile %s', async (lockfile, expected) => {
      await createProject({ lockfile });
      expect(await detectPackageManager(directory)).toBe(expected);
    });

    it('prefers the packageManager field over a lockfile', async () => {
      await createProject({
        packageJson: { packageManager: 'pnpm@9.0.0' },
        lockfile: 'yarn.lock',
      });
      expect(await detectPackageManager(directory)).toBe('pnpm');
    });

    it('finds the lockfile of the monorepo root', async () => {
      await createProject({ lockfile: 'yarn.lock' });
      const child = path.join(directory, 'packages', 'app');
      await fs.outputJson(path.join(child, 'package.json'), { name: 'child' });
      expect(await detectPackageManager(child)).toBe('yarn');
    });
  });

  describe('getInstallCommand', () => {
    it.each([
      ['npm', ['install', CASCADE]],
      ['yarn', ['add', CASCADE]],
      ['pnpm', ['add', CASCADE]],
      ['bun', ['add', CASCADE]],
    ])('builds the command for %s', (manager, args) => {
      expect(getInstallCommand(manager, [CASCADE])).toEqual({
        command: manager,
        args,
      });
    });
  });

  describe('findMissingLabsPackages', () => {
    it('returns the packages that are imported but not declared', async () => {
      await createProject({
        packageJson: { dependencies: { [CHECKLIST]: '^0.1.0' } },
        files: {
          'a.tsx': `import { Cascade } from '${CASCADE}';`,
          'b.tsx': `import { Checklist } from "${CHECKLIST}";`,
        },
      });

      expect(
        await findMissingLabsPackages({
          workspaceDir: directory,
          files: ['a.tsx', 'b.tsx'],
          labsPackages: LABS,
        })
      ).toEqual([CASCADE]);
    });

    it('ignores packages that are not imported', async () => {
      await createProject({ files: { 'a.tsx': 'export default 1;' } });

      expect(
        await findMissingLabsPackages({
          workspaceDir: directory,
          files: ['a.tsx'],
          labsPackages: LABS,
        })
      ).toEqual([]);
    });
  });

  describe('offerToInstallLabsPackages', () => {
    const run = (overrides) =>
      offerToInstallLabsPackages({
        workspaceDir: directory,
        files: ['a.tsx'],
        labsPackages: LABS,
        write: true,
        ...overrides,
      });

    beforeEach(() =>
      createProject({
        lockfile: 'yarn.lock',
        files: { 'a.tsx': `import { Cascade } from '${CASCADE}';` },
      })
    );

    it('does nothing in a dry run', async () => {
      await run({ write: false });
      expect(inquirer.prompt).not.toHaveBeenCalled();
      expect(spawn).not.toHaveBeenCalled();
    });

    it('does nothing when every package is already installed', async () => {
      await createProject({
        packageJson: { dependencies: { [CASCADE]: '^0.1.0' } },
        files: { 'a.tsx': `import { Cascade } from '${CASCADE}';` },
      });
      await run();
      expect(inquirer.prompt).not.toHaveBeenCalled();
      expect(spawn).not.toHaveBeenCalled();
    });

    it('installs with the detected package manager once approved', async () => {
      inquirer.prompt.mockResolvedValue({ install: true });
      mockSpawn(0);

      await run();

      expect(spawn).toHaveBeenCalledWith('yarn', ['add', CASCADE], {
        cwd: directory,
        stdio: 'inherit',
      });
    });

    it('does not install when the user declines', async () => {
      inquirer.prompt.mockResolvedValue({ install: false });

      await run();

      expect(spawn).not.toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining('Install them later'),
        'yarn add @carbon-labs/react-cascade'
      );
    });

    it('prints the command without asking when there is no terminal', async () => {
      process.stdin.isTTY = false;

      await run();

      expect(inquirer.prompt).not.toHaveBeenCalled();
      expect(spawn).not.toHaveBeenCalled();
      expect(logger.log).toHaveBeenCalledWith(
        expect.stringContaining('Install them with'),
        'yarn add @carbon-labs/react-cascade'
      );
    });

    it('does not fail the migration when the install fails', async () => {
      inquirer.prompt.mockResolvedValue({ install: true });
      mockSpawn(1);

      await expect(run()).resolves.toBeUndefined();
      expect(logger.warn).toHaveBeenCalled();
    });
  });
});

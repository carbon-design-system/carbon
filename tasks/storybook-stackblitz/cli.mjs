#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * node tasks/storybook-stackblitz/cli.mjs [--json]
 *
 * Reports stories that render elements they don't import. Exits 1 if any
 */

import path from 'node:path';
import {
  PACKAGE_ROOT,
  findUnregisteredTags,
  listStoryFiles,
} from './web-components.mjs';

const results = listStoryFiles()
  .map((file) => ({
    file: path.relative(PACKAGE_ROOT, file).split(path.sep).join('/'),
    unregistered: findUnregisteredTags(file),
  }))
  .filter(({ unregistered }) => unregistered.length);

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
} else if (results.length) {
  for (const { file, unregistered } of results) {
    process.stderr.write(`${file}\n`);
    for (const { tag, module } of unregistered) {
      process.stderr.write(
        `  renders <${tag}> without importing src/${module}\n`
      );
    }
  }
} else {
  process.stdout.write('Every story imports the elements it renders.\n');
}
process.exitCode = results.length ? 1 : 0;

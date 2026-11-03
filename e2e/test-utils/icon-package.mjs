/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Inspect a built icon package from a plain Node process
 *
 * Writes its findings to stdout as JSON. Usage:
 *
 *   node icon-package.mjs exports <package-name>
 *   node icon-package.mjs verify <manifest-path>
 */

import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const MAX_SAMPLE = 20;

const require = createRequire(import.meta.url);
const [command, argument] = process.argv.slice(2);

if (command === 'exports') {
  process.stdout.write(JSON.stringify(Object.keys(require(argument)).sort()));
} else if (command === 'verify') {
  process.stdout.write(JSON.stringify(await verify(argument)));
} else {
  process.stderr.write(`Unknown command: ${command}\n`);
  process.exit(1);
}

async function verify(manifestPath) {
  const { packageName, packageDir, entries } = JSON.parse(
    readFileSync(manifestPath, 'utf8')
  );
  const entryPoint = [];
  const directPath = [];

  const cjsEntry = require(packageName);
  const esmEntry = await import(packageName);
  // no `exports` map
  const esmExports = esmEntry.default ?? esmEntry;

  for (const { name } of entries) {
    if (cjsEntry[name] === undefined) {
      entryPoint.push({ export: name, format: 'commonjs' });
    }
    if (esmEntry[name] === undefined && esmExports[name] === undefined) {
      entryPoint.push({ export: name, format: 'esm' });
    }
  }

  // Every icon should also be reachable at its own deep path, both formats
  for (const { filepath } of entries) {
    const commonjs = path.join(packageDir, 'lib', filepath);
    const esm = path.join(packageDir, 'es', filepath);

    try {
      require(commonjs);
    } catch (error) {
      directPath.push({
        file: commonjs,
        format: 'commonjs',
        message: error.message,
      });
    }

    try {
      if ((await import(pathToFileURL(esm).href)) === undefined) {
        directPath.push({
          file: esm,
          format: 'esm',
          message: 'resolved to undefined',
        });
      }
    } catch (error) {
      directPath.push({ file: esm, format: 'esm', message: error.message });
    }
  }

  return {
    entryPoint: {
      total: entryPoint.length,
      sample: entryPoint.slice(0, MAX_SAMPLE),
    },
    directPath: {
      total: directPath.length,
      sample: directPath.slice(0, MAX_SAMPLE),
    },
  };
}

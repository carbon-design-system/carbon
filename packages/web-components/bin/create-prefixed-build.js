#!/usr/bin/env node
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Generates a copy of `@carbon/web-components` with every `cds-*` element name
 * re-prefixed to a custom prefix (e.g. `foo-button`). This is a build-time
 * rename — no polyfill, no runtime, no load-order constraints — it replaces the
 * pre-built `es-custom` artifacts (composites included) and lets users choose
 * a unique prefix to avoid collisions with other Carbon elements on the page.
 *
 * Shared design tokens (`--cds` CSS custom properties) are intentionally
 * preserved so theming stays shared across prefixed and unprefixed Carbon.
 *
 * Usage:
 *   npx -p @carbon/web-components create-prefixed-build --prefix foo [--out ./dir] [--src ./es]
 *
 * Then point your imports at the generated directory, e.g.
 *   import '<out>/components/button/index.js';  // registers <foo-button>
 *
 * Uses only Node built-ins so it runs in any user environment.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_SRC = path.resolve(__dirname, '..', 'es');

const HELP = `
create-prefixed-build — generate a custom-prefixed @carbon/web-components build

Usage:
  create-prefixed-build --prefix <prefix> [options]

Options:
  --prefix <prefix>   Required. Tag prefix to use (e.g. "foo" -> <foo-button>).
                      Lowercase letters, digits, hyphens; must start with a letter.
  --out <dir>         Output directory, in your project (committed or generated
                      in your build). Default: ./<prefix>-web-components.
                      Conventional: ./vendor/carbon-<prefix>.
  --src <dir>         Source ESM build to copy. Default: this package's ./es
  --help              Show this help.

Example:
  npx -p @carbon/web-components create-prefixed-build --prefix foo --out ./vendor/carbon-foo

Then import from the output dir, e.g.:
  import './vendor/carbon-foo/components/button/index.js'; // <foo-button>

Tip: for a package-style specifier, alias it in your bundler, e.g.
  '@carbon/web-components/foo' -> './vendor/carbon-foo'.

Note: write to your project (not node_modules — it is ephemeral and read-only
under pnpm / Yarn PnP). Regenerate it as part of your build if not committed.
`;

function parseArgs(argv) {
  const args = {
    prefix: undefined,
    out: undefined,
    src: undefined,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') args.help = true;
    else if (a === '--prefix') args.prefix = argv[++i];
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--src') args.src = argv[++i];
    else {
      process.stderr.write(`Unknown argument: ${a}\n`);
      process.exit(1);
    }
  }
  return args;
}

const isValidPrefix = (p) => /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(p);

async function walk(dir) {
  const acc = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) acc.push(...(await walk(p)));
    else acc.push(p);
  }
  return acc;
}

async function main() {
  const { prefix, out, src, help } = parseArgs(process.argv.slice(2));

  if (help) {
    process.stdout.write(HELP);
    return;
  }
  if (!prefix) {
    process.stderr.write('Error: --prefix is required.\n' + HELP);
    process.exit(1);
  }
  if (!isValidPrefix(prefix)) {
    process.stderr.write(
      `Error: invalid --prefix "${prefix}". Use lowercase letters, digits, and hyphens, starting with a letter (e.g. "foo").\n`
    );
    process.exit(1);
  }
  if (prefix === 'cds') {
    process.stderr.write(
      'Error: --prefix "cds" is the default; choose a different prefix.\n'
    );
    process.exit(1);
  }

  const source = src ? path.resolve(src) : DEFAULT_SRC;
  try {
    await fs.access(source);
  } catch {
    process.stderr.write(`Error: source build not found at ${source}.\n`);
    process.exit(1);
  }

  const dest = path.resolve(out ?? `${prefix}-web-components`);

  await fs.rm(dest, { recursive: true, force: true });
  await fs.cp(source, dest, { recursive: true });

  let changed = 0;
  for (const file of await walk(dest)) {
    const content = await fs.readFile(file, 'utf8');
    // Re-prefix the element namespace. The (?<!--) lookbehind preserves shared
    // `--cds` design tokens (only element/class names are re-prefixed).
    const updated = content.replace(/(?<!--)cds/g, prefix);
    if (updated !== content) {
      await fs.writeFile(file, updated);
      changed++;
    }
  }

  process.stdout.write(
    `Created prefixed build: cds -> ${prefix}\n` +
      `  output:  ${dest}\n` +
      `  files:   ${changed} re-prefixed\n` +
      `Point your imports at it, e.g.:\n` +
      `  import '${path.relative(process.cwd(), dest) || dest}/components/button/index.js'; // <${prefix}-button>\n`
  );
}

main().catch((err) => {
  process.stderr.write(`${err && err.stack ? err.stack : err}\n`);
  process.exit(1);
});

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { collectNonBarrelWebComponentImports } = require('./carbon-wc-imports');

/**
 * Flags imports of `@carbon/web-components` component class files, i.e. any
 * non-barrel entry under `es/components/<name>/...`. Starting with v3 pure
 * exports, these register nothing, so an element imported this way but rendered
 * in markup upgrades to nothing — it renders inert, with no error. Import the
 * component barrel (`<name>/index.js`) instead, or run the barrel-registration
 * codemod.
 *
 * Type-only imports are reported as "review" — they may be intentional (the
 * element is registered elsewhere, or the class is imported only as a type or
 * to subclass). Only the runtime `:not(:defined)` diagnostic reliably reflects
 * what actually renders inert.
 *
 * This transform reports only, it never changes source. Output is grouped one
 * block per file.
 *
 *   npx @carbon/upgrade migrate wc-report-non-barrel-imports [paths...]
 */

// Strip `@carbon/web-components/<es|lib>/components/` prefix so the
// report shows just `search/search.js` -> `search/index.js`.
const COMPONENT_PREFIX_RE =
  /^@carbon\/web-components\/(?:es|lib)\/components\//;

const shorten = (specifier) => specifier.replace(COMPONENT_PREFIX_RE, '');

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  orange: '\x1b[38;5;208m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m',
  cyan: '\x1b[36m',
};

function colorEnabled() {
  //  on by default; set `NO_COLOR=1` or `FORCE_COLOR=0` to disable
  if (process.env.NO_COLOR != null) {
    return false;
  }
  if (process.env.FORCE_COLOR != null) {
    return process.env.FORCE_COLOR !== '0';
  }
  return true;
}

function makePaint(enabled) {
  return (codes, str) => {
    if (!enabled) {
      return str;
    }
    const open = (Array.isArray(codes) ? codes : [codes]).join('');
    return `${open}${str}${ANSI.reset}`;
  };
}

/**
 * Render findings as a grouped tree block
 *
 * @param {string} displayPath relative path shown in the header
 * @param {Array<object>} findings from collectNonBarrelWebComponentImports
 * @param {{ color?: boolean }} [options]
 * @returns {string}
 */
function formatFileBlock(displayPath, findings, options = {}) {
  const paint = makePaint(options.color ?? false);

  const rows = findings
    .slice()
    .sort((a, b) => (a.line ?? 0) - (b.line ?? 0))
    .map((f) => ({
      line: f.line == null ? '' : `L${f.line}`,
      spec: shorten(f.specifier),
      kind: f.typeOnly ? 'type · review' : f.kind,
      barrel: shorten(f.suggestedBarrel),
      typeOnly: f.typeOnly,
    }));

  const lineWidth = Math.max(...rows.map((r) => r.line.length), 0);
  const specWidth = Math.max(...rows.map((r) => r.spec.length), 0);
  const kindWidth = Math.max(...rows.map((r) => r.kind.length), 0);

  const needs = rows.filter((r) => !r.typeOnly).length;
  const review = rows.length - needs;
  const summaryBits = [];
  if (needs) {
    summaryBits.push(`${needs} need${needs === 1 ? 's' : ''} a barrel`);
  }
  if (review) {
    summaryBits.push(`${review} to review`);
  }

  const header =
    paint([ANSI.bold, ANSI.orange], displayPath) +
    paint(ANSI.dim, `  (${summaryBits.join(', ')})`);

  const lines = rows.map((r, i) => {
    const connector = i === rows.length - 1 ? '└─' : '├─';
    const lineCol = paint(ANSI.dim, r.line.padEnd(lineWidth));
    const specCol = r.spec.padEnd(specWidth);
    const kindColor = r.typeOnly ? ANSI.cyan : ANSI.gray;
    const kindCol = paint(kindColor, `(${r.kind})`.padEnd(kindWidth + 2));
    const arrow = paint(ANSI.dim, '→');
    const barrel = paint(ANSI.yellow, r.barrel);

    return `  ${connector} ${lineCol}  ${specCol}  ${kindCol}  ${arrow}  ${barrel}`;
  });

  return [header, ...lines].join('\n');
}

function transform(fileInfo, api) {
  const j = api.jscodeshift;
  const findings = collectNonBarrelWebComponentImports(j, j(fileInfo.source));

  if (findings.length) {
    let displayPath = fileInfo.path;
    try {
      const rel = path.relative(process.cwd(), fileInfo.path);
      if (rel && !rel.startsWith('..')) {
        displayPath = rel;
      }
    } catch {
      // keep the raw path
    }

    // one log block per file
    console.log(
      '\n' +
        formatFileBlock(displayPath, findings, {
          color: colorEnabled(),
        })
    );
  }

  // report only - no changes
  return fileInfo.source;
}

module.exports = transform;
module.exports.formatFileBlock = formatFileBlock;
// parse TS/TSX consumer source (tsx parser also handles plain JS/JSX)
module.exports.parser = 'tsx';

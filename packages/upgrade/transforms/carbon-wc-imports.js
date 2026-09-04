/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Shared detection for imports of `@carbon/web-components` component class
 * files (or any non-barrel entry) under `es|lib/components/<name>/...`.
 *
 * In the new (starting v3) pure-exports model, importing a component's class
 * file registers nothing — only the component barrel (`<name>/index.js`) calls
 * `defineCustomElement`. A consumer that imports the class file but renders
 * `<cds-name>` gets an inert (un-upgraded) element: it renders to nothing, with
 * no error thrown.
 *
 * This is the AST counterpart (consumer source) version of the internal
 * web components tool `tools/check-registration-coverage.mjs`, which audits
 * Carbon's own source as part of CI).
 *
 * Consumed by:
 *  - `wc-report-non-barrel-imports` (advisory reporting only, no changes)
 *  - the additive barrel-registration codemod (planned)
 */

// @carbon/web-components/<es|lib>/components/<name>[/<sub...>]
const COMPONENT_IMPORT_RE =
  /^(@carbon\/web-components\/(?:es|lib)\/components\/([^/]+))(?:\/(.+))?$/;

/**
 * Classify an ImportDeclaration by how it binds the module
 *
 * @param {object} node an ImportDeclaration AST node
 * @returns {{ kind: 'side-effect'|'default'|'named'|'namespace'|'type',
 *   typeOnly: boolean }}
 */
function classifyKind(node) {
  // `import type ... from` (whole-declaration type import)
  if (node.importKind === 'type') {
    return { kind: 'type', typeOnly: true };
  }

  const specs = node.specifiers || [];

  // `import '...'` - imported purely for side effects
  if (specs.length === 0) {
    return { kind: 'side-effect', typeOnly: false };
  }

  // `import { type A, type B } from` - every specifier is a type
  if (specs.every((s) => s.importKind === 'type')) {
    return { kind: 'type', typeOnly: true };
  }

  if (specs.some((s) => s.type === 'ImportNamespaceSpecifier')) {
    return { kind: 'namespace', typeOnly: false };
  }

  if (specs.some((s) => s.type === 'ImportDefaultSpecifier')) {
    return { kind: 'default', typeOnly: false };
  }

  return { kind: 'named', typeOnly: false };
}

/**
 * Find every non-barrel `@carbon/web-components` component import in a file
 *
 * @param {import('jscodeshift').JSCodeshift} j
 * @param {import('jscodeshift').Collection} root
 * @returns {Array<{ specifier: string, component: string,
 *   kind: string, typeOnly: boolean, suggestedBarrel: string,
 *   line: (number|null) }>}
 */
function collectNonBarrelWebComponentImports(j, root) {
  const findings = [];

  root.find(j.ImportDeclaration).forEach((p) => {
    const node = p.node;
    const specifier = node.source && node.source.value;

    if (typeof specifier !== 'string') {
      return;
    }

    const match = specifier.match(COMPONENT_IMPORT_RE);
    if (!match) {
      return;
    }

    const barrelBase = match[1]; // @carbon/web-components/es/components/<name>
    const component = match[2];
    let sub = match[3]; // undefined for a bare `.../components/<name>` import

    if (sub) {
      sub = sub.replace(/\.js$/, '');
    }

    // Barrel imports already register. A bare dir (`sub` undefined) and
    // `<name>/index` both resolve to `<name>/index.js` — nothing to flag
    if (!sub || sub === 'index') {
      return;
    }

    // `defs` modules are constants/types by convention; they register nothing
    // and aren't expected to (aligns with check-registration-coverage.mjs)
    if (sub.split('/').pop() === 'defs') {
      return;
    }

    const { kind, typeOnly } = classifyKind(node);

    findings.push({
      specifier,
      component,
      kind,
      typeOnly,
      suggestedBarrel: `${barrelBase}/index.js`,
      line: node.loc ? node.loc.start.line : null,
    });
  });

  return findings;
}

module.exports = { collectNonBarrelWebComponentImports, classifyKind };

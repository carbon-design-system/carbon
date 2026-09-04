/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { collectNonBarrelWebComponentImports } = require('./carbon-wc-imports');

/**
 * Ensure every `@carbon/web-components` element a file imports as a non-barrel
 * class file still registers under v3 pure exports, by making sure the
 * component barrel (`<name>/index.js`) is imported
 *
 * Per import kind:
 *  - side-effect (`import '.../button/button.js'`) — rewritten to the barrel
 *    (`import '.../button/index.js'`); multiple side-effect imports of the same
 *    component collapse into one barrel import. Safe: a class-file side-effect
 *    import registers nothing in v3, so it is dead already.
 *  - default / named / namespace (value imports) — left untouched (the class
 *    binding is preserved), and a side-effect barrel import is *added* alongside.
 *    The barrel exports the class as a named export with no default, so the path
 *    can't simply be swapped; adding is the safe move, and `defineCustomElement`
 *    is idempotent so a duplicate registration can't throw.
 *  - type-only — ignored; registers/renders nothing
 *  - if the component barrel is already imported, redundant side-effect class
 *    imports of that component are dropped.
 *
 * Idempotent. Run it (dry by default):
 *   npx @carbon/upgrade migrate wc-add-barrel-imports [paths...]
 *   npx @carbon/upgrade migrate wc-add-barrel-imports --write [paths...]
 */
function transform(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const findings = collectNonBarrelWebComponentImports(j, root).filter(
    (f) => !f.typeOnly
  );
  if (findings.length === 0) {
    return fileInfo.source;
  }

  // group the non-barrel imports by component
  const byComponent = new Map();
  for (const f of findings) {
    let group = byComponent.get(f.component);
    if (!group) {
      group = { barrel: f.suggestedBarrel, specifiers: new Set() };
      byComponent.set(f.component, group);
    }
    group.specifiers.add(f.specifier);
  }

  const stripJs = (value) => value.replace(/\.js$/, '');
  // string source of import path, or null
  const srcOf = (p) => {
    const source = p.node && p.node.source;
    return source && typeof source.value === 'string' ? source.value : null;
  };
  const importPaths = root.find(j.ImportDeclaration).paths();
  let changed = false;

  for (const { barrel, specifiers } of byComponent.values()) {
    const barrelDir = barrel.replace(/\/index\.js$/, '');
    const barrelForms = new Set([`${barrelDir}/index`, barrelDir]);

    const barrelAlreadyPresent = importPaths.some((p) => {
      const value = srcOf(p);
      return value != null && barrelForms.has(stripJs(value));
    });

    const relevant = importPaths.filter((p) => {
      const value = srcOf(p);
      return value != null && specifiers.has(value);
    });
    const sideEffectPaths = relevant.filter(
      (p) => (p.node.specifiers || []).length === 0
    );
    const valuePaths = relevant.filter(
      (p) => (p.node.specifiers || []).length > 0
    );

    if (barrelAlreadyPresent) {
      // drop class-file side-effect imports
      for (const p of sideEffectPaths) {
        j(p).remove();
        changed = true;
      }
      continue;
    }

    if (sideEffectPaths.length > 0) {
      // collapse - first side-effect import becomes barrent, drop the rest
      sideEffectPaths[0].node.source = j.stringLiteral(barrel);
      for (let i = 1; i < sideEffectPaths.length; i++) {
        j(sideEffectPaths[i]).remove();
      }
      changed = true;
    } else {
      // value imports - keep and add one-side-effect barrel import
      valuePaths[0].insertAfter(
        j.importDeclaration([], j.stringLiteral(barrel))
      );
      changed = true;
    }
  }

  return changed ? root.toSource({ quote: 'single' }) : fileInfo.source;
}

module.exports = transform;
// Parse TS/TSX consumer source (the tsx parser also handles plain JS/JSX).
module.exports.parser = 'tsx';

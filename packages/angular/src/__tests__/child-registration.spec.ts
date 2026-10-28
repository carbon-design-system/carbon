/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Regression for the generator importing class files instead of folder
 * barrels. Class files register nothing (ADR 0007), so child elements such as
 * `cds-ng-dialog` were never defined for consumers who imported only the wrapper.
 *
 * This file must import exactly one wrapper: jsdom's custom element registry is
 * per test file, so anything else imported here could mask a missing child.
 */
import '../generated/Modal';

const GENERATED_DIR = join(__dirname, '../generated');
const VENDOR_DIR = join(__dirname, '../../.entries/vendor');

describe('web component registration through generated wrappers', () => {
  it('registers the children of a composite when only its wrapper is imported', () => {
    for (const tag of [
      'cds-ng-modal',
      'cds-ng-dialog',
      'cds-ng-modal-header',
      'cds-ng-modal-body',
      'cds-ng-modal-footer',
    ]) {
      expect({ tag, defined: !!customElements.get(tag) }).toEqual({
        tag,
        defined: true,
      });
    }
  });

  it('imports a folder barrel, never a class file, in every wrapper', () => {
    const imports: { wrapper: string; specifier: string }[] = [];
    for (const dir of readdirSync(GENERATED_DIR, { withFileTypes: true })) {
      if (!dir.isDirectory()) {
        continue;
      }
      const file = join(GENERATED_DIR, dir.name, `${dir.name}.component.ts`);
      const source = readFileSync(file, 'utf8');
      const match = source.match(
        /^import '#carbon-ng\/(components\/[^']+)';$/m
      );
      imports.push({ wrapper: dir.name, specifier: match?.[1] ?? '' });
    }

    expect(imports.length).toBeGreaterThan(0);
    const notBarrels = imports.filter(
      ({ specifier }) => !specifier.endsWith('/index.js')
    );
    expect(notBarrels).toEqual([]);

    const unresolved = imports.filter(
      ({ specifier }) => !existsSync(join(VENDOR_DIR, specifier))
    );
    expect(unresolved).toEqual([]);
  });
});

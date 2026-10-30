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
import '@carbon/angular/modal';

const ENTRIES_DIR = join(__dirname, '../../.entries');
const VENDOR_DIR = join(ENTRIES_DIR, 'vendor');

/** Every generated wrapper as `<entry>/<Wrapper>`. */
function wrapperDirs(): string[] {
  return readdirSync(ENTRIES_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        entry.name !== 'vendor' &&
        !entry.name.startsWith('.')
    )
    .flatMap((entry) =>
      readdirSync(join(ENTRIES_DIR, entry.name), { withFileTypes: true })
        .filter((wrapper) => wrapper.isDirectory())
        .map((wrapper) => `${entry.name}/${wrapper.name}`)
    );
}

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
    for (const wrapper of wrapperDirs()) {
      const name = wrapper.split('/')[1];
      const file = join(ENTRIES_DIR, wrapper, `${name}.component.ts`);
      const source = readFileSync(file, 'utf8');
      const match = source.match(
        /^import '#carbon-ng\/(components\/[^']+)';$/m
      );
      imports.push({ wrapper, specifier: match?.[1] ?? '' });
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

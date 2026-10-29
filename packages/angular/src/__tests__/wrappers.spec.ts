/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { reflectComponentType, type Type } from '@angular/core';
import { render } from '../testing/render';

/**
 * Mounts every generated wrapper from a template, as consumers use it, and
 * checks that its host is the registered web component and that it renders
 * without errors.
 *
 * Component behavior is covered by the web components' own test suites, run
 * against the vendored copy with `yarn test:wc` (ADR 0019); this file only
 * checks that each wrapper mounts.
 */

const ENTRIES_DIR = join(__dirname, '../../.entries');

const wrappers: [string, Type<unknown>][] = readdirSync(ENTRIES_DIR, {
  withFileTypes: true,
})
  .filter(
    (entry) =>
      entry.isDirectory() &&
      entry.name !== 'vendor' &&
      !entry.name.startsWith('.')
  )
  .flatMap((entry) =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- the entries are only known at runtime
    Object.values(require(`@carbon/angular/${entry.name}`) as object)
  )
  .map((value) => [reflectComponentType(value)?.selector, value])
  .filter((pair): pair is [string, Type<unknown>] => !!pair[0])
  .sort(([a], [b]) => a.localeCompare(b));

/**
 * Web components that throw when mounted on their own. Their test checks that
 * mounting still reports an error, so it fails once the web component is fixed
 * and the entry can be removed.
 */
const NEEDS_CHILDREN = 'throws when mounted without the children it expects';
const KNOWN_MOUNT_ERRORS = new Map([
  ['cds-ng-combo-button', NEEDS_CHILDREN],
  ['cds-ng-copy', NEEDS_CHILDREN],
  ['cds-ng-file-uploader', NEEDS_CHILDREN],
  ['cds-ng-menu-button', NEEDS_CHILDREN],
  ['cds-ng-menu-item-radio-group', 'throws when mounted outside a menu'],
  ['cds-ng-menu-item-selectable', 'throws when mounted outside a menu'],
  [
    'cds-ng-page-header-title-breadcrumb',
    'sets `inert` in its constructor, which `document.createElement` rejects',
  ],
  ['cds-ng-tooltip', NEEDS_CHILDREN],
]);

/**
 * Web components that fail when mounted on their own in a way the test cannot
 * capture, so they are skipped.
 */
const SKIPPED = new Map([
  [
    'cds-ng-table',
    'without rows it rejects an update it schedules itself (unhandled rejection)',
  ],
]);

type Host = HTMLElement & {
  updateComplete?: Promise<unknown>;
  renderRoot?: ParentNode;
};

/**
 * Errors reported to `window` during the current test. Custom element
 * constructors and Lit update errors are reported, not thrown. Collected for the
 * whole test, cleanup included, so a late error does not fail the run.
 */
let reported: unknown[] = [];
const onError = (event: ErrorEvent) => {
  event.preventDefault();
  reported.push(event.error ?? event.message);
};

/** Mounts `selector` and returns the errors it caused while mounting. */
async function mount(selector: string, component: Type<unknown>) {
  const errors: unknown[] = [];
  let host: Host | undefined;
  try {
    const { query } = await render(`<${selector}></${selector}>`, [component]);
    host = query<Host>(selector);
    await host.updateComplete;
    await new Promise((resolve) => setTimeout(resolve));
  } catch (error) {
    errors.push(error);
  }
  return { host, errors: [...errors, ...reported] };
}

describe('generated wrappers mount', () => {
  // Some web components move elements (menus, popovers) to `document.body`,
  // outside the test fixture, so remove everything while the window is open.
  // Blur first: when the focused element is removed, jsdom (unlike browsers)
  // reports `document.activeElement` as null, and Menu focuses it as a
  // fallback.
  beforeEach(() => {
    reported = [];
    window.addEventListener('error', onError);
  });

  afterEach(async () => {
    let active = document.activeElement as HTMLElement | null;
    while (active?.shadowRoot?.activeElement) {
      active = active.shadowRoot.activeElement as HTMLElement;
    }
    active?.blur();
    document.body.innerHTML = '';
    await new Promise((resolve) => setTimeout(resolve));
    window.removeEventListener('error', onError);
  });

  it('finds the wrappers', () => {
    expect(wrappers.length).toBeGreaterThan(250);
  });

  it.each(
    wrappers.filter(
      ([selector]) =>
        !KNOWN_MOUNT_ERRORS.has(selector) && !SKIPPED.has(selector)
    )
  )('%s', async (selector, component) => {
    const { host, errors } = await mount(selector, component);

    expect(errors).toEqual([]);
    const definition = customElements.get(selector);
    expect(definition).toBeDefined();
    expect(host).toBeInstanceOf(definition!);
    expect(host!.renderRoot).toBeDefined();
  });

  it.each(
    wrappers
      .filter(([selector]) => KNOWN_MOUNT_ERRORS.has(selector))
      .map(([selector, component]) => ({
        selector,
        component,
        reason: KNOWN_MOUNT_ERRORS.get(selector),
      }))
  )(
    '$selector still reports an error (known: $reason)',
    async ({ selector, component }) => {
      const { errors } = await mount(selector, component);

      expect(errors.length).toBeGreaterThan(0);
    }
  );

  it.skip.each([...SKIPPED])('%s (skipped: %s)', () => undefined);
});

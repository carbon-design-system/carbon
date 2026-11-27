/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

const COMPONENTS = path.resolve(__dirname, '..');

// Every `_<name>-mixin.scss` module under components/.
const mixinModules = fs
  .readdirSync(COMPONENTS, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== '__tests__')
  .flatMap((entry) =>
    fs
      .readdirSync(path.join(COMPONENTS, entry.name))
      .filter((file) => /^_.+-mixin\.scss$/.test(file))
      .map((file) => `${entry.name}/${file.replace(/^_|\.scss$/g, '')}`)
  )
  .sort();

// Output still allowed on load: `@keyframes` (shared utility keyframes from
// `utilities/skeleton` / `utilities/keyframes`, and component keyframe files
// such as date-picker's flatpickr animations), plus the utility classes that
// `utilities/visually-hidden` emits. Those modules are out of scope for this
// change. Any component rule emitted on load is a failure.
const ALLOWED_SELECTORS = new Set([
  '.cds--assistive-text,.cds--visually-hidden',
]);

function unexpectedOutput(css) {
  const unexpected = [];
  postcss.parse(css).each((node) => {
    if (node.type === 'comment') {
      return;
    }
    if (node.type === 'atrule' && node.name === 'keyframes') {
      return;
    }
    const selector =
      node.type === 'rule' ? node.selector.replace(/\s+/g, '') : null;
    if (!ALLOWED_SELECTORS.has(selector)) {
      unexpected.push(node.type === 'rule' ? node.selector : `@${node.name}`);
    }
  });
  return unexpected;
}

// Web Components build shared, adoptable stylesheets from these modules, so
// loading one must not emit any component CSS. CSS is emitted only where its
// mixins are included. The public partials and folder indexes keep emitting
// what they always have (covered by the styles entrypoint snapshots).
describe('scss/components side-effect-free mixin modules', () => {
  test('mixin modules exist', () => {
    expect(mixinModules.length).toBeGreaterThan(0);
  });

  test.each(mixinModules)(
    '%s emits no component CSS when loaded',
    async (mod) => {
      const { result } = await render(`@use '../${mod}';`);
      expect(unexpectedOutput(result.css.toString())).toEqual([]);
    }
  );
});

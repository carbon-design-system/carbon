/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/grid css-grid mixin', () => {
  it('honours $prefix for every emitted custom property', async () => {
    const { result } = await render(`
      @use '../scss/config' with ($prefix: 'test');
      @use '../scss/css-grid';

      @include css-grid.css-grid;
    `);
    const cssText = result.css.toString();

    expect(cssText).not.toMatch(/--cds-/);

    expect(cssText).toMatch(/--test-grid-gutter\b/);
    expect(cssText).toMatch(/--test-grid-columns\b/);
    expect(cssText).toMatch(/--test-grid-margin\b/);
    expect(cssText).toMatch(/--test-grid-gutter-start\b/);
    expect(cssText).toMatch(/--test-grid-gutter-end\b/);
    expect(cssText).toMatch(/--test-grid-column-hang\b/);
    expect(cssText).toMatch(/--test-grid-mode-start\b/);
    expect(cssText).toMatch(/--test-grid-mode-end\b/);
  });
});

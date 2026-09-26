/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const postcss = require('postcss');
const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('scss/components/search', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:meta';
      @use '../search';
      $_: get('mixin', meta.mixin-exists('search', 'search'));
    `);
    expect(unwrap('mixin')).toBe(true);
  });

  test('expandable search magnifier has an active state', async () => {
    const { result } = await render(`
      @use '../search';
    `);

    const styles = declarationsForSelector(
      result.css.toString(),
      '.cds--search--expandable .cds--search-magnifier:active'
    );

    expect(styles['background-color']).toBe(
      'var(--cds-background-selected, rgba(141, 141, 141, 0.2))'
    );
  });
});

function declarationsForSelector(css, selector) {
  const styles = {};
  postcss.parse(css).walkRules((rule) => {
    if (!rule.selectors.includes(selector)) {
      return;
    }
    for (const node of rule.nodes) {
      if (node.type === 'decl') {
        styles[node.prop] = node.value;
      }
    }
  });
  return styles;
}

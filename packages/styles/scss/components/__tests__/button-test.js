/**
 * Copyright IBM Corp. 2018, 2026
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

describe('scss/components/button', () => {
  test('Public API', async () => {
    const { unwrap } = await render(`
      @use 'sass:map';
      @use 'sass:meta';
      @use '../button';

      $_: get('mixin', meta.mixin-exists('button', 'button'));
      $_: get('radius', meta.mixin-exists('radius', 'button'));
      $_: get('variables', map.keys(meta.module-variables('button')));
    `);
    expect(unwrap('mixin')).toBe(true);
    expect(unwrap('radius')).toBe(true);
    expect(unwrap('variables')).toMatchInlineSnapshot(`
[
  "button-font-weight",
  "button-font-size",
  "button-border-radius",
  "button-height",
  "button-padding",
  "button-padding-field",
  "button-padding-sm",
  "button-padding-lg",
  "button-padding-ghost",
  "button-padding-ghost-field",
  "button-padding-ghost-sm",
  "button-border-width",
  "button-outline-width",
  "button-min-inline-size",
  "button-separator",
  "button-primary",
  "button-secondary",
  "button-tertiary",
  "button-danger-primary",
  "button-danger-secondary",
  "button-danger-active",
  "button-primary-active",
  "button-secondary-active",
  "button-tertiary-active",
  "button-danger-hover",
  "button-primary-hover",
  "button-secondary-hover",
  "button-tertiary-hover",
  "button-disabled",
  "button-tokens",
]
`);
  });

  test('configuration', async () => {
    const { unwrap } = await render(`
      @use '../button' with (
        $button-height: 2rem,
      );
      $_: get('height', button.$button-height);
    `);
    expect(unwrap('height')).toBe('2rem');
  });

  test('icon-only ghost button does not apply active background on focus', async () => {
    const { result } = await render(`
    @use '../button';
  `);

    let focusRule;

    postcss.parse(result.css.toString()).walkRules((rule) => {
      if (rule.selector === '.cds--btn--icon-only.cds--btn--ghost:focus') {
        focusRule = rule;
      }
    });

    expect(focusRule).toBeDefined();

    const declarations = focusRule.nodes
      .filter((node) => node.type === 'decl')
      .reduce((styles, node) => {
        styles[node.prop] = node.value;
        return styles;
      }, {});

    expect(declarations['background-color']).toBeUndefined();
    expect(declarations['box-shadow']).toBeDefined();
  });

  test('button radius reads CSS custom properties with a 0 fallback by default', async () => {
    const { result } = await render(`
      @use '../button';
    `);

    const styles = declarationsForSelector(result.css.toString(), '.cds--btn');

    expect(styles['border-start-start-radius']).toBe(
      'var(--cds-button-radius-ss, var(--cds-button-radius, 0))'
    );
    expect(styles['border-start-end-radius']).toBe(
      'var(--cds-button-radius-se, var(--cds-button-radius, 0))'
    );
    expect(styles['border-end-start-radius']).toBe(
      'var(--cds-button-radius-es, var(--cds-button-radius, 0))'
    );
    expect(styles['border-end-end-radius']).toBe(
      'var(--cds-button-radius-ee, var(--cds-button-radius, 0))'
    );
  });

  test('v12 button radius falls back to border-radius-max', async () => {
    const { result } = await render(`
      @use '../../feature-flags' with (
        $feature-flags: (
          'enable-v12-release': true,
        )
      );
      @use '../button';
    `);

    const styles = declarationsForSelector(result.css.toString(), '.cds--btn');

    expect(styles['border-start-start-radius']).toBe(
      'var(--cds-button-radius-ss, var(--cds-button-radius, 999999px))'
    );
  });

  test('skeleton clips overflow so the shimmer follows button radius', async () => {
    const { result } = await render(`
      @use '../button';
    `);

    const styles = declarationsForSelector(
      result.css.toString(),
      '.cds--btn.cds--skeleton'
    );

    expect(styles.overflow).toBe('hidden');
  });

  test('radius mixin sets the base property and granular corners override it', async () => {
    const { result } = await render(`
      @use '../button';

      .test {
        @include button.radius(0.25rem, $ee: 0);
      }
    `);

    const styles = declarationsForSelector(result.css.toString(), '.test');

    expect(styles['--cds-button-radius']).toBe('0.25rem');
    expect(styles['--cds-button-radius-ee']).toBe('0');
    expect(styles['--cds-button-radius-ss']).toBeUndefined();
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

/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { SassRenderer } from '@carbon/test-utils/scss';
import {
  spacing,
  fluidSpacing,
  container,
  iconSize,
  layout,
  borderRadius,
  sizeXSmall,
  sizeSmall,
  sizeMedium,
  sizeLarge,
  sizeXLarge,
  size2XLarge,
} from '../src';

const { render } = SassRenderer.create(__dirname);

function formatStep(name, index) {
  let step = index;
  if (step < 10) {
    step = '0' + step;
  }
  return `${name}-${step}`;
}

const spacingScale = spacing.map((value, index) => {
  return [index, formatStep('spacing', index + 1), value];
});

const fluidSpacingScale = fluidSpacing.map((value, index) => {
  return [index, formatStep('fluid-spacing', index + 1), value];
});

const containerScale = container.map((value, index) => {
  return [index, formatStep('container', index + 1), value];
});

const iconSizeScale = iconSize.map((value, index) => {
  return [index, formatStep('icon-size', index + 1), value];
});

const layoutScale = layout.map((value, index) => {
  return [index, formatStep('layout', index + 1), value];
});

// border-radius uses kebab-case keys in the Record, not sequential steps
const borderRadiusScale = Object.entries(borderRadius).map(([id, value]) => {
  return [id, value];
});

// sizes uses the SizeName keys; map to scss variable names (size-xs etc.)
const sizeConvert = {
  XSmall: 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  XLarge: 'xl',
  '2XLarge': '2xl',
};
const sizeScale = [
  ['xs', sizeXSmall],
  ['sm', sizeSmall],
  ['md', sizeMedium],
  ['lg', sizeLarge],
  ['xl', sizeXLarge],
  ['2xl', size2XLarge],
];

describe('scss/layout.scss', () => {
  it.each(spacingScale)(
    'should export spacing step `%s`',
    async (_index, id, value) => {
      const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, '${id}'));
        $value: get('value', map.get($variables, '${id}'));
      `);

      expect(get('key').value).toBe(true);
      expect(get('value').value).toBe(value);
    }
  );

  it.each(fluidSpacingScale)(
    'should export fluid spacing step `%s`',
    async (_index, id, value) => {
      const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, '${id}'));
        $value: get('value', map.get($variables, '${id}'));
      `);

      expect(get('key').value).toBe(true);
      expect(get('value').value).toBe(value);
    }
  );

  it.each(containerScale)(
    'should export container step `%s`',
    async (_index, id, value) => {
      const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, '${id}'));
        $value: get('value', map.get($variables, '${id}'));
      `);

      expect(get('key').value).toBe(true);
      expect(get('value').value).toBe(value);
    }
  );

  it.each(iconSizeScale)(
    'should export icon-size step `%s`',
    async (_index, id, value) => {
      const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, '${id}'));
        $value: get('value', map.get($variables, '${id}'));
      `);

      expect(get('key').value).toBe(true);
      expect(get('value').value).toBe(value);
    }
  );

  it.each(layoutScale)(
    'should export layout step `%s`',
    async (_index, id, value) => {
      const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, '${id}'));
        $value: get('value', map.get($variables, '${id}'));
      `);

      expect(get('key').value).toBe(true);
      expect(get('value').value).toBe(value);
    }
  );

  it.each(borderRadiusScale)(
    'should export border-radius token `%s`',
    async (id, value) => {
      const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, '${id}'));
        $value: get('value', map.get($variables, '${id}'));
      `);

      expect(get('key').value).toBe(true);
      expect(get('value').value).toBe(value);
    }
  );

  it.each(sizeScale)('should export size token `%s`', async (id, value) => {
    const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, 'size-${id}'));
        $value: get('value', map.get($variables, 'size-${id}'));
      `);

    expect(get('key').value).toBe(true);
    expect(get('value').value).toBe(value);
  });
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { SassRenderer } from '@carbon/test-utils/scss';
import { spacing, fluidSpacing, container, iconSize } from '../src';

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
});

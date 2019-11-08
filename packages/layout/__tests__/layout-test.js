/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSassRenderer, convert } from '@carbon/test-utils/scss';
import { spacing, layout, fluidSpacing, container, iconSize } from '../src';

function formatStep(name, index) {
  let step = index;
  if (step < 10) {
    step = '0' + step;
  }
  return `${name}-${step}`;
}

const render = createSassRenderer(__dirname);
const spacingScale = spacing.map((value, index) => {
  return [
    index,
    formatStep('carbon--spacing', index + 1),
    formatStep('spacing', index + 1),
    value,
  ];
});

const fluidSpacingScale = fluidSpacing.map((value, index) => {
  return [
    index,
    formatStep('carbon--fluid-spacing', index + 1),
    formatStep('fluid-spacing', index + 1),
    value,
  ];
});

const layoutScale = layout.map((value, index) => {
  return [
    index,
    formatStep('carbon--layout', index + 1),
    formatStep('layout', index + 1),
    value,
  ];
});

const containerScale = container.map((value, index) => {
  return [
    index,
    formatStep('carbon--container', index + 1),
    formatStep('container', index + 1),
    value,
  ];
});

const iconSizeScale = iconSize.map((value, index) => {
  return [
    index,
    formatStep('carbon--icon-size', index + 1),
    formatStep('icon-size', index + 1),
    value,
  ];
});

describe('scss/layout.scss', () => {
  it.each(spacingScale)(
    'it should export spacing step %s',
    async (index, namespace, alias, value) => {
      const { calls } = await render(`
        @import '../scss/layout';
        $t: test(global-variable-exists(${namespace}));
        $t: test($${namespace});
        $t: test(global-variable-exists(${alias}));
        $t: test($${alias});
      `);

      expect(convert(calls[0][0])).toBe(true);
      expect(convert(calls[1][0])).toBe(value);
      expect(convert(calls[2][0])).toBe(true);
      expect(convert(calls[3][0])).toBe(value);
    }
  );

  it.each(fluidSpacingScale)(
    'it should export fluid spacing step %s',
    async (index, namespace, alias, value) => {
      const { calls } = await render(`
        @import '../scss/layout';
        $t: test(global-variable-exists(${namespace}));
        $t: test($${namespace});
        $t: test(global-variable-exists(${alias}));
        $t: test($${alias});
      `);

      expect(convert(calls[0][0])).toBe(true);
      expect(convert(calls[1][0])).toBe(value);
      expect(convert(calls[2][0])).toBe(true);
      expect(convert(calls[3][0])).toBe(value);
    }
  );

  it.each(layoutScale)(
    'it should export layout step %s',
    async (index, namespace, alias, value) => {
      const { calls } = await render(`
        @import '../scss/layout';
        $t: test(global-variable-exists(${namespace}));
        $t: test($${namespace});
        $t: test(global-variable-exists(${alias}));
        $t: test($${alias});
      `);

      expect(convert(calls[0][0])).toBe(true);
      expect(convert(calls[1][0])).toBe(value);
      expect(convert(calls[2][0])).toBe(true);
      expect(convert(calls[3][0])).toBe(value);
    }
  );

  it.each(containerScale)(
    'it should export container step %s',
    async (index, namespace, alias, value) => {
      const { calls } = await render(`
        @import '../scss/layout';
        $t: test(global-variable-exists(${namespace}));
        $t: test($${namespace});
        $t: test(global-variable-exists(${alias}));
        $t: test($${alias});
      `);

      expect(convert(calls[0][0])).toBe(true);
      expect(convert(calls[1][0])).toBe(value);
      expect(convert(calls[2][0])).toBe(true);
      expect(convert(calls[3][0])).toBe(value);
    }
  );

  it.each(iconSizeScale)(
    'it should export icon-size step %s',
    async (index, namespace, alias, value) => {
      const { calls } = await render(`
        @import '../scss/layout';
        $t: test(global-variable-exists(${namespace}));
        $t: test($${namespace});
        $t: test(global-variable-exists(${alias}));
        $t: test($${alias});
      `);

      expect(convert(calls[0][0])).toBe(true);
      expect(convert(calls[1][0])).toBe(value);
      expect(convert(calls[2][0])).toBe(true);
      expect(convert(calls[3][0])).toBe(value);
    }
  );
});

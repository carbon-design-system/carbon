/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { createSassRenderer, types } = require('@carbon/test-utils/scss');

const render = createSassRenderer(__dirname);

describe('colors.scss', () => {
  it('should emit default variable initializations when mixins are included', async () => {
    const { calls } = await render(`
@import '../scss/mixins';

$test: test(mixin-exists(carbon--colors));
$test: test(global-variable-exists(carbon--blue-50));
`);
    expect(calls[0][0].getValue()).toBe(true);
    expect(calls[1][0].getValue()).toBe(true);
  });

  it('should include color variables as globals if the mixin is called', async () => {
    const { calls } = await render(`
@import '../scss/mixins';

@include carbon--colors();
$test: test(variable-exists(carbon--blue-50));
$test: test(global-variable-exists(carbon--blue-50));
`);
    expect(calls[0][0].getValue()).toBe(true);
    expect(calls[1][0].getValue()).toBe(true);
  });

  it('should include color variables in the default entrypoint', async () => {
    const { calls } = await render(`
@import '../scss/colors';

$test: test(mixin-exists(carbon--colors));
$test: test(variable-exists(carbon--blue-50));
$test: test(global-variable-exists(carbon--blue-50));
`);
    expect(calls[0][0].getValue()).toBe(true);
    expect(calls[1][0].getValue()).toBe(true);
    expect(calls[2][0].getValue()).toBe(true);
  });

  describe('deprecated', () => {
    it('should provide a map of color values', async () => {
      const { calls } = await render(`
@import '../scss/colors';

$map: test($ibm-color-map);
$swatch: test(map-get($ibm-color-map, 'black'));
$value: test(map-get(map-get($ibm-color-map, 'black'), 100));
$null: test(map-get($ibm-color-map, black));
`);

      expect(calls[0][0]).toBeInstanceOf(types.Map);
      expect(calls[1][0]).toBeInstanceOf(types.Map);
      expect(calls[2][0]).toBeInstanceOf(types.Color);
      expect(calls[3][0]).toBeInstanceOf(types.Null);
    });
  });
});

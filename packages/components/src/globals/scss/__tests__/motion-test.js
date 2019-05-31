/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { createSassRenderer } = require('@carbon/test-utils/scss');

const variables = [
  'carbon--ease-in',
  'carbon--ease-out',
  'carbon--standard-easing',
  'transition--base',
  'transition--expansion',
];

const render = createSassRenderer(__dirname);

describe('motion', () => {
  describe.each(variables)('$%s', name => {
    // Temporarily test for regression since these variables were initially
    // under _vars.scss
    it('should be exported through _vars.scss', async () => {
      const { calls } = await render(`
@import '../vars';

$c: test(global-variable-exists(${name}));
`);
      // Check that global-variable-exists returned true
      expect(calls[0][0].getValue()).toBe(true);
    });

    // New location
    it('should be exported through _motion.scss', async () => {
      const { calls } = await render(`
@import '../motion';

$c: test(global-variable-exists(${name}));
`);
      // Check that global-variable-exists returned true
      expect(calls[0][0].getValue()).toBe(true);
    });
  });

  describe('motion function', () => {
    it('should be exported', async () => {
      const { calls } = await render(`
@import '../motion';

$c: test(function-exists(motion));
$c: test(function-exists(carbon--motion));
`);
      // Check that global-variable-exists returned true
      expect(calls[0][0].getValue()).toBe(true);
      expect(calls[1][0].getValue()).toBe(true);
    });
  });

  describe('motion mixin', () => {
    it('should be exported', async () => {
      const { calls } = await render(`
@import '../motion';

$c: test(mixin-exists(motion));
$c: test(mixin-exists(carbon--motion));
`);
      // Check that global-variable-exists returned true
      expect(calls[0][0].getValue()).toBe(true);
      expect(calls[1][0].getValue()).toBe(true);
    });
  });
});

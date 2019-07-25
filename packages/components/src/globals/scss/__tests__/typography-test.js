/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { createSassUtil } = require('@carbon/test-utils/scss');

const tests = useDartSass => {
  // eslint-disable-next-line global-require
  let sassUtil = createSassUtil(require('node-sass'));
  if (useDartSass) {
    // eslint-disable-next-line global-require
    sassUtil = createSassUtil(require('sass'));
  }
  const { createSassRenderer, convert } = sassUtil;
  const variables = ['base-font-size'];

  const render = createSassRenderer(__dirname).renderer;

  describe('_typography.scss', () => {
    describe.each(variables)('$%s', name => {
      it('should be exported', async () => {
        const { calls } = await render(`
@import '../typography';
$t: test(global-variable-exists(${name}));
`);
        // Check that global-variable-exists returned true
        expect(calls[0][0].getValue()).toBe(true);
      });

      it('should match export value', async () => {
        const { calls } = await render(`
@import '../typography';
$t: test($${name});
`);
        expect(convert(calls[0][0])).toMatchSnapshot();
      });
    });

    describe('unit mixin', () => {
      it('should output the appropriate unit derived from a pixel value', async () => {
        const { calls } = await render(`
@import '../typography';

$t: test(rem(16px));
$t: test(em(16px));
`);

        expect(convert(calls[0][0])).toBe('1rem');
        expect(convert(calls[1][0])).toBe('1em');
      });
    });
  });
};

tests(false);
tests(true);

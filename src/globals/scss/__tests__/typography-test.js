/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { convert, createSassRenderer } = require('@carbon/test-utils/scss');

const variables = [
  'font-family-mono',
  'font-family-sans-serif',
  'font-family-serif',
  'font-family-helvetica',
  'base-font-size',
  'typescale-map',
  'font-size-map',
];

const render = createSassRenderer(__dirname);
const renderClassic = content =>
  render(`
$feature-flags: (components-x: false, breaking-changes-x: false);
${content}
`);

const isClassic = async () => {
  const { calls } = await renderClassic(`
@import '../../scss/functions';
$t: test(feature-flag-enabled('breaking-changes-x'));
`);
  return !convert(calls[0][0]);
};

describe('_typography.scss', () => {
  describe.each(variables)('$%s', name => {
    it('should be exported', async () => {
      const { calls } = await renderClassic(`
@import '../typography';
$t: test(global-variable-exists(${name}));
`);
      // Check that global-variable-exists returned true
      expect(calls[0][0].getValue()).toBe(true);
    });

    it('should match export value', async () => {
      const { calls } = await renderClassic(`
@import '../typography';
$t: test($${name});
`);
      expect(convert(calls[0][0])).toMatchSnapshot();
    });
  });

  describe('typescale mixin', () => {
    it('should return a font-size value for a valid size', async () => {
      const sizes = ['giga', 'mega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'omega', 'caption', 'legal', 'p'];
      const tests = sizes.map(
        size => `
.test-${size} {
  @include typescale('${size}');
}
`
      );
      const { result } = await renderClassic(`
@import '../typography';
${tests.join('\n')}
`);
      expect(result.css.toString()).toMatchSnapshot();
    });

    it('should warn if given invalid size', async () => {
      const { output } = await renderClassic(`
@import '../typography';
.test {
  @include typescale('<unknown>');
}
`);
      // `output.warn` is called twice now since feature flags have diverged in
      // v10
      expect(output.warn).toHaveBeenCalledTimes((await isClassic()) ? 1 : 2);
    });
  });

  describe('unit mixin', () => {
    it('should output the appropriate unit derived from a pixel value', async () => {
      const { calls } = await renderClassic(`
@import '../typography';

$t: test(rem(16px));
$t: test(em(16px));
`);

      expect(convert(calls[0][0])).toBe('1rem');
      expect(convert(calls[1][0])).toBe('1em');
    });
  });

  describe('helvetica mixin', () => {
    it('should output a font-family value', async () => {
      const { result } = await renderClassic(`
@import '../typography';
.test {
  @include helvetica();
}
`);

      expect(result.css.toString()).toMatchSnapshot();
    });
  });

  describe('font-family mixin', () => {
    it('should output IBM Plex if css--plex is set to true', async () => {
      const { result } = await renderClassic(`
@import '../typography';
$css--plex: true;

.test {
  @include font-family();
}
`);

      expect(result.css.toString()).toEqual(expect.stringContaining('ibm-plex-sans'));
    });

    it('should output IBM Helvetica if css--plex is set to false', async () => {
      const { result } = await renderClassic(`
@import '../typography';
$css--plex: false;

.test {
  @include font-family();
}
`);

      expect(result.css.toString()).toEqual(expect.stringContaining('IBM Helvetica'));
    });
  });

  describe('font-smoothing mixin', () => {
    it('should output font-smoothing properties', async () => {
      const { result } = await renderClassic(`
@import '../typography';

.test {
  @include font-smoothing();
}
`);
      expect(result.css.toString()).toMatchSnapshot();
    });
  });

  describe('letter-spacing mixin', () => {
    it('should output letter-spacing properties', async () => {
      const { result } = await renderClassic(`
@import '../typography';

.test {
  @include letter-spacing();
}
`);
      expect(result.css.toString()).toMatchSnapshot();
    });
  });
});

/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { convert, renderSass } = require('../../../../tools/jest/scss');

const variables = [
  'font-family-mono',
  'font-family-sans-serif',
  'font-family-serif',
  'font-family-helvetica',
  'base-font-size',
  'typescale-map',
  'font-size-map',
];

describe('_typography.scss', () => {
  describe.each(variables)('$%s', name => {
    it('should be exported', async () => {
      const { calls } = await renderSass(`
@import './src/globals/scss/typography';
$t: test(global-variable-exists(${name}));
`);
      // Check that global-variable-exists returned true
      expect(calls[0][0].getValue()).toBe(true);
    });

    it('should match export value', async () => {
      const { calls } = await renderSass(`
@import './src/globals/scss/typography';
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
      const { result } = await renderSass(`
@import './src/globals/scss/typography';
${tests.join('\n')}
`);
      expect(result.css.toString()).toMatchSnapshot();
    });

    it('should warn if given invalid size', async () => {
      const { output } = await renderSass(`
@import './src/globals/scss/typography';
.test {
  @include typescale('<unknown>');
}
`);
      expect(output.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('unit mixin', () => {
    it('should output the appropriate unit derived from a pixel value', async () => {
      const { calls } = await renderSass(`
@import './src/globals/scss/typography';

$t: test(rem(16px));
$t: test(em(16px));
`);

      expect(convert(calls[0][0])).toBe('1rem');
      expect(convert(calls[1][0])).toBe('1em');
    });
  });

  describe('helvetica mixin', () => {
    it('should output a font-family value', async () => {
      const { result } = await renderSass(`
@import './src/globals/scss/typography';
.test {
  @include helvetica();
}
`);

      expect(result.css.toString()).toMatchSnapshot();
    });
  });

  describe('font-family mixin', () => {
    it('should output IBM Plex if css--plex is set to true', async () => {
      const { result } = await renderSass(`
@import './src/globals/scss/typography';
$css--plex: true;

.test {
  @include font-family();
}
`);

      expect(result.css.toString()).toEqual(expect.stringContaining('ibm-plex-sans'));
    });

    it('should output IBM Helvetica if css--plex is set to false', async () => {
      const { result } = await renderSass(`
@import './src/globals/scss/typography';
$css--plex: false;

.test {
  @include font-family();
}
`);

      expect(result.css.toString()).toEqual(expect.stringContaining('IBM Helvetica'));
    });
  });

  describe('line-height', () => {
    it('should output valid line-heights for specific elements, otherwise it should warn', async () => {
      const { output, result } = await renderSass(`
@import './src/globals/scss/typography';

.test-heading {
  @include line-height('heading');
}

.test-body {
  @include line-height('body');
}

.test-unknown {
  @include line-height('<unknown>');
}
`);
      expect(result.css.toString()).toMatchSnapshot();
      expect(output.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe('font-smoothing mixin', () => {
    it('should output font-smoothing properties', async () => {
      const { result } = await renderSass(`
@import './src/globals/scss/typography';

.test {
  @include font-smoothing();
}
`);
      expect(result.css.toString()).toMatchSnapshot();
    });
  });

  describe('letter-spacing mixin', () => {
    it('should output letter-spacing properties', async () => {
      const { result } = await renderSass(`
@import './src/globals/scss/typography';

.test {
  @include letter-spacing();
}
`);
      expect(result.css.toString()).toMatchSnapshot();
    });
  });

  describe('font-size mixin', () => {
    it('should output a font-size property if given a valid size', async () => {
      const sizes = ['76', '54', '36', '28', '20', '18', '16', '14', '12', '11'];
      const tests = sizes.map(
        size => `
.test-${size} {
  @include font-size('${size}');
}
`
      );
      const { output, result } = await renderSass(`
@import './src/globals/scss/typography';
${tests.join('\n')}

.test-unknown {
  @include font-size('<unknown>');
}
`);

      expect(result.css.toString()).toMatchSnapshot();
      expect(output.warn).toHaveBeenCalledTimes(1);
    });
  });
});

/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const { files } = require('../files');

const { render } = SassRenderer.create(__dirname);
const filepaths = files.map((file) => {
  return [file.filepath, file.relativePath];
});

describe('@carbon/styles', () => {
  describe.each(filepaths)('%s', (_filepath, relativePath) => {
    it('should be importable', async () => {
      await expect(
        render(`@use '../${relativePath}' as test;`)
      ).resolves.toBeDefined();
    });
  });

  it('should have stable public scss entrypoints', async () => {
    expect(files).toMatchSnapshot();
  });

  describe('scss/config', () => {
    test('config overrides', async () => {
      const { get } = await render(`
        @use 'sass:meta';
        @use '../scss/config' with (
          $prefix: 'custom-prefix',
          $css--font-face: false,
        );

        $_: get('config', (
          prefix: config.$prefix,
          css--font-face: config.$css--font-face,
        ));
      `);

      expect(get('config').value).toEqual({
        prefix: 'custom-prefix',
        ['css--font-face']: false,
      });
    });
  });

  describe('import order', () => {
    it('should support bringing in stylesheets independently', async () => {
      await expect(
        render(`
          @use '../scss/reset';
          @use '../scss/grid';
          @use '../scss/breakpoint';
          @use '../scss/colors';
          @use '../scss/components';
        `)
      ).resolves.not.toThrow();

      await expect(
        render(`
          @use '../scss/type';
          @use '../scss/grid';
        `)
      ).resolves.not.toThrow();

      await expect(
        render(`
          @use '../scss/themes';
          @use '../scss/theme';
        `)
      ).resolves.not.toThrow();
    });
  });
});

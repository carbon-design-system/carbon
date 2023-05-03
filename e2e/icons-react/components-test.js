/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

const PACKAGE_DIR = path.resolve(__dirname, '../../packages/icons-react');
const ICONS_PACKAGE_DIR = path.resolve(__dirname, '../../packages/icons');

describe('@carbon/icons-react', () => {
  let metadata;

  beforeAll(async () => {
    const mock = jest.spyOn(console, 'error').mockImplementation((error) => {
      if (
        error !== 'Error: infinite loop while processing mergePaths plugin.'
      ) {
        throw error;
      }
    });

    metadata = await Metadata.load({
      input: {
        svg: path.join(ICONS_PACKAGE_DIR, 'src/svg'),
        extensions: ICONS_PACKAGE_DIR,
      },
      extensions: [
        Metadata.extensions.icons,
        Metadata.extensions.deprecated,
        Metadata.extensions.assets,
        Metadata.extensions.output,
        Metadata.extensions.moduleInfo,
      ],
    });

    mock.mockRestore();
  });

  it('should export each SVG asset', async () => {
    const CarbonIconsReactCommonJS = require('@carbon/icons-react');
    const CarbonIconsReactESM = await import('@carbon/icons-react');

    for (const { moduleInfo } of metadata.icons) {
      expect(CarbonIconsReactCommonJS[moduleInfo.global]).toBeDefined();
      expect(CarbonIconsReactESM[moduleInfo.global]).toBeDefined();
    }
  });

  it('should export each SVG asset as a direct path', async () => {
    for (const { moduleInfo } of metadata.icons) {
      const esm = path.join(PACKAGE_DIR, 'es', moduleInfo.filepath);
      const commonjs = path.join(PACKAGE_DIR, 'lib', moduleInfo.filepath);

      expect(() => {
        require(commonjs);
      }).not.toThrow();
      await expect(import(esm)).resolves.toBeDefined();
    }
  });
});

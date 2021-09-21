/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { Metadata } = require('@carbon/icon-build-helpers');
const path = require('path');

const PACKAGE_DIR = path.resolve(__dirname, '../../packages/pictograms-react');
const PICTOGRAMS_PACKAGE_DIR = path.resolve(
  __dirname,
  '../../packages/pictograms'
);

describe('@carbon/pictograms-react', () => {
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
        svg: path.join(PICTOGRAMS_PACKAGE_DIR, 'src/svg'),
        extensions: PICTOGRAMS_PACKAGE_DIR,
      },
      extensions: [
        Metadata.extensions.pictograms,
        Metadata.extensions.deprecated,
        Metadata.extensions.assets,
        [Metadata.extensions.output, { target: 'pictograms' }],
      ],
    });

    mock.mockRestore();
  });

  it('should export each SVG asset', async () => {
    const CarbonPictogramsReactCommonJS = require('@carbon/pictograms-react');
    const CarbonPictogramsReactESM = await import('@carbon/pictograms-react');

    for (const asset of metadata.icons) {
      for (const icon of asset.output) {
        const { moduleName } = icon;
        expect(CarbonPictogramsReactCommonJS[moduleName]).toBeDefined();
        expect(CarbonPictogramsReactESM[moduleName]).toBeDefined();
      }
    }
  });

  it('should export each SVG asset as a direct path', async () => {
    for (const asset of metadata.icons) {
      for (const icon of asset.output) {
        const esm = path.join(PACKAGE_DIR, 'es', icon.filepath);
        const commonjs = path.join(PACKAGE_DIR, 'lib', icon.filepath);

        expect(() => {
          require(commonjs);
        }).not.toThrow();
        await expect(import(esm)).resolves.toBeDefined();
      }
    }
  });
});

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

const PICTOGRAMS_PACKAGE_DIR = path.resolve(
  __dirname,
  '../../packages/pictograms'
);

describe('@carbon/pictograms', () => {
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
    const CarbonPictogramsCommonJS = require('@carbon/pictograms');
    const CarbonPictogramsESM = await import('@carbon/pictograms');

    for (const asset of metadata.icons) {
      for (const icon of asset.output) {
        const { moduleName } = icon;
        expect(CarbonPictogramsCommonJS[moduleName]).toBeDefined();
        expect(CarbonPictogramsESM[moduleName]).toBeDefined();
      }
    }
  });

  it('should export each SVG asset as a direct path', async () => {
    for (const asset of metadata.icons) {
      for (const icon of asset.output) {
        const esm = path.join(PICTOGRAMS_PACKAGE_DIR, 'es', icon.filepath);
        const commonjs = path.join(
          PICTOGRAMS_PACKAGE_DIR,
          'lib',
          icon.filepath
        );

        expect(() => {
          require(commonjs);
        }).not.toThrow();
        await expect(import(esm)).resolves.toBeDefined();
      }
    }
  });
});

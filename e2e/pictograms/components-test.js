/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const path = require('path');
const { Metadata } = require('../../packages/icon-build-helpers');

const PICTOGRAMS_PACKAGE_DIR = path.resolve(
  __dirname,
  '../../packages/pictograms'
);

describe('@carbon/pictograms', () => {
  let metadata;

  beforeAll(async () => {
    metadata = await Metadata.load({
      input: PICTOGRAMS_PACKAGE_DIR,
      extensions: [
        Metadata.extensions.pictograms,
        Metadata.extensions.deprecated,
        Metadata.extensions.moduleName,
      ],
    });
  });

  it('should export each SVG asset', async () => {
    const CarbonPictogramsCommonJS = require('@carbon/pictograms');
    const CarbonPictogramsESM = await import('@carbon/pictograms');

    for (const icon of metadata.icons) {
      const { moduleName } = icon;
      expect(CarbonPictogramsCommonJS[moduleName]).toBeDefined();
      expect(CarbonPictogramsESM[moduleName]).toBeDefined();
    }
  });

  it('should export each SVG asset as a direct path', async () => {
    for (const icon of metadata.icons) {
      const esm = path.join(
        PICTOGRAMS_PACKAGE_DIR,
        'es',
        ...icon.namespace,
        icon.name,
        'index.js'
      );
      const commonjs = path.join(
        PICTOGRAMS_PACKAGE_DIR,
        'lib',
        ...icon.namespace,
        icon.name,
        'index.js'
      );

      expect(() => {
        require(commonjs);
      }).not.toThrow();
      await expect(import(esm)).resolves.toBeDefined();
    }
  });
});

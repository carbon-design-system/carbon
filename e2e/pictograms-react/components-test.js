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

const PACKAGE_DIR = path.resolve(__dirname, '../../packages/pictograms-react');
const PICTOGRAMS_PACKAGE_DIR = path.resolve(
  __dirname,
  '../../packages/pictograms'
);

describe('@carbon/pictograms-react', () => {
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
    const CarbonPictogramsReactCommonJS = require('@carbon/pictograms-react');
    const CarbonPictogramsReactESM = await import('@carbon/pictograms-react');
    for (const icon of metadata.icons) {
      const { moduleName } = icon;
      expect(CarbonPictogramsReactCommonJS[moduleName]).toBeDefined();
      expect(CarbonPictogramsReactESM[moduleName]).toBeDefined();
    }
  });

  it('should export each SVG asset as a direct path', async () => {
    for (const icon of metadata.icons) {
      const esm = path.join(
        PACKAGE_DIR,
        'es',
        ...icon.namespace,
        icon.name,
        'index.js'
      );
      const commonjs = path.join(
        PACKAGE_DIR,
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

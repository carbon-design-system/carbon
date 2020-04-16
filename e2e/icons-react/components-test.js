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

const PACKAGE_DIR = path.resolve(__dirname, '../../packages/icons-react');
const ICONS_PACKAGE_DIR = path.resolve(__dirname, '../../packages/icons');
const sizes = [16, 20, 24, 32];

describe('@carbon/icons-react', () => {
  let metadata;

  beforeAll(async () => {
    metadata = await Metadata.load({
      input: ICONS_PACKAGE_DIR,
      extensions: [
        Metadata.extensions.icons,
        Metadata.extensions.deprecated,
        Metadata.extensions.moduleName,
      ],
    });
  });

  it('should export each SVG asset', async () => {
    const CarbonIconsReactCommonJS = require('@carbon/icons-react');
    const CarbonIconsReactESM = await import('@carbon/icons-react');
    for (const icon of metadata.icons) {
      const { moduleName } = icon;
      for (const size of sizes) {
        const exportName = `${moduleName}${size}`;
        expect(CarbonIconsReactCommonJS[exportName]).toBeDefined();
        expect(CarbonIconsReactESM[exportName]).toBeDefined();
      }
    }
  });

  it('should export each SVG asset as a direct path', async () => {
    for (const icon of metadata.icons) {
      const esm = path.join(PACKAGE_DIR, 'es', ...icon.namespace, icon.name);
      const commonjs = path.join(
        PACKAGE_DIR,
        'lib',
        ...icon.namespace,
        icon.name
      );

      for (const size of sizes) {
        const es = path.join(esm, `${size}.js`);
        const lib = path.join(commonjs, `${size}.js`);
        expect(() => {
          require(lib);
        }).not.toThrow();
        await expect(import(es)).resolves.toBeDefined();
      }
    }
  });
});

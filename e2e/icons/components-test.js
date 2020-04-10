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
const CarbonIcons = require('@carbon/icons');
const { Metadata } = require('../../packages/icon-build-helpers');

const ICONS_PACKAGE_DIR = path.resolve(__dirname, '../../packages/icons');
const sizes = [16, 20, 24, 32];

describe('@carbon/icons', () => {
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

  it('should export each SVG asset', () => {
    for (const icon of metadata.icons) {
      const { moduleName } = icon;
      for (const size of sizes) {
        const exportName = `${moduleName}${size}`;
        expect(CarbonIcons[exportName]).toBeDefined();
      }
    }
  });

  it('should export each SVG asset as a direct path', () => {
    for (const icon of metadata.icons) {
      // CommonJS should be require-able
      const commonjs = path.join(
        ICONS_PACKAGE_DIR,
        'lib',
        ...icon.namespace,
        icon.name
      );

      for (const size of sizes) {
        const filepath = path.join(commonjs, `${size}.js`);
        expect(() => {
          require(filepath);
        }).not.toThrow();
      }
    }
  });
});

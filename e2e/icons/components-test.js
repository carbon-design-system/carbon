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
const { verifyIconPackage } = require('../test-utils/icon-package');

const ICONS_PACKAGE_DIR = path.resolve(__dirname, '../../packages/icons');

describe('@carbon/icons', () => {
  let failures;

  beforeAll(async () => {
    const mock = jest.spyOn(console, 'error').mockImplementation((error) => {
      if (
        error !== 'Error: infinite loop while processing mergePaths plugin.'
      ) {
        throw error;
      }
    });

    const metadata = await Metadata.load({
      input: {
        svg: path.join(ICONS_PACKAGE_DIR, 'src/svg'),
        extensions: ICONS_PACKAGE_DIR,
      },
      extensions: [
        Metadata.extensions.icons,
        Metadata.extensions.deprecated,
        Metadata.extensions.assets,
        Metadata.extensions.output,
      ],
    });

    mock.mockRestore();

    failures = verifyIconPackage({
      packageName: '@carbon/icons',
      packageDir: ICONS_PACKAGE_DIR,
      entries: metadata.icons.flatMap((asset) =>
        asset.output.map(({ moduleName, filepath }) => ({
          name: moduleName,
          filepath,
        }))
      ),
    });
  });

  it('should export each SVG asset', () => {
    expect(failures.entryPoint.sample).toEqual([]);
    expect(failures.entryPoint.total).toBe(0);
  });

  it('should export each SVG asset as a direct path', () => {
    expect(failures.directPath.sample).toEqual([]);
    expect(failures.directPath.total).toBe(0);
  });
});

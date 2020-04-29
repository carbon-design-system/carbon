/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('categories', () => {
  let Metadata;
  let extension;
  let vol;
  let yml;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    Metadata = require('../../');
    extension = require('../categories');
    yml = require('../../adapters').yml;
  });

  afterEach(() => {
    vol.reset();
  });

  it('should throw an error if an icon is in the registry but has no category information', async () => {
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      '/svg/icon-without-category.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize({
        categories: [
          {
            name: 'test',
            members: ['icon-with-category'],
          },
        ],
      }),
    };
    vol.fromJSON(files);

    await expect(
      Metadata.check({
        adapter: yml,
        input: {
          svg: '/svg',
          extensions: '/',
        },
        extensions: [extension],
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
"Expected the following icon to have category information: \`icon-without-category\`. This icon has assets in the following locations:
/svg/icon-without-category.svg"
`);
  });

  it('should throw an error if an icon is in the registry but has no subcategory information', async () => {
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      '/svg/icon-without-category.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize({
        categories: [
          {
            name: 'test-category',
            subcategories: [
              {
                name: 'test-subcategory',
                members: ['icon-with-category'],
              },
            ],
          },
        ],
      }),
    };
    vol.fromJSON(files);

    await expect(
      Metadata.check({
        adapter: yml,
        input: {
          svg: '/svg',
          extensions: '/',
        },
        extensions: [extension],
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
"Expected the following icon to have category information: \`icon-without-category\`. This icon has assets in the following locations:
/svg/icon-without-category.svg"
`);
  });

  it('should throw an error if an icon has category information but is not in the registry', async () => {
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize({
        categories: [
          {
            name: 'test',
            members: ['icon-with-category', 'missing-icon-in-registry'],
          },
        ],
      }),
    };
    vol.fromJSON(files);

    await expect(
      Metadata.check({
        adapter: yml,
        input: {
          svg: '/svg',
          extensions: '/',
        },
        extensions: [extension],
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Found the entry \`missing-icon-in-registry\` in category \`test\` that does not have a corresponding icon or asset. Either this icon does not exist, or is not available in the current directory."`
    );
  });

  it('should throw an error if an icon has subcategory information but is not in the registry', async () => {
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize({
        categories: [
          {
            name: 'test',
            subcategories: [
              {
                name: 'test-subcategory',
                members: ['icon-with-category', 'missing-icon-in-registry'],
              },
            ],
          },
        ],
      }),
    };
    vol.fromJSON(files);

    await expect(
      Metadata.check({
        adapter: yml,
        input: {
          svg: '/svg',
          extensions: '/',
        },
        extensions: [extension],
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Found the entry \`missing-icon-in-registry\` in category \`test\`, subcategory \`test-subcategory\` that does not have a corresponding icon or asset. Either this icon does not exist, or is not available in the current directory."`
    );
  });
});

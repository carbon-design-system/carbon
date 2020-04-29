/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('icons', () => {
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
    extension = require('../icons');
    yml = require('../../adapters/yml');
  });

  afterEach(() => {
    vol.reset();
  });

  it('should throw an error if an icon is in the registry that is not in metadata', async () => {
    const files = {
      '/svg/a.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize([]),
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
"Expected the icon \`a\` to be defined in the data metadata file. Found matches for this asset in the following locations:

/svg/a.svg"
`);
  });

  it('should throw an error if an icon is in metadata that is not in the registry', async () => {
    const files = {
      '/svg/a.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize([
        {
          name: 'a',
          friendly_name: 'a',
          aliases: [],
          sizes: ['glyph'],
        },
        {
          name: 'b',
          friendly_name: 'b',
          aliases: [],
          sizes: ['glyph'],
        },
      ]),
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
      `"Expected the metadata entry \`b\` to have a corresponding .svg asset in the SVG folder"`
    );
  });

  it('should throw an error if there is a missing size in the metadata', async () => {
    const files = {
      '/svg/16/a.svg': 'mock',
      '/svg/32/a.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize([
        {
          name: 'a',
          friendly_name: 'a',
          aliases: [],
          sizes: [16],
        },
      ]),
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
"Expected the entry \`a\` to have size \`32\` defined. This asset exists at:
/svg/32/a.svg"
`);
  });

  it('should throw an error if there is size in metadata not in the registry', async () => {
    const files = {
      '/svg/16/a.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize([
        {
          name: 'a',
          friendly_name: 'a',
          aliases: [],
          sizes: [16, 32],
        },
      ]),
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
      `"Expected the asset \`a\` to have the size 32 defined. This asset may not exist, or is not available in the SVG folder"`
    );
  });
});

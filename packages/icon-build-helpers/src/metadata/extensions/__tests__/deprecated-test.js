/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('deprecated', () => {
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
    extension = require('../deprecated');
    yml = require('../../adapters').yml;
  });

  afterEach(() => {
    vol.reset();
  });

  it('should throw an error if a deprecated icon is not in the registry', async () => {
    const files = {
      '/svg/a.svg': 'mock',
      [`/${extension.name}.yml`]: yml.serialize({
        deprecated: [
          {
            name: 'a',
          },
          {
            name: 'b',
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
      `"Expected the deprecated icon \`b\` to exist. Either this icon does not exist, or is not available in the given SVG directory"`
    );
  });
});

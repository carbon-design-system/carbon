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
  let Registry;
  let Storage;
  let extension;
  let validate;
  let vol;
  let yml;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    Registry = require('../../registry');
    Storage = require('../../storage');
    extension = require('../deprecated');
    validate = require('../../validate');
    yml = require('../../adapters').yml;
  });

  afterEach(() => {
    vol.reset();
  });

  it('should throw an error if a deprecated icon is not in the registry', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/a.svg': 'mock',
      [`/${filename}`]: yml.serialize({
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

    const registry = await Registry.create('/svg');
    const extensions = await Storage.load(yml, '/', [extension]);
    expect(() => {
      validate(registry, extensions);
    }).toThrow();
  });
});

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
    extension = require('../icons');
    validate = require('../../validate');
    yml = require('../../adapters').yml;
  });

  afterEach(() => {
    vol.reset();
  });

  it('should throw an error if an icon is in the registry that is not in metadata', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/a.svg': 'mock',
      [`/${filename}`]: yml.serialize([]),
    };
    vol.fromJSON(files);

    const registry = await Registry.create('/svg');
    const extensions = await Storage.load(yml, '/', [extension]);
    expect(() => {
      validate(registry, extensions);
    }).toThrow();
  });

  it('should throw an error if an icon is in metadata that is not in the registry', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/a.svg': 'mock',
      [`/${filename}`]: yml.serialize([
        {
          name: 'a',
          friendly_name: 'a',
          usage: 'mock',
          aliases: [],
          sizes: ['glyph'],
        },
        {
          name: 'b',
          friendly_name: 'b',
          usage: 'mock',
          aliases: [],
          sizes: ['glyph'],
        },
      ]),
    };
    vol.fromJSON(files);

    const registry = await Registry.create('/svg');
    const extensions = await Storage.load(yml, '/', [extension]);
    expect(() => {
      validate(registry, extensions);
    }).toThrow();
  });

  it('should throw an error if there is a missing size in the metadata', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/16/a.svg': 'mock',
      '/svg/32/a.svg': 'mock',
      [`/${filename}`]: yml.serialize([
        {
          name: 'a',
          friendly_name: 'a',
          usage: 'mock',
          aliases: [],
          sizes: [16],
        },
      ]),
    };
    vol.fromJSON(files);

    const registry = await Registry.create('/svg');
    const extensions = await Storage.load(yml, '/', [extension]);
    expect(() => {
      validate(registry, extensions);
    }).toThrow();
  });

  it('should throw an error if there is size in metadata not in the registry', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/16/a.svg': 'mock',
      [`/${filename}`]: yml.serialize([
        {
          name: 'a',
          friendly_name: 'a',
          usage: 'mock',
          aliases: [],
          sizes: [16, 32],
        },
      ]),
    };
    vol.fromJSON(files);

    const registry = await Registry.create('/svg');
    const extensions = await Storage.load(yml, '/', [extension]);
    expect(() => {
      validate(registry, extensions);
    }).toThrow();
  });
});

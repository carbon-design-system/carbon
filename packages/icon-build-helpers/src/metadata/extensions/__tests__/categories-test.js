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
    extension = require('../categories');
    validate = require('../../validate');
    yml = require('../../adapters').yml;
  });

  afterEach(() => {
    vol.reset();
  });

  it('should throw an error if an icon is in the registry but has no category information', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      '/svg/icon-without-category.svg': 'mock',
      [`/${filename}`]: yml.serialize({
        categories: [
          {
            name: 'test',
            members: ['icon-with-category'],
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

  it('should throw an error if an icon is in the registry but has no subcategory information', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      '/svg/icon-without-category.svg': 'mock',
      [`/${filename}`]: yml.serialize({
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

    const registry = await Registry.create('/svg');
    const extensions = await Storage.load(yml, '/', [extension]);
    expect(() => {
      validate(registry, extensions);
    }).toThrow();
  });

  it('should throw an error if an icon has category information but is not in the registry', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      [`/${filename}`]: yml.serialize({
        categories: [
          {
            name: 'test',
            members: ['icon-with-category', 'missing-icon-in-registry'],
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

  it('should throw an error if an icon has subcategory information but is not in the registry', async () => {
    const filename = yml.getFilenameFor(extension.name);
    const files = {
      '/svg/icon-with-category.svg': 'mock',
      [`/${filename}`]: yml.serialize({
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

    const registry = await Registry.create('/svg');
    const extensions = await Storage.load(yml, '/', [extension]);
    expect(() => {
      validate(registry, extensions);
    }).toThrow();
  });
});

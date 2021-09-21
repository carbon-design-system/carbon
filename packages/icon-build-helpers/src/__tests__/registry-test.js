/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('registry', () => {
  let Registry;
  let vol;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });
    Registry = require('../registry');
  });

  afterEach(() => {
    vol.reset();
  });

  it('should register each asset from a directory', async () => {
    const assets = ['a', 'b', 'c'];
    const files = {};
    for (const asset of assets) {
      const filepath = `/svg/${asset}.svg`;
      files[filepath] = 'mock';
    }
    vol.fromJSON(files);

    const registry = await Registry.create('/svg');
    for (const [id] of registry) {
      expect(assets.indexOf(id)).not.toBe(-1);
    }
  });

  it('should register each asset in nested directories', async () => {
    const assets = ['foo/a', 'foo/bar/b', 'baz/c'];
    const files = {};
    for (const asset of assets) {
      const filepath = `/svg/${asset}.svg`;
      files[filepath] = 'mock';
    }
    vol.fromJSON(files);

    const registry = await Registry.create('/svg');
    for (const icon of registry.values()) {
      const asset = icon.namespace.join('/') + '/' + icon.id;
      expect(assets.indexOf(asset)).not.toBe(-1);
    }
  });

  it('should register assets with the same name under the same icon', async () => {
    const assets = ['16/a', '20/a', '32/a'];
    const files = {};
    for (const asset of assets) {
      const filepath = `/svg/${asset}.svg`;
      files[filepath] = 'mock';
    }
    vol.fromJSON(files);

    const registry = await Registry.create('/svg');
    expect(registry.size).toBe(1);

    const icon = registry.get('a');
    expect(icon.assets.length).toBe(assets.length);
    expect(icon.assets[0].size).toBe(16);
    expect(icon.assets[1].size).toBe(20);
    expect(icon.assets[2].size).toBe(32);
  });
});

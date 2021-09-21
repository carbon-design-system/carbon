/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('Storage', () => {
  let vol;
  let Extension;
  let Storage;
  let adapter;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    Extension = require('../extension');
    Storage = require('../storage');
    adapter = require('../adapters/yml');
  });

  afterEach(() => {
    vol.reset();
  });

  describe('Storage#load', () => {
    it('should load all extensions with data stored in files from a directory', async () => {
      const data = { foo: 'bar' };
      vol.fromJSON({
        '/test/extension-a.yml': adapter.serialize(data),
        '/test/extension-b.yml': adapter.serialize(data),
      });

      const a = jest.fn(() => {
        return {
          name: 'extension-a',
        };
      });
      const b = jest.fn(() => {
        return {
          name: 'extension-b',
        };
      });
      const c = jest.fn(() => {
        return {
          name: 'extension-c',
          computed: true,
        };
      });
      const extensions = [a, b, c];
      const result = await Storage.load(
        adapter,
        '/test',
        Extension.load(extensions)
      );

      for (const extension of result) {
        if (extension.computed) {
          continue;
        }
        expect(extension.data).toEqual(data);
      }
    });
  });

  describe('Storage#write', () => {
    it('should write all extensions with data to files in the given directory', async () => {
      const data = { foo: 'bar' };
      const a = jest.fn(() => {
        return {
          name: 'extension-a',
        };
      });
      const b = jest.fn(() => {
        return {
          name: 'extension-b',
        };
      });
      const c = jest.fn(() => {
        return {
          name: 'extension-c',
          computed: true,
        };
      });
      const extensions = Extension.load([a, b, c]);
      for (const extension of extensions) {
        if (extension.computed) {
          continue;
        }
        extension.data = data;
      }

      await Storage.save(adapter, '/test', extensions);

      const result = await Storage.load(adapter, '/test', extensions);

      for (const extension of result) {
        if (extension.computed) {
          continue;
        }
        expect(extension.data).toEqual(data);
      }
    });
  });
});

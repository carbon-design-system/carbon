/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('Metadata', () => {
  let vol;
  let fs;
  let Metadata;
  let adapter;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    fs = require('fs-extra');
    Metadata = require('../');
    adapter = require('../adapters/memory');
  });

  afterEach(() => {
    vol.reset();
  });

  describe('check', () => {
    it('should validate the given extensions with the registry of assets and extension data', async () => {
      vol.fromJSON({
        '/test/svg/a.svg': '<test>',
      });
      const mockExtension = {
        name: 'extension-a',
        validate: jest.fn(),
      };
      const mockSchema = jest.fn(() => {
        const Joi = require('joi');
        return Joi.object({ foo: Joi.string() });
      });
      Object.defineProperty(mockExtension, 'schema', {
        get: mockSchema,
        enumerable: true,
      });

      const a = jest.fn(() => {
        return mockExtension;
      });

      const data = { foo: 'bar' };
      adapter.filesystem.set('/test/extension-a', data);

      await expect(
        Metadata.check({
          adapter,
          input: {
            svg: '/test',
            extensions: '/test',
          },
          extensions: [a],
        })
      ).resolves.toBeUndefined();

      // Extension should be loaded
      expect(a).toHaveBeenCalledTimes(1);

      // If an extension provides a schema, it should be used to validate the
      // data
      expect(mockSchema).toHaveBeenCalledTimes(1);

      // If an extension provides a validate method, it should be called with
      // the registry and data for the extension
      expect(mockExtension.validate).toHaveBeenCalledTimes(1);
      expect(mockExtension.validate).toHaveBeenCalledWith(
        expect.any(Map),
        data
      );
    });
  });

  describe('load', () => {
    it('should load the given extensions with the given adapter and asset path', async () => {
      vol.fromJSON({
        '/test/svg/a.svg': '<test>',
      });

      const mockExtension = {
        name: 'extension-a',
        extend: jest.fn((metadata, data) => {
          metadata.data = data;
        }),
      };
      const extension = jest.fn(() => {
        return mockExtension;
      });

      const data = { foo: 'bar' };
      adapter.filesystem.set('/test/extension-a', data);

      const metadata = await Metadata.load({
        adapter,
        input: {
          svg: '/test',
          extensions: '/test',
        },
        extensions: [extension],
      });

      expect(metadata.data).toEqual(data);
      expect(mockExtension.extend).toHaveBeenCalledTimes(1);
      expect(mockExtension.extend).toHaveBeenCalledWith(
        { data },
        data,
        expect.any(Map),
        {
          input: {
            svg: '/test',
            extensions: '/test',
          },
        }
      );
    });
  });

  describe('build', () => {
    it('should output the generated metadata for the given extensions', async () => {
      vol.fromJSON({
        '/test/svg/a.svg': '<test>',
      });
      const extension = () => {
        return {
          name: 'extension',
          extend(metadata, data, registry, context) {
            metadata.icons = Array.from(registry.keys());
            metadata.data = data;
            metadata.context = context;
          },
        };
      };

      const data = { foo: 'bar' };
      adapter.filesystem.set('/test/extension', data);

      await Metadata.build({
        adapter,
        input: {
          svg: '/test',
          extensions: '/test',
        },
        extensions: [extension],
      });

      const metadata = await fs.readJson('/test/metadata.json');
      expect(metadata).toEqual({
        icons: ['a'],
        data,
        context: {
          input: {
            svg: '/test',
            extensions: '/test',
          },
        },
      });
    });
  });
});

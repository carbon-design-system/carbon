/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('yml', () => {
  let vol;
  let adapter;

  beforeEach(() => {
    jest.mock('fs', () => {
      const memfs = require('memfs');
      vol = memfs.vol;
      return memfs.fs;
    });

    adapter = require('../yml');
  });

  afterEach(() => {
    vol.reset();
  });

  it('should read a filepath and return its content as a value', async () => {
    const data = { foo: 'bar' };
    vol.fromJSON({
      '/test.yml': adapter.serialize(data),
    });

    const result = await adapter.read('/', 'test');
    expect(result).toEqual(data);
  });

  it('should write the given data as yml to the given filepath', async () => {
    const data = { foo: 'bar' };
    await adapter.write('/', 'test', data);
    const result = await adapter.read('/', 'test');
    expect(result).toEqual(data);
  });

  it('should throw if the file its trying to read from does not exist', async () => {
    await expect(
      adapter.read('/', 'test')
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to find extension \`test\` at filepath: /test.yml. Either create the file or update the extension to be computed."`
    );
  });

  it('should throw if the given data is invalid yml', async () => {
    await expect(
      adapter.write('/', 'test', { data: undefined })
    ).rejects.toThrow();
  });
});

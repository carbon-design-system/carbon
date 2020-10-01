/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('memory', () => {
  let adapter;

  beforeEach(() => {
    adapter = require('../memory');
  });

  afterEach(() => {
    adapter.filesystem.clear();
  });

  it('should read a filepath and return its content as a value', async () => {
    const data = { foo: 'bar' };
    adapter.filesystem.set('/test', data);

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
      `"Unable to find extension \`test\` at filepath: /test"`
    );
  });
});

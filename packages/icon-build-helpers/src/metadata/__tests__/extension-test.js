/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const Extension = require('../extension');

describe('Extension', () => {
  let extensions;

  beforeEach(() => {
    const names = ['a', 'b', 'c'];
    extensions = {};

    for (const name of names) {
      extensions[name] = jest.fn(() => ({
        name,
      }));
    }
  });

  it('should load the given extensions', () => {
    const loaded = Extension.load([extensions.a, extensions.b, extensions.c]);
    for (const extension of loaded) {
      expect(extensions[extension.name]).toBeDefined();
    }

    for (const extension of Object.values(extensions)) {
      expect(extension).toHaveBeenCalledTimes(1);
    }
  });

  it('should support loading an extension with options', () => {
    const options = { foo: 'bar' };
    Extension.load([[extensions.a, options], extensions.b]);
    expect(extensions.a).toHaveBeenCalledWith(options);
  });

  it('should load extensions listed under `before` before the extension', () => {
    extensions.c = jest.fn(() => ({
      before: [extensions.a, extensions.b],
      name: 'c',
    }));

    const loaded = Extension.load([extensions.c]);
    for (const extension of Object.values(extensions)) {
      expect(extension).toHaveBeenCalledTimes(1);
    }
    expect(loaded.length).toBe(3);
  });

  it('should not load an extension twice if it has already been loaded', () => {
    extensions.c = jest.fn(() => ({
      before: [extensions.a, extensions.b],
      name: 'c',
    }));

    const loaded = Extension.load([extensions.a, extensions.c]);
    expect(loaded.length).toBe(3);
  });

  it('should throw if an invalid extension is provided', () => {
    expect(() => {
      Extension.load([() => ({})]);
    }).toThrowErrorMatchingInlineSnapshot(
      `"Expected extension to have a name, instead received: \`undefined\`"`
    );
  });
});

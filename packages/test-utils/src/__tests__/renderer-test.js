/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const sass = require('sass');
const { SassRenderer } = require('../renderer');

const { render } = SassRenderer.create(__dirname);

describe('SassRenderer', () => {
  it('should compile sass and return the result', async () => {
    const { result } = await render(`
      body {
        background: black;
      }
    `);

    expect(result.css).toBeDefined();
  });

  it('should retrieve values from sass with get-value', async () => {
    const { getValue } = await render(`
      $_: get-value(1);
    `);
    expect(getValue(0)).toEqual(1);
  });

  it('should convert and retrieve keyed Sass values', async () => {
    const { get, unwrap } = await render(`
      @use 'sass:math';

      $_: get(list, (1, "two", false));
      $_: get(map, (alpha: 1, beta: true));
      $_: get(unitless, 2);
      $_: get(units, 2px);
      $_: get(rate, math.div(1px, 2s));
      $_: get(string, "abc");
      $_: get(color, #0f62fe);
      $_: get(nullish, null);
    `);

    expect(unwrap('list')).toEqual([1, 'two', false]);
    expect(unwrap('map')).toEqual({ alpha: 1, beta: true });
    expect(unwrap('unitless')).toEqual(2);
    expect(unwrap('units')).toEqual('2px');
    expect(unwrap('rate')).toEqual('0.5px/s');
    expect(unwrap('string')).toEqual('abc');
    expect(unwrap('color')).toEqual('#0f62fe');
    expect(unwrap('nullish')).toBeNull();
    expect(get('color').nativeValue).toBeInstanceOf(sass.SassColor);
    expect(() => get('missing')).toThrow(
      'Unabled to find value with key: missing'
    );
    expect(() => unwrap('missing')).toThrow(
      'Unabled to find value with key: missing'
    );
  });

  it('should include discovered `node_modules` folders in Sass load paths', async () => {
    const cwd = path.join(path.sep, 'tmp', 'project', 'src');
    const currentNodeModules = path.join(cwd, 'node_modules');
    const parentNodeModules = path.join(path.dirname(cwd), 'node_modules');
    const compileStringSpy = jest
      .spyOn(sass, 'compileString')
      .mockReturnValue({ css: '' });
    const existsSyncSpy = jest
      .spyOn(fs, 'existsSync')
      .mockImplementation(
        (folder) =>
          folder === currentNodeModules || folder === parentNodeModules
      );

    try {
      const { render } = SassRenderer.create(cwd, '$color: red;');

      await render('body { color: $color; }');

      expect(compileStringSpy).toHaveBeenCalledWith(
        '$color: red;\nbody { color: $color; }',
        expect.objectContaining({
          loadPaths: [cwd, currentNodeModules, parentNodeModules],
          quietDeps: true,
          functions: expect.any(Object),
        })
      );
    } finally {
      compileStringSpy.mockRestore();
      existsSyncSpy.mockRestore();
    }
  });
});

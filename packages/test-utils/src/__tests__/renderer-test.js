/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
});

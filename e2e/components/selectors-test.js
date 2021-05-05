/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const css = require('css');
const fs = require('fs-extra');
const path = require('path');

describe('carbon-components', () => {
  test('selectors', async () => {
    const data = await fs.readFile(
      path.resolve(
        __dirname,
        '../../packages/components/css/carbon-components.css'
      ),
      'utf8'
    );
    const ast = css.parse(data);
    const selectors = ast.stylesheet.rules
      .filter((node) => {
        return node.type === 'rule';
      })
      .flatMap((node) => {
        return node.selectors;
      })
      .sort();
    const unique = new Set(selectors);

    expect(unique).toMatchSnapshot();
  });
});

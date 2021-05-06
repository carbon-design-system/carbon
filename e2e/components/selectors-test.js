/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');
const css = require('css');
const glob = require('fast-glob');
const path = require('path');

const { render } = SassRenderer.create(__dirname);

const componentsDir = path.resolve(__dirname, '../../packages/components');
const components = glob.sync('src/components/**/*.scss', {
  cwd: componentsDir,
  ignore: ['**/_mixins.scss', '**/_tokens.scss'],
});

describe('carbon-components', () => {
  test.each(components)(
    '%s should have consistent selectors',
    async (relativePath) => {
      const filepath = path.join(componentsDir, relativePath);
      const { result } = await render(`
        $css--body: false;
        $css--helpers: false;
        $css--reset: false;
        $css--default-type: false;
        @import '${path.relative(__dirname, filepath)}';
      `);
      const ast = css.parse(result.css.toString());
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
    }
  );
});

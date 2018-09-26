/**
 * @jest-environment node
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const icons = require('@carbon/icons');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { BUILD_CJS_DIR } = require('../src/paths');
const build = require('../src/build');

beforeAll(async () => {
  if (await fs.pathExists(BUILD_CJS_DIR)) {
    const files = await fs.readdir(BUILD_CJS_DIR);
    if (files.length > 0) {
      return;
    }
  }

  await build();
});

xdescribe('CommonJS', () => {
  it('should build an entrypoint that is require-able', async () => {
    const indexJsPath = path.join(BUILD_CJS_DIR, 'index.js');
    expect(await fs.pathExists(indexJsPath)).toBe(true);

    expect(() => {
      require(indexJsPath);
    }).not.toThrow();
  });

  it('should export all built icons with each size variant', async () => {
    const icons = (await fs.readdir(BUILD_CJS_DIR)).filter(
      name => name !== '__tools__' && name !== 'index.js'
    );
    const sizes = [16, 20, 24, 32];

    // Iterate through all of our icons and make sure that an export is defined
    // for each icon and that it can be rendered
    icons.map(icon => {
      const name = path.basename(icon, '.svg');
      const folder = path.join(BUILD_CJS_DIR, name);
      return sizes.map(size => {
        const filename = path.join(folder, `${size}.js`);

        expect(() => {
          require(filename);
        }).not.toThrow();

        const Icon = require(filename);
        expect(() => {
          renderToStaticMarkup(React.createElement(Icon));
        }).not.toThrow();
      });
    });
  });
});

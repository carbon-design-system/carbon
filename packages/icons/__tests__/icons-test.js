/**
 * @jest-environment node
 */

/* eslint-disable import/no-dynamic-require */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const build = require('../src/build');
const { BUILD_CJS_DIR, BUILD_SVG_DIR, SVG_DIR } = require('../src/paths');

beforeAll(async () => {
  if (await fs.pathExists(BUILD_SVG_DIR)) {
    const files = await fs.readdir(BUILD_SVG_DIR);

    if (files.length > 0) {
      return;
    }
  }

  await build();
});

describe('svg', () => {
  let sourceFiles;
  let buildFiles;

  beforeAll(async () => {
    sourceFiles = await fs.readdir(SVG_DIR);
    buildFiles = await fs.readdir(BUILD_SVG_DIR);
  });

  it('should export all files as optimized svg files', () => {
    expect(sourceFiles.length).toEqual(buildFiles.length);
  });
});

describe('CommonJS', () => {
  let icons;

  beforeAll(async () => {
    icons = await fs.readdir(BUILD_SVG_DIR);
  });

  it('should build an entrypoint that is require-able', async () => {
    const indexJsPath = path.join(BUILD_CJS_DIR, 'index.js');
    expect(await fs.pathExists(indexJsPath)).toBe(true);

    expect(() => {
      require(indexJsPath);
    }).not.toThrow();
  });

  it('should export all built icons with each size variant', async () => {
    const indexJs = require(BUILD_CJS_DIR);
    const sizes = [16, 20, 24, 32];

    expect(Object.keys(indexJs).length).toEqual(icons.length * sizes.length);

    // Iterate through all of our icons and make sure that there is a folder
    // defined for each icon, and a file for each size that does not throw when
    // it is required
    await Promise.all(
      icons.map(async icon => {
        const name = path.basename(icon, '.svg');
        const folder = path.join(BUILD_CJS_DIR, name);

        expect(await fs.pathExists(folder)).toBe(true);

        await Promise.all(
          sizes.map(async size => {
            const filename = path.join(folder, `${size}.js`);
            expect(await fs.pathExists(filename)).toBe(true);
            expect(() => {
              require(filename);
            }).not.toThrow();
          })
        );
      })
    );
  });
});

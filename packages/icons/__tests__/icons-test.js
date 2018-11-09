/**
 * @jest-environment node
 */

/* eslint-disable import/no-dynamic-require */

'use strict';

const fs = require('fs-extra');
const klaw = require('klaw-sync');
const path = require('path');
const build = require('../src/build');
const { BUILD_CJS_DIR, BUILD_SVG_DIR, SVG_DIR } = require('../src/paths');

const icons = klaw(SVG_DIR, { nodir: true });

describe('CommonJS', () => {
  it('should build an entrypoint that is require-able', async () => {
    const indexJsPath = path.join(BUILD_CJS_DIR, 'index.js');
    expect(await fs.pathExists(indexJsPath)).toBe(true);
    expect(() => {
      require(indexJsPath);
    }).not.toThrow();
  });

  it('should export all built icons with each size variant', async () => {
    const indexJs = require(BUILD_CJS_DIR);
    expect(Object.keys(indexJs).length).toBe(icons.length);
  });
});

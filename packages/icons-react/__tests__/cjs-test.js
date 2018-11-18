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

describe('CommonJS', () => {
  it(
    'should build an entrypoint that is require-able',
    async () => {
      const indexJsPath = path.join(BUILD_CJS_DIR, 'index.js');
      expect(await fs.pathExists(indexJsPath)).toBe(true);

      expect(() => {
        require(indexJsPath);
      }).not.toThrow();
    },
    60 * 1000
  );
});

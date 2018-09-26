/**
 * @jest-environment node
 */

'use strict';

const fs = require('fs-extra');
const klaw = require('klaw-sync');
const { BUILD_SVG_DIR, SVG_DIR } = require('../src/paths');

const icons = klaw(SVG_DIR, { nodir: true });

describe('svg', () => {
  let sourceFiles;
  let buildFiles;

  beforeAll(async () => {
    buildFiles = await fs.readdir(BUILD_SVG_DIR);
  });

  it('should export all files as optimized svg files', () => {
    expect(icons.length).toEqual(buildFiles.length);
  });
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const klaw = require('klaw-sync');
const path = require('path');

const SVG_DIR = path.resolve(__dirname, '../../packages/icons/src/svg');
const BUILD_SVG_DIR = path.resolve(__dirname, '../../packages/icons/svg');
const icons = klaw(SVG_DIR, { filter, nodir: true });
const buildFiles = klaw(BUILD_SVG_DIR, { filter, nodir: true });

function filter(item) {
  return item[0] === '.';
}

describe('svg', () => {
  it('should export all files as optimized svg files', () => {
    expect(icons.length).toEqual(buildFiles.length);
  });
});

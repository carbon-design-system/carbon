/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');

describe('DTCG Generated SCSS Snapshots', () => {
  const generatedDir = path.join(__dirname, '../scss/generated');

  const files = [
    '_themes.scss',
    '_tokens.scss',
    '_button-tokens.scss',
    '_content-switcher-tokens.scss',
    '_notification-tokens.scss',
    '_status-tokens.scss',
    '_tag-tokens.scss',
  ];

  files.forEach((filename) => {
    test(`${filename} should match snapshot`, () => {
      const filePath = path.join(generatedDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      expect(content).toMatchSnapshot();
    });
  });
});

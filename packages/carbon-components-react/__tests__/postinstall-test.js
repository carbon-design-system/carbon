/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const scriptPath = path.resolve(__dirname, '../scripts/postinstall.js');

describe('carbon-components-react postinstall', () => {
  let result;

  beforeAll(() => {
    result = spawnSync(process.execPath, [scriptPath], {
      env: { ...process.env, FORCE_COLOR: '0' },
      encoding: 'utf-8',
    });
  });

  it('exits with status 0', () => {
    expect(result.status).toBe(0);
  });

  it('writes the deprecated package name to stderr', () => {
    expect(result.stderr).toContain('carbon-components-react');
  });

  it('writes the deprecation URL to stderr', () => {
    expect(result.stderr).toContain(
      'https://carbondesignsystem.com/deprecations/'
    );
  });

  it('does not throw a TypeError', () => {
    const output = result.stdout + result.stderr;
    expect(output).not.toContain('TypeError');
    expect(output).not.toContain('chalk.yellow is not a function');
  });
});

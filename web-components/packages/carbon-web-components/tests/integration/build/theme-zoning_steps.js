/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs-extra');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');
const exec = require('../exec');
const replaceDependencies = require('../replace-dependencies');

const PORT = 1237;

describe('Custom style example with inherited component class', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const src = path.resolve(projectRoot, 'examples/codesandbox/styling/theme-zoning');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await fs.copy(src, `${tmpDir}/theme-zoning`);
    await replaceDependencies([`${tmpDir}/theme-zoning/package.json`]);
    await exec('yarn', ['install'], { cwd: `${tmpDir}/theme-zoning` });
    await setupDevServer({
      command: `cd ${tmpDir}/theme-zoning && node ${path.resolve(__dirname, 'webpack-server.js')} --port=${PORT}`,
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should have footer button with the color of zoned theme', async () => {
    const backgroundColorValue = await page.evaluate(dropdown => {
      const listBox = dropdown.shadowRoot.querySelector('.bx--btn');
      return listBox.ownerDocument.defaultView.getComputedStyle(listBox).getPropertyValue('background-color');
    }, await expect(page).toMatchElement('footer bx-btn'));
    expect(backgroundColorValue).toEqual(expect.stringMatching(/rgb\(\s*111,\s*111,\s*111\s*\)/));
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});

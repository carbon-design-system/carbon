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

const PORT = 1236;

describe('Custom style example with inherited component class', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const src = path.resolve(projectRoot, 'examples/codesandbox/styling/custom-style');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await fs.copy(src, `${tmpDir}/custom-style`);
    await replaceDependencies([`${tmpDir}/custom-style/package.json`]);
    await exec('yarn', ['install'], { cwd: `${tmpDir}/custom-style` });
    await setupDevServer({
      command: `cd ${tmpDir}/custom-style && node ${path.resolve(__dirname, 'webpack-server.js')} --port=${PORT}`,
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should show a title', async () => {
    await expect(page).toMatch('Hello World!');
  });

  it('should have dropdown with custom color', async () => {
    const backgroundColorValue = await page.evaluate(dropdown => {
      const listBox = dropdown.shadowRoot.querySelector('.bx--list-box');
      return listBox.ownerDocument.defaultView.getComputedStyle(listBox).getPropertyValue('background-color');
    }, await expect(page).toMatchElement('my-dropdown'));
    expect(backgroundColorValue).toEqual(expect.stringMatching(/rgb\(\s*255,\s*255,\s*255\s*\)/));
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});

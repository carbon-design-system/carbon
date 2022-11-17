/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs-extra');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');
const exec = require('../exec');
const replaceDependencies = require('../replace-dependencies');

const PORT = 8083;

describe('RTL example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const src = path.resolve(projectRoot, 'examples/codesandbox/rtl');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await fs.copy(src, `${tmpDir}/rtl`);
    await replaceDependencies([`${tmpDir}/rtl/package.json`]);
    await exec('yarn', ['install'], { cwd: `${tmpDir}/rtl` });
    await setupDevServer({
      command: `cd ${tmpDir}/rtl && yarn webpack-dev-server --mode=development --open=false --port=${PORT}`,
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'ar',
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should show a title', async () => {
    await expect(page).toMatch('Hello World!');
  });

  it('should have RTL style applied', async () => {
    const transformValue = await page.evaluate((slider) => {
      const filledTrackContainer = slider.shadowRoot.querySelector('.bx-ce--slider__filled-track-container');
      return filledTrackContainer.ownerDocument.defaultView.getComputedStyle(filledTrackContainer).getPropertyValue('transform');
    }, await expect(page).toMatchElement('bx-slider'));
    expect(transformValue).toEqual(expect.stringMatching(/matrix\( *-1/));
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});

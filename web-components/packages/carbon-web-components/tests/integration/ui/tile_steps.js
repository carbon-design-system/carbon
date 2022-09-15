/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('bx-tile', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-tile--expandable`);
  });

  it('should have the expando interactive', async () => {
    await page.click('bx-expandable-tile button');
    // Playwright's auto-wait-for-transitionend feature does not seems to work here,
    // presubably because animation happens after EOM
    await page.waitForFunction(() => document.querySelector('bx-expandable-tile').offsetHeight > 300, { polling: 'raf' });
    await page.click('bx-expandable-tile button');
    // Playwright's auto-wait-for-transitionend feature does not seems to work here,
    // presubably because animation happens after EOM
    await page.waitForFunction(() => document.querySelector('bx-expandable-tile').offsetHeight < 300, { polling: 'raf' });
  });
});

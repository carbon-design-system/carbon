/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-tile', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-tile--expandable`
    );
  });

  it('should have the expando interactive', async () => {
    await page.click('cds-expandable-tile button');
    // Playwright's auto-wait-for-transitionend feature does not seems to work here,
    // presubably because animation happens after EOM
    await page.waitForFunction(
      () => document.querySelector('cds-expandable-tile').offsetHeight > 300,
      { polling: 'raf' }
    );
    await page.click('cds-expandable-tile button');
    // Playwright's auto-wait-for-transitionend feature does not seems to work here,
    // presubably because animation happens after EOM
    await page.waitForFunction(
      () => document.querySelector('cds-expandable-tile').offsetHeight < 300,
      { polling: 'raf' }
    );
  });
});

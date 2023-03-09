/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-content-switcher', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-content-switcher--default`
    );
  });

  it('should have content switcher interactive', async () => {
    await page.click('cds-content-switcher-item[value="router"] button');
    await expect(page).toHaveSelector(
      'cds-content-switcher-item[value="router"] button[aria-selected="true"]'
    );
  });
});

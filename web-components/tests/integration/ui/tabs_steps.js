/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-tabs', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-tabs--default`
    );
  });

  it('should have tabs interactive', async () => {
    await page.click('cds-tab[value="router"] a');
    await expect(page).toHaveSelector('#panel-all', { state: 'hidden' });
    await expect(page).toHaveSelector('#panel-cloudFoundry', {
      state: 'hidden',
    });
    await expect(page).toHaveSelector('#panel-staging', { state: 'hidden' });
    await expect(page).toHaveSelector('#panel-dea', { state: 'hidden' });
    await expect(page).toHaveSelector('#panel-router', { state: 'visible' });
  });
});

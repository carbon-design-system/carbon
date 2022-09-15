/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('bx-inline-notification', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-notifications--inline`);
  });

  it('should have notification closable', async () => {
    await page.click('bx-inline-notification .bx--inline-notification__close-button');
    await expect(page).toHaveSelector('bx-inline-notification', { state: 'hidden' });
  });
});

describe('bx-toast-notification', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-notifications--toast`);
  });

  it('should have notification closable', async () => {
    await page.click('bx-toast-notification .bx--toast-notification__close-button');
    await expect(page).toHaveSelector('bx-toast-notification', { state: 'hidden' });
  });
});

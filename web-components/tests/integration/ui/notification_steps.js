/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-inline-notification', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-notifications--inline`
    );
  });

  it('should have notification closable', async () => {
    await page.click(
      'cds-inline-notification .cds--inline-notification__close-button'
    );
    await expect(page).toHaveSelector('cds-inline-notification', {
      state: 'hidden',
    });
  });
});

describe('cds-toast-notification', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-notifications--toast`
    );
  });

  it('should have notification closable', async () => {
    await page.click(
      'cds-toast-notification .cds--toast-notification__close-button'
    );
    await expect(page).toHaveSelector('cds-toast-notification', {
      state: 'hidden',
    });
  });
});

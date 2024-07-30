/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-dropdown', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-dropdown--default`
    );
  });

  it('should have dropdown interactive', async () => {
    await page.click('cds-dropdown .cds--list-box__field');
    await expect(page).toHaveSelector('cds-dropdown .cds--list-box__menu', {
      state: 'visible',
    });
    await page.click('cds-dropdown .cds--list-box__field');
    await expect(page).toHaveSelector('cds-dropdown .cds--list-box__menu', {
      state: 'hidden',
    });
  });
});

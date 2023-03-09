/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-multi-select', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-multi-select--default`
    );
  });

  it('should have multi select interactive', async () => {
    await page.click('cds-multi-select .cds--list-box__field');
    await expect(page).toHaveSelector('cds-multi-select .cds--list-box__menu', {
      state: 'visible',
    });
    await page.click('cds-multi-select .cds--list-box__field');
    await expect(page).toHaveSelector('cds-multi-select .cds--list-box__menu', {
      state: 'hidden',
    });
  });
});

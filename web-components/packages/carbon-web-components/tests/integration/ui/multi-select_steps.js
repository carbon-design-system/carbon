/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('bx-multi-select', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-multi-select--default`
    );
  });

  it('should have multi select interactive', async () => {
    await page.click('bx-multi-select .bx--list-box__field');
    await expect(page).toHaveSelector('bx-multi-select .bx--list-box__menu', {
      state: 'visible',
    });
    await page.click('bx-multi-select .bx--list-box__field');
    await expect(page).toHaveSelector('bx-multi-select .bx--list-box__menu', {
      state: 'hidden',
    });
  });
});

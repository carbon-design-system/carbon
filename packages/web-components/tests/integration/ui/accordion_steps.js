/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-accordion', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-accordion--default`
    );
  });

  it('should have accordion interactive', async () => {
    await page.click('cds-accordion-item:nth-of-type(1) button');
    await expect(page).toHaveSelector(
      'cds-accordion-item:nth-of-type(1) #content',
      {
        state: 'visible',
      }
    );
    await page.click('cds-accordion-item:nth-of-type(1) button');
    await expect(page).toHaveSelector(
      'cds-accordion-item:nth-of-type(1) #content',
      {
        state: 'hidden',
      }
    );
  });
});

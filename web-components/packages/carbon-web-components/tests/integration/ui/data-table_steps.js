/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('data-table', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-data-table--expandable`
    );
  });

  it('should have the expando interactive', async () => {
    await page.click('bx-table-expand-row:nth-of-type(1) button');
    await expect(page).toHaveSelector(
      'bx-table-expanded-row:nth-of-type(1) .bx--child-row-inner-container',
      {
        state: 'visible',
      }
    );
    await page.click('bx-table-expand-row:nth-of-type(1) button');
    await expect(page).toHaveSelector(
      'bx-table-expanded-row:nth-of-type(1) .bx--child-row-inner-container',
      { state: 'hidden' }
    );
  });
});

/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('cds-code-snippet', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-code-snippet--multi-line`
    );
  });

  it('should have the expando interactive', async () => {
    await page.click('cds-code-snippet button.cds--snippet-btn--expand');
    await expect(page).toHaveSelector(
      'cds-code-snippet .cds-ce--snippet-container--expanded'
    );
    await page.click('cds-code-snippet button.cds--snippet-btn--expand');
    await expect(page).toHaveSelector(
      'cds-code-snippet :not(.cds-ce--snippet-container--expanded)'
    );
  });
});

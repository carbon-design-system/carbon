/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('bx-code-snippet', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-code-snippet--multi-line`);
  });

  it('should have the expando interactive', async () => {
    await page.click('bx-code-snippet button.bx--snippet-btn--expand');
    await expect(page).toHaveSelector('bx-code-snippet .bx-ce--snippet-container--expanded');
    await page.click('bx-code-snippet button.bx--snippet-btn--expand');
    await expect(page).toHaveSelector('bx-code-snippet :not(.bx-ce--snippet-container--expanded)');
  });
});

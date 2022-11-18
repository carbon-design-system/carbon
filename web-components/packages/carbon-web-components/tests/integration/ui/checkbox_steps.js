/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

describe('bx-checkbox', () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:${process.env.PORT}/iframe.html?id=components-checkbox--default`
    );
  });

  it('should have checkbox interactive', async () => {
    await page.click('bx-checkbox label');
    const backgroundColorValue = await page.evaluate(
      (label) =>
        label.ownerDocument.defaultView
          .getComputedStyle(label, '::before')
          .getPropertyValue('background-color'),
      await page.$('bx-checkbox label')
    );
    expect(backgroundColorValue).toEqual(
      expect.stringMatching(/rgb\(\s*22,\s*22,\s*22\s*\)/)
    );
  });
});

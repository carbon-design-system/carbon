/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt FormGroup', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FormGroup',
      id: 'components-formgroup--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FormGroup @avt-default-state');
  });

  for (const size of ['xs', 'sm', 'md', 'lg', 'xl', '2xl']) {
    test(`keeps ${size} button dimensions inside native disclosures`, async ({
      page,
    }) => {
      await visitStory(page, {
        component: 'FormGroup',
        id: 'components-formgroup--default',
      });
      const button = page.getByRole('button', { name: 'Submit', exact: true });
      await button.evaluate((element, size) => {
        element.classList.add(`cds--layout--size-${size}`);
      }, size);
      const before = await button.boundingBox();
      expect(before).not.toBeNull();

      await button.evaluate((element) => {
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = 'Submit options';
        details.open = true;
        element.replaceWith(details);
        details.append(summary, element);
      });

      await expect(button).toHaveCSS('box-sizing', 'border-box');
      const after = await button.boundingBox();
      expect(after.width).toBeCloseTo(before.width, 1);
      expect(after.height).toBeCloseTo(before.height, 1);
      await page.getByText('Submit options').click();
      await expect(button).toBeHidden();
      await page.getByText('Submit options').click();
      await expect(button).toBeVisible();
      expect((await button.boundingBox()).height).toBeCloseTo(before.height, 1);
    });
  }
});

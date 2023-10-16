/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('DefinitionTooltip @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'DefinitionTooltip',
      id: 'components-definitiontooltip--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'DefinitionTooltip @avt-default-state'
    );
  });

  test('@avt-keyboard-state default', async ({ page }) => {
    await visitStory(page, {
      component: 'DefinitionTooltip',
      id: 'components-definitiontooltip--default',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: true,
      },
    });
    const primaryButton = page.getByRole('button', { name: 'URL' });

    // Testing DefinitionTooltip
    await page.keyboard.press('Tab');
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveAttribute('aria-expanded', 'false');
    await primaryButton.click();
    await expect(primaryButton).toHaveAttribute('aria-expanded', 'true');
  });
});

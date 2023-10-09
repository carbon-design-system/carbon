/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { test, expect } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('ComboButton @avt', () => {
  const globals = {
    theme: 'white',
  };

  test('@avt-default-state ComboButton', async ({ page }) => {
    await testComboButton(page, 'components-combobutton--default', 'ComboButton', globals);
  });

  test('@avt-advanced-states ComboButton With Danger', async ({ page }) => {
    await testComboButton(page, 'components-combobutton--with-danger', 'ComboButton-with-danger', globals);
  });

  test('@avt-keyboard-nav ComboButton', async ({ page }) => {
    await testKeyboardNavigation(page, 'components-combobutton--default', globals);
  });

  test('@avt-keyboard-nav ComboButton with danger', async ({ page }) => {
    await testKeyboardNavigation(page, 'components-combobutton--with-danger', globals);
  });

  async function testComboButton(page, componentId, componentName, globals) {
    await visitStory(page, {
      component: 'ComboButton',
      id: componentId,
      globals,
    });
    await expect(page).toHaveNoACViolations(componentName);
  }

  async function testKeyboardNavigation(page, componentId, globals) {
    await visitStory(page, {
      component: 'ComboButton',
      id: componentId,
      globals,
    });

    const primaryButton = await page.locator('button', { name: 'Primary action' });
    const iconButton = page.locator('button.cds--btn--icon-only');
    const menuItems = page.locator('role=menuitem');

    // Testing buttons
    await expect(primaryButton).toBeVisible();
    await primaryButton.focus();
    await primaryButton.press('Enter');
    await expect(iconButton).toBeFocused();

    // Checking menu interaction
    await iconButton.press('Enter');
    await expect(menuItems.first()).toBeFocused();
    await menuItems.nth(1).press('ArrowDown');
    await menuItems.nth(3).expect.toHaveClass('cds--menu-item--danger');
    await menuItems.nth(3).press('Enter');
    await expect(menuItems.first()).not.toBeVisible();
  }
});

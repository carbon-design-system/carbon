/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt NumberInput', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'NumberInput',
      id: 'components-numberinput--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-numberinput--default');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'NumberInput',
      id: 'components-numberinput--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('components-numberinput--skeleton');
  });

  test('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'NumberInput',
      id: 'components-numberinput--default',
      globals: {
        theme: 'white',
      },
    });

    const input = page.getByRole('spinbutton');
    const increment = page.getByRole('button', {
      name: 'Increment number',
    });

    const decrement = page.getByRole('button', {
      name: 'Decrement number',
    });

    await expect(input).toBeVisible();
    await expect(input).toHaveValue('50');

    // Tab to the NumberInput and receive focus
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Increase value with ArrowUp
    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('51');

    // Decrease value with ArrowDown
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveValue('50');

    // Increase value with increment button
    await increment.click();
    await expect(input).toHaveValue('51');

    // Decrease value with decrement button
    await decrement.click();
    await expect(input).toHaveValue('50');
    await expect(input).not.toBeFocused();

    // Allow setting value over `max`, but should cause input to be invalid
    await input.fill('101');
    await expect(input).toHaveValue('101');
    await expect(input).toHaveAttribute('data-invalid', 'true');

    // Allow setting value under `min`, but should cause input to be invalid
    await input.fill('-1');
    await expect(input).toHaveValue('-1');
    await expect(input).toHaveAttribute('data-invalid', 'true');
  });
});

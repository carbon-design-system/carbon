/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('FluidNumberInput @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidNumberInput',
      id: 'experimental-unstable-fluidnumberinput--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'FluidNumberInput @avt-default-state'
    );
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidNumberInput',
      id: 'experimental-unstable-fluidnumberinput--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidNumberInput-skeleton');
  });

  test('@avt-keyboard-nav NumberInput', async ({ page }) => {
    await visitStory(page, {
      component: 'NumberInput',
      id: 'experimental-unstable-fluidnumberinput--default',
      globals: {
        theme: 'white',
      },
    });

    const input = page.getByRole('spinbutton').first();
    const increment = page
      .getByRole('button', {
        name: 'Increment number',
      })
      .first();

    const decrement = page
      .getByRole('button', {
        name: 'Decrement number',
      })
      .first();

    await expect(input).toBeVisible();
    await expect(input).toHaveValue('50');

    // Focus on label additional information
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Show information' }).first()
    ).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Additional field information here.').first()
    ).toBeVisible();

    // Tab to the NumberInput and receive focus
    await page.keyboard.press('Tab');
    await expect(input).toBeFocused();

    // Increase value with ArrowUp
    await page.keyboard.press('ArrowUp');
    await expect(input).toHaveValue('60');

    // Decrease value with ArrowDown
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveValue('50');

    // Increase value with increment button
    await increment.click();
    await expect(input).toHaveValue('60');

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

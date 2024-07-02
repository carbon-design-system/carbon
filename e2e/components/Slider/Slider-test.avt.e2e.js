/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt Slider', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slider');
  });

  test('@avt-advanced-states controlled slider', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--controlled-slider',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slider-controlled');
  });

  test('@avt-advanced-states controlled slider with layer', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--controlled-slider-with-layer',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'Slider-controlled-slider-with-layer'
    );
  });

  test('@avt-advanced-states two handle slider', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--two-handle-slider',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slider-two-handle-slider');
  });

  test('@avt-advanced-states skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slider-skeleton');
  });

  test('@avt-advanced-states two handle skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--two-handle-skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slider-two-handle-skeleton');
  });

  test('@avt-advanced-states slider with layer', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--with-layer',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Slider-with-layer');
  });

  test('@avt-advanced-states slider with custom format', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--slider-with-custom-value-label',
      globals: {
        theme: 'white',
      },
    });

    await expect(page).toHaveNoACViolations('Slider-with-custom-value-label');
  });

  test.slow('@avt-keyboard-nav slider with custom format', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--slider-with-custom-value-label',
      globals: {
        theme: 'white',
      },
    });

    // Test for label changes
    // Initial value
    await page.keyboard.press('Tab');
    await expect(page.getByRole('slider')).toBeVisible();
    await page.keyboard.press('Tab');

    await expect(page.getByRole('slider')).toHaveAttribute(
      'aria-valuetext',
      'Medium'
    );
    // Move to high
    await page.keyboard.press('Shift+ArrowRight');
    await expect(page.getByRole('slider')).toHaveAttribute(
      'aria-valuetext',
      'High'
    );

    // Move to Low
    await page.keyboard.press('Shift+ArrowLeft');
    await page.keyboard.press('Shift+ArrowLeft');
    await expect(page.getByRole('slider')).toHaveAttribute(
      'aria-valuetext',
      'Low'
    );
  });

  // Prevent timeout
  test.slow('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-slider--default',
      globals: {
        theme: 'white',
      },
    });

    // Focus on the slider via keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('slider')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('slider')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('spinbutton')).toBeFocused();

    await page.keyboard.insertText('20');
    await expect(page.getByRole('spinbutton')).toHaveValue('20');
  });
});

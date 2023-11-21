/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Tabs @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs');
  });

  test('@avt-advanced-states tabs contained', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--contained',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs-contained');
  });

  test('@avt-advanced-states tabs contained with icons', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--contained-with-icons',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs-contained-with-icons');
  });

  test('@avt-advanced-states tabs contained with secondary labels', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-tabs--contained-with-secondary-labels',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'Tabs-contained-with-secondary-labels'
    );
  });

  test('@avt-advanced-states tabs dismissable with icons', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--dismissable-with-icons',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs--dismissable-with-icons');
  });

  test('@avt-advanced-states tabs icon 20 only', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--icon-20-only',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs--icon-20-only');
  });

  test('@avt-advanced-states tabs manual', async ({ page }) => {
    await visitStory(page, {
      component: 'Slider',
      id: 'components-tabs--manual',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs--manual');
  });

  test('@avt-advanced-states tabs skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tabs-skeleton');
  });

  test.slow('@avt-keyboard-nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--default',
      globals: {
        theme: 'white',
      },
    });

    // Focus on the first tab via keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('tab', { name: 'Tab label 1' })).toBeVisible();

    // Focus should be on content within the first Tab
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('tabpanel', { name: 'Tab Panel 1' })
    ).toBeFocused();

    // Moving back one tab stop we should back on Tab label 1
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('tab', { name: 'Tab label 1' })).toBeFocused();

    // Nav through the default tab panel via keyboard navigation
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Tab label 2' })).toBeVisible();

    // Move through the actions in the second tab
    await page.keyboard.press('Tab');
    await expect(page.getByRole('checkbox')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('textbox')).toBeVisible();

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('tab', { name: 'Tab label 2' })).toBeFocused();

    // Continue to nav through the default tab panel via keyboard navigation
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Tab label 4' })).toBeFocused();
  });

  test.slow('@avt-keyboard-nav - dismissable state', async ({ page }) => {
    await visitStory(page, {
      component: 'Tabs',
      id: 'components-tabs--dismissable',
      globals: {
        theme: 'white',
      },
    });
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button')).toBeVisible();

    // Focus on the first tab via keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('tab', { name: 'Tab label 1' })).toBeVisible();

    // Arrow right to Tab 2
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Tab label 2' })).toBeFocused();

    // Arrow right to Tab 4
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Tab label 4' })).toBeFocused();

    // Pressing delete should delete the dismissable tab
    await page.keyboard.press('Delete');
    await expect(
      page.getByRole('tab', { name: 'Tab label 4' })
    ).not.toBeVisible();
  });
});

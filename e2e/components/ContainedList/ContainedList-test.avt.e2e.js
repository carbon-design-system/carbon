/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('ContainedList @avt', () => {
  test('@avt-default-state ContainedList', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContainedList');
  });

  test('@avt-advanced-states ContainedList Usage examples', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--usage-examples',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContainedList-usage-examples');
  });

  test('@avt-advanced-states ContainedList Disclosed', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--disclosed',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContainedList-disclosed');
  });

  test('@avt-advanced-states ContainedList With actions', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-actions',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContainedList-with-actions');
  });

  test.slow(
    '@avt-advanced-states ContainedList With expandable search',
    async ({ page }) => {
      await visitStory(page, {
        component: 'ContainedList',
        id: 'components-containedlist--with-expandable-search',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'ContainedList-with-expandable-search'
      );
    }
  );

  test('@avt-advanced-states ContainedList With icons', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-icons',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContainedList-with-icons');
  });

  test('@avt-advanced-states ContainedList With interactive items', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-interactive-items',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'ContainedList-with-interactive-items'
    );
  });

  test('@avt-advanced-states ContainedList With interactive items and actions', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-interactive-items-and-actions',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'ContainedList-with-interactive-items-and-actions'
    );
  });

  test('@avt-advanced-states ContainedList With Layer', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-layer',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ContainedList-with-layer');
  });

  test('@avt-advanced-states ContainedList With list title decorators', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-list-title-decorators',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'ContainedList-with-list-title-decorators'
    );
  });

  test('@avt-advanced-states ContainedList With persistent search', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-persistent-search',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations(
      'ContainedList-with-persistent-search'
    );
  });

  test('@avt-keyboard-nav ContainedList Usage examples', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--usage-examples',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('List title').first()).toBeVisible();
    await page.keyboard.press('Tab');

    // Checking Add button
    await expect(
      page.locator('button.cds--btn--primary').first()
    ).toBeFocused();
    await page.keyboard.press('Tab');

    // Interacting with options menu
    await expect(
      page.locator('button.cds--overflow-menu').first()
    ).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(
      page.getByRole('menuitem', { name: 'View details' })
    ).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.getByText('Remove')).not.toBeVisible();
  });

  test('@avt-keyboard-nav ContainedList With actions', async ({ page }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-actions',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('List title').first()).toBeVisible();
    await page.keyboard.press('Tab');

    // Testing the first element focus and popover
    await expect(
      page.locator('button.cds--btn--icon-only').first()
    ).toBeFocused();
    await expect(page.getByText('Dismiss').first()).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page.getByText('Dismiss').first()).not.toBeVisible();

    //navigating to the last element
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(
      page.locator('button.cds--btn--icon-only').last()
    ).toBeFocused();
  });

  test('@avt-keyboard-nav ContainedList With expandable search', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-expandable-search',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('List title').first()).toBeVisible();
    await page.keyboard.press('Tab');

    // Testing search input
    await expect(page.locator('.cds--search-magnifier')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('search')).toHaveClass(/cds--search--expanded/);
    page.getByRole('searchbox').fill('List item 3');
    await expect(page.getByText('List item 3')).toBeVisible();
    await expect(page.getByText('List item 1')).not.toBeVisible();

    // Close search
    await page.keyboard.press('Escape');
    await expect(page.getByText('List item 1')).toBeVisible();
  });

  test('@avt-keyboard-nav ContainedList With interactive items', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-interactive-items',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('List title').first()).toBeVisible();
    await page.keyboard.press('Tab');

    // Testing tab navigation
    await expect(
      page.locator('button.cds--contained-list-item__content').first()
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(
      page.locator('button.cds--contained-list-item__content').last()
    ).toBeFocused();
  });

  test('@avt-keyboard-nav ContainedList With interactive items and actions', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-interactive-items-and-action',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('List title').first()).toBeVisible();
    await page.keyboard.press('Tab');

    // Testing tab navigation with interactive item dismiss
    await expect(
      page.locator('button.cds--contained-list-item__content').first()
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.locator('button.cds--btn--icon-only').first()
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(
      page.locator('button.cds--contained-list-item__content').last()
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.locator('button.cds--btn--icon-only').last()
    ).toBeFocused();
  });

  test('@avt-keyboard-nav ContainedList With persistent search', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'ContainedList',
      id: 'components-containedlist--with-persistent-search',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByText('List title').first()).toBeVisible();
    await page.keyboard.press('Tab');

    // Testing search input
    await expect(page.getByRole('searchbox')).toBeFocused();
    page.getByRole('searchbox').fill('List item 3');
    await expect(page.getByText('List item 3')).toBeVisible();
    await expect(page.getByText('List item 1')).not.toBeVisible();

    // Close search
    await page.keyboard.press('Escape');
    await expect(page.getByText('List item 1')).toBeVisible();
  });
});

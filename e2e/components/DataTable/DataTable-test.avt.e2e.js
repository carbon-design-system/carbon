/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt DataTable', () => {
  test.describe('@avt basic', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-basic--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-basic--default'
      );
    });
    test('@avt-advanced-states xl with two lines', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-basic--xl-with-two-lines',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-basic--xl-with-two-lines'
      );
    });
  });

  test.describe('@avt batch actions', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-batch-actions--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-batch-actions--default'
      );
    });
  });

  test.describe('@avt dynamic', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-dynamic--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-dynamic--default-avt'
      );
    });

    test('@avt-keyboard-nav', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-dynamic--default',
        globals: {
          theme: 'white',
        },
      });

      await expect(page).toHaveNoACViolations(
        'components-datatable-dynamic--default-keyboard-nav'
      );

      // Start off by manually focusing the search input
      await page.getByRole('searchbox').focus();
      await expect(page.getByRole('searchbox')).toBeFocused();

      // Navigate to the gear/settings button
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('button', { name: 'Settings' })
      ).toBeFocused();

      // Navigate to the select all checkbox
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('checkbox', { name: 'Select all rows' })
      ).toBeFocused();

      // Pressing enter on the select all checkbox shouldn't do anything
      await page.keyboard.press('Enter');
      await expect(
        page.getByRole('checkbox', { name: 'Select all rows' })
      ).not.toBeChecked();

      // Pressing space should check the select all checkbox
      await page.keyboard.press('Space');
      await expect(
        page.getByRole('checkbox', { name: 'Select all rows' })
      ).toBeChecked();

      // Every checkbox should be checked
      for (const checkbox of await page.getByRole('checkbox').all()) {
        await expect(checkbox).toBeChecked();
      }

      // Pressing space should uncheck the select all checkbox
      await page.keyboard.press('Space');
      await expect(
        page.getByRole('checkbox', { name: 'Select all rows' })
      ).not.toBeChecked();
      // Every checkbox should no longer be checked
      for (const checkbox of await page.getByRole('checkbox').all()) {
        await expect(checkbox).not.toBeChecked();
      }

      // Navigate to the first expansion button
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('button', { name: 'Expand current row' }).first()
      ).toBeFocused();
      // Expand the first row
      await page.keyboard.press('Space');
      await expect(
        page.getByRole('heading', { name: 'Expandable row content' }).first()
      ).toBeVisible();

      // Navigate to the first row selection checkbox and check it
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(page.getByText('1 item selected')).toBeVisible();

      // Navigate backwards up into the batch action bar
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');

      await page
        .getByRole('heading', { name: 'Expandable row content' })
        .first()
        .hover();
      await expect(page).toHaveNoACViolations(
        'components-datatable-dynamic--default---with-batch-actions-open-and-row-expanded'
      );
      await expect(page.getByRole('button', { name: 'Delete' })).toBeFocused();

      // Navigate forwards through the batch action buttons
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Save' })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(
        page.getByRole('button', { name: 'Download' })
      ).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeFocused();
      // Invoke the cancel button
      await page.keyboard.press('Space');
      await expect(page.getByText('1 item selected')).not.toBeVisible();
      // Every checkbox should no longer be checked
      for (const checkbox of await page.getByRole('checkbox').all()) {
        await expect(checkbox).not.toBeChecked();
      }
    });
  });

  test.describe('@avt expansion', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-expansion--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-expansion--default'
      );
    });
    test('@avt-advanced-states batch expansion', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-expansion--batch-expansion',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-expansion--batch-expansion'
      );
    });
  });

  test.describe('@avt filtering', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-filtering--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-filtering--default'
      );
    });
  });

  test.describe('@avt selection', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-selection--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-selection--default'
      );
    });
    test('@avt-advanced-states with-radio-expansion', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-selection--with-radio-expansion',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-selection--with-radio-expansion'
      );
    });
    test('@avt-advanced-states with-selection-and-sorting', async ({
      page,
    }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-selection--with-selection-and-sorting',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-selection--with-selection-and-sorting'
      );
    });
  });

  test.describe('@avt skeleton', () => {
    test('@avt-default-state skeleton', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-skeleton--skeleton',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-skeleton--skeleton'
      );
    });
  });

  test.describe('@avt sorting', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-sorting--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-sorting--default'
      );
    });
  });

  test.describe('@avt toolbar', () => {
    test('@avt-default-state', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-toolbar--default',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-toolbar--default'
      );
    });
    test('@avt-advanced-states persistent-toolbar', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-toolbar--persistent-toolbar',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-toolbar--persistent-toolbar'
      );
    });
    test('@avt-advanced-states small-persistent-toolbar', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-toolbar--small-persistent-toolbar',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-toolbar--small-persistent-toolbar'
      );
    });
    test('@avt-advanced-states with-overflow-menu', async ({ page }) => {
      await visitStory(page, {
        component: 'DataTable',
        id: 'components-datatable-toolbar--with-overflow-menu',
        globals: {
          theme: 'white',
        },
      });
      await expect(page).toHaveNoACViolations(
        'components-datatable-toolbar--with-overflow-menu'
      );
    });
  });
});

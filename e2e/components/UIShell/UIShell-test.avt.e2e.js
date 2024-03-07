/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt UIShell', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell-header--header-w-navigation',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('UIShell');
  });

  test('@avt-advanced-states sidenav rail w/header', async ({ page }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell-sidenav--side-nav-rail-w-header',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('UIShell-side-nav-rail-w-header');
  });

  test('@avt-advanced-states sidenav rail w/header - expanded state open category sidenav', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell-sidenav--side-nav-rail-w-header',
      globals: {
        theme: 'white',
      },
    });

    await expect(
      page.getByRole('button', { name: 'Category title' }).first()
    ).toBeVisible();

    // open a category within the menu
    page
      .getByRole('button', { name: 'Category title' })
      .first()
      // The overlay causes the actionability checks to fail, so use `force` to bypass the checks
      .click({ force: true });
    await expect(page).toHaveNoACViolations(
      'UIShell-side-nav-rail-w-header--expanded--category-expanded'
    );
  });

  test('@avt-advanced-states sidenav rail w/header - expanded state header link', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell-sidenav--side-nav-rail-w-header',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.getByRole('link', { name: 'Link 4' })).toBeVisible();
    // open the header link dropdown
    page
      .getByRole('link', { name: 'Link 4' })
      // The overlay causes the actionability checks to fail, so use `force` to bypass the checks
      .click({ force: true });
    await expect(page).toHaveNoACViolations(
      'UIShell-side-nav-rail-w-header--expanded--header-link'
    );
  });

  test('@avt-keyboard-nav sidenav rail w/header', async ({ page }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell-sidenav--side-nav-rail-w-header',
      globals: {
        theme: 'white',
      },
    });
    await expect(
      page.getByRole('link', { name: 'Skip to main content' })
    ).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: 'Skip to main content' })
    ).toBeFocused();
    // tab through the links in the header, landing on the link with sublinks
    // await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Link 4' })).toBeFocused();
    // open the sublinks menu
    await page.keyboard.press('Space');
    await expect(page.getByRole('link', { name: 'Sub-link 1' })).toBeVisible();
    // tab through the sublinks menu
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Sub-link 3' })).toBeFocused();
    // tab once more and the sublinks menu should close
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: 'Sub-link 1' })
    ).not.toBeVisible();
    // tab through to open the sidenav
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('button', { name: 'Category title' }).first()
    ).toBeFocused();
    // tab through the rest of the sidenav menu
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    // focus should then be within the main content of the page
    await expect(page.getByRole('link', { name: 'Carbon' })).toBeFocused();
  });

  test('@avt-keyboard-nav header w/ navigation actions and siddenav', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'UIShell',
      id: 'components-ui-shell-header--header-w-navigation-actions-and-side-nav',
      globals: {
        theme: 'white',
      },
    });

    await page.getByRole('button', { name: 'Category title' }).first().focus();
    await expect(
      page.getByRole('button', { name: 'Category title' }).first()
    ).toBeFocused();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Link 5' })).toBeFocused();
  });
});

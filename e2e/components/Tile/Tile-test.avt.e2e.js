/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Tile @avt', () => {
  test('Tile default state', async ({ page }) => {
    await visitStory(page, {
      component: 'Tile',
      id: 'components-tile--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Tile');
  });

  test('ClickableTile default state', async ({ page }) => {
    await visitStory(page, {
      component: 'ClickableTile',
      id: 'components-tile--clickable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ClickableTile');
  });

  test('ExpandableTile default state', async ({ page }) => {
    await visitStory(page, {
      component: 'ExpandableTile',
      id: 'components-tile--expandable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('ExpandableTile');
  });

  test('SelectableTile default state', async ({ page }) => {
    await visitStory(page, {
      component: 'SelectableTile',
      id: 'components-tile--selectable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('SelectableTile');
  });

  test('SelectableTile multi-select default state', async ({ page }) => {
    await visitStory(page, {
      component: 'SelectableTile',
      id: 'components-tile--multi-select',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('SelectableTile multi-select');
  });

  test('RadioTile default state', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioTile',
      id: 'components-tile--radio',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('RadioTile');
  });

  test('ClickableTile disabled state', async ({ page }) => {
    await visitStory(page, {
      component: 'Tile',
      id: 'components-tile--clickable',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: 'true',
      },
    });
    await expect(page.locator('a#clickable-tile-1')).toBeDisabled();
    await expect(page).toHaveNoACViolations('ClickableTile-Disabled');
  });

  test('ExpandableTile keyboard expanded state', async ({ page }) => {
    await visitStory(page, {
      component: 'ExpandableTile',
      id: 'components-tile--expandable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.locator('body')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#expandable-tile-1')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#expandable-tile-1')).toHaveClass(
      'cds--tile cds--tile--expandable cds--tile--is-expanded'
    );
  });

  test('SelectableTile keyboard', async ({ page }) => {
    await visitStory(page, {
      component: 'SelectableTile',
      id: 'components-tile--selectable',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.locator('body')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#selectable-tile-1')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#selectable-tile-1')).toHaveClass(
      'cds--tile cds--tile--selectable cds--tile--is-selected'
    );
  });

  test('RadioTile keyboard', async ({ page }) => {
    await visitStory(page, {
      component: 'RadioTile',
      id: 'components-tile--radio',
      globals: {
        theme: 'white',
      },
    });
    await expect(page.locator('body')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#radio-tile-2')).toBeFocused();
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('#radio-tile-1')).toBeChecked();
  });
});

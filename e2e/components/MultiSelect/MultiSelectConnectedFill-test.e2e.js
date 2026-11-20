/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

// The connected fill and focus ring are compiled in only when
// `enable-v12-release` is on, which is a Sass build-time flag. The v11
// Storybook served in CI cannot exercise them, so these tests run against the
// v12 Storybook (`yarn storybook:v12`, port 3012):
//
//   CARBON_V12_STORYBOOK=1 yarn playwright test e2e/components/MultiSelect \
//     --project chromium -c <config whose use.baseURL is http://localhost:3012>
//
// TODO: drop the guard once the v12 Storybook runs in CI.
test.skip(
  !process.env.CARBON_V12_STORYBOOK,
  'Requires the v12 Storybook; see the comment at the top of this file.'
);

const SQUARE = '0px';
const ROUND = '4px';

const stories = {
  MultiSelect: 'components-multiselect-feature-flag--connected-selection',
  FilterableMultiSelect:
    'components-multiselect-feature-flag--filterable-connected-selection',
};

// Item order in the connected stories:
//   0 Option 1 selected   \
//   1 Option 2 selected    } group of three
//   2 Option 3 selected   /
//   3 Option 4
//   4 Option 5 disabled
//   5 Option 6 selected   (isolated)
//   6 Option 7
//   7 Option 8 selected   (isolated)
const FIRST = 0;
const MIDDLE = 1;
const LAST_OF_GROUP = 2;
const UNSELECTED_BELOW_GROUP = 3;
const DISABLED = 4;
const ISOLATED = 5;

/**
 * Returns the corner radii of an item in the order the Sass sets them:
 * [start-start, start-end, end-end, end-start].
 */
async function radii(page, index) {
  return page
    .locator('.cds--list-box__menu-item')
    .nth(index)
    .evaluate((node) => {
      const style = getComputedStyle(node);
      return [
        style.borderStartStartRadius,
        style.borderStartEndRadius,
        style.borderEndEndRadius,
        style.borderEndStartRadius,
      ];
    });
}

async function openMenu(page) {
  const combobox = page.getByRole('combobox').first();
  await expect(combobox).toBeVisible();
  await expect(page.locator('.cds--list-box__menu-item').first()).toBeVisible();
  return combobox;
}

for (const [component, id] of Object.entries(stories)) {
  test.describe(`${component} connected fill`, () => {
    test.beforeEach(async ({ page }) => {
      await visitStory(page, {
        component,
        id,
        globals: { theme: 'white' },
      });
      await openMenu(page);
    });

    test('rounds a lone selected item on all four corners', async ({
      page,
    }) => {
      expect(await radii(page, ISOLATED)).toEqual([ROUND, ROUND, ROUND, ROUND]);
    });

    test('connects a group of selected items with square inner corners and rounded outer corners', async ({
      page,
    }) => {
      expect(await radii(page, FIRST)).toEqual([ROUND, ROUND, SQUARE, SQUARE]);
      expect(await radii(page, MIDDLE)).toEqual([
        SQUARE,
        SQUARE,
        SQUARE,
        SQUARE,
      ]);
      expect(await radii(page, LAST_OF_GROUP)).toEqual([
        SQUARE,
        SQUARE,
        ROUND,
        ROUND,
      ]);
    });

    test('does not connect an unselected item to the group', async ({
      page,
    }) => {
      expect(await radii(page, UNSELECTED_BELOW_GROUP)).toEqual([
        ROUND,
        ROUND,
        ROUND,
        ROUND,
      ]);
    });

    test('does not connect a disabled item', async ({ page }) => {
      await page.locator('.cds--list-box__menu-item').nth(DISABLED).hover();

      expect(await radii(page, DISABLED)).toEqual([ROUND, ROUND, ROUND, ROUND]);
      expect(await radii(page, ISOLATED)).toEqual([ROUND, ROUND, ROUND, ROUND]);
    });

    test('connects a hovered item to an adjacent selected item', async ({
      page,
    }) => {
      await page
        .locator('.cds--list-box__menu-item')
        .nth(UNSELECTED_BELOW_GROUP)
        .hover();

      expect(await radii(page, LAST_OF_GROUP)).toEqual([
        SQUARE,
        SQUARE,
        SQUARE,
        SQUARE,
      ]);
      expect(await radii(page, UNSELECTED_BELOW_GROUP)).toEqual([
        SQUARE,
        SQUARE,
        ROUND,
        ROUND,
      ]);
    });

    test('restores rounded corners when the pointer leaves', async ({
      page,
    }) => {
      await page
        .locator('.cds--list-box__menu-item')
        .nth(UNSELECTED_BELOW_GROUP)
        .hover();
      await page.mouse.move(0, 0);

      expect(await radii(page, LAST_OF_GROUP)).toEqual([
        SQUARE,
        SQUARE,
        ROUND,
        ROUND,
      ]);
      expect(await radii(page, UNSELECTED_BELOW_GROUP)).toEqual([
        ROUND,
        ROUND,
        ROUND,
        ROUND,
      ]);
    });

    test('splits a group when its middle item is deselected', async ({
      page,
    }) => {
      await page.locator('.cds--list-box__menu-item').nth(MIDDLE).click();
      await page.mouse.move(0, 0);

      expect(await radii(page, FIRST)).toEqual([ROUND, ROUND, ROUND, ROUND]);
      expect(await radii(page, MIDDLE)).toEqual([ROUND, ROUND, ROUND, ROUND]);
      expect(await radii(page, LAST_OF_GROUP)).toEqual([
        ROUND,
        ROUND,
        ROUND,
        ROUND,
      ]);
    });

    test('joins an existing group when an adjacent item is selected', async ({
      page,
    }) => {
      await page
        .locator('.cds--list-box__menu-item')
        .nth(UNSELECTED_BELOW_GROUP)
        .click();
      await page.mouse.move(0, 0);

      expect(await radii(page, LAST_OF_GROUP)).toEqual([
        SQUARE,
        SQUARE,
        SQUARE,
        SQUARE,
      ]);
      expect(await radii(page, UNSELECTED_BELOW_GROUP)).toEqual([
        SQUARE,
        SQUARE,
        ROUND,
        ROUND,
      ]);
    });

    test('keeps a 4px focus ring on an item in the middle of a connected group', async ({
      page,
    }) => {
      const combobox = page.getByRole('combobox').first();
      await combobox.focus();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      const item = page.locator('.cds--list-box__menu-item').nth(MIDDLE);
      await expect(item).toHaveClass(/cds--list-box__menu-item--highlighted/);

      // The <li> owns the connected fill, so its corners are square...
      expect(await radii(page, MIDDLE)).toEqual([
        SQUARE,
        SQUARE,
        SQUARE,
        SQUARE,
      ]);

      // ...while the inner option owns a fully rounded focus ring.
      const ring = await item.evaluate((node) => {
        const option = node.querySelector('.cds--list-box__menu-item__option');
        const li = getComputedStyle(node);
        const opt = getComputedStyle(option);
        const liBox = node.getBoundingClientRect();
        const optBox = option.getBoundingClientRect();
        return {
          liOutlineStyle: li.outlineStyle,
          outlineStyle: opt.outlineStyle,
          outlineWidth: opt.outlineWidth,
          radius: opt.borderRadius,
          sameBox:
            liBox.left === optBox.left &&
            liBox.width === optBox.width &&
            liBox.top === optBox.top &&
            liBox.height === optBox.height,
        };
      });

      expect(ring.liOutlineStyle).toBe('none');
      expect(ring.outlineStyle).toBe('solid');
      expect(ring.outlineWidth).toBe('2px');
      expect(ring.radius).toBe(ROUND);
      expect(ring.sameBox).toBe(true);
    });

    test('draws the focus ring on an unselected item without joining the group', async ({
      page,
    }) => {
      const combobox = page.getByRole('combobox').first();
      await combobox.focus();
      for (let i = 0; i <= UNSELECTED_BELOW_GROUP; i++) {
        await page.keyboard.press('ArrowDown');
      }

      const item = page
        .locator('.cds--list-box__menu-item')
        .nth(UNSELECTED_BELOW_GROUP);
      await expect(item).toHaveClass(/cds--list-box__menu-item--highlighted/);
      expect(await radii(page, UNSELECTED_BELOW_GROUP)).toEqual([
        ROUND,
        ROUND,
        ROUND,
        ROUND,
      ]);
      await expect(item.locator('.cds--list-box__menu-item__option')).toHaveCSS(
        'outline-style',
        'solid'
      );
    });

    test('does not shift the label when the item is focused', async ({
      page,
    }) => {
      const label = page
        .locator('.cds--list-box__menu-item')
        .nth(MIDDLE)
        .locator('.cds--checkbox-label');
      const before = await label.boundingBox();

      const combobox = page.getByRole('combobox').first();
      await combobox.focus();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      expect(await label.boundingBox()).toEqual(before);
    });
  });
}

test.describe('MultiSelect focus ring in other layouts', () => {
  async function focusSecondItem(page) {
    const combobox = page.getByRole('combobox').first();
    await combobox.focus();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    return page.locator('.cds--list-box__menu-item--highlighted');
  }

  async function ringMetrics(item) {
    return item.evaluate((node) => {
      const option = node.querySelector('.cds--list-box__menu-item__option');
      const label = node.querySelector('.cds--checkbox-label');
      const liBox = node.getBoundingClientRect();
      const optBox = option.getBoundingClientRect();
      return {
        liHeight: liBox.height,
        ringHeight: optBox.height,
        ringWidth: optBox.width,
        liWidth: liBox.width,
        labelOffset: label.getBoundingClientRect().left - liBox.left,
      };
    });
  }

  test('FluidMultiSelect ring spans the full 64px row', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidMultiSelect',
      id: 'components-fluid-components-fluidmultiselect--default',
      globals: { theme: 'white' },
    });
    await openMenu(page);

    const metrics = await ringMetrics(await focusSecondItem(page));

    expect(metrics.liHeight).toBe(64);
    expect(metrics.ringHeight).toBe(metrics.liHeight);
    expect(metrics.ringWidth).toBe(metrics.liWidth);
    expect(metrics.labelOffset).toBe(16);
  });

  test('inline MultiSelect keeps the 8px label inset', async ({ page }) => {
    await visitStory(page, {
      component: 'MultiSelect',
      id: 'components-multiselect--default',
      args: { type: 'inline' },
      globals: { theme: 'white' },
    });
    await openMenu(page);

    const metrics = await ringMetrics(await focusSecondItem(page));

    expect(metrics.ringWidth).toBe(metrics.liWidth);
    expect(metrics.labelOffset).toBe(8);
  });

  test('inline FilterableMultiSelect keeps the 16px label inset', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'FilterableMultiSelect',
      id: 'components-multiselect--filterable',
      args: { type: 'inline' },
      globals: { theme: 'white' },
    });
    await openMenu(page);

    const metrics = await ringMetrics(await focusSecondItem(page));

    expect(metrics.ringWidth).toBe(metrics.liWidth);
    expect(metrics.labelOffset).toBe(16);
  });

  test.describe('forced colors', () => {
    test.use({ forcedColors: 'active' });

    test('keeps a visible focus indicator on the option', async ({ page }) => {
      await visitStory(page, {
        component: 'MultiSelect',
        id: 'components-multiselect-feature-flag--connected-selection',
        globals: { theme: 'white' },
      });
      await openMenu(page);

      const item = await focusSecondItem(page);
      const option = item.locator('.cds--list-box__menu-item__option');

      await expect(option).toHaveCSS('outline-style', 'solid');
      await expect(option).not.toHaveCSS('outline-width', '0px');
    });
  });
});

test.describe('Dropdown and ComboBox are unaffected', () => {
  for (const [component, id] of [
    ['Dropdown', 'components-dropdown--default'],
    ['ComboBox', 'components-combobox--default'],
  ]) {
    test(`${component} keeps the focus ring on the <li>`, async ({ page }) => {
      await visitStory(page, { component, id, globals: { theme: 'white' } });

      const combobox = page.getByRole('combobox').first();
      await combobox.focus();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      const item = page.locator('.cds--list-box__menu-item--highlighted');
      await expect(item).toHaveCSS('outline-style', 'solid');
      await expect(item.locator('.cds--list-box__menu-item__option')).toHaveCSS(
        'outline-color',
        'rgba(0, 0, 0, 0)'
      );
    });
  }
});

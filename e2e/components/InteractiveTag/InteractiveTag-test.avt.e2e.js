/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { devices, expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

const selectableTagStory = {
  component: 'Tag',
  id: 'components-tag--selectable',
  globals: {
    theme: 'white',
  },
};

const selectableTagName = /Tag content with a long text description/;

async function getBackgroundColor(locator) {
  return await locator.evaluate((element) => {
    return getComputedStyle(element).backgroundColor;
  });
}

async function hover(locator, page) {
  const box = await locator.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
}

test.describe('@avt InteractiveTag', () => {
  test('@avt-advanced-states DismissibleTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--dismissible',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('DismissibleTag');
  });

  // Testing being skipped because it is failing in the ToggleTip that operational it's using
  test('@avt-advanced-states OperationalTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--operational',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('OperationalTag');
  });

  test('@avt-advanced-states SelectableTag', async ({ page }) => {
    await visitStory(page, selectableTagStory);
    await expect(page).toHaveNoACViolations('SelectableTag');
  });

  test('@avt-advanced-states SelectableTag hover styles are only applied on devices that support hover', async ({
    browser,
    page,
  }, testInfo) => {
    await visitStory(page, selectableTagStory);
    await expect(
      page.getByRole('button', { name: selectableTagName }).first()
    ).toBeVisible();
    expect(
      await page.evaluate(() => matchMedia('(any-hover: hover)').matches)
    ).toBe(true);

    const tag = page.getByRole('button', { name: selectableTagName }).first();
    const backgroundColor = await getBackgroundColor(tag);

    await hover(tag, page);
    await expect
      .poll(async () => await getBackgroundColor(tag))
      .not.toBe(backgroundColor);

    const touchContext = await browser.newContext({
      ...devices['iPhone 13'],
      baseURL: testInfo.project.use.baseURL,
    });
    const touchPage = await touchContext.newPage();

    try {
      await visitStory(touchPage, selectableTagStory);
      await expect(
        touchPage.getByRole('button', { name: selectableTagName }).first()
      ).toBeVisible();
      expect(
        await touchPage.evaluate(() => matchMedia('(any-hover: hover)').matches)
      ).toBe(false);

      const touchTag = touchPage
        .getByRole('button', { name: selectableTagName })
        .first();
      const touchBackgroundColor = await getBackgroundColor(touchTag);

      await hover(touchTag, touchPage);
      await expect
        .poll(async () => await getBackgroundColor(touchTag))
        .toBe(touchBackgroundColor);
    } finally {
      await touchContext.close();
    }
  });

  test('@avt-keyboard-nav DismissibleTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--dismissible',
      globals: {
        theme: 'white',
      },
    });
    await expect(
      page.getByText('Tag content with a long text description').first()
    ).toBeVisible();

    const tooltip = page.getByRole('tooltip');
    const button = page.getByRole('button').nth(1);
    await expect(button).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(tooltip).toHaveAttribute('aria-hidden', 'false');

    // Test dismissible functionality
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Tag content with a long text description')
    ).not.toBeVisible();

    // Reset button click
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    await expect(
      page.getByText('Tag content with a long text description').first()
    ).toBeVisible();
  });

  test('@avt-keyboard-nav OperationalTag', async ({ page }) => {
    await visitStory(page, {
      component: 'Tag',
      id: 'components-tag--operational',
      globals: {
        theme: 'white',
      },
    });
    const button = page.getByRole('button').first();
    await expect(button).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    await expect(page.getByRole('tooltip')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
    await expect(button).toHaveClass(/cds--tag--red/);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Expecte the OperationalTag with tooltip be focusable and visible
    await expect(page.getByRole('button').nth(10)).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByText('Tag 1 name').first()).toBeVisible();
  });

  test('@avt-keyboard-nav SelectableTag', async ({ page }) => {
    await visitStory(page, selectableTagStory);
    const tag = page.getByRole('button').first();
    await expect(tag).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(tag).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('tooltip')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
    await expect(tag).toHaveClass(/cds--tag--selectable-selected/);
    await page.keyboard.press('Tab');
  });
});

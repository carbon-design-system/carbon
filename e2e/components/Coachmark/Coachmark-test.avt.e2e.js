/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test, expect } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

const prefix = 'cds';
const blockClass = `${prefix}--coachmark`;

// TODO: Remove test.skip and change to test() when the v12 Storybook is
// running in CI. Stories are currently excluded from the v11 Storybook via
// productMigratedStoryGlobs in product-migrated-components.mjs.

test.describe('@avt Coachmark', () => {
  test.skip('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Coachmark',
      id: 'components-coachmark--tooltip',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Coachmark @avt-default-state');
  });

  test.skip('@avt-initially-focus-close-button', async ({ page }) => {
    await visitStory(page, {
      component: 'Coachmark',
      id: 'components-coachmark--tooltip',
      globals: {
        theme: 'white',
      },
    });
    const closeButton = page.getByRole('button', { name: 'Close' });
    await expect(closeButton).toBeFocused();
  });

  test.skip('@avt-dragging-happening-on-header', async ({ page }) => {
    await visitStory(page, {
      component: 'Coachmark',
      id: 'components-coachmark--floating',
      globals: {
        theme: 'white',
      },
    });

    const dragButton = page.getByRole('button', { name: 'Drag' });
    await expect(dragButton).toBeInViewport();
    await expect(dragButton).toBeFocused();

    const container = page.locator(`.${blockClass}--coachmark-content`);
    await expect(container).toBeVisible();

    const getPos = async () => {
      const draggableContainer = await container.boundingBox();
      if (draggableContainer)
        return { x: draggableContainer.x, y: draggableContainer.y };
    };

    const position = await getPos();

    await page.keyboard.press('Enter');

    await page.keyboard.press('ArrowLeft');
    const afterLeft = await getPos();
    expect(afterLeft.x).toBeLessThan(position.x);

    await page.keyboard.press('ArrowRight');
    const afterRight = await getPos();
    expect(afterRight.x).toBeGreaterThan(afterLeft.x);

    await page.keyboard.press('ArrowUp');
    const afterUp = await getPos();
    expect(afterUp.y).toBeLessThan(afterRight.y);

    await page.keyboard.press('ArrowDown');
    const afterDown = await getPos();
    expect(afterDown.y).toBeGreaterThan(afterUp.y);

    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await expect(container).not.toBeVisible();

    const triggerButton = page.getByRole('button', {
      name: 'Show information',
    });
    await triggerButton.click();

    await expect(container).toBeVisible();
    const newPosition = await getPos();
    expect(position.x).toEqual(newPosition.x);
    expect(position.y).toEqual(newPosition.y);
  });

  test.skip('@avt-click-to-open', async ({ page }) => {
    await visitStory(page, {
      component: 'Coachmark',
      id: 'components-coachmark--tooltip',
      globals: {
        theme: 'white',
      },
    });

    const closeButton = page.getByRole('button', { name: 'Close' });
    await closeButton.click();

    const container = page.locator(`.${blockClass}--coachmark-content`);
    await expect(container).not.toBeVisible();

    const triggerButton = page.getByRole('button', {
      name: 'Show information',
    });
    await triggerButton.click();

    await expect(container).toBeVisible();
  });
});

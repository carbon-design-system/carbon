/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { expect, test } from '@playwright/test';
import { visitStory } from '../../test-utils/storybook';

test.describe('Accordion @avt', () => {
  test('accessibility-checker default', async ({ page }) => {
    await visitStory(page, {
      component: 'Accordion',
      id: 'components-accordion--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('accordion');
  });

  test('accessibility-checker skeleton', async ({ page }) => {
    await visitStory(page, {
      component: 'Accordion',
      id: 'components-accordion--skeleton',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('accordion--skeleton');
  });

  test('accessibility-checker with layer', async ({ page }) => {
    await visitStory(page, {
      component: 'Accordion',
      id: 'components-accordion--with-layer',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('accordion--with-layer');
  });

  test('accessibility-checker keyboard nav', async ({ page }) => {
    await visitStory(page, {
      component: 'Accordion',
      id: 'components-accordion--default',
      globals: {
        theme: 'white',
      },
    });

    const accordin_btn1 = page.getByRole('button', { name: 'Section 1 title' });
    const accordin_btn2 = page.getByRole('button', { name: 'Section 2 title' });

    await expect(accordin_btn1).toBeVisible();
    await page.keyboard.press('Tab');

    // Check the focus on Accordion 1
    await expect(accordin_btn1).toBeFocused();
    await page.keyboard.press('Enter');

    // Open the Accordion 1
    await expect(accordin_btn1).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Enter');
    await expect(accordin_btn1).toHaveAttribute('aria-expanded', 'false');

    await page.keyboard.press('Tab');

    // Check the focus and open state on Accordion 2
    await expect(accordin_btn2).toBeFocused();
    await page.keyboard.press('Space');
    await expect(accordin_btn2).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(accordin_btn2).toHaveAttribute('aria-expanded', 'false');
  });

  test('accessibility-checker mouse click', async ({ page }) => {
    await visitStory(page, {
      component: 'Accordion',
      id: 'components-accordion--default',
      globals: {
        theme: 'white',
      },
    });
    const accordin_btn1 = page.getByRole('button', { name: 'Section 1 title' });
    await accordin_btn1.click();
    await expect(accordin_btn1).toHaveAttribute('aria-expanded', 'true');

    // Checking for ACViolation
    await expect(page).toHaveNoACViolations('accordion-mouse-click');
    await accordin_btn1.click();
    await expect(accordin_btn1).toHaveAttribute('aria-expanded', 'false');
  });

  test('accessibility-checker mouse hover', async ({ page }) => {
    await visitStory(page, {
      component: 'Accordion',
      id: 'components-accordion--default',
      globals: {
        theme: 'white',
      },
    });
    const accordin_btn1 = page.getByRole('button', { name: 'Section 1 title' });
    await accordin_btn1.hover();
    await expect(page).toHaveNoACViolations('accordion-mouse-hover');
  });

  test('accessibility-checker disabled accordion', async ({ page }) => {
    await visitStory(page, {
      component: 'Accordion',
      id: 'components-accordion--playground',
      globals: {
        theme: 'white',
      },
      args: {
        disabled: true,
      },
    });
    const accordin_btn1 = page.getByRole('button', { name: 'Section 1 title' });
    await expect(accordin_btn1).toBeDisabled();
    await expect(page).toHaveNoACViolations('accordion-disabled');
  });
});

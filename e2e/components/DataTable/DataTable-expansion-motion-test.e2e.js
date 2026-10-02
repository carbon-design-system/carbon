/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

for (const height of [120, 600]) {
  test(`interpolates expanded row content at ${height}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await visitStory(page, {
      component: 'DataTable',
      id: 'components-datatable-expansion--default',
    });
    const inner = page.locator('.cds--child-row-inner-container').first();
    const toggle = page.locator('tbody .cds--table-expand__button').first();
    await inner.locator('h6').evaluate((element, height) => {
      element.style.height = `${height}px`;
    }, height);
    await inner.evaluate((element) => {
      element.style.transitionDuration = '1s';
    });
    await toggle.click();
    const opening = await inner.evaluate((element) => {
      const animations = element.getAnimations({ subtree: true });
      for (const animation of animations) {
        animation.pause();
        animation.currentTime =
          Number(animation.effect.getTiming().duration) / 2;
      }
      const middle = element.getBoundingClientRect().height;
      for (const animation of animations) animation.finish();
      return { middle, end: element.getBoundingClientRect().height };
    });
    expect(opening.middle).toBeGreaterThan(0);
    expect(opening.middle).toBeLessThan(opening.end * 0.9);
    expect(opening.end).toBeGreaterThan(height);

    await inner.locator('h6').evaluate((element, height) => {
      element.style.height = `${height + 200}px`;
    }, height);
    const expandedHeight = await inner.evaluate(
      (element) => element.getBoundingClientRect().height
    );
    expect(expandedHeight).toBeGreaterThan(opening.end + 190);

    await toggle.click();
    const closing = await inner.evaluate((element) => {
      const animations = element.getAnimations({ subtree: true });
      for (const animation of animations) {
        animation.pause();
        animation.currentTime =
          Number(animation.effect.getTiming().duration) / 2;
      }
      const middle = element.getBoundingClientRect().height;
      for (const animation of animations) animation.finish();
      return { middle, end: element.getBoundingClientRect().height };
    });
    expect(closing.middle).toBeGreaterThan(expandedHeight * 0.1);
    expect(closing.middle).toBeLessThan(expandedHeight - 1);
    expect(closing.end).toBe(0);
  });
}

test('respects reduced motion when expanding a row', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visitStory(page, {
    component: 'DataTable',
    id: 'components-datatable-expansion--default',
  });
  const inner = page.locator('.cds--child-row-inner-container').first();
  const toggle = page.locator('tbody .cds--table-expand__button').first();
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(
    await inner.evaluate(
      (element) => element.getAnimations({ subtree: true }).length
    )
  ).toBe(0);
  await toggle.click();
  expect(
    await inner.evaluate((element) => element.getBoundingClientRect().height)
  ).toBe(0);
});

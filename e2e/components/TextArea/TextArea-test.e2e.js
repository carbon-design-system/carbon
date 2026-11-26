/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

async function resizeToMinimumHeight(textarea) {
  await textarea.evaluate((element) => {
    element.style.height = '40px';
  });
}

test.describe('TextArea', () => {
  test.beforeEach(async ({ page }) => {
    await visitStory(page, {
      component: 'TextArea',
      id: 'components-textarea--default',
      globals: {
        theme: 'white',
      },
    });
  });

  test('does not overflow with one line at its minimum height', async ({
    page,
  }) => {
    const textarea = page.getByRole('textbox');

    await textarea.fill('hello');
    await resizeToMinimumHeight(textarea);

    const dimensions = await textarea.evaluate((element) => ({
      clientHeight: element.clientHeight,
      offsetHeight: element.offsetHeight,
      scrollHeight: element.scrollHeight,
    }));

    expect(dimensions.offsetHeight).toBe(40);
    expect(dimensions.scrollHeight).toBeLessThanOrEqual(
      dimensions.clientHeight
    );
  });

  test('allows multiline content to overflow at its minimum height', async ({
    page,
  }) => {
    const textarea = page.getByRole('textbox');

    await textarea.fill('hello\nworld');
    await resizeToMinimumHeight(textarea);

    const dimensions = await textarea.evaluate((element) => ({
      clientHeight: element.clientHeight,
      offsetHeight: element.offsetHeight,
      scrollHeight: element.scrollHeight,
    }));

    expect(dimensions.offsetHeight).toBe(40);
    expect(dimensions.scrollHeight).toBeGreaterThan(dimensions.clientHeight);
  });
});

test.describe('TextArea resizing', () => {
  for (const state of ['disabled', 'enabled', 'readOnly']) {
    test(`allows vertical resizing when ${state}`, async ({ page }) => {
      await visitStory(page, {
        component: 'TextArea',
        id: 'components-textarea--default',
        args: {
          disabled: state === 'disabled',
          readOnly: state === 'readOnly',
        },
      });

      const textarea = page.getByRole('textbox');
      await expect(textarea).toBeVisible();
      if (state === 'disabled') {
        await expect(textarea).toBeDisabled();
      }
      if (state !== 'enabled') {
        await expect(textarea).not.toBeEditable();
      }

      const before = await textarea.boundingBox();
      const x = before.x + before.width - 3;
      const y = before.y + before.height - 3;

      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 80, y + 80, { steps: 10 });
      await page.mouse.up();

      await expect
        .poll(async () => (await textarea.boundingBox()).height)
        .toBeGreaterThan(before.height + 40);
      expect((await textarea.boundingBox()).width).toBeCloseTo(before.width);
      if (state !== 'enabled') {
        await expect(textarea).not.toBeEditable();
      }
    });
  }
});

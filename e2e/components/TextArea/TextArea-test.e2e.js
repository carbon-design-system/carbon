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

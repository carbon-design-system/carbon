/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('@avt FluidForm', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'FluidForm',
      id: 'components-fluid-components-fluidform--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FluidForm @avt-default-state');
  });

  for (const theme of ['white', 'g10', 'g90', 'g100']) {
    test(`uses the current layer field background in ${theme}`, async ({
      page,
    }) => {
      await visitStory(page, {
        component: 'FluidForm',
        id: 'components-fluid-components-fluidform--in-modal-with-layers',
        globals: { 'backgrounds.value': theme },
      });

      await expect(page.locator('html')).toHaveAttribute(
        'data-carbon-theme',
        theme
      );

      for (const level of [1, 2, 3]) {
        for (const type of ['text', 'number', 'dropdown', 'date']) {
          const field = page.locator(`#fluid-layer-${type}-${level}`);
          await expect(field).toBeVisible();
          await expect
            .poll(
              async () =>
                field.evaluate((element) => {
                  const probe = document.createElement('span');
                  probe.style.backgroundColor = 'var(--cds-field)';
                  probe.style.backgroundImage =
                    'linear-gradient(var(--cds-field), var(--cds-field))';
                  element.parentElement.appendChild(probe);
                  const expected = getComputedStyle(probe).backgroundColor;
                  const expectedGradient =
                    getComputedStyle(probe).backgroundImage;
                  probe.remove();

                  // v12 paints the number field on its container, leaving the
                  // input transparent. Check the first painted background.
                  for (
                    let field = element;
                    field;
                    field = field.parentElement
                  ) {
                    const style = getComputedStyle(field);
                    if (style.backgroundImage !== 'none') {
                      return style.backgroundImage.startsWith(expectedGradient);
                    }
                    if (style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                      return style.backgroundColor === expected;
                    }
                  }
                  return false;
                }),
              {
                message: `${type} on layer ${level} should match the field token`,
              }
            )
            .toBe(true);
        }
      }
    });
  }
});

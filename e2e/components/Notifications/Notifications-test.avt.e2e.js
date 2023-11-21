/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');

test.describe('Notifications @avt', () => {
  test('@avt-default-state', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--default',
      globals: {
        theme: 'white',
      },
    });

    await expect(page).toHaveNoACViolations('Notifications actionable');
  });

  test('accessibility-checker Notifications actionable keyboard', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--default',
      globals: {
        theme: 'white',
      },
    });

    const actionButton = page.getByRole('button', { name: 'Action' });
    const closeButton = page.getByRole('button', {
      name: 'close notification',
    });

    await expect(actionButton).toBeVisible();

    await expect(actionButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    await expect(page).toHaveNoACViolations(
      'Notifications actionable keyboard'
    );
  });

  test('@avt-advanced-states actionable low contrast', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--default',
      globals: {
        theme: 'white',
        args: {
          lowContrast: 'true',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable low contrast'
    );
  });

  test('@avt-advanced-states actionable info', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'info',
        },
      },
    });
    await expect(page).toHaveNoACViolations('Notifications actionable info');
  });

  test('@avt-advanced-states actionable info-square', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'info-square',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable info-square'
    );
  });

  test('@avt-advanced-states actionable success', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'success',
        },
      },
    });
    await expect(page).toHaveNoACViolations('Notifications actionable success');
  });

  test('@avt-advanced-states actionable warning', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'warning',
        },
      },
    });
    await expect(page).toHaveNoACViolations('Notifications actionable warning');
  });

  test('@avt-advanced-states actionable warning-alt', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'warning-alt',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable warning-alt'
    );
  });

  test('@avt-advanced-states actionable info low contrast', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'info',
          lowContrast: 'true',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable info low contrast'
    );
  });

  test('@avt-advanced-states actionable info-square low contrast', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'info-square',
          lowContrast: 'true',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable info-square low contrast'
    );
  });

  test('@avt-advanced-states actionable success low contrast', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'success',
          lowContrast: 'true',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable success low contrast'
    );
  });

  test('@avt-advanced-states actionable warning low contrast', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'warning',
          lowContrast: 'true',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable warning low contrast'
    );
  });

  test('@avt-advanced-states actionable warning-alt low contrast', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-actionable--playground',
      globals: {
        theme: 'white',
        args: {
          kind: 'warning-alt',
          lowContrast: 'true',
        },
      },
    });
    await expect(page).toHaveNoACViolations(
      'Notifications actionable warning-alt low contrast'
    );
  });

  test('@avt-advanced-states inline', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-inline--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Notifications inline');
  });

  test('@avt-advanced-states toast', async ({ page }) => {
    await visitStory(page, {
      component: 'Notifications',
      id: 'components-notifications-toast--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('Notifications toast');
  });
});

/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');
const { snapshot } = require('../../test-utils/snapshot');

test.describe('Button', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('default @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--default',
          theme,
        });
      });

      test('secondary @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--secondary',
          theme,
        });
      });

      test('tertiary @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--tertiary',
          theme,
        });
      });

      test('danger @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--danger',
          theme,
        });
      });

      test('ghost @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--ghost',
          theme,
        });
      });

      test('icon button @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--icon-button',
          theme,
        });
      });

      test('icon button with badge indicator @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button--icon-button-with-badge',
          theme,
        });
      });

      test('set of buttons @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--default',
          theme,
        });
      });

      test('set of buttons fluid 1 wide @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '0',
            'Container width': '800px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 1 wide ghost @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '3',
            'Container width': '800px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 1 narrow @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '0',
            'Container width': '280px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 2 wide @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '4',
            'Container width': '800px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 2 wide ghost @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '5',
            'Container width': '800px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 2 narrow @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '4',
            'Container width': '320px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 3 wide @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '6',
            'Container width': '800px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 3 wide ghost @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '7',
            'Container width': '800px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 3 narrow @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '6',
            'Container width': '500px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 4 wide @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '9',
            'Container width': '1000px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 4 wide ghost @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '10',
            'Container width': '1000px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });

      test('set of buttons fluid 4 narrow @vrt', async ({ page }) => {
        await visitStory(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
          args: {
            'Fluid buttons': '9',
            'Container width': '600px',
          },
        });
        await snapshot(page, {
          component: 'Button',
          id: 'components-button-set-of-buttons--fluid',
          theme,
        });
      });
    });
  });
});

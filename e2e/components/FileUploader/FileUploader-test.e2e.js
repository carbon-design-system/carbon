/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { snapshotStory, visitStory } = require('../../test-utils/storybook');

test.describe('FileUploader', () => {
  themes.forEach((theme) => {
    test.describe(theme, () => {
      test('file uploader @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FileUploader',
          id: 'components-fileuploader--default',
          theme,
        });
      });

      test('file uploader item @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FileUploader',
          id: 'components-fileuploader--file-uploader-item',
          theme,
        });
      });

      test('file uploader drop container @vrt', async ({ page }) => {
        await snapshotStory(page, {
          component: 'FileUploader',
          id: 'components-fileuploader--file-uploader-drop-container',
          theme,
        });
      });

      test('drag and drop upload container example application @vrt', async ({
        page,
      }) => {
        await snapshotStory(page, {
          component: 'FileUploader',
          id: 'components-fileuploader--drag-and-drop-upload-container-example-application',
          theme,
        });
      });
    });
  });

  test('accessibility-checker @avt', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FileUploader');
  });
});

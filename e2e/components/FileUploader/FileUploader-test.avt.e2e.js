/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { expect, test } = require('@playwright/test');
const { visitStory } = require('../../test-utils/storybook');
const path = require('path');

test.describe('FileUploader @avt', () => {
  test('accessibility-checker default state', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FileUploader default state');
  });
  test('accessibility-checker default state with upload', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--playground',
      globals: {
        theme: 'white',
      },
    });
    await page
      .getByLabel('Add file')
      .setInputFiles(path.join(__dirname, 'test-file-for-uploading.png'));
    await expect(page).toHaveNoACViolations(
      'FileUploader default state with upload'
    );
  });
  test('accessibility-checker invalid state', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--file-uploader-item',
      globals: {
        theme: 'white',
      },
      args: {
        invalid: true,
      },
    });

    await expect(page).toHaveNoACViolations('FileUploader invalid state');
  });

  test('accessibility-checker complete state', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--file-uploader-item',
      globals: {
        theme: 'white',
      },
      args: {
        status: 'complete',
      },
    });

    await expect(page).toHaveNoACViolations('FileUploader complete state');
  });

  test('accessibility-checker uploading state', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--file-uploader-item',
      globals: {
        theme: 'white',
      },
      args: {
        status: 'uploading',
      },
    });

    await expect(page).toHaveNoACViolations('FileUploader uploading state');
  });
});

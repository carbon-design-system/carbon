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
  test('@avt-default-state FileUploader', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--default',
      globals: {
        theme: 'white',
      },
    });
    await expect(page).toHaveNoACViolations('FileUploader default state');
  });
  test('@avt-advanced-state with upload', async ({ page }) => {
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
  test('@avt-advanced-state invalid state', async ({ page }) => {
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

  test('@avt-advanced-state complete state', async ({ page }) => {
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

  test('@avt-advanced-state uploading state', async ({ page }) => {
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

  test('@avt-keyboard-state FileUploader', async ({ page }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--default',
      globals: {
        theme: 'white',
      },
    });

    const addFileButton = page.getByRole('button');

    // Testing the button focus
    await expect(addFileButton).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(addFileButton).toBeFocused();
    await page.keyboard.press('Enter');

    // Uploading a file to the input
    await page
      .getByLabel('Add file')
      .setInputFiles(path.join(__dirname, 'test-file-for-uploading.png'));
    await expect(page.getByText('test-file-for-uploading')).toBeVisible();

    // Delete the file
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByText('test-file-for-uploading')).not.toBeVisible();
  });

  test('@avt-keyboard-state FileUploader Drag and drop multiple files', async ({
    page,
  }) => {
    await visitStory(page, {
      component: 'FileUploader',
      id: 'components-fileuploader--drag-and-drop-upload-container-example-application',
      globals: {
        theme: 'white',
      },
    });

    const addFileButton = page.getByRole('button');

    // Testing the button focus
    await expect(addFileButton).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(addFileButton).toBeFocused();
    await page.keyboard.press('Enter');

    // Uploading a file to the input
    await page.setInputFiles('input[type="file"]', [
      'test-file-for-uploading.png',
      'test-file-for-uploading-copy.png',
    ]);
    await expect(page.getByText('test-file-for-uploading')).toBeVisible();
    await expect(page.getByText('test-file-for-uploading-copy')).toBeVisible();
  });
});

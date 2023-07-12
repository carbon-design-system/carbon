/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The state of `<cds-file-uploader-item>`.
 */
export enum FILE_UPLOADER_ITEM_STATE {
  /**
   * Upload in progress.
   */
  UPLOADING = 'uploading',

  /**
   * Upload complete.
   */
  COMPLETE = 'complete',

  /**
   * Editing.
   */
  EDIT = 'edit',
}

/**
 * File uploader item size.
 */
export enum FILE_UPLOADER_ITEM_SIZE {
  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Medium size.
   */
  MEDIUM = 'md',

  /**
   * Large size.
   */
  LARGE = 'lg',
}

/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The state of `<bx-file-uploader-item>`.
 */
export enum FILE_UPLOADER_ITEM_STATE {
  /**
   * Upload in progress.
   */
  UPLOADING = 'uploading',

  /**
   * Upload complete.
   */
  UPLOADED = 'uploaded',

  /**
   * Editing.
   */
  EDITING = 'editing',
}

/**
 * File uploader item size.
 */
export enum FILE_UPLOADER_ITEM_SIZE {
  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Size for form field.
   */
  FIELD = 'field',
}

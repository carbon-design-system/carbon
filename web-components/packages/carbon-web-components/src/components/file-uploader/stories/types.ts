/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FILE_UPLOADER_ITEM_STATE } from '../file-uploader-item';

/**
 * The data for each file uploaded.
 */
export interface FileData {
  /**
   * The unique ID.
   */
  id: string;

  /**
   * `true` if there is something wrong with the uploaded file.
   */
  invalid?: boolean;

  /**
   * The file blob data.
   */
  file: File;

  /**
   * The file uploading state.
   */
  state: FILE_UPLOADER_ITEM_STATE;

  /**
   * The error message.
   */
  validityMessage?: string;

  /**
   * The supplemental error message.
   */
  supplementalValidityMessage?: string;
}

/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export enum ICON_INDICATOR_KIND {
  /**
   * Failed
   */
  FAILED = 'failed',

  /**
   * Caution major.
   */
  'CAUTION-MAJOR' = 'caution-major',

  /**
   * Caution minor.
   */
  'CAUTION-MINOR' = 'caution-minor',

  /**
   * Undefined.
   */
  UNDEFINED = 'undefined',

  /**
   * Succeeded.
   */
  SUCCEEDED = 'succeeded',

  /**
   * Normal.
   */
  NORMAL = 'normal',

  /**
   * In-progress.
   */
  'IN-PROGRESS' = 'in-progress',

  /**
   * Incomplete.
   */
  INCOMPLETE = 'incomplete',

  /**
   * Not started.
   */
  'NOT-STARTED' = 'not-started',

  /**
   * Pending.
   */
  PENDING = 'pending',

  /**
   * Unknown.
   */
  UNKNOWN = 'unknown',

  /**
   * Informative.
   */
  INFORMATIVE = 'informative',
}

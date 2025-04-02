/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Shape indicator kinds.
 */
export enum SHAPE_INDICATOR_KIND {
  /**
   * Failed status
   */
  FAILED = 'failed',
  /**
   * Critical status
   */
  CRITICAL = 'critical',
  /**
   * High severity
   */
  HIGH = 'high',
  /**
   * Medium severity
   */
  MEDIUM = 'medium',
  /**
   * Low severity
   */
  LOW = 'low',
  /**
   * Cautious status
   */
  CAUTIOUS = 'cautious',
  /**
   * Undefined status
   */
  UNDEFINED = 'undefined',
  /**
   * Stable status
   */
  STABLE = 'stable',
  /**
   * Informative status
   */
  INFORMATIVE = 'informative',
  /**
   * Incomplete status
   */
  INCOMPLETE = 'incomplete',
  /**
   * Draft status
   */
  DRAFT = 'draft',
}

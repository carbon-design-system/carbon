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

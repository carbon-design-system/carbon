/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This file contains the list of the default values of compile-time feature flags.
 */

/**
 * This flag will determine if all feature flags should be enabled
 *
 * @type {boolean}
 */
export const CDS_FLAGS_ALL: boolean =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
  process!.env.CDS_FLAGS_ALL === 'true' || false;

/**
 * Enables experimental component
 *
 * @type {boolean}
 */
export const CDS_EXPERIEMENTAL_COMPONENT_NAME: boolean =
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
  process!.env.CDS_EXPERIEMENTAL_COMPONENT_NAME === 'true' ||
  CDS_FLAGS_ALL ||
  false;

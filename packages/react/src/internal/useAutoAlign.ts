/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useFeatureFlag } from '../components/FeatureFlags';

/**
 * Resolves the effective `autoAlign` value for a component. An explicit
 * `autoAlign` prop always wins. When the prop is omitted, the value comes from
 * the `enable-v12-autoalign` feature flag, which becomes the default in v12.
 */
export const useAutoAlign = (autoAlign?: boolean): boolean => {
  const enableAutoAlign = useFeatureFlag('enable-v12-autoalign');

  return autoAlign ?? enableAutoAlign;
};

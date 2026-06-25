/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo } from 'react';
import { unstable_useFeatureFlags as useFeatureFlags } from '@carbon/react';

/**
 * Custom hook that converts Carbon's FeatureFlags scope to a plain object.
 * This is useful when you need to pass parent feature flags to a nested
 * FeatureFlags component, ensuring all parent flags are preserved.
 *
 * @returns {Record<string, boolean>} An object containing all feature flags from the parent scope
 
 
 */
export function useCarbonFeatureFlagsObject(): Record<string, boolean> {
  const parentFeatureFlags = useFeatureFlags();

  const parentFlagsObject = useMemo(() => {
    const flagsObj: Record<string, boolean> = {};

    // Access the internal flags Map from the FeatureFlags scope
    // @ts-ignore - accessing internal flags Map property
    if (parentFeatureFlags?.flags) {
      // @ts-ignore
      for (const [key, value] of parentFeatureFlags.flags) {
        flagsObj[key] = value;
      }
    }

    return flagsObj;
  }, [parentFeatureFlags]);

  return parentFlagsObject;
}

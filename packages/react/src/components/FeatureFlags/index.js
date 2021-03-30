/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import React, { createContext, useContext, useState } from 'react';
import { usePrevious } from '../../internal/usePrevious';

const FeatureFlagContext = createContext(FeatureFlags);

function FeatureFlags({ children, flags = {} }) {
  const [scope, updateScope] = useState(() => {
    return FeatureFlags.createScope(flags);
  });
  const prevFlags = usePrevious(flags);

  if (!isEqual(prevFlags, flags)) {
    updateScope(FeatureFlags.createScope(flags));
  }

  return (
    <FeatureFlagContext.Provider value={scope}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}

function isEqual(a, b) {
  if (a === b) {
    return true;
  }

  for (const key of Object.keys(a)) {
    if (a[key] !== b[key]) {
      return false;
    }
  }

  for (const key of Object.keys(b)) {
    if (b[key] !== a[key]) {
      return false;
    }
  }

  return true;
}

export { FeatureFlags, useFeatureFlags };

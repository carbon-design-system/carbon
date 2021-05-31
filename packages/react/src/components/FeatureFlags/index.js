/**
 * Copyright IBM Corp. 2015, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  FeatureFlags as GlobalFeatureFlags,
  createScope,
} from '@carbon/feature-flags';
import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

/**
 * Our FeatureFlagContext is used alongside the FeatureFlags component to enable
 * or disable feature flags in a given React tree
 */
const FeatureFlagContext = createContext(GlobalFeatureFlags);

/**
 * Supports an object of feature flag values with the `flags` prop, merging them
 * along with the current `FeatureFlagContext` to provide consumers to check if
 * a feature flag is enabled or disabled in a given React tree
 */
function FeatureFlags({ children, flags = {} }) {
  const parentScope = useContext(FeatureFlagContext);
  const [prevParentScope, setPrevParentScope] = useState(parentScope);
  const [scope, updateScope] = useState(() => {
    const scope = createScope(flags);
    scope.mergeWithScope(parentScope);
    return scope;
  });

  if (parentScope !== prevParentScope) {
    const scope = createScope(flags);
    scope.mergeWithScope(parentScope);
    updateScope(scope);
    setPrevParentScope(parentScope);
  }

  // We use a custom hook to detect if any of the keys or their values change
  // for flags that are passed in. If they have changed, then we re-create the
  // FeatureFlagScope using the new flags
  useChangedValue(flags, isEqual, (changedFlags) => {
    const scope = createScope(changedFlags);
    scope.mergeWithScope(parentScope);
    updateScope(scope);
  });

  return (
    <FeatureFlagContext.Provider value={scope}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

FeatureFlags.propTypes = {
  children: PropTypes.node,

  /**
   * Provide the feature flags to enabled or disabled in the current React tree
   */
  flags: PropTypes.objectOf(PropTypes.bool),
};

/**
 * This hook will store previous versions of the given `value` and compare the
 * current value to the previous one using the `compare` function. If the
 * compare function returns true, then the given `callback` is invoked in an
 * effect.
 *
 * @param {any} value
 * @param {Function} compare
 * @param {Function} callback
 */
function useChangedValue(value, compare, callback) {
  const initialRender = useRef(false);
  const savedCallback = useRef(callback);
  const [prevValue, setPrevValue] = useState(value);

  if (!compare(prevValue, value)) {
    setPrevValue(value);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    // We only want the callback triggered after the first render
    if (initialRender.current) {
      savedCallback.current(prevValue);
    }
  }, [prevValue]);

  useEffect(() => {
    initialRender.current = true;
  }, []);
}

/**
 * Access whether a given flag is enabled or disabled in a given
 * FeatureFlagContext
 *
 * @returns {boolean}
 */
function useFeatureFlag(flag) {
  const scope = useContext(FeatureFlagContext);
  return scope.enabled(flag);
}

/**
 * Access all feature flag information for the given FeatureFlagContext
 *
 * @returns {FeatureFlagScope}
 */
function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}

/**
 * Compare two objects and determine if they are equal. This is a shallow
 * comparison since the objects we are comparing are objects with boolean flags
 * from the flags prop in the `FeatureFlags` component
 *
 * @param {object} a
 * @param {object} b
 * @returns {boolean}
 */
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

export { FeatureFlags, FeatureFlagContext, useFeatureFlags, useFeatureFlag };

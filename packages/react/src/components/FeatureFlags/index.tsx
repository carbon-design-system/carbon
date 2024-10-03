/**
 * Copyright IBM Corp. 2015, 2023
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
  ReactNode,
} from 'react';
import deprecate from '../../prop-types/deprecate';

interface FeatureFlagsProps {
  children?: ReactNode;
  flags?: Record<string, boolean>;
  enableV12TileDefaultIcons?: boolean;
  enableV12TileRadioIcons?: boolean;
  enableV12Overflowmenu?: boolean;
  enableTreeviewControllable?: boolean;
  enableExperimentalFocusWrapWithoutSentinels?: boolean;
}
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
function FeatureFlags({
  children,
  flags = {},
  enableV12TileDefaultIcons = false,
  enableV12TileRadioIcons = false,
  enableV12Overflowmenu = false,
  enableTreeviewControllable = false,
  enableExperimentalFocusWrapWithoutSentinels = false,
}: FeatureFlagsProps): JSX.Element {
  const parentScope = useContext(FeatureFlagContext);
  const [prevParentScope, setPrevParentScope] = useState(parentScope);

  const combinedFlags = {
    'enable-v12-tile-default-icons': enableV12TileDefaultIcons,
    'enable-v12-tile-radio-icons': enableV12TileRadioIcons,
    'enable-v12-overflowmenu': enableV12Overflowmenu,
    'enable-treeview-controllable': enableTreeviewControllable,
    'enable-experimental-focus-wrap-without-sentinels':
      enableExperimentalFocusWrapWithoutSentinels,
    ...flags,
  };
  const [scope, updateScope] = useState(() => {
    const scope = createScope(combinedFlags);
    scope.mergeWithScope(parentScope);
    return scope;
  });

  if (parentScope !== prevParentScope) {
    const scope = createScope(combinedFlags);
    scope.mergeWithScope(parentScope);
    updateScope(scope);
    setPrevParentScope(parentScope);
  }

  // We use a custom hook to detect if any of the keys or their values change
  // for flags that are passed in. If they have changed, then we re-create the
  // FeatureFlagScope using the new flags
  useChangedValue(combinedFlags, isEqual, (changedFlags) => {
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
   * Provide the feature flags to enabled or disabled in the current Rea,ct tree
   */
  flags: deprecate(
    PropTypes.objectOf(PropTypes.bool),
    'The `flags` prop for `FeatureFlag` has ' +
      'been deprecated. Please run the `featureflag-deprecate-flags-prop` codemod to migrate to individual boolean props.' +
      `npx @carbon/upgrade migrate featureflag-deprecate-flags-prop --write`
  ),
  enableV12TileDefaultIcons: PropTypes.bool,
  enableV12TileRadioIcons: PropTypes.bool,
  enableV12Overflowmenu: PropTypes.bool,
  enableTreeviewControllable: PropTypes.bool,
  enableExperimentalFocusWrapWithoutSentinels: PropTypes.bool,
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
function useChangedValue<T>(
  value: T,
  compare: (a: T, b: T) => boolean,
  callback: (value: T) => void
) {
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
  //updated to return false for undefined flags
  return scope.enabled(flag) ?? false;
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
function isEqual(
  a: Record<string, boolean>,
  b: Record<string, boolean>
): boolean {
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

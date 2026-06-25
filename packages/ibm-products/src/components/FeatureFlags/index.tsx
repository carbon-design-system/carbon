/**
 * Copyright IBM Corp. 2024, 2025
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
  type JSX,
} from 'react';
import { deprecateProp } from '../../global/js/utils/props-helper';

export interface FeatureFlagsProps {
  children?: ReactNode;
  flags?: Record<string, boolean>;
  defaultPortalTargetBody?: boolean;
  enableDatagridUseInlineEdit?: boolean;
  enableDatagridUseEditableCell?: boolean;
  enableDatagridUseCustomizeColumns?: boolean;
  // exampleComponentSecondaryIcon?: boolean;
  // exampleComponentUseExample?: boolean;
  enableSidepanelResizer?: boolean;
  enableTestFlagA?: boolean;
  enableTestFlagB?: boolean;
}
//merge c4p feature flags with carbon feature flags
GlobalFeatureFlags.merge({
  'default-portal-target-body': true,
  'enable-datagrid-useInlineEdit': false,
  'enable-datagrid-useEditableCell': false,
  'enable-datagrid-useCustomizeColumns': false,
  'ExampleComponent.secondaryIcon': false,
  'ExampleComponent.useExample': false,
  'enable-test-flag-a': false, // used in testing
  'enable-test-flag-b': true, // used in testing
  enableSidepanelResizer: false,
});
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
  defaultPortalTargetBody = true,
  enableDatagridUseInlineEdit = false,
  enableDatagridUseEditableCell = false,
  enableDatagridUseCustomizeColumns = false,
  // exampleComponentSecondaryIcon = false,
  // exampleComponentUseExample = false,
  enableSidepanelResizer = false,
  enableTestFlagA = false,
  enableTestFlagB = false,
}: FeatureFlagsProps): JSX.Element {
  const parentScope = useContext(FeatureFlagContext);
  const [prevParentScope, setPrevParentScope] = useState(parentScope);

  const combinedFlags = {
    'default-portal-target-body': defaultPortalTargetBody,
    'enable-datagrid-useInlineEdit': enableDatagridUseInlineEdit,
    'enable-datagrid-useEditableCell': enableDatagridUseEditableCell,
    'enable-datagrid-useCustomizeColumns': enableDatagridUseCustomizeColumns,
    // 'ExampleComponent.secondaryIcon': exampleComponentSecondaryIcon,
    // 'ExampleComponent.useExample': exampleComponentUseExample,
    enableSidepanelResizer: enableSidepanelResizer,
    'enable-test-flag-a': enableTestFlagA,
    'enable-test-flag-b': enableTestFlagB,
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
   * Provide the feature flags to enabled or disabled in the current React tree
   */
  defaultPortalTargetBody: PropTypes.bool,
  enableDatagridUseCustomizeColumns: PropTypes.bool,
  enableDatagridUseEditableCell: PropTypes.bool,
  enableDatagridUseInlineEdit: PropTypes.bool,
  enableSidepanelResizer: PropTypes.bool,
  enableTestFlagA: PropTypes.bool,
  enableTestFlagB: PropTypes.bool,
  // exampleComponentSecondaryIcon: PropTypes.bool,
  // exampleComponentUseExample: PropTypes.bool,
  flags: deprecateProp(
    PropTypes.objectOf(PropTypes.bool),
    'The `flags` prop for `FeatureFlag` has been deprecated. Please pass the flags directly as props in camelCase'
  ),
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

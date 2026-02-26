/**
 * Copyright IBM Corp. 2015, 2026
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
  useMemo,
  type ReactNode,
} from 'react';
import { deprecate } from '../../prop-types/deprecate';

export interface FeatureFlagsProps {
  children?: ReactNode;
  flags?: Record<string, boolean>;
  enableV12TileDefaultIcons?: boolean;
  enableV12TileRadioIcons?: boolean;
  enableV12Overflowmenu?: boolean;
  enableTreeviewControllable?: boolean;
  enableExperimentalFocusWrapWithoutSentinels?: boolean;
  enableFocusWrapWithoutSentinels?: boolean;
  enableDialogElement?: boolean;
  enableV12DynamicFloatingStyles?: boolean;
  enableEnhancedFileUploader?: boolean;
  enablePresence?: boolean;
}

// TODO: Migrate `packages/feature-flags` to TypeScript and delete this
// interface.
interface FeatureFlagScope {
  enabled: (name: string) => boolean;
  mergeWithScope: (scope: FeatureFlagScope) => void;
}

/**
 * Our FeatureFlagContext is used alongside the FeatureFlags component to enable
 * or disable feature flags in a given React tree
 */
const FeatureFlagContext = createContext<FeatureFlagScope>(GlobalFeatureFlags);

/**
 * Supports an object of feature flag values with the `flags` prop, merging them
 * along with the current `FeatureFlagContext` to provide consumers to check if
 * a feature flag is enabled or disabled in a given React tree
 */
export const FeatureFlags = ({
  children,
  flags = {},
  enableV12TileDefaultIcons = false,
  enableV12TileRadioIcons = false,
  enableV12Overflowmenu = false,
  enableTreeviewControllable = false,
  enableExperimentalFocusWrapWithoutSentinels = false,
  enableFocusWrapWithoutSentinels = false,
  enableDialogElement = false,
  enableV12DynamicFloatingStyles = false,
  enableEnhancedFileUploader = false,
  enablePresence = false,
}: FeatureFlagsProps) => {
  const parentScope = useContext(FeatureFlagContext);

  const scope = useMemo(() => {
    const combinedFlags = {
      'enable-v12-tile-default-icons': enableV12TileDefaultIcons,
      'enable-v12-tile-radio-icons': enableV12TileRadioIcons,
      'enable-v12-overflowmenu': enableV12Overflowmenu,
      'enable-treeview-controllable': enableTreeviewControllable,
      'enable-experimental-focus-wrap-without-sentinels':
        enableExperimentalFocusWrapWithoutSentinels,
      'enable-focus-wrap-without-sentinels': enableFocusWrapWithoutSentinels,
      'enable-dialog-element': enableDialogElement,
      'enable-v12-dynamic-floating-styles': enableV12DynamicFloatingStyles,
      'enable-enhanced-file-uploader': enableEnhancedFileUploader,
      'enable-presence': enablePresence,
      ...flags,
    };

    const scope = createScope(combinedFlags) as FeatureFlagScope;
    scope.mergeWithScope(parentScope);
    return scope;
  }, [
    enableV12TileDefaultIcons,
    enableV12TileRadioIcons,
    enableV12Overflowmenu,
    enableTreeviewControllable,
    enableExperimentalFocusWrapWithoutSentinels,
    enableFocusWrapWithoutSentinels,
    enableDialogElement,
    enableV12DynamicFloatingStyles,
    enableEnhancedFileUploader,
    enablePresence,
    flags,
    parentScope,
  ]);

  return (
    <FeatureFlagContext.Provider value={scope}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

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
  enableFocusWrapWithoutSentinels: PropTypes.bool,
  enableDialogElement: PropTypes.bool,
  enableV12DynamicFloatingStyles: PropTypes.bool,
  enableEnhancedFileUploader: PropTypes.bool,
  enablePresence: PropTypes.bool,
};

/**
 * Access whether a given flag is enabled or disabled in a given
 * FeatureFlagContext
 */
export const useFeatureFlag = (flag: string) => {
  const scope = useContext(FeatureFlagContext);
  return scope.enabled(flag);
};

/**
 * Access all feature flag information for the given FeatureFlagContext
 */
export const useFeatureFlags = () => useContext(FeatureFlagContext);

/**
 * Copyright IBM Corp. 2015, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  FeatureFlags as GlobalFeatureFlags,
  createScope,
  notifyAvailableFlag,
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

  /**
   * Provide the feature flags to enable or disable in the current React tree.
   *
   * @deprecated Use the individual boolean props instead. Run the
   * `featureflag-deprecate-flags-prop` codemod to migrate:
   * `npx @carbon/upgrade migrate featureflag-deprecate-flags-prop --write`
   */
  flags?: Record<string, boolean>;

  /**
   * Enable the features and functionality for the v12 Release.
   *
   * Enabling this turns on every `enableV12*` flag at once.
   */
  enableV12Release?: boolean;

  /**
   * Enable rendering of default icons in the tile components.
   *
   * Becomes the default behavior in v12.
   */
  enableV12TileDefaultIcons?: boolean;

  /**
   * Enable rendering of radio icons in the `RadioTile` component.
   *
   * Becomes the default behavior in v12.
   */
  enableV12TileRadioIcons?: boolean;

  /**
   * Enable the use of the v12 `OverflowMenu` leveraging the `Menu`
   * subcomponents.
   *
   * Becomes the default behavior in v12.
   */
  enableV12Overflowmenu?: boolean;

  /**
   * Enable the new `TreeView` controllable API.
   */
  enableTreeviewControllable?: boolean;

  /**
   * Enable the new focus wrap behavior that doesn't use sentinel nodes.
   *
   * @deprecated Use `enableFocusWrapWithoutSentinels` instead.
   */
  enableExperimentalFocusWrapWithoutSentinels?: boolean;

  /**
   * Enable the new focus wrap behavior that doesn't use sentinel nodes.
   */
  enableFocusWrapWithoutSentinels?: boolean;

  /**
   * Enable components to utilize the native `dialog` element.
   */
  enableDialogElement?: boolean;

  /**
   * Enable dynamic setting of floating styles for components like `Popover`,
   * `Tooltip`, etc.
   *
   * Becomes the default behavior in v12.
   */
  enableV12DynamicFloatingStyles?: boolean;

  /**
   * Enable enhanced functionality for the `FileUploader` component, including
   * richer callback data and expanded trigger events for `onChange` and
   * `onDelete`.
   */
  enableEnhancedFileUploader?: boolean;

  /**
   * Enable components to remain unmounted in closed state and mount in open
   * state.
   */
  enablePresence?: boolean;
}

// Reuse the runtime scope shape from `@carbon/feature-flags` directly. A local
// recursive interface here creates a second incompatible `FeatureFlagScope`
// during declaration emit.
type FeatureFlagScope = typeof GlobalFeatureFlags;

/**
 * Our FeatureFlagContext is used alongside the FeatureFlags component to enable
 * or disable feature flags in a given React tree
 */
const FeatureFlagContext = createContext<FeatureFlagScope>(GlobalFeatureFlags);

// Maps each camelCase prop name to its kebab-case feature flag key.
const PROP_TO_FLAG: Record<string, string> = {
  enableV12Release: 'enable-v12-release',
  enableV12TileDefaultIcons: 'enable-v12-tile-default-icons',
  enableV12TileRadioIcons: 'enable-v12-tile-radio-icons',
  enableV12Overflowmenu: 'enable-v12-overflowmenu',
  enableTreeviewControllable: 'enable-treeview-controllable',
  enableExperimentalFocusWrapWithoutSentinels:
    'enable-experimental-focus-wrap-without-sentinels',
  enableFocusWrapWithoutSentinels: 'enable-focus-wrap-without-sentinels',
  enableDialogElement: 'enable-dialog-element',
  enableV12DynamicFloatingStyles: 'enable-v12-dynamic-floating-styles',
  enableEnhancedFileUploader: 'enable-enhanced-file-uploader',
  enablePresence: 'enable-presence',
};

/**
 * Supports an object of feature flag values with the `flags` prop, merging them
 * along with the current `FeatureFlagContext` to provide consumers to check if
 * a feature flag is enabled or disabled in a given React tree
 */
export const FeatureFlags = ({
  children,
  flags,
  enableV12Release,
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
}: FeatureFlagsProps) => {
  const parentScope = useContext(FeatureFlagContext);

  const scope = useMemo(() => {
    // Only include flags that were explicitly provided (not undefined). This
    // ensures that unspecified props do not shadow flags set by a parent
    // FeatureFlags scope, which is the correct behaviour for nested scopes.
    const flagProps = {
      enableV12Release,
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
    };
    const explicitFlags: Record<string, boolean> = {};

    for (const [prop, flagKey] of Object.entries(PROP_TO_FLAG)) {
      const value = (flagProps as Record<string, boolean | undefined>)[prop];
      if (value !== undefined) {
        explicitFlags[flagKey] = value;
      }
    }

    if (flags) {
      Object.assign(explicitFlags, flags);
    }

    const scope = createScope(explicitFlags);
    scope.mergeWithScope(parentScope);
    return scope;
  }, [
    enableV12Release,
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
  enableV12Release: PropTypes.bool,
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
  const enabled = scope.enabled(flag);

  if (process.env.NODE_ENV !== 'production') {
    notifyAvailableFlag(flag, enabled);
  }

  return enabled;
};

/**
 * Access all feature flag information for the given FeatureFlagContext
 */
export const useFeatureFlags = () => useContext(FeatureFlagContext);

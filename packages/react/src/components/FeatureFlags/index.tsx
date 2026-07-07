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

  /**
   * @deprecated Use the individual boolean props instead (e.g. `enableDialogElement`).
   * Run the codemod to migrate:
   * `npx @carbon/upgrade migrate featureflag-deprecate-flags-prop --write`
   *
   * Provide feature flag values as a plain object. Useful for flags that do
   * not have a dedicated boolean prop (e.g. Sass-only flags).
   */
  flags?: Record<string, boolean>;

  /**
   * Enable default icons for `ClickableTile` components. When enabled,
   * `ClickableTile` renders an `ArrowRight` icon by default and an `Error`
   * icon when disabled.
   *
   * Feature flag: `enable-v12-tile-default-icons`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableV12TileDefaultIcons?: boolean;

  /**
   * Enable updated radio icon rendering in `RadioTile` components. When
   * enabled, selected tiles show a `RadioButtonChecked` icon and unselected
   * tiles show a `RadioButton` icon.
   *
   * Feature flag: `enable-v12-tile-radio-icons`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableV12TileRadioIcons?: boolean;

  /**
   * Enable the v12 `OverflowMenu` component that leverages `Menu` subcomponents
   * instead of the legacy implementation.
   *
   * Feature flag: `enable-v12-overflowmenu`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableV12Overflowmenu?: boolean;

  /**
   * Enable the new controllable API for `TreeView`, allowing `selected` and
   * `active` state to be managed externally. Also unlocks `defaultIsExpanded`
   * on `TreeNode` and the `onActivate` callback on `TreeView`.
   *
   * Feature flag: `enable-treeview-controllable`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableTreeviewControllable?: boolean;

  /**
   * @deprecated Use `enableFocusWrapWithoutSentinels` instead.
   *
   * Enable the focus-wrap behavior that does not rely on sentinel nodes.
   * Affects `Modal`, `ComposedModal`, and `ActionableNotification`.
   *
   * Feature flag: `enable-experimental-focus-wrap-without-sentinels`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableExperimentalFocusWrapWithoutSentinels?: boolean;

  /**
   * Enable the focus-wrap behavior that does not rely on sentinel nodes.
   * Affects `Modal`, `ComposedModal`, and `ActionableNotification`.
   *
   * Feature flag: `enable-focus-wrap-without-sentinels`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableFocusWrapWithoutSentinels?: boolean;

  /**
   * Enable components to utilize the native HTML `<dialog>` element. Affects
   * `Modal` and `ComposedModal`. When enabled, the browser's built-in dialog
   * semantics and focus management are used.
   *
   * **Note:** This flag is mutually exclusive with
   * `enableFocusWrapWithoutSentinels` — enabling both simultaneously has no
   * additional effect and will produce a console warning.
   *
   * Feature flag: `enable-dialog-element`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableDialogElement?: boolean;

  /**
   * Enable dynamic floating styles for components such as `Popover`,
   * `Tooltip`, `Dropdown`, `ComboBox`, `MultiSelect`, `MenuButton`,
   * `ComboButton`, and `OverflowMenu`. This enables precise viewport-collision
   * avoidance powered by floating-ui regardless of whether `autoAlign` is set
   * on the individual component.
   *
   * Feature flag: `enable-v12-dynamic-floating-styles`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableV12DynamicFloatingStyles?: boolean;

  /**
   * Enable enhanced `FileUploader` callbacks with richer data and expanded
   * triggers. When enabled, `onChange` also fires for file deletions and
   * `clearFiles` operations, and `onDelete` receives deleted file metadata.
   * Also exposes `getCurrentFiles` and `setCurrentFiles` on the imperative
   * handle.
   *
   * Feature flag: `enable-enhanced-file-uploader`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableEnhancedFileUploader?: boolean;

  /**
   * Enable components to remain unmounted in their closed state and mount only
   * when opened. Affects `Modal` and `ComposedModal`. Useful for reducing the
   * initial DOM footprint.
   *
   * Feature flag: `enable-presence`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enablePresence?: boolean;

  /**
   * Enable improved contrast styling for tile components by adding a border.
   * This is a **Sass-only** flag — it has no effect unless the corresponding
   * SCSS flag is also enabled in your stylesheet:
   *
   * ```scss
   * @use '@carbon/react' with (
   *   $feature-flags: ('enable-tile-contrast': true)
   * );
   * ```
   *
   * Feature flag: `enable-tile-contrast`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableTileContrast?: boolean;

  /**
   * Enable icon components within `StructuredList` to always be visible.
   * This is a **Sass-only** flag — it has no effect unless the corresponding
   * SCSS flag is also enabled in your stylesheet:
   *
   * ```scss
   * @use '@carbon/react' with (
   *   $feature-flags: ('enable-v12-structured-list-visible-icons': true)
   * );
   * ```
   *
   * Feature flag: `enable-v12-structured-list-visible-icons`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableV12StructuredListVisibleIcons?: boolean;

  /**
   * Enable reduced spacing between the `Toggle` control and its label to
   * improve visual consistency with other form inputs.
   * This is a **Sass-only** flag — it has no effect unless the corresponding
   * SCSS flag is also enabled in your stylesheet:
   *
   * ```scss
   * @use '@carbon/react' with (
   *   $feature-flags: ('enable-v12-toggle-reduced-label-spacing': true)
   * );
   * ```
   *
   * Feature flag: `enable-v12-toggle-reduced-label-spacing`
   * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
   */
  enableV12ToggleReducedLabelSpacing?: boolean;
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
  enableTileContrast = false,
  enableV12StructuredListVisibleIcons = false,
  enableV12ToggleReducedLabelSpacing = false,
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
      'enable-tile-contrast': enableTileContrast,
      'enable-v12-structured-list-visible-icons':
        enableV12StructuredListVisibleIcons,
      'enable-v12-toggle-reduced-label-spacing':
        enableV12ToggleReducedLabelSpacing,
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
    enableTileContrast,
    enableV12StructuredListVisibleIcons,
    enableV12ToggleReducedLabelSpacing,
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
   * Provide the feature flags to enabled or disabled in the current React tree
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
  enableTileContrast: PropTypes.bool,
  enableV12StructuredListVisibleIcons: PropTypes.bool,
  enableV12ToggleReducedLabelSpacing: PropTypes.bool,
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

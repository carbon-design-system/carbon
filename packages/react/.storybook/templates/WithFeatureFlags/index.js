/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import LinkTo from '@storybook/addon-links/react';

import { FeatureFlags } from '../../../src/components/FeatureFlags';

import { Annotation } from '../Annotation';

function WithFeatureFlags({
  children,
  enableV12TileDefaultIcons = true,
  enableV12TileRadioIcons = true,
  enableV12Overflowmenu = true,
  enableTreeviewControllable = true,
  enableFocusWrapWithoutSentinels = true,
  enableDialogElement = true,
  enableV12DynamicFloatingStyles = true,
  enableEnhancedFileUploader = true,
  enablePresence = true,
  enableTileContrast = true,
  enableV12StructuredListVisibleIcons = true,
  enableV12ToggleReducedLabelSpacing = true,
  ...rest
}) {
  return (
    <FeatureFlags
      enableV12TileDefaultIcons={enableV12TileDefaultIcons}
      enableV12TileRadioIcons={enableV12TileRadioIcons}
      enableV12Overflowmenu={enableV12Overflowmenu}
      enableTreeviewControllable={enableTreeviewControllable}
      enableFocusWrapWithoutSentinels={enableFocusWrapWithoutSentinels}
      enableDialogElement={enableDialogElement}
      enableV12DynamicFloatingStyles={enableV12DynamicFloatingStyles}
      enableEnhancedFileUploader={enableEnhancedFileUploader}
      enablePresence={enablePresence}
      enableTileContrast={enableTileContrast}
      enableV12StructuredListVisibleIcons={enableV12StructuredListVisibleIcons}
      enableV12ToggleReducedLabelSpacing={enableV12ToggleReducedLabelSpacing}
      {...rest}>
      <Annotation
        type="feature-flags"
        text={
          <span>
            This story is rendered with{' '}
            <LinkTo title="Getting Started/Feature Flags" name="Overview">
              all available feature flags
            </LinkTo>{' '}
            enabled
          </span>
        }>
        {children}
      </Annotation>
    </FeatureFlags>
  );
}

WithFeatureFlags.propTypes = {
  /**
   * The story to be rendered with the provided feature flags.
   */
  children: PropTypes.node,

  enableV12TileDefaultIcons: PropTypes.bool,
  enableV12TileRadioIcons: PropTypes.bool,
  enableV12Overflowmenu: PropTypes.bool,
  enableTreeviewControllable: PropTypes.bool,
  enableFocusWrapWithoutSentinels: PropTypes.bool,
  enableDialogElement: PropTypes.bool,
  enableV12DynamicFloatingStyles: PropTypes.bool,
  enableEnhancedFileUploader: PropTypes.bool,
  enablePresence: PropTypes.bool,
  enableTileContrast: PropTypes.bool,
  enableV12StructuredListVisibleIcons: PropTypes.bool,
  enableV12ToggleReducedLabelSpacing: PropTypes.bool,
};

export { WithFeatureFlags };

/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Close } from '@carbon/react/icons';
import { Button } from '@carbon/react';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg /*, carbon */ } from '../../settings';
import { useCoachmark } from './utils/context';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-header`;
const overlayBlockClass = `${pkg.prefix}--coachmark-overlay`;
const componentName = 'CoachmarkHeader';

const defaults = {
  onClose: () => {},
  showCloseButton: true,
  theme: 'light',
};

interface CoachmarkHeaderProps {
  /**
   * Function to call when the close button is clicked.
   */
  onClose?: () => void;
  /**
   * Show/hide the "X" close button.
   */
  showCloseButton?: boolean;
  /**
   * Determines the theme of the component.
   */
  theme?: 'light' | 'dark';
}

/**
 * DO NOT USE. This component is for the exclusive use
 * of other Onboarding components.
 * @deprecated This component is deprecated.
 */
export const CoachmarkHeader = React.forwardRef<
  HTMLElement,
  CoachmarkHeaderProps
>(
  (
    {
      onClose = defaults.onClose,
      showCloseButton = defaults.showCloseButton,
      theme = defaults.theme,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const closeIconDescription = useCoachmark()?.closeIconDescription;

    return (
      <header
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(blockClass, `${blockClass}__${theme}`)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {showCloseButton && (
          <div className={`${overlayBlockClass}--close-btn-container`}>
            <Button
              kind="ghost"
              size="sm"
              renderIcon={Close}
              iconDescription={closeIconDescription}
              hasIconOnly
              className={`${overlayBlockClass}--close-btn`}
              onClick={onClose}
            />
          </div>
        )}
      </header>
    );
  }
);

/**@ts-ignore*/
CoachmarkHeader.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated.`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkHeader.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkHeader.propTypes = {
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,
  /**
   * Function to call when the close button is clicked.
   */
  onClose: PropTypes.func,
  /**
   * Show/hide the "X" close button.
   */
  showCloseButton: PropTypes.bool,
  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf(['light', 'dark']),
};

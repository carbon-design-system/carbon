/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ElementType } from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Close, Idea } from '@carbon/react/icons';
import { Button, ButtonProps } from '@carbon/react';
import { getDevtoolsProps } from '../../../../../global/js/utils/devtools';
import { pkg } from '../../../../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-tagline`;
const componentName = 'CoachmarkTagline';

const defaults = {
  onClose: () => {},
  closeIconDescription: 'Close',
};

export interface CoachmarkButtonProps extends ButtonProps<ElementType> {
  onClick?(): void;
  onDoubleClick?(): void;
  tabIndex?: number;
  ['aria-expanded']?: boolean;
  id?: string;
}

export interface CoachmarkTaglineProps {
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
  /**
   * Function to call when the close button is clicked.
   */
  onClose?: () => void;
  /**
   * The title of the tagline.
   */
  title: string;
  /**
   * button props
   */
  buttonProps?: CoachmarkButtonProps;
  /**
   * Optional class name for this component.
   */
  className?: string;

  isOpen?: boolean;
}

/**
 * DO NOT USE. This component is for the exclusive use
 * of other Onboarding components.
 */
export const CoachmarkTagline = React.forwardRef<
  HTMLDivElement,
  CoachmarkTaglineProps
>(
  (
    {
      closeIconDescription = defaults.closeIconDescription,
      onClose = defaults.onClose,
      title,
      buttonProps,
      isOpen,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        {
          // Pass through any other property values as HTML attributes.
          ...rest
        }
        className={cx(
          blockClass,
          isOpen && `${blockClass}--is-open`,
          className
        )}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <button
          className={`${blockClass}__cta`}
          type="button"
          aria-label={title}
          title={title}
          {...buttonProps}
        >
          <div className={`${blockClass}__idea`} aria-hidden="true">
            <Idea size={16} />
          </div>
          <div>{title}</div>
        </button>
        <div className={`${blockClass}--close-btn-container`}>
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Close}
            iconDescription={closeIconDescription}
            hasIconOnly
            className={`${blockClass}--close-btn`}
            onClick={onClose}
          />
        </div>
      </div>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkTagline.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkTagline.propTypes = {
  /**
   * button props
   */
  buttonProps: PropTypes.shape({
    // @ts-ignore - Spreading Button.propTypes is not type-safe but necessary for PropTypes validation
    ...Button.propTypes,
    // @ts-ignore - Adding id to the shape after spreading Button.propTypes
    id: PropTypes.string,
    onClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
    tabIndex: PropTypes.number,
    ['aria-expanded']: PropTypes.bool,
  }),
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,
  /**
   * Function to call when the close button is clicked.
   */
  onClose: PropTypes.func,
  /**
   * The title of the tagline.
   */
  title: PropTypes.string.isRequired,
};

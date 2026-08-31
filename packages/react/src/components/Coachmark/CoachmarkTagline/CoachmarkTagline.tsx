/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ElementType } from 'react';
import cx from 'classnames';
import { Close, Idea } from '@carbon/icons-react';
import Button, { type ButtonProps } from '../../Button';
import { usePrefix } from '../../../internal/usePrefix';

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
   * button props
   */
  buttonProps?: CoachmarkButtonProps;
  /**
   * Optional class name for this component.
   */
  className?: string;
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
  /**
   * Whether the associated Coachmark is open (hides the tagline while open).
   */
  isOpen?: boolean;
  /**
   * Function to call when the close button is clicked.
   */
  onClose?: () => void;
  /**
   * The title of the tagline.
   */
  title: string;
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
      buttonProps,
      className,
      closeIconDescription = defaults.closeIconDescription,
      isOpen,
      onClose = defaults.onClose,
      title,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--coachmark-tagline`;

    return (
      <div
        {...rest}
        className={cx(
          blockClass,
          isOpen && `${blockClass}--is-open`,
          className
        )}
        ref={ref}
        data-component-name={componentName}>
        <button
          className={`${blockClass}__cta`}
          type="button"
          aria-label={title}
          title={title}
          {...buttonProps}>
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

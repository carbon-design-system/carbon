/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ForwardedRef, ReactNode } from 'react';
import { ButtonSize } from '../Button';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip';
import { usePrefix } from '../../internal/usePrefix';
import ButtonBase from '../Button/ButtonBase';
import deprecateValuesWithin from '../../prop-types/deprecateValuesWithin';

export const IconButtonKinds = [
  'primary',
  'secondary',
  'ghost',
  'tertiary',
] as const;

export type IconButtonKind = (typeof IconButtonKinds)[number];

export type DeprecatedIconButtonAlignment =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-bottom'
  | 'left-top'
  | 'right-bottom'
  | 'right-top';

export type NewIconButtonAlignment =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start';

export type IconButtonAlignment =
  | DeprecatedIconButtonAlignment
  | NewIconButtonAlignment;

const propMappingFunction = (deprecatedValue) => {
  const mapping = {
    'top-left': 'top-start',
    'top-right': 'top-end',
    'bottom-left': 'bottom-start',
    'bottom-right': 'bottom-end',
    'left-bottom': 'left-end',
    'left-top': 'left-start',
    'right-bottom': 'right-end',
    'right-top': 'right-start',
  };
  return mapping[deprecatedValue];
};

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: IconButtonAlignment;

  /**
   * **Experimental**: Will attempt to automatically align the tooltip
   */
  autoAlign?: boolean;

  /**
   * Optionally specify an href for your IconButton to become an `<a>` element
   */
  href?: string;

  /**
   * Provide an icon or asset to be rendered inside of the IconButton
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be added to your Button
   */
  className?: string;

  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation?: boolean;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen?: boolean;

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled?: boolean;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs?: number;

  /**
   * Specify whether the IconButton is currently selected
   */

  isSelected?: boolean;

  /**
   * Specify the type of button to be used as the base for the IconButton
   */
  kind?: IconButtonKind;

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader.
   */
  label: ReactNode;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs?: number;

  /**
   * Specify the size of the Button. Defaults to `md`.
   */
  size?: ButtonSize;

  /**
   * Specify an optional className to be added to your Tooltip wrapper
   */
  wrapperClasses?: string;
}

const IconButton = React.forwardRef(function IconButton(
  {
    align,
    autoAlign = false,
    children,
    className,
    closeOnActivation = true,
    defaultOpen = false,
    disabled,
    enterDelayMs = 100,
    kind,
    label,
    leaveDelayMs = 100,
    wrapperClasses,
    size,
    isSelected,
    ...rest
  }: IconButtonProps,
  ref: ForwardedRef<unknown> // TODO: this is unknown on Button, so should it be here as well?
) {
  const prefix = usePrefix();

  const tooltipClasses = classNames(wrapperClasses, `${prefix}--icon-tooltip`, {
    [`${prefix}--icon-tooltip--disabled`]: disabled,
  });

  return (
    <Tooltip
      align={align}
      autoAlign={autoAlign}
      closeOnActivation={closeOnActivation}
      className={tooltipClasses}
      defaultOpen={defaultOpen}
      enterDelayMs={enterDelayMs}
      label={label}
      leaveDelayMs={leaveDelayMs}>
      <ButtonBase
        {...rest}
        disabled={disabled}
        kind={kind}
        ref={ref}
        size={size}
        className={classNames(
          `${prefix}--btn--icon-only`,
          {
            [`${prefix}--btn--selected`]: isSelected,
          },
          className
        )}>
        {children}
      </ButtonBase>
    </Tooltip>
  );
});

IconButton.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: deprecateValuesWithin(
    PropTypes.oneOf([
      'top',
      'top-left', // deprecated use top-start instead
      'top-right', // deprecated use top-end instead

      'bottom',
      'bottom-left', // deprecated use bottom-start instead
      'bottom-right', // deprecated use bottom-end instead

      'left',
      'left-bottom', // deprecated use left-end instead
      'left-top', // deprecated use left-start instead

      'right',
      'right-bottom', // deprecated use right-end instead
      'right-top', // deprecated use right-start instead

      // new values to match floating-ui
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-end',
      'left-start',
      'right-end',
      'right-start',
    ]),
    //allowed prop values
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    //optional mapper function
    propMappingFunction
  ),

  /**
   * **Experimental**: Will attempt to automatically align the tooltip
   */
  autoAlign: PropTypes.bool,

  /**
   * Optionally specify an href for your IconButton to become an `<a>` element
   */
  href: PropTypes.string,

  /**
   * Provide an icon or asset to be rendered inside of the IconButton
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to your Button
   */
  className: PropTypes.string,

  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation: PropTypes.bool,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Specify whether the Button should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: PropTypes.number,

  /**
   * Specify whether the IconButton is currently selected
   */

  isSelected: PropTypes.bool,

  /**
   * Specify the type of button to be used as the base for the IconButton
   */
  kind: PropTypes.oneOf(IconButtonKinds),

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader.
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,

  /**
   * Specify the size of the Button. Defaults to `md`.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify an optional className to be added to your Tooltip wrapper
   */
  wrapperClasses: PropTypes.string,
};

export { IconButton };

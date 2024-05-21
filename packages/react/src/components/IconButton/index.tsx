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

export const IconButtonKinds = [
  'primary',
  'secondary',
  'ghost',
  'tertiary',
] as const;

export type IconButtonKind = (typeof IconButtonKinds)[number];

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?:
    | 'top'
    | 'top-left'
    | 'top-start'
    | 'top-right'
    | 'top-end'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-start'
    | 'bottom-right'
    | 'bottom-end'
    | 'left'
    | 'right';

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
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-start',
    'top-right',
    'top-end',
    'bottom',
    'bottom-left',
    'bottom-start',
    'bottom-right',
    'bottom-end',
    'left',
    'right',
  ]),

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

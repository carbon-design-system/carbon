/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ForwardedRef, ReactNode } from 'react';
import { ButtonSize } from '../Button';
import classNames from 'classnames';
import { Tooltip } from '../Tooltip';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import ButtonBase from '../Button/ButtonBase';
import deprecateValuesWithin from '../../prop-types/deprecateValuesWithin';
import BadgeIndicator from '../BadgeIndicator';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';

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
   * **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0.
   * Must be used with size="lg" and kind="ghost"
   */
  badgeCount?: number;

  /**
   * Optionally specify an href for your IconButton to become an `<a>` element
   */
  href?: React.AnchorHTMLAttributes<HTMLAnchorElement>['href'];

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
   * Specify whether a drop shadow should be rendered on the tooltip
   */
  dropShadow?: boolean;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs?: number;

  /**
   * Render the tooltip using the high-contrast theme
   */
  highContrast?: boolean;

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
   * announced to the screen reader. If using the badgeCount = 0 then provide a
   * label with describing there is a new notification.
   */
  label: ReactNode;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs?: number;

  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>['rel'];

  /**
   * Specify the size of the Button.
   */
  size?: Extract<ButtonSize, 'sm' | 'md' | 'lg'>;

  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];

  /**
   * Specify an optional className to be added to your Tooltip wrapper
   */
  wrapperClasses?: string;
}

const IconButton = React.forwardRef(function IconButton(
  {
    align,
    autoAlign = false,
    badgeCount,
    children,
    className,
    closeOnActivation = true,
    defaultOpen = false,
    disabled,
    dropShadow = false,
    enterDelayMs = 100,
    highContrast = true,
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

  if (badgeCount && (kind !== 'ghost' || size !== 'lg')) {
    console.warn(
      "The prop BadgeCount must be used with hasIconOnly=true, kind='ghost' and size='lg'"
    );
  }
  const badgeId = useId('badge-indicator');

  return (
    <Tooltip
      align={align}
      autoAlign={autoAlign}
      closeOnActivation={closeOnActivation}
      className={tooltipClasses}
      defaultOpen={defaultOpen}
      dropShadow={dropShadow}
      enterDelayMs={enterDelayMs}
      highContrast={highContrast}
      label={label}
      leaveDelayMs={leaveDelayMs}>
      <ButtonBase
        {...rest}
        disabled={disabled}
        kind={kind}
        ref={ref}
        size={size}
        isSelected={isSelected}
        hasIconOnly
        className={className}
        aria-describedby={rest['aria-describedby'] || (badgeCount && badgeId)}>
        {children}
        {!disabled && badgeCount !== undefined && (
          <BadgeIndicator
            id={badgeId}
            count={badgeCount > 0 ? badgeCount : undefined}></BadgeIndicator>
        )}
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
    mapPopoverAlign
  ),

  /**
   * **Experimental**: Will attempt to automatically align the tooltip
   */
  autoAlign: PropTypes.bool,

  /**
   * **Experimental**: Display a badge on the button. An empty/dot badge if 0, a numbered badge if > 0.
   * Must be used with size="lg", kind="ghost" and hasIconOnly=true
   */
  badgeCount: PropTypes.number,

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
   * Specify whether a drop shadow should be rendered on the tooltip
   */
  dropShadow: PropTypes.bool,

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
   * Render the tooltip using the high-contrast theme
   */
  highContrast: PropTypes.bool,

  /**
   * Specify the type of button to be used as the base for the IconButton
   */
  kind: PropTypes.oneOf(IconButtonKinds),

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * If the child node already has an `aria-label`, the tooltip will not apply
   * `aria-labelledby`. If the child node has `aria-labelledby`, that value will
   * be used instead. Otherwise, the tooltip will use its own ID as the label.
   * This means that if you have text in the child node it will not be
   * announced to the screen reader.
   * If using `badgeCount={0}`, make sure the label explains that there is a
   * new notification.
   */
  label: PropTypes.node.isRequired,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,

  /**
   * Optionally specify a `rel` when using an `<a>` element.
   */
  rel: PropTypes.string,

  /**
   * Specify the size of the Button.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Optionally specify a `target` when using an `<a>` element.
   */
  target: PropTypes.string,

  /**
   * Specify an optional className to be added to your Tooltip wrapper
   */
  wrapperClasses: PropTypes.string,
};

export { IconButton };

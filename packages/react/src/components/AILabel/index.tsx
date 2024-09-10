/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import deprecateValuesWithin from '../../prop-types/deprecateValuesWithin';
import React from 'react';

import { usePrefix } from '../../internal/usePrefix';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import { IconButton } from '../IconButton';
import { mapPopoverAlignProp } from '../../tools/createPropAdapter';
import { Undo } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import deprecate from '../../prop-types/deprecate';

export type AILabelContentProps = React.HTMLAttributes<HTMLSpanElement>;

export const AILabelContent = React.forwardRef(function AILabelContent(
  { className, children, ...rest }: AILabelContentProps,
  ref
) {
  const prefix = usePrefix();

  const hasAILabelActions = React.Children.toArray(children).some((child) => {
    const item = child as any;
    item.type?.displayName === 'AILabelActions';
  });

  const aiLabelContentClasses = cx(className, {
    [`${prefix}--slug-content`]: true,
    [`${prefix}--slug-content--with-actions`]: hasAILabelActions,
  });

  return (
    <ToggletipContent className={aiLabelContentClasses}>
      {children}
    </ToggletipContent>
  );
});

AILabelContent.displayName = 'AILabelContent';
AILabelContent.propTypes = {
  /**
   * Specify the content you want rendered inside the slug ToggleTip
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the AI slug callout
   */
  className: PropTypes.string,
};

export type AILabelActionsProps = React.HTMLAttributes<HTMLSpanElement>;

export const AILabelActions = React.forwardRef(function AILabelActions(
  { className, children, ...rest }: AILabelActionsProps,
  ref
) {
  const prefix = usePrefix();

  const aiLabelActionsClasses = cx(className, {
    [`${prefix}--slug-actions`]: true,
  });

  return (
    <ToggletipActions className={aiLabelActionsClasses}>
      {children}
    </ToggletipActions>
  );
});

AILabelActions.displayName = 'AILabelActions';
AILabelActions.propTypes = {
  /**
   * Specify the content you want rendered inside the slug callout toolbar
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the AI slug toolbar
   */
  className: PropTypes.string,
};

/**
 * Deprecated popover alignment values.
 * @deprecated Use NewPopoverAlignment instead.
 */
export type DeprecatedAlignment =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-bottom'
  | 'left-top'
  | 'right-bottom'
  | 'right-top';

export type NewAlignment =
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

export type Alignment = DeprecatedAlignment | NewAlignment;

const propMappingFunction = (deprecatedValue) => {
  return mapPopoverAlignProp(deprecatedValue);
};

interface AILabelProps {
  AILabelContent?: React.ReactNode;
  aiText?: string;
  aiTextLabel?: string;
  textLabel?: string;
  align?: Alignment;
  autoAlign?: boolean;
  children?: React.ReactNode;
  className?: string;
  kind?: 'default' | 'inline';
  onRevertClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  revertActive?: boolean;
  revertLabel?: string;
  size?: 'mini' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  'aria-label'?: string;
  slugLabel?: string;
}

export const AILabel = React.forwardRef<HTMLDivElement, AILabelProps>(
  function AILabel(
    {
      aiText = 'AI',
      aiTextLabel,
      textLabel,
      align,
      autoAlign = true,
      children,
      className,
      kind = 'default',
      onRevertClick,
      revertActive,
      revertLabel = 'Revert to AI input',
      slugLabel = 'Show information',
      ['aria-label']: ariaLabel = 'Show information',
      size = 'xs',
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();
    const id = useId('AILabel');

    const aiLabelClasses = cx(className, {
      [`${prefix}--slug`]: true,
      [`${prefix}--slug--revert`]: revertActive,
    });

    const aiLabelButtonClasses = cx({
      [`${prefix}--slug__button`]: true,
      [`${prefix}--slug__button--${size}`]: size,
      [`${prefix}--slug__button--${kind}`]: kind,
      [`${prefix}--slug__button--inline-with-content`]:
        kind === 'inline' && (aiTextLabel || textLabel),
    });

    const handleOnRevertClick = (evt) => {
      if (onRevertClick) {
        onRevertClick(evt);
      }
    };

    const ariaLabelText =
      !aiTextLabel && !textLabel
        ? `${aiText} - ${slugLabel || ariaLabel}`
        : `${aiText} - ${aiTextLabel || textLabel}`;

    return (
      <div className={aiLabelClasses} ref={ref} id={id}>
        {revertActive ? (
          <IconButton
            onClick={handleOnRevertClick}
            kind="ghost"
            size="sm"
            label={revertLabel}
            {...rest}>
            <Undo />
          </IconButton>
        ) : (
          <Toggletip align={align} autoAlign={autoAlign} {...rest}>
            <ToggletipButton
              className={aiLabelButtonClasses}
              label={ariaLabelText}>
              <span className={`${prefix}--slug__text`}>{aiText}</span>
              {kind === 'inline' && (aiTextLabel || textLabel) && (
                <span className={`${prefix}--slug__additional-text`}>
                  {aiTextLabel || textLabel}
                </span>
              )}
            </ToggletipButton>
            {children}
          </Toggletip>
        )}
      </div>
    );
  }
);

AILabel.displayName = 'AILabel';
AILabel.propTypes = {
  /**
   * Specify the content you want rendered inside the `AILabel` ToggleTip
   */
  AILabelContent: PropTypes.node,

  /**
   * Specify the correct translation of the AI text
   */
  aiText: PropTypes.string,

  /**
   * @deprecated
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  aiTextLabel: deprecate(
    PropTypes.string,
    '`aiTextLabel` on `AILabel` has been deprecated - Please use the `textLabel` prop instead'
  ),

  /**
   * Specify how the popover should align with the button
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
   * Specify the text that will be provided to the aria-label of the `AILabel` button
   */
  'aria-label': PropTypes.string,

  /**
   * Will auto-align the popover. This prop is currently experimental and is subject to future changes.
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the content you want rendered inside the `AILabel` ToggleTip
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the `AILabel`
   */
  className: PropTypes.string,

  /**
   * Specify the type of `AILabel`, from the following list of types:
   */
  kind: PropTypes.oneOf(['default', 'inline']),

  /**
   * Callback function that fires when the revert button is clicked
   */
  onRevertClick: PropTypes.func,

  /**
   * Specify whether the revert button should be visible
   */
  revertActive: PropTypes.bool,

  /**
   * Specify the text that should be shown when the revert button is hovered
   */
  revertLabel: PropTypes.string,

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size: PropTypes.oneOf(['mini', '2xs', 'xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * @deprecated
   * Specify the text that will be provided to the aria-label of the `AILabel` button
   */
  slugLabel: deprecate(
    PropTypes.string,
    '`slugLabel` on `AILabel` has been deprecated - Please use the `ariaLabel` prop instead'
  ),

  /**
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  textLabel: PropTypes.string,
};

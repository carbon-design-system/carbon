/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { usePrefix } from '../../internal/usePrefix';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';
import { IconButton } from '../IconButton';
import { Undo } from '@carbon/icons-react';
import { useId } from '../../internal/useId';

export const SlugContent = React.forwardRef(function SlugContent(
  { children, className },
  ref
) {
  const prefix = usePrefix();

  const slugContentClasses = cx(className, {
    [`${prefix}--slug-content`]: true,
  });

  return (
    <ToggletipContent className={slugContentClasses} ref={ref}>
      {children}
    </ToggletipContent>
  );
});

SlugContent.propTypes = {
  /**
   * Specify the content you want rendered inside the slug ToggleTip
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the AI slug callout
   */
  className: PropTypes.string,
};

export const SlugActions = React.forwardRef(function SlugActions(
  { children, className },
  ref
) {
  const prefix = usePrefix();

  const slugActionBarClasses = cx(className, {
    [`${prefix}--slug-actions`]: true,
  });

  return (
    <ToggletipActions className={slugActionBarClasses} ref={ref}>
      {children}
    </ToggletipActions>
  );
});

SlugActions.propTypes = {
  /**
   * Specify the content you want rendered inside the slug callout toolbar
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the AI slug toolbar
   */
  className: PropTypes.string,
};

export const Slug = React.forwardRef(function Slug(
  {
    aiText = 'AI',
    aiTextLabel,
    align,
    autoAlign = true,
    children,
    className,
    dotType,
    kind = 'default',
    onRevertClick,
    revertActive,
    revertLabel = 'Revert to AI input',
    slugLabel = 'Show information',
    size = 'xs',
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const id = useId('slug');

  const slugClasses = cx(className, {
    [`${prefix}--slug`]: true,
    [`${prefix}--slug--hollow`]: kind === 'hollow' || dotType === 'hollow',
    // Need to come up with a better name; explainable?
    // Need to be able to target the non-hollow variant another way
    // other than using `:not` all over the styles
    [`${prefix}--slug--enabled`]: kind !== 'hollow' && dotType !== 'hollow',
    [`${prefix}--slug--revert`]: revertActive,
  });

  const slugButtonClasses = cx({
    [`${prefix}--slug__button`]: true,
    [`${prefix}--slug__button--${size}`]: size,
    [`${prefix}--slug__button--${kind}`]: kind,
    [`${prefix}--slug__button--inline-with-content`]:
      kind === 'inline' && aiTextLabel,
  });

  const handleOnRevertClick = (evt) => {
    if (onRevertClick) {
      onRevertClick(evt);
    }
  };

  const ariaLabel = !aiTextLabel
    ? `${aiText} - ${slugLabel}`
    : `${aiText} - ${aiTextLabel}`;

  return (
    <div className={slugClasses} ref={ref} id={id}>
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
          <ToggletipButton className={slugButtonClasses} label={ariaLabel}>
            <span className={`${prefix}--slug__text`}>{aiText}</span>
            {aiTextLabel && (
              <span className={`${prefix}--slug__additional-text`}>
                {aiTextLabel}
              </span>
            )}
          </ToggletipButton>
          {children}
        </Toggletip>
      )}
    </div>
  );
});

Slug.displayName = 'Slug';
Slug.propTypes = {
  /**
   * Specify the correct translation of the AI text
   */
  aiText: PropTypes.string,

  /**
   * Specify additional text to be rendered next to the AI label in the inline variant
   */
  aiTextLabel: PropTypes.string,

  /**
   * Specify how the popover should align with the button
   */
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',

    'bottom',
    'bottom-left',
    'bottom-right',

    'left',
    'left-bottom',
    'left-top',

    'right',
    'right-bottom',
    'right-top',
  ]),

  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the content you want rendered inside the slug ToggleTip
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be added to the AI slug
   */
  className: PropTypes.string,

  /**
   * Specify the type of dot that should be rendered in front of the inline variant
   */
  dotType: PropTypes.oneOf(['default', 'hollow']),

  /**
   * Specify the type of Slug, from the following list of types:
   */
  kind: PropTypes.oneOf(['default', 'hollow', 'inline']),

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
   * Specify the content you want rendered inside the slug ToggleTip
   */
  slugContent: PropTypes.node,

  /**
   * Specify the text that will be provided to the aria-label of the `Slug` button
   */
  slugLabel: PropTypes.string,
};

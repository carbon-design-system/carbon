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

const Slug = React.forwardRef(function Slug(
  { aiText = 'AI', align, autoAlign = false, size = 'sm', slugContent },
  ref
) {
  const prefix = usePrefix();

  const slugClasses = cx({
    [`${prefix}--ai-slug`]: true,
  });

  const slugButtonClasses = cx({
    [`${prefix}--ai-slug__button`]: true,
    [`${prefix}--ai-slug__button--${size}`]: size,
  });

  return (
    <div className={slugClasses} ref={ref}>
      <Toggletip align={align} autoAlign={autoAlign}>
        <ToggletipButton className={slugButtonClasses} label="Show information">
          <span className={`${prefix}--ai-slug__text`}>{aiText}</span>
        </ToggletipButton>
        <ToggletipContent>
          {slugContent}
          <ToggletipActions></ToggletipActions>
        </ToggletipContent>
      </Toggletip>
    </div>
  );
});

Slug.propTypes = {
  /**
   * Specify the correct translation of the AI text
   */
  aiText: PropTypes.string,

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
   * Specify the size of the button, from the following list of sizes:
   */
  size: PropTypes.oneOf(['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * Specify the content you want rendered inside the slug ToggleTip
   */
  slugContent: PropTypes.node,
};

export default Slug;

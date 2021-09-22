/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

function CodeSnippetSkeleton({
  className: containerClassName,
  type = 'single',
  ...rest
}) {
  const prefix = usePrefix();
  const className = cx(containerClassName, {
    [`${prefix}--snippet`]: true,
    [`${prefix}--skeleton`]: true,
    [`${prefix}--snippet--single`]: type === 'single',
    [`${prefix}--snippet--multi`]: type === 'multi',
  });

  if (type === 'single') {
    return (
      <div className={className} {...rest}>
        <div className={`${prefix}--snippet-container`}>
          <span />
        </div>
      </div>
    );
  }

  if (type === 'multi') {
    return (
      <div className={className} {...rest}>
        <div className={`${prefix}--snippet-container`}>
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }
}

CodeSnippetSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * The type of the code snippet, including single or multi
   */
  type: PropTypes.oneOf(['single', 'multi']),
};

export default CodeSnippetSkeleton;

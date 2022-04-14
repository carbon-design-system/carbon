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

const Content = ({
  className: customClassName,
  children,
  tagName,
  ...rest
}) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--content`, customClassName);
  return React.createElement(
    tagName,
    {
      ...rest,
      className,
    },
    children
  );
};

Content.propTypes = {
  /**
   * Provide children nodes to be rendered in the content container
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class name that is applied to the container
   */
  className: PropTypes.string,

  /**
   * Optionally specify the tag of the content node. Defaults to `main`
   */
  tagName: PropTypes.string,
};

Content.defaultProps = {
  tagName: 'main',
};

export default Content;

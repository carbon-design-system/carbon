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
import { Theme } from './Theme';

function Zone({ className: customClassName, children, theme, ...rest }) {
  const prefix = usePrefix();
  const className = cx(customClassName, `${prefix}--zone`);
  return (
    <Theme {...rest} className={className} theme={theme}>
      {children}
    </Theme>
  );
}

Zone.propTypes = {
  /**
   * Provide child elements to be rendered inside of `Zone`
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be used on the outermost element rendered by
   * the component
   */
  className: PropTypes.string,

  /**
   * Specify the global theme for your app
   */
  theme: PropTypes.oneOf(['white', 'g10', 'g90', 'g100']),
};

export { Zone };

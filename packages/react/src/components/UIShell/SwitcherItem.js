/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

const SwitcherItem = React.forwardRef(function SwitcherItem(props, ref) {
  const { className: customClassName, children } = props;

  const className = cx(`${prefix}--switcher__item`, {
    [customClassName]: !!customClassName,
  });

  return (
    <li ref={ref} className={className}>
      {children}
    </li>
  );
});

SwitcherItem.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.string,
};

export default SwitcherItem;

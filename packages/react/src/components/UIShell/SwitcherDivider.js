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

const { prefix } = settings;

const SwitcherDivider = ({ className: customClassName, ...other }) => {
  const className = cx(`${prefix}--switcher__item--divider`, {
    [customClassName]: !!customClassName,
  });

  return <hr {...other} className={className} />;
};

SwitcherDivider.propTypes = {
  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,
};

export default SwitcherDivider;

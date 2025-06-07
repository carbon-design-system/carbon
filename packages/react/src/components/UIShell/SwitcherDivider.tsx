/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

export interface SwitcherDividerProps {
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;
}

const SwitcherDivider: React.FC<SwitcherDividerProps> = ({
  className: customClassName,
  ...other
}) => {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--switcher__item--divider`, {
    [customClassName || '']: !!customClassName,
  });

  return <hr {...other} className={classNames} />;
};

SwitcherDivider.propTypes = {
  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,
};

export default SwitcherDivider;

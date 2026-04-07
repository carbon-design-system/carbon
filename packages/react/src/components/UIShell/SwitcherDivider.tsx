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
   * Optionally provide a custom class to apply to the underlying `<hr>` node
   */
  className?: string;
}

const SwitcherDivider = ({
  className: customClassName,
  ...other
}: SwitcherDividerProps) => {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--switcher__item--divider`, {
    [customClassName || '']: !!customClassName,
  });

  return (
    <li>
      <hr {...other} className={classNames} />
    </li>
  );
};

SwitcherDivider.propTypes = {
  /**
   * Optionally provide a custom class to apply to the underlying `<hr>` node
   */
  className: PropTypes.string,
};

export default SwitcherDivider;

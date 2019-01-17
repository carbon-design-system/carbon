/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconCaretDown, iconCaretUp } from 'carbon-icons';
import { settings } from 'carbon-components';
import Icon from '../Icon';

const { prefix } = settings;

const TableHeader = props => {
  const {
    children,
    className,
    iconClassName,
    sortDir,
    iconDescriptionAscending,
    iconDescriptionDescending,
    ...other
  } = props;

  const tableHeaderClasses = classNames(className, `${prefix}--table-header`);

  const iconClasses = classNames(iconClassName, `${prefix}--table-sort__svg`);

  let sortContent;
  if (sortDir) {
    sortContent =
      sortDir === 'DESC' ? (
        <Icon
          icon={iconCaretDown}
          description={iconDescriptionDescending}
          className={iconClasses}
        />
      ) : (
        <Icon
          icon={iconCaretUp}
          description={iconDescriptionAscending}
          className={iconClasses}
        />
      );
  } else {
    sortContent = '';
  }

  return (
    <th {...other} className={tableHeaderClasses}>
      {children}
      {sortContent}
    </th>
  );
};

TableHeader.propTypes = {
  /**
   * Provide the contents of your TableHeader.
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to your TableHeader.
   */
  className: PropTypes.string,

  /**
   * The CSS class name for the icon.
   */
  iconClassName: PropTypes.string,

  /**
   * The description for the ascending icon.
   */
  iconDescriptionAscending: PropTypes.string,

  /**
   * The description for the descending icon.
   */
  iconDescriptionDescending: PropTypes.string,

  /**
   * The sorting direction, `DESC` or `ASC`.
   */
  sortDir: PropTypes.string,
};

TableHeader.defaultProps = {
  iconDescriptionAscending: 'ascending sort',
  iconDescriptionDescending: 'descending sort',
};

export default TableHeader;

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconCaretDown, iconCaretUp } from 'carbon-icons';
import Icon from '../Icon';

const TableHeader = props => {
  const { children, className, iconClassName, sortDir, ...other } = props;

  const tableHeaderClasses = classNames(className, 'bx--table-header');

  const iconClasses = classNames(iconClassName, 'bx--table-sort__svg');

  let sortContent;
  if (sortDir) {
    sortContent =
      sortDir === 'DESC' ? (
        <Icon
          icon={iconCaretDown}
          description="descending sort"
          className={iconClasses}
        />
      ) : (
        <Icon
          icon={iconCaretUp}
          description="ascending sort"
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
  children: PropTypes.node,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  sortDir: PropTypes.string,
};

export default TableHeader;

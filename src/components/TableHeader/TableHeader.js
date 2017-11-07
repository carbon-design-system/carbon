import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
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
          name="caret--down"
          description="descending sort"
          className={iconClasses}
        />
      ) : (
        <Icon
          name="caret--up"
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

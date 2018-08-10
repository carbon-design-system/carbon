import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconCaretDown, iconCaretUp } from 'carbon-icons';
import Icon from '../Icon';

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

  const tableHeaderClasses = classNames(className, 'bx--table-header');

  const iconClasses = classNames(iconClassName, 'bx--table-sort__svg');

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
  children: PropTypes.node,
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

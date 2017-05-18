import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './Icon';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  expanded: PropTypes.bool,
};

const TableData = (props) => {
  const {
    children,
    className,
    iconClassName,
    expanded,
    ...other,
  } = props;

  const tableDataClasses = classNames(
    className
  );

  const iconClasses = classNames(
    iconClassName,
    'bx--table-expand__svg',
  );

  const style = (expanded) ? {
    transform: 'rotate(90deg)',
  } : {};

  return (
    <td
      {...other}
      className={tableDataClasses}
    >
      {expanded === undefined ? children :
        <Icon
          className={iconClasses}
          name="chevron--right"
          description="expand row"
          style={style}
        />
      }
    </td>
  );
};

TableData.propTypes = propTypes;

export default TableData;

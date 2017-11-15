import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const TableData = props => {
  const { children, className, iconClassName, expanded, ...other } = props;

  const tableDataClasses = classNames(className);

  const iconClasses = classNames(iconClassName, 'bx--table-expand__svg');

  const style = expanded
    ? {
        transform: 'rotate(90deg)',
      }
    : {};

  return (
    <td {...other} className={tableDataClasses}>
      {expanded === undefined ? (
        children
      ) : (
        <Icon
          className={iconClasses}
          name="chevron--right"
          description="expand row"
          style={style}
          tabIndex={0}
          onKeyPress={evt => {
            if (props.onClick && (evt.which === 13 || evt.which === 32)) {
              props.onClick(evt);
            }
          }}
        />
      )}
    </td>
  );
};

TableData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  expanded: PropTypes.bool,
};

export default TableData;

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconChevronRight } from 'carbon-icons';
import Icon from '../Icon';

const TableData = props => {
  const {
    children,
    className,
    iconClassName,
    expanded,
    iconDescription,
    ...other
  } = props;

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
          icon={iconChevronRight}
          description={iconDescription}
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

  /**
   * The CSS class name for the icon.
   */
  iconClassName: PropTypes.string,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string,

  /**
   * The expanded state for expando cell. `undefined` for regular cells.
   */
  expanded: PropTypes.bool,
};

TableData.defaultProps = {
  iconDescription: 'expand row',
};

export default TableData;

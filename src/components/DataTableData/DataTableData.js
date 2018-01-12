import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import classNames from 'classnames';

const DataTableData = props => {
  const {
    children,
    className,
    isSelectable,
    isSelected,
    value,
    id,
    isExpandable,
    isExpanded,
    ...other
  } = props;

  const selectableElement = (
    <span>
      <input
        checked={isSelected}
        id={id}
        className="bx--checkbox"
        type="checkbox"
        value={value}
        name={id}
      />
      <label htmlFor={id} className="bx--checkbox-label" />
    </span>
  );

  const expandedElement = (
    <button className="bx--table-expand-v2__button">
      <Icon
        name="chevron--right"
        description="Expandable icon"
        className="bx--table-expand-v2__svg"
      />
    </button>
  );

  const tableDataClassnames = classNames(className, {
    'bx--table-expand-v2': isExpandable,
  });

  return (
    <td
      className={tableDataClassnames}
      {...other}
      data-previous-value={isExpanded ? 'collapsed' : ''}>
      {isSelectable && selectableElement}
      {isExpandable && expandedElement}
      {children}
    </td>
  );
};

DataTableData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default DataTableData;

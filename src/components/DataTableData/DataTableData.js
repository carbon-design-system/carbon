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
      <label htmlFor={id} className="bx--checkbox-label">
        <span className="bx--checkbox-appearance">
          <svg
            className="bx--checkbox-checkmark"
            width="12"
            height="9"
            viewBox="0 0 12 9"
            fillRule="evenodd">
            <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z" />
          </svg>
        </span>
      </label>
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

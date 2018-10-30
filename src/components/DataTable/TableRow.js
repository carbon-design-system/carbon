import React from 'react';
import omit from 'lodash.omit';
import cx from 'classnames';

const TableRow = props => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const className = cx(props.className, {
    'bx--data-table-v2--selected': props.isSelected,
  });
  const cleanProps = {
    ...omit(props, ['ariaLabel', 'onExpand', 'isExpanded', 'isSelected']),
    className: className || undefined,
  };
  return <tr {...cleanProps} />;
};

export default TableRow;

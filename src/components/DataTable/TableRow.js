import React from 'react';
import omit from 'lodash.omit';

const TableRow = props => {
  // Remove unnecessary props if provided to this component, these are
  // only useful in `TableExpandRow`
  const cleanProps = omit(props, ['ariaLabel', 'onExpand', 'isExpanded']);
  return <tr {...cleanProps} />;
};

export default TableRow;

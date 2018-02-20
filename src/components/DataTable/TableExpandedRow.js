import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TableExpandedRow = ({
  className: customClassName,
  children,
  ...rest
}) => {
  const className = cx('bx--expandable-row-v2', customClassName);
  return (
    <tr {...rest} className={className} data-child-row>
      {children}
    </tr>
  );
};

TableExpandedRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TableExpandedRow;

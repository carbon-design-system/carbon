import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableExpandedRow = ({
  className: customClassName,
  children,
  ...rest
}) => {
  const className = cx(`${prefix}--expandable-row-v2`, customClassName);
  return (
    <tr {...rest} className={className} data-child-row>
      {children}
    </tr>
  );
};

TableExpandedRow.propTypes = {
  /**
   * Pass in the contents for your TableExpandedRow
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,
};

export default TableExpandedRow;

import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const TableBody = props => {
  const { children, className, ...other } = props;

  const tableBodyClasses = classNames(className, 'bx--table-body');

  const childArray = React.Children.toArray(children);
  const hasExpandedRows = childArray.some(
    child => child.type.name === 'TableRowExpanded'
  );

  const childrenWithProps = hasExpandedRows
    ? childArray.map((child, index) => {
        if (Math.floor(index / 2) % 2 === 0) {// eslint-disable-line
          return React.cloneElement(child, {
            even: true,
          });
        }

        return child; // eslint-disable-line
      }) // eslint-disable-line
    : childArray.map((child, index) => {
        if (index % 2 === 0) { // eslint-disable-line
          return React.cloneElement(child, {
            even: true,
          });
        }

        return child; // eslint-disable-line
      }); // eslint-disable-line

  return (
    <tbody {...other} className={tableBodyClasses}>
      {childrenWithProps}
    </tbody>
  );
};

TableBody.propTypes = propTypes;

export default TableBody;

/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';

export interface TableDecoratorRowProps {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableDecoratorRow` component
   */
  decorator?: ReactNode;
}

const TableDecoratorRow = ({
  className,
  decorator,
}: TableDecoratorRowProps) => {
  const prefix = usePrefix();
  const TableDecoratorRowClasses = classNames({
    ...(className && { [className]: true }),
    [`${prefix}--table-column-decorator`]: true,
    [`${prefix}--table-column-decorator--active`]: decorator,
  });

  let normalizedDecorator = React.isValidElement(decorator)
    ? (decorator as ReactNode)
    : null;
  if (
    normalizedDecorator &&
    normalizedDecorator['type']?.displayName === 'AILabel'
  ) {
    normalizedDecorator = React.cloneElement(
      normalizedDecorator as React.ReactElement<any>,
      {
        size: 'mini',
      }
    );
  }

  return <td className={TableDecoratorRowClasses}>{normalizedDecorator}</td>;
};

TableDecoratorRow.displayName = 'TableDecoratorRow';
TableDecoratorRow.propTypes = {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * **Experimental**: Provide a `decorator` component to be rendered inside the `TableDecoratorRow` component
   */
  decorator: PropTypes.node,
};

export default TableDecoratorRow;

/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { cloneElement, type ReactNode } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { AILabel } from '../AILabel';
import { isComponentElement } from '../../internal';

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

  const decoratorIsAILabel = isComponentElement(decorator, AILabel);
  const normalizedDecorator = decoratorIsAILabel
    ? cloneElement(decorator, { size: 'mini' })
    : null;

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

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, {
  cloneElement,
  isValidElement,
  useEffect,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { deprecateComponent } from '../../prop-types/deprecateComponent';

export interface TableSlugRowProps {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * Provide a `Slug` component to be rendered inside the `TableSlugRow` component
   */
  slug?: ReactNode;
}

const TableSlugRow = ({ className, slug }: TableSlugRowProps) => {
  useEffect(() => {
    deprecateComponent(
      'TableSlugRow',
      'The `TableSlugRow` component has been deprecated and will be removed in the next major version. Use the TableDecoratorRow component instead.'
    );
  }, []);

  const prefix = usePrefix();
  const TableSlugRowClasses = classNames({
    ...(className && { [className]: true }),
    [`${prefix}--table-column-slug`]: true,
    [`${prefix}--table-column-slug--active`]: slug,
  });

  // Slug is always size `mini`
  const normalizedSlug = isValidElement<{ size?: string }>(slug)
    ? cloneElement(slug, {
        size: 'mini',
      })
    : undefined;

  return <td className={TableSlugRowClasses}>{normalizedSlug}</td>;
};

TableSlugRow.displayName = 'TableSlugRow';
TableSlugRow.propTypes = {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className: PropTypes.string,

  /**
   * Provide a `Slug` component to be rendered inside the `TableSlugRow` component
   */
  slug: PropTypes.node,
};

export default TableSlugRow;

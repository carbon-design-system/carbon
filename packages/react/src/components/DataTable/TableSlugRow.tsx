/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface TableSlugRowProps {
  /**
   * The CSS class names of the cell that wraps the underlying input control
   */
  className?: string;

  /**
   * Provide a `Slug` component to be rendered inside the `TableSlugRow` component
   */
  slug?: ReactNodeLike;
}

const TableSlugRow = ({ className, slug }: TableSlugRowProps) => {
  const prefix = usePrefix();
  const TableSlugRowClasses = classNames({
    ...(className && { [className]: true }),
    [`${prefix}--table-column-slug`]: true,
    [`${prefix}--table-column-slug--active`]: slug,
  });

  // Slug is always size `mini`
  let normalizedSlug;
  if (slug) {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'mini',
    });
  }

  return <td className={TableSlugRowClasses}>{normalizedSlug}</td>;
};

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

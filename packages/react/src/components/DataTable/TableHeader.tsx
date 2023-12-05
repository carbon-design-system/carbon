/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes, { ReactNodeLike } from 'prop-types';
import React, { MouseEventHandler, useRef } from 'react';
import {
  ArrowUp as Arrow,
  ArrowsVertical as Arrows,
} from '@carbon/icons-react';
import classNames from 'classnames';
import { sortStates } from './state/sorting';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';

const defaultScope = 'col';

const translationKeys: { [key: string]: string } = {
  buttonDescription: 'carbon.table.header.icon.description',
};

interface translateWithIdAdditionalArgs {
  header?: string;
  sortDirection?: string;
  isSortHeader?: boolean;
  sortStates?: typeof sortStates;
}

const translateWithId = (
  key: string,
  args?: translateWithIdAdditionalArgs
): string => {
  if (args && key === translationKeys.buttonDescription) {
    if (args.isSortHeader && sortStates) {
      // When transitioning, we know that the sequence of states is as follows:
      // NONE -> ASC -> DESC -> NONE
      if (args.sortDirection === sortStates.NONE) {
        return `Click to sort rows by ${args.header} header in ascending order`;
      }
      if (args.sortDirection === sortStates.ASC) {
        return `Click to sort rows by ${args.header} header in descending order`;
      }

      return `Click to unsort rows by ${args.header} header`;
    }
    return `Click to sort rows by ${args.header} header in ascending order`;
  }

  return '';
};

const sortDirections: { [key: string]: 'none' | 'ascending' | 'descending' } = {
  [sortStates.NONE]: 'none',
  [sortStates.ASC]: 'ascending',
  [sortStates.DESC]: 'descending',
};

interface TableHeaderProps
  extends ReactAttr<HTMLTableCellElement & HTMLButtonElement> {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify `colSpan` as a non-negative integer value to indicate how
   * many columns the TableHeader cell extends in a table
   */
  colSpan?: number;

  /**
   * Supply an id to the th element.
   */
  id?: string;

  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader?: boolean;

  /**
   * Specify whether this header is one through which a user can sort the table
   */
  isSortable?: boolean;

  /**
   * Hook that is invoked when the header is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Specify the scope of this table header. You can find more info about this
   * attribute at the following URL:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope?: string;

  /**
   * **Experimental**: Provide a `Slug` component to be rendered inside the `TableSlugRow` component
   */
  slug?: ReactNodeLike;

  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection?: string;

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are available on the `translationKeys` field for
   * this component.
   */
  translateWithId?: (
    key: string,
    { header, sortDirection, isSortHeader, sortStates }
  ) => string;
}

const TableHeader = React.forwardRef(function TableHeader(
  {
    className: headerClassName,
    children,
    colSpan,
    isSortable = false,
    isSortHeader,
    onClick,
    scope = defaultScope,
    sortDirection,
    translateWithId: t = translateWithId,
    slug,
    id,
    ...rest
  }: TableHeaderProps,
  ref: React.Ref<HTMLTableCellElement>
) {
  const prefix = usePrefix();
  const uniqueId = useId('table-sort');

  // Slug is always size `mini`
  const slugRef = useRef<HTMLInputElement>(null);
  let normalizedSlug;
  if (slug) {
    normalizedSlug = React.cloneElement(slug as React.ReactElement<any>, {
      size: 'mini',
      ref: slugRef,
    });
  }

  const headerLabelClassNames = classNames({
    [`${prefix}--table-header-label`]: true,
    [`${prefix}--table-header-label--slug`]: slug,
  });

  if (!isSortable) {
    return (
      <th
        {...rest}
        id={id}
        className={headerClassName}
        scope={scope}
        colSpan={colSpan}
        ref={ref}>
        {children ? (
          <div className={headerLabelClassNames}>
            {children}
            {normalizedSlug}
          </div>
        ) : null}
      </th>
    );
  }

  const className = cx(headerClassName, {
    [`${prefix}--table-sort`]: true,
    [`${prefix}--table-sort--active`]:
      isSortHeader && sortDirection !== sortStates.NONE,
    [`${prefix}--table-sort--descending`]:
      isSortHeader && sortDirection === sortStates.DESC,
  });
  const ariaSort =
    !isSortHeader || !sortDirection ? 'none' : sortDirections[sortDirection];
  const sortDescription =
    t &&
    t('carbon.table.header.icon.description', {
      header: children,
      sortDirection,
      isSortHeader,
      sortStates,
    });

  const headerClasses = cx(headerClassName, `${prefix}--table-sort__header`, {
    [`${prefix}--table-sort__header--slug`]: slug,
  });

  const handleClick = (evt) => {
    if (slug && slugRef.current && slugRef.current.contains(evt.target)) {
      return;
    } else if (onClick) {
      return onClick(evt);
    }
  };

  return (
    <th
      id={id}
      aria-sort={ariaSort}
      className={headerClasses}
      colSpan={colSpan}
      ref={ref}
      scope={scope}>
      <div className={`${prefix}--table-sort__description`} id={uniqueId}>
        {sortDescription}
      </div>
      <button
        type="button"
        aria-describedby={uniqueId}
        className={className}
        onClick={handleClick}
        {...rest}>
        <span className={`${prefix}--table-sort__flex`}>
          <div className={`${prefix}--table-header-label`}>{children}</div>
          {normalizedSlug}
          <Arrow size={20} className={`${prefix}--table-sort__icon`} />
          <Arrows
            size={20}
            className={`${prefix}--table-sort__icon-unsorted`}
          />
        </span>
      </button>
    </th>
  );
});

TableHeader.propTypes = {
  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify `colSpan` as a non-negative integer value to indicate how
   * many columns the TableHeader cell extends in a table
   */
  colSpan: PropTypes.number,

  /**
   * Supply an id to the th element.
   */
  id: PropTypes.string,

  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader: PropTypes.bool,

  /**
   * Specify whether this header is one through which a user can sort the table
   */
  isSortable: PropTypes.bool,

  /**
   * Hook that is invoked when the header is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the scope of this table header. You can find more info about this
   * attribute at the following URL:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope: PropTypes.string,

  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection: PropTypes.oneOf(Object.values(sortStates)),

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are available on the `translationKeys` field for
   * this component.
   */
  translateWithId: PropTypes.func,
};

(TableHeader as any).translationKeys = Object.values(translationKeys);

TableHeader.displayName = 'TableHeader';

export default TableHeader;

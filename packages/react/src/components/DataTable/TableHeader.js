/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';
import {
  ArrowUp20 as Arrow,
  ArrowsVertical20 as Arrows,
} from '@carbon/icons-react';
import { sortStates } from './state/sorting';

const { prefix } = settings;

const translationKeys = {
  iconDescription: 'carbon.table.header.icon.description',
};

const translateWithId = (key, { sortDirection, isSortHeader, sortStates }) => {
  if (key === translationKeys.iconDescription) {
    if (isSortHeader) {
      // When transitioning, we know that the sequence of states is as follows:
      // NONE -> ASC -> DESC -> NONE
      if (sortDirection === sortStates.NONE) {
        return 'Sort rows by this header in ascending order';
      }
      if (sortDirection === sortStates.ASC) {
        return 'Sort rows by this header in descending order';
      }

      return 'Unsort rows by this header';
    }
    return 'Sort rows by this header in ascending order';
  }

  return '';
};

const sortDirections = {
  [sortStates.NONE]: 'none',
  [sortStates.ASC]: 'ascending',
  [sortStates.DESC]: 'descending',
};

const TableHeader = React.forwardRef(function TableHeader(
  {
    className: headerClassName,
    children,
    isSortable,
    isSortHeader,
    onClick,
    scope,
    sortDirection,
    translateWithId: t,
    ...rest
  },
  ref
) {
  if (!isSortable) {
    return (
      <th {...rest} className={headerClassName} scope={scope}>
        <span className={`${prefix}--table-header-label`}>{children}</span>
      </th>
    );
  }

  const className = cx(headerClassName, {
    [`${prefix}--table-sort`]: true,
    [`${prefix}--table-sort--active`]:
      isSortHeader && sortDirection !== sortStates.NONE,
    [`${prefix}--table-sort--ascending`]:
      isSortHeader && sortDirection === sortStates.DESC,
  });
  const ariaSort = !isSortHeader ? 'none' : sortDirections[sortDirection];

  return (
    <th
      scope={scope}
      className={headerClassName}
      aria-sort={ariaSort}
      ref={ref}>
      <button className={className} onClick={onClick} {...rest}>
        <span className={`${prefix}--table-header-label`}>{children}</span>
        <Arrow
          className={`${prefix}--table-sort__icon`}
          aria-label={t('carbon.table.header.icon.description', {
            header: children,
            sortDirection,
            isSortHeader,
            sortStates,
          })}
        />
        <Arrows
          className={`${prefix}--table-sort__icon-unsorted`}
          aria-label={t('carbon.table.header.icon.description', {
            header: children,
            sortDirection,
            isSortHeader,
            sortStates,
          })}
        />
      </button>
    </th>
  );
});

TableHeader.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,

  /**
   * Specify whether this header is one through which a user can sort the table
   */
  isSortable: PropTypes.bool,

  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader: PropTypes.bool,

  /**
   * Hook that is invoked when the header is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the scope of this table header. You can find more info about this
   * attribute at the following URL:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope: PropTypes.string.isRequired,

  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection: PropTypes.oneOf(Object.values(sortStates)),

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are avabile on the `translationKeys` field for
   * this component.
   */
  translateWithId: PropTypes.func,
};

TableHeader.defaultProps = {
  isSortable: false,
  scope: 'col',
  translateWithId,
};

TableHeader.translationKeys = Object.values(translationKeys);

TableHeader.displayName = 'TableHeader';

export default TableHeader;

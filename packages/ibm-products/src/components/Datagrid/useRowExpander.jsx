/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import { pkg } from '../../settings';
import cx from 'classnames';
import { useFocusRowExpander } from './useFocusRowExpander';
import { usePrefix } from '@carbon/react';

const blockClass = `${pkg.prefix}--datagrid`;

const useRowExpander = (hooks) => {
  const tempState = useRef(undefined);
  const lastExpandedRowIndex = useRef(undefined);
  const useInstance = (instance) => {
    tempState.current = instance;
  };
  const carbonPrefix = usePrefix();

  useFocusRowExpander({
    instance: tempState?.current,
    lastExpandedRowIndex: lastExpandedRowIndex?.current,
    blockClass,
    activeElement: document.activeElement,
  });

  const visibleColumns = (columns) => {
    const expanderColumn = {
      id: 'expander',
      Cell: ({ row }) => {
        const expanderButtonProps = {
          ...row.getToggleRowExpandedProps(),
          onClick: (event) => {
            // Prevents `onRowClick` from being called if `useOnRowClick` is included
            event.stopPropagation();
            row.toggleRowExpanded();
            row?.onClick?.(row, event);
            lastExpandedRowIndex.current = row.id;
          },
          title: null,
        };
        const { expanderButtonTitleExpanded, expanderButtonTitleCollapsed } =
          tempState?.current || {};
        const expanderTitle = row.isExpanded
          ? expanderButtonTitleExpanded
          : expanderButtonTitleCollapsed;
        return (
          row.canExpand && (
            <button
              type="button"
              aria-label={expanderTitle}
              className={cx(
                `${blockClass}__row-expander`,
                `${carbonPrefix}--btn`,
                `${carbonPrefix}--btn--ghost`
              )}
              {...expanderButtonProps}
            >
              {row.isExpanded ? (
                <ChevronUp className={`${blockClass}__row-expander--icon`} />
              ) : (
                <ChevronDown className={`${blockClass}__row-expander--icon`} />
              )}
            </button>
          )
        );
      },
      width: 48,
      disableResizing: true,
      disableSortBy: true,
      Header: '',
    };
    return [expanderColumn, ...columns];
  };
  hooks.visibleColumns.push(visibleColumns);
  hooks.useInstance.push(useInstance);
};

export default useRowExpander;

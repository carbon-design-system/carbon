/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import {
  IconSkeleton,
  OverflowMenu,
  OverflowMenuItem,
  IconButton,
} from '@carbon/react';
import { pkg } from '../../settings';
import { prepareProps } from '../../global/js/utils/props-helper';
import { Hooks, TableInstance } from 'react-table';
import { DataGridState, RowAction } from './types';
const blockClass = `${pkg.prefix}--datagrid`;

const useActionsColumn = (hooks: Hooks) => {
  const useAttachActionsOnInstance = (instance: TableInstance) => {
    const {
      rowActions,
      isFetching,
      state: { selectedRowIds },
    } = instance as DataGridState;
    const getDisabledState = (rowIndex) => {
      const selectedRowIndexes = Object.keys(selectedRowIds).map((n) =>
        Number(n)
      );
      if (selectedRowIndexes.includes(rowIndex)) {
        return true;
      }
      return false;
    };

    if (rowActions && Array.isArray(rowActions)) {
      const addActionsMenu = (props, cellData) => {
        const { cell } = cellData;
        const { row, column } = cell;
        if (column.isAction) {
          const isColumnSticky = !!column.sticky;
          return [
            props,
            {
              children: (
                <div className={`${blockClass}__actions-column-contents`}>
                  {isFetching && (
                    <IconSkeleton
                      className={`${blockClass}__actions-column-loading`}
                    />
                  )}
                  {/* Icon buttons */}
                  {!isFetching && rowActions.length <= 2 && !isColumnSticky && (
                    <div className={`${blockClass}_actions-column`}>
                      {rowActions.map((action, index) => {
                        const preparedActionProps: RowAction = prepareProps(
                          action,
                          ['isDelete']
                        );
                        const {
                          align,
                          id,
                          itemText,
                          onClick,
                          icon,
                          shouldHideMenuItem,
                          shouldDisableMenuItem,
                          disabled,
                          ...rest
                        } = preparedActionProps;
                        const hidden =
                          typeof shouldHideMenuItem === 'function' &&
                          shouldHideMenuItem(row);
                        const isDisabledByRow =
                          typeof shouldDisableMenuItem === 'function'
                            ? shouldDisableMenuItem(row)
                            : disabled;
                        if (hidden) {
                          return null;
                        }
                        const Icon = icon;
                        return (
                          <div
                            className={cx(
                              `${blockClass}__actions-column-button`,
                              {
                                [`${blockClass}__disabled-row-action-button`]:
                                  getDisabledState(row.index),
                              }
                            )}
                            key={`${itemText}__${index}`}
                          >
                            <IconButton
                              {...rest}
                              align={align || 'top'}
                              label={itemText}
                              kind="ghost"
                              name={itemText} //for test use
                              className={cx({
                                [`${blockClass}__disabled-row-action`]:
                                  getDisabledState(row.index),
                              })}
                              onClick={(e) => {
                                if (getDisabledState(row.index)) {
                                  // Row actions should be disabled if row is selected and batchActions toolbar is active
                                  return;
                                }
                                e.stopPropagation();
                                onClick?.(id, row, e);
                              }}
                              disabled={isDisabledByRow}
                            >
                              {Icon && <Icon />}
                            </IconButton>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {/* Overflow menu */}
                  {!isFetching && (rowActions.length > 2 || isColumnSticky) && (
                    <div>
                      <OverflowMenu
                        align="left"
                        size="sm"
                        flipped
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {rowActions.map((action) => {
                          const {
                            id,
                            onClick,
                            shouldHideMenuItem,
                            shouldDisableMenuItem,
                            disabled,
                            ...rest
                          } = action;
                          const hidden =
                            typeof shouldHideMenuItem === 'function' &&
                            shouldHideMenuItem(row);
                          // shouldDisableMenuItem will override disabled because it's more specific
                          // if shouldDisableMenuItem doesn't exists, fall back to disabled
                          const isDisabledByRow =
                            typeof shouldDisableMenuItem === 'function'
                              ? shouldDisableMenuItem(row)
                              : disabled;
                          if (hidden) {
                            return null;
                          }
                          return (
                            <OverflowMenuItem
                              {...rest}
                              disabled={isDisabledByRow}
                              onClick={(e) => {
                                e.stopPropagation();
                                onClick?.(id, row, e);
                              }}
                              key={id}
                            />
                          );
                        })}
                      </OverflowMenu>
                    </div>
                  )}
                </div>
              ),
              className: cx({
                [`${blockClass}__actions-column-cell`]: true,
                [`${blockClass}__cell`]: true,
                [`${blockClass}__actions-column-cell-non-sticky`]:
                  !isColumnSticky,
              }),
              style: {
                width: rowActions.length > 2 || isColumnSticky ? 48 : 96,
              },
            },
          ];
        }
        return [props];
      };
      hooks.getCellProps.push(addActionsMenu);
    }
  };
  const useStickyHeaderWidth = (instance) => {
    const { rowActions } = instance;
    if (rowActions && Array.isArray(rowActions)) {
      const addHeaderWidth = (props, cellData) => {
        const { column } = cellData;
        if (column.isAction) {
          const isColumnSticky = !!column.sticky;
          return [
            props,
            {
              style: {
                ...props.style,
                width: rowActions.length > 2 || isColumnSticky ? 48 : 96, // set header width based on action length
              },
            },
          ];
        }
        return [props];
      };
      hooks.getHeaderProps.push(addHeaderWidth);
    }
  };

  hooks.useInstance.push(useStickyHeaderWidth);
  hooks.useInstance.push(useAttachActionsOnInstance);
};

export default useActionsColumn;

/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { type MouseEventHandler } from 'react';
import Button from '../Button';
import TableActionList from './TableActionList';
import { Text } from '../Text';
import { usePrefix } from '../../internal/usePrefix';
import type { TFunc, TranslateWithId } from '../../types/common';

const translationIds = {
  'carbon.table.batch.cancel': 'carbon.table.batch.cancel',
  'carbon.table.batch.items.selected': 'carbon.table.batch.items.selected',
  'carbon.table.batch.item.selected': 'carbon.table.batch.item.selected',
  'carbon.table.batch.selectAll': 'carbon.table.batch.selectAll',
} as const;

type TranslationKey = keyof typeof translationIds;

export type TableBatchActionsTranslationArgs = {
  totalSelected?: number;
  totalCount?: number;
};

const defaultTranslations: Record<TranslationKey, string> = {
  [translationIds['carbon.table.batch.cancel']]: 'Cancel',
  [translationIds['carbon.table.batch.items.selected']]: 'items selected',
  [translationIds['carbon.table.batch.item.selected']]: 'item selected',
  [translationIds['carbon.table.batch.selectAll']]: 'Select all',
};

const defaultTranslateWithId: TFunc<
  TranslationKey,
  TableBatchActionsTranslationArgs
> = (messageId, args = { totalSelected: 0, totalCount: 0 }) => {
  const { totalSelected, totalCount } = args;

  switch (messageId) {
    case translationIds['carbon.table.batch.cancel']:
      return defaultTranslations[messageId];
    case translationIds['carbon.table.batch.selectAll']:
      return `${defaultTranslations[messageId]} (${totalCount})`;
    case translationIds['carbon.table.batch.items.selected']:
    case translationIds['carbon.table.batch.item.selected']:
      return `${totalSelected} ${defaultTranslations[messageId]}`;
  }
};

export interface TableBatchActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    TranslateWithId<TranslationKey, TableBatchActionsTranslationArgs> {
  /**
   * Provide elements to be rendered inside of the component.
   */
  children?: React.ReactNode;

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this component.
   */
  onCancel: MouseEventHandler<HTMLButtonElement>;

  /**
   * Hook to listen for when the user initiates a select all
   * request through this component. This _only_ controls the rendering
   * of the `Select All` button and does not include built in functionality
   */
  onSelectAll?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Boolean specifier for whether or not the batch action bar should be
   * displayed.
   */
  shouldShowBatchActions?: boolean;

  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message.
   */
  totalSelected: number;

  /**
   * Numeric representation of the total number of items in a table.
   * This number is used in the select all button text
   */
  totalCount?: number;
}

const TableBatchActions = ({
  className,
  children,
  shouldShowBatchActions,
  totalSelected,
  totalCount,
  onCancel,
  onSelectAll,
  translateWithId: t = defaultTranslateWithId,
  ...rest
}: TableBatchActionsProps) => {
  const [isScrolling, setIsScrolling] = React.useState(false);
  const prefix = usePrefix();
  const batchActionsClasses = cx(
    {
      [`${prefix}--batch-actions`]: true,
      [`${prefix}--batch-actions--active`]: shouldShowBatchActions,
    },
    className
  );

  const batchSummaryClasses = cx(`${prefix}--batch-summary`, {
    [`${prefix}--batch-summary__scroll`]: isScrolling,
  });

  return (
    <div
      onScroll={() => {
        setIsScrolling(!isScrolling);
      }}
      aria-hidden={!shouldShowBatchActions}
      className={batchActionsClasses}
      {...rest}>
      <div className={batchSummaryClasses}>
        <p className={`${prefix}--batch-summary__para`}>
          <Text>
            {totalSelected > 1 || totalSelected === 0
              ? t('carbon.table.batch.items.selected', { totalSelected })
              : t('carbon.table.batch.item.selected', { totalSelected })}
          </Text>
        </p>
        {onSelectAll && (
          <>
            <span className={`${prefix}--batch-summary__divider`}>&#x7c;</span>
            <Button
              onClick={onSelectAll}
              tabIndex={shouldShowBatchActions ? 0 : -1}>
              {t('carbon.table.batch.selectAll', { totalCount })}
            </Button>
          </>
        )}
      </div>
      <TableActionList>
        {children}
        <Button
          className={`${prefix}--batch-summary__cancel`}
          tabIndex={shouldShowBatchActions ? 0 : -1}
          onClick={onCancel}>
          {t('carbon.table.batch.cancel')}
        </Button>
      </TableActionList>
    </div>
  );
};

TableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this component
   */
  onCancel: PropTypes.func.isRequired,

  /**
   * Hook to listen for when the user initiates a select all
   * request through this component. This _only_ controls the rendering
   * of the `Select All` button and does not include built in functionality
   */
  onSelectAll: PropTypes.func,

  /**
   * Boolean specifier for whether or not the batch action bar should be
   * displayed
   */
  shouldShowBatchActions: PropTypes.bool,

  /**
   * Numeric representation of the total number of items in a table.
   * This number is used in the select all button text
   */
  totalCount: PropTypes.number,

  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message
   */
  totalSelected: PropTypes.number.isRequired,

  /**
   * Translates component strings using your i18n tool.
   */
  translateWithId: PropTypes.func,
};

export default TableBatchActions;

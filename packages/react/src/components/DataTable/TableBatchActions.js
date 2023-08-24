/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import TableActionList from './TableActionList';
import { Text } from '../Text';
import { usePrefix } from '../../internal/usePrefix';

const translationKeys = {
  'carbon.table.batch.cancel': 'Cancel',
  'carbon.table.batch.items.selected': 'items selected',
  'carbon.table.batch.item.selected': 'item selected',
  'carbon.table.batch.selectAll': 'Select all',
};

const translateWithId = (id, state) => {
  if (id === 'carbon.table.batch.cancel') {
    return translationKeys[id];
  }
  if (id === 'carbon.table.batch.selectAll') {
    return `${translationKeys[id]} (${state.totalCount})`;
  }
  return `${state.totalSelected} ${translationKeys[id]}`;
};

const TableBatchActions = ({
  className,
  children,
  shouldShowBatchActions,
  totalSelected,
  totalCount,
  onCancel,
  onSelectAll,
  translateWithId: t,
  ...rest
}) => {
  const [isScrolling, setIsScrolling] = React.useState();
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
          <Text as="span">
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

TableBatchActions.translationKeys = Object.keys(translationKeys);

TableBatchActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  /**
   * Hook required to listen for when the user initiates a cancel request
   * through this component
   */
  onCancel: PropTypes.func.isRequired,

  /**
   * Hook required to listen for when the user initiates a select all
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
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are available on the `translationKeys` field for
   * this component.
   */
  translateWithId: PropTypes.func,
};

TableBatchActions.defaultProps = {
  translateWithId,
};

export default TableBatchActions;

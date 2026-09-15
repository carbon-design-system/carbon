/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext } from 'react';
import { ConditionBuilderItem } from '../ConditionBuilderItem/ConditionBuilderItem';
import { ItemOption } from '../ConditionBuilderItem/ConditionBuilderItemOption/ItemOption';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import { useTranslations } from '../utils/useTranslations';
import { useDataConfigs } from '../utils/useDataConfigs';
import { usePrefix } from '../../../internal/usePrefix';
import { LogicalOperator } from '../ConditionBuilder.types';

const GroupConnector = () => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--condition-builder`;
  const { rootState, setRootState } = useContext(ConditionBuilderContext);
  const [conditionText] = useTranslations(['conditionText']);
  const { connectorConfig } = useDataConfigs();

  const onStatementChangeHandler = (updatedStatement: string) => {
    setRootState?.({
      ...rootState,
      operator: updatedStatement as LogicalOperator,
    });
  };

  return (
    <div
      className={`${blockClass}__group-separator ${blockClass}__group-separator-row`}
      role="row"
      tabIndex={-1}
      aria-level={1}>
      <ConditionBuilderItem
        label={rootState?.operator}
        title={conditionText}
        data-name="connectorField"
        popOverClassName={`${blockClass}__gap ${blockClass}__groupConnector`}
        className={`${blockClass}__statement-button`}>
        <ItemOption
          conditionState={{
            value: rootState?.operator,
            label: conditionText,
          }}
          onChange={onStatementChangeHandler}
          config={{ options: connectorConfig }}
        />
      </ConditionBuilderItem>
    </div>
  );
};

export default GroupConnector;

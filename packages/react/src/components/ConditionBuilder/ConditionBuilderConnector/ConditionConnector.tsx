/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useContext } from 'react';
import { usePrefix } from '../../../internal/usePrefix';
import { ConditionBuilderItem } from '../ConditionBuilderItem/ConditionBuilderItem';
import { ItemOption } from '../ConditionBuilderItem/ConditionBuilderItemOption/ItemOption';
import { focusThisField, HIERARCHICAL_VARIANT } from '../utils/util';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';
import { useTranslations } from '../utils/useTranslations';
import { useDataConfigs } from '../utils/useDataConfigs';
import { ConditionBuilderButton } from '../ConditionBuilderButton/ConditionBuilderButton';

interface ConditionConnectorProps {
  operator: string;
  className: string;
  onChange?: (op: string) => void;
}
const ConditionConnector = ({
  operator,
  className,
  onChange,
  ...rest
}: ConditionConnectorProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--condition-builder`;
  const { variant, conditionBuilderRef } = useContext(ConditionBuilderContext);
  const [connectorText] = useTranslations(['connectorText']);
  const { connectorConfig } = useDataConfigs();

  const handleConnectorHover = useCallback((parentGroup, isHover) => {
    if (isHover) {
      parentGroup.classList.add('hoveredConnector');
    } else {
      parentGroup.classList.remove('hoveredConnector');
    }
  }, []);
  const activeConnectorHandler = (evt) => {
    const parentGroup = evt?.currentTarget.closest('.eachGroup');
    handleConnectorHover(parentGroup, true);
  };
  const inActiveConnectorHandler = (evt) => {
    const parentGroup = evt?.currentTarget.closest('.eachGroup');
    handleConnectorHover(parentGroup, false);
  };

  const onChangeHandler = (op, evt) => {
    onChange?.(op);
    focusThisField(evt, conditionBuilderRef, blockClass);
  };
  return variant == HIERARCHICAL_VARIANT ? (
    <span
      className={`${className} ${blockClass}__connector ${blockClass}__connector--disabled`}>
      <ConditionBuilderButton label={operator} />
    </span>
  ) : (
    <ConditionBuilderItem
      label={operator}
      title={connectorText}
      data-name="connectorField"
      onMouseEnter={activeConnectorHandler}
      onMouseLeave={inActiveConnectorHandler}
      onFocus={activeConnectorHandler}
      onBlur={inActiveConnectorHandler}
      {...rest}
      popOverClassName={`${className} ${blockClass}__connector`}
      className={`${blockClass}__connector-button`}>
      <ItemOption
        config={{
          options: connectorConfig,
        }}
        conditionState={{
          value: operator,
          label: connectorText,
        }}
        onChange={onChangeHandler}
      />
    </ConditionBuilderItem>
  );
};

export default ConditionConnector;

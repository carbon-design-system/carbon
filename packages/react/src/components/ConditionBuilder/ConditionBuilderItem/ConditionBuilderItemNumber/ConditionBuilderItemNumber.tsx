/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { NumberInput } from '../../../NumberInput';

import { useTranslations } from '../../utils/useTranslations';
import { Condition, PropertyConfigNumber } from '../../ConditionBuilder.types';
import { usePrefix } from '../../../../internal/usePrefix';

interface ConditionBuilderItemNumberProps {
  conditionState: Condition;
  config: PropertyConfigNumber['config'];
  onChange: (value: string) => void;
}
export const ConditionBuilderItemNumber = ({
  conditionState,
  config,
  onChange,
}: ConditionBuilderItemNumberProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--condition-builder`;
  const [invalidNumberWarnText] = useTranslations(['invalidNumberWarnText']);
  const onChangeHandler = (e, { value }) => {
    if (value !== '' && !isNaN(value) && checkIfValid(value)) {
      onChange(config?.unit ? `${value} ${config.unit}` : String(value));
    } else {
      onChange('INVALID');
    }
  };
  const checkIfValid = (value) => {
    if (!config) {
      return true;
    }

    const { min, max } = config;

    if (max !== undefined && min === undefined && value > max) {
      return false;
    }

    if (min !== undefined && max === undefined && value < min) {
      return false;
    }

    if (
      min !== undefined &&
      max !== undefined &&
      (value < min || value > max)
    ) {
      return false;
    }

    return true;
  };

  const getDefaultValue = () => {
    return (conditionState.value as string)?.split(' ')?.[0] ?? '';
  };
  return (
    <div className={`${blockClass}__item-number`}>
      <NumberInput
        {...config}
        label={conditionState.property}
        hideLabel
        id={conditionState.property?.replace(/\s/g, '') as string}
        invalidText={invalidNumberWarnText}
        allowEmpty
        onChange={onChangeHandler}
        defaultValue={getDefaultValue()}
      />
    </div>
  );
};

/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { TextArea } from '../../../TextArea';
import { TextInput } from '../../../TextInput';

import { checkIsValid } from '../../utils/util';
import {
  Condition,
  PropertyConfigText,
  PropertyConfigTextArea,
} from '../../ConditionBuilder.types';
import { usePrefix } from '../../../../internal/usePrefix';

interface ConditionBuilderItemTextProps {
  conditionState: Condition;
  config: PropertyConfigText | PropertyConfigTextArea;
  onChange: (value: string) => void;
  type: 'textarea' | 'text';
}
export const ConditionBuilderItemText = ({
  conditionState,
  onChange,
  config,
  type,
}: ConditionBuilderItemTextProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--condition-builder`;
  const inputProps = {
    ...config,
    hideLabel: true,
    value: checkIsValid(conditionState.value) ? conditionState.value : '',
    id: conditionState.property?.replace(/\s/g, ''),
    onChange: (evt) => {
      onChange(evt.target.value);
    },
    labelText: conditionState.property,
  };
  return (
    <div className={`${blockClass}__item-text`}>
      {type == 'textarea' ? (
        <TextArea {...(inputProps as PropertyConfigTextArea['config'])} />
      ) : (
        <TextInput {...(inputProps as PropertyConfigText['config'])} />
      )}
    </div>
  );
};

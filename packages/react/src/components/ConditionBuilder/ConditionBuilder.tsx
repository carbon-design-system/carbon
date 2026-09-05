/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ForwardedRef, useRef } from 'react';

import { VStack } from '../Stack';
import { usePrefix } from '../../internal/usePrefix';

// Other standard imports.
import cx from 'classnames';

import ConditionBuilderContent from './ConditionBuilderContent/ConditionBuilderContent';
import { ConditionBuilderProvider } from './ConditionBuilderContext/ConditionBuilderProvider';

import { ConditionBuilderProps } from './ConditionBuilder.types';

import { handleKeyDown } from './utils/handleKeyboardEvents';
import { NON_HIERARCHICAL_VARIANT } from './utils/util';

const componentName = 'ConditionBuilder';

export const ConditionBuilder = React.forwardRef(
  (
    {
      className,
      inputConfig,
      startConditionLabel = 'Add Condition',
      popOverSearchThreshold = 4,
      getOptions,
      initialState,
      getConditionState,
      getActionsState,
      variant = NON_HIERARCHICAL_VARIANT,
      actions,
      translateWithId,
      statementConfigCustom,
      onAddItem,
      onRemoveItem,
      readOnly,
      startActive = true,
      value,
      onChange,
      ...rest
    }: ConditionBuilderProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--condition-builder`;
    const localRef = useRef(null);
    const conditionBuilderRef = ref || localRef;

    const handleKeyDownHandler = (evt) => {
      handleKeyDown(evt, conditionBuilderRef, variant, blockClass);
    };
    return (
      <ConditionBuilderProvider
        inputConfig={inputConfig}
        popOverSearchThreshold={popOverSearchThreshold}
        getOptions={getOptions}
        variant={variant}
        translateWithId={translateWithId}
        conditionBuilderRef={conditionBuilderRef}
        statementConfigCustom={statementConfigCustom}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        readOnly={!!readOnly}
        startActive={startActive}
        value={value}
        onChange={onChange}>
        <div
          {
            // Pass through any other property values as HTML attributes.
            ...rest
          }
          className={cx(blockClass, className, {
            [`${blockClass}__readonly`]: readOnly,
          })}
          ref={conditionBuilderRef}
          data-component-name={componentName}>
          <VStack
            className={`${blockClass}__${variant}`}
            onKeyDown={handleKeyDownHandler}>
            <ConditionBuilderContent
              startConditionLabel={startConditionLabel}
              getConditionState={getConditionState}
              getActionsState={getActionsState}
              initialState={initialState}
              actions={actions}
            />
          </VStack>
        </div>
      </ConditionBuilderProvider>
    );
  }
);

ConditionBuilder.displayName = componentName;

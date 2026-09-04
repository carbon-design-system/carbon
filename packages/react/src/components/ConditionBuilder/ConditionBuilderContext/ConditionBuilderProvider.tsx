/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext, useEffect, useRef, useState } from 'react';
import {
  Action,
  ConditionBuilderContextProps,
  ConditionBuilderState,
  StatementOperator,
} from '../ConditionBuilder.types';

export const getEmptyState = (
  statementConfigCustom?: ConditionBuilderContextProps['statementConfigCustom']
): ConditionBuilderState => {
  const defaultStatement = statementConfigCustom?.[0];
  const defaultStatementId = (defaultStatement?.id ??
    'ifAll') as StatementOperator;
  return {
    operator: 'or',
    groups: [
      {
        groupOperator: defaultStatement?.connector ?? 'and',
        statement: defaultStatementId,
        id: crypto.randomUUID(),
        conditions: [
          {
            property: undefined,
            operator: '',
            value: '',
            popoverToOpen: 'propertyField',
            id: crypto.randomUUID(),
          },
        ],
      },
    ],
  };
};

export const ConditionBuilderContext =
  createContext<ConditionBuilderContextProps>({
    rootState: {
      groups: [],
    },
    popOverSearchThreshold: 0,
  });

export const ConditionBuilderProvider: React.FC<
  ConditionBuilderContextProps
> = (props) => {
  // The builder ALWAYS owns its own internal state. `value` is treated as
  // a seed on first render and as an external override when the reference
  // changes (controlled reset/update from outside).
  const [internalState, setInternalState] = useState<ConditionBuilderState>(
    props.value ?? { groups: [] }
  );
  const [actionState, setActionState] = useState<Action[]>([]);

  // Track the previous `value` reference so we can detect when the parent
  // intentionally pushes a new state from outside (controlled reset/update).
  const prevValueRef = useRef(props.value);
  useEffect(() => {
    if (props.value !== undefined && props.value !== prevValueRef.current) {
      // Parent changed `value` from outside — sync internal state.
      setInternalState(props.value);
    }
    prevValueRef.current = props.value;
  }, [props.value]);

  // rootState is always internalState — the builder owns its state.
  const rootState = internalState;

  const setRootState = (
    next:
      | ConditionBuilderState
      | ((prev: ConditionBuilderState) => ConditionBuilderState)
  ) => {
    // Use the functional-updater form of setInternalState so `prev` is always
    // the committed value — avoids stale-closure bugs when two mutations fire
    // in the same render cycle (e.g. rapid edits or paste).
    setInternalState((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next;
      props.onChange?.(resolved);
      return resolved;
    });
  };

  const contextValue: ConditionBuilderContextProps = {
    rootState,
    setRootState: setRootState,
    actionState,
    setActionState,
    inputConfig: props.inputConfig,
    popOverSearchThreshold: props.popOverSearchThreshold ?? 4,
    getOptions: props.getOptions,
    variant: props.variant,
    translateWithId: props.translateWithId,
    conditionBuilderRef: props.conditionBuilderRef,
    statementConfigCustom: props.statementConfigCustom,
    onAddItem: props.onAddItem,
    onRemoveItem: props.onRemoveItem,
    readOnly: props.readOnly,
    startActive: props.startActive,
    value: props.value,
    onChange: props.onChange,
  };

  return (
    <ConditionBuilderContext.Provider value={contextValue}>
      {props.children}
    </ConditionBuilderContext.Provider>
  );
};

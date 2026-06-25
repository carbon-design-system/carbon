/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from '../../../global/js/utils/uuidv4';
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
        id: uuidv4(),
        conditions: [
          {
            property: undefined,
            operator: '',
            value: '',
            popoverToOpen: 'propertyField',
            id: uuidv4(),
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
  const [rootState, setRootState] = useState<ConditionBuilderState>({
    groups: [],
  });
  const [actionState, setActionState] = useState<Action[]>([]);

  const contextValue: ConditionBuilderContextProps = {
    rootState,
    setRootState,
    actionState,
    setActionState,
    inputConfig: props.inputConfig,
    popOverSearchThreshold: props.popOverSearchThreshold,
    getOptions: props.getOptions,
    variant: props.variant,
    translateWithId: props.translateWithId,
    conditionBuilderRef: props.conditionBuilderRef,
    statementConfigCustom: props.statementConfigCustom,
    onAddItem: props.onAddItem,
    onRemoveItem: props.onRemoveItem,
    readOnly: props.readOnly,
  };

  return (
    <ConditionBuilderContext.Provider value={contextValue}>
      {props.children}
    </ConditionBuilderContext.Provider>
  );
};

ConditionBuilderProvider.propTypes = {
  /**
   * Provide the contents of the ConditionBuilder.
   */
  children: PropTypes.node.isRequired,

  /**
   * ref of condition builder
   */
  /**@ts-ignore */
  conditionBuilderRef: PropTypes.object,

  /**
   * This is an optional callback function that will be triggered when options array is not passed in the inputConfig against a property. 
   * This can be a asynchronous function that need  to  return a promise, so it will allow to fetch options from API call.
   * options has to be in valid format
   * [{
          label: 'label',
          id: 'id',
        },...] 
   */
  getOptions: PropTypes.func,
  /**
   * This is a mandatory prop that defines the input to the condition builder.
    
   */
  /**@ts-ignore */
  inputConfig: PropTypes.shape({
    properties: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        description: PropTypes.string,
        type: PropTypes.oneOf([
          'text',
          'textarea',
          'number',
          'date',
          'option',
          'time',
          'custom',
        ]).isRequired,
        config: PropTypes.shape({
          options: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              label: PropTypes.string.isRequired,
              icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
            })
          ),
          component: PropTypes.func,
          operators: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              label: PropTypes.string.isRequired,
            })
          ),
          long: PropTypes.bool,
        }),
      })
    ),
  }).isRequired,

  /**
   * This will enable search in option popovers when option list length is more that this threshold
   */
  popOverSearchThreshold: PropTypes.number.isRequired,
  /**
   * Optional prop if you want to pass translation to the texts used . Otherwise this will the defined defaults.
   * This callback function will receive the message id and you need to return the corresponding text for that id.
   * The message key will be one of [   "ifText",   "addConditionText",   "addConditionGroupText",   "addSubgroupText",   "conditionText",   "propertyText",   "operatorText",   "valueText",   "connectorText",   "conditionRowText",   "removeConditionText",   "addConditionRowText",   "startText",   "endText",   "clearSearchText",   "actionsText",   "then",   "removeActionText",   "addActionText",   "invalidText",   "invalidNumberWarnText"
]
   */
  translateWithId: PropTypes.func,

  /**
   * Provide the condition builder variant: Non-Hierarchical/ Hierarchical
   */
  variant: PropTypes.string.isRequired,
};

/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useContext } from 'react';
import { useTranslations } from './useTranslations';
import { ConditionBuilderContext } from '../ConditionBuilderContext/ConditionBuilderProvider';

export const useDataConfigs = () => {
  const [
    ifAll,
    ifAny,
    unlessAll,
    unlessAny,
    and,
    or,
    is,
    greater,
    greaterEqual,
    lower,
    lowerEqual,
    startsWith,
    endsWith,
    contains,
    oneOf,
    before,
    after,
    between,
  ] = useTranslations([
    'ifAll',
    'ifAny',
    'unlessAll',
    'unlessAny',
    'and',
    'or',
    'is',
    'greater',
    'greaterEqual',
    'lower',
    'lowerEqual',
    'startsWith',
    'endsWith',
    'contains',
    'oneOf',
    'before',
    'after',
    'between',
  ]);
  const { statementConfigCustom } = useContext(ConditionBuilderContext);

  const statementConfigDefault = [
    {
      id: 'ifAll',
      connector: 'and',
      label: ifAll,
      secondaryLabel: '(a && b)',
    },
    {
      id: 'ifAny',
      connector: 'or',
      label: ifAny,
      secondaryLabel: '(a || b)',
    },
    {
      id: 'unlessAll',
      connector: 'and',
      label: unlessAll,
      secondaryLabel: '! (a && b)',
    },
    {
      id: 'unlessAny',
      connector: 'or',
      label: unlessAny,
      secondaryLabel: '! (a || b)',
    },
  ];

  const connectorConfig = [
    {
      label: and,
      id: 'and',
    },
    {
      label: or,
      id: 'or',
    },
  ];

  const operatorConfig = [
    {
      label: is,
      id: 'is',
      type: 'all',
    },
    {
      label: greater,
      id: 'greater',
      type: 'number',
    },
    {
      label: greaterEqual,
      id: 'greaterEqual',
      type: 'number',
    },
    {
      label: lower,
      id: 'lower',
      type: 'number',
    },
    {
      label: lowerEqual,
      id: 'lowerEqual',
      type: 'number',
    },
    {
      label: startsWith,
      id: 'startsWith',
      type: 'text,textarea',
    },
    {
      label: endsWith,
      id: 'endsWith',
      type: 'text,textarea',
    },
    {
      label: contains,
      id: 'contains',
      type: 'text,textarea',
    },
    {
      label: oneOf,
      id: 'oneOf',
      type: 'option',
    },
    {
      label: before,
      id: 'before',
      type: 'date,time',
    },
    {
      label: after,
      id: 'after',
      type: 'date,time',
    },
    {
      label: between,
      id: 'between',
      type: 'date',
    },
  ];

  return {
    statementConfig: statementConfigCustom ?? statementConfigDefault,
    connectorConfig,
    operatorConfig,
  };
};

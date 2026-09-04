/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React, { useRef, useState } from 'react';

import { action } from 'storybook/actions';
import { Wikis } from '@carbon/icons-react';
import Button from '../Button';
import { ConditionBuilder, getEmptyState } from '.';

import mdx from './ConditionBuilder.mdx';

import {
  inputData,
  inputDataDynamicOptions,
  inputDataForCustomOperator,
  inputDataWithDisabledProperties,
} from './assets/sampleInput';
import {
  sampleDataStructure_nonHierarchical,
  sampleDataStructure_Hierarchical,
  initialStateWithCustomOperators,
} from './assets/SampleData';
import { HIERARCHICAL_VARIANT, NON_HIERARCHICAL_VARIANT } from './utils/util';

export default {
  title: 'Components/ConditionBuilder',
  component: ConditionBuilder,
  tags: ['autodocs', 'ibm-products-migrated'],

  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },

  argTypes: {
    className: { table: { disable: true } },
  },
};

const getContinents = () => {
  return [
    { label: 'Africa', id: 'Africa' },
    { label: 'Antarctica', id: 'Antarctica' },
    { label: 'Asia', id: 'Asia' },
    { label: 'Australia', id: 'Australia' },
    { label: 'Europe', id: 'Europe' },
  ];
};

const getRegions = () => {
  return [
    { label: 'Afghanistan', id: 'AF', icon: Wikis },
    { label: 'Albania', id: 'AL', icon: Wikis },
    { label: 'Algeria', id: 'AG', icon: Wikis },
    { label: 'Andorra', id: 'AN', icon: Wikis },
  ];
};

const getColors = () => {
  return [
    { label: 'black', id: 'black' },
    { label: 'silver', id: 'silver' },
    { label: 'gray', id: 'gray' },
    { label: 'white', id: 'white' },
    { label: 'maroon', id: 'maroon' },
    { label: 'red', id: 'red' },
    { label: 'purple', id: 'purple' },
    { label: 'fuchsia', id: 'fuchsia' },
    { label: 'green', id: 'green' },
    { label: 'lime', id: 'lime' },
    { label: 'olive', id: 'olive' },
    { label: 'yellow', id: 'yellow' },
    { label: 'navy', id: 'navy' },
    { label: 'blue', id: 'blue' },
    { label: 'teal', id: 'teal' },
    { label: 'aqua', id: 'aqua' },
  ];
};

const getOptions = async (conditionState, { property }) => {
  switch (property) {
    case 'continent':
      return new Promise((resolve) => {
        setTimeout(() => resolve(getContinents()), 2000);
      });
    case 'region':
      return new Promise((resolve) => {
        setTimeout(() => resolve(getRegions()), 2000);
      });
    case 'color':
      return new Promise((resolve) => {
        setTimeout(() => resolve(getColors()), 2000);
      });
    default:
      return [];
  }
};

const actions = [
  { id: crypto.randomUUID(), label: 'Add item to cart' },
  { id: crypto.randomUUID(), label: 'Proceed item to checkout' },
];

const translateWithId = (key) => {
  const translationsObject = {
    ifText: 'if',
    addConditionText: 'Add condition',
    addConditionGroupText: 'Add condition group',
    addSubgroupText: 'Add subgroup',
  };
  return translationsObject[key];
};

const statementConfigCustom = [
  { id: 'if', connector: 'and', label: 'if' },
  { id: 'exclIf', connector: 'or', label: 'excl. if' },
];

const ConditionBuilderTemplate = (args) => {
  const ref = useRef(undefined);
  const descriptionId = 'condition-builder-a11y-desc';
  return (
    <>
      <p id={descriptionId} className="cds--visually-hidden">
        Use this builder to create filter conditions. Each condition has three
        parts: a property (what to filter on), an operator (how to compare), and
        a value. Use arrow keys to navigate between conditions and cells. Press
        Enter or Space to open a selector. Press Escape to close a selector
        without saving.
      </p>
      <ConditionBuilder
        {...args}
        ref={ref}
        startConditionLabel="Add condition"
        popOverSearchThreshold={4}
        aria-describedby={descriptionId}
        onAddItem={(type) => action(`onAddItem is triggered, type: ${type}`)()}
        onRemoveItem={(config) =>
          action(`onRemoveItem is triggered, type: ${config?.type}`)(config)
        }
      />
    </>
  );
};

export const Default = {
  render: ConditionBuilderTemplate,
  args: {
    inputConfig: inputData,
    variant: NON_HIERARCHICAL_VARIANT,
  },
};

export const WithDynamicOptions = {
  render: ConditionBuilderTemplate,
  args: {
    inputConfig: inputDataDynamicOptions,
    getOptions: getOptions,
    variant: NON_HIERARCHICAL_VARIANT,
  },
};

export const WithInitialState = {
  render: ConditionBuilderTemplate,
  args: {
    value: sampleDataStructure_nonHierarchical,
    inputConfig: inputData,
    variant: NON_HIERARCHICAL_VARIANT,
    translateWithId: translateWithId,
  },
};

export const WithCustomStatements = {
  render: ConditionBuilderTemplate,
  args: {
    inputConfig: inputData,
    variant: NON_HIERARCHICAL_VARIANT,
    translateWithId: translateWithId,
    statementConfigCustom: statementConfigCustom,
  },
};

export const WithCustomOperators = {
  render: ConditionBuilderTemplate,
  args: {
    value: initialStateWithCustomOperators,
    inputConfig: inputDataForCustomOperator,
    variant: NON_HIERARCHICAL_VARIANT,
    translateWithId: translateWithId,
  },
};

export const WithDisabledProperties = {
  render: ConditionBuilderTemplate,
  args: {
    inputConfig: inputDataWithDisabledProperties,
    variant: NON_HIERARCHICAL_VARIANT,
  },
};

export const WithActions = {
  render: ConditionBuilderTemplate,
  args: {
    inputConfig: inputData,
    variant: NON_HIERARCHICAL_VARIANT,
    actions: actions,
    getActionsState: action('getActionsState'),
  },
};

export const Hierarchical = {
  render: ConditionBuilderTemplate,
  args: {
    inputConfig: inputData,
    variant: HIERARCHICAL_VARIANT,
  },
};

export const HierarchicalWithInitialState = {
  render: ConditionBuilderTemplate,
  args: {
    value: sampleDataStructure_Hierarchical,
    startActive: false,
    inputConfig: inputData,
    variant: HIERARCHICAL_VARIANT,
  },
};

export const HierarchicalWithActions = {
  render: ConditionBuilderTemplate,
  args: {
    inputConfig: inputData,
    variant: HIERARCHICAL_VARIANT,
    actions: actions,
    getActionsState: action('getActionsState'),
  },
};

const alternativeState = {
  operator: 'and',
  groups: [
    {
      groupOperator: 'or',
      statement: 'ifAny',
      id: 'alt-group-1',
      conditions: [
        {
          property: 'continent',
          operator: 'is',
          value: { label: 'Europe', id: 'Europe' },
          id: 'alt-cond-1',
        },
        {
          property: 'region',
          operator: 'is',
          value: { label: 'Albania', id: 'AL' },
          id: 'alt-cond-2',
        },
      ],
    },
  ],
};

const ControlledTemplate = () => {
  const descriptionId = 'controlled-hierarchical-a11y-desc';
  const [conditionState, setConditionState] = useState(
    sampleDataStructure_Hierarchical
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          kind="secondary"
          size="sm"
          onClick={() => setConditionState(getEmptyState())}>
          Reset conditions
        </Button>
        <Button
          kind="primary"
          size="sm"
          onClick={() => setConditionState(alternativeState)}>
          Update conditions
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 60%' }}>
          <p id={descriptionId} className="cds--visually-hidden">
            Use this builder to create filter conditions. Use arrow keys to
            navigate between conditions. Press Enter or Space to open a
            selector. Press Escape to close without saving.
          </p>
          <ConditionBuilder
            inputConfig={inputData}
            variant={HIERARCHICAL_VARIANT}
            popOverSearchThreshold={4}
            aria-describedby={descriptionId}
            value={conditionState}
            onChange={(newState) => setConditionState(newState)}
          />
        </div>
        <div
          style={{
            flex: '1 1 40%',
            background: 'var(--cds-layer)',
            padding: '1rem',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '12px',
            overflowX: 'auto',
            whiteSpace: 'pre',
          }}>
          <strong style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>
            Live condition state (value prop)
          </strong>
          <br />
          <br />
          {JSON.stringify(conditionState, null, 2)}
        </div>
      </div>
    </div>
  );
};

export const ControlledHierarchical = {
  render: ControlledTemplate,
  args: {},
};

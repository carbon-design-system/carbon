/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { NumberInput } from './';
import NumberInputSkeleton from './NumberInput.Skeleton';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    subcomponents: {
      NumberInputSkeleton,
    },
  },
};

export const Default = () => {
  return (
    <NumberInput
      id="carbon-number"
      min={0}
      max={100}
      value={50}
      label="NumberInput label"
      helperText="Optional helper text."
      invalidText="Number is not valid"
    />
  );
};

export const Playground = (args) => {
  // const { numberInputArrowTranslationIds, ...rest } = props();
  return (
    <NumberInput
      id="carbon-number"
      min={0}
      max={100}
      value={50}
      label="NumberInput label"
      helperText="Optional helper text."
      invalidText="Number is not valid"
      {...args}
    />
  );
};

Playground.argTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  defaultValue: {
    table: {
      disable: true,
    },
  },
  helperText: {
    control: { type: 'text' },
  },
  id: {
    table: {
      disable: true,
    },
  },
  invalidText: {
    control: { type: 'text' },
  },
  label: {
    control: { type: 'text' },
  },
  light: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'clicked',
  },
  onClick: {
    action: 'clicked',
  },
  onKeyUp: {
    action: 'clicked',
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
  value: {
    control: { type: 'text' },
  },
  warnText: {
    control: { type: 'text' },
  },
};

export const Skeleton = () => <NumberInputSkeleton />;

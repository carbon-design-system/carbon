/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { NumberInput } from './';
import NumberInputSkeleton from './NumberInput.Skeleton';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { number } from 'prop-types';

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
      min={-100}
      max={100}
      value={50}
      label="NumberInput label"
      helperText="Optional helper text."
      invalidText="Number is not valid"
    />
  );
};

const aiLabel = (
  <AILabel className="slug-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = () => (
  <div style={{ width: 400 }}>
    <NumberInput
      min={-100}
      max={100}
      value={50}
      label="NumberInput label"
      helperText="Optional helper text."
      invalidText="Number is not valid"
      slug={aiLabel}
    />
  </div>
);

export const Playground = (args) => (
  <div>
    <NumberInput {...args} id="number-input" />
  </div>
);

Playground.args = {
  min: -100,
  max: 100,
  value: 50,
  step: 1,
  invalid: false,
  invalidText: 'Error message goes here',
  disabled: false,
  label: 'NumberInput label',
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};
Playground.argTypes = {
  className: {
    control: { type: 'text' },
  },
  defaultValue: {
    table: {
      disable: true,
    },
  },
  min: {
    control: { type: 'number' },
  },
  max: {
    control: { type: 'number' },
  },
  value: {
    control: { type: 'number' },
  },
  step: {
    control: { type: 'number' },
  },
  invalid: {
    control: { type: 'boolean' },
  },
  id: {
    table: {
      disable: true,
    },
  },
  invalidText: {
    control: { type: 'text' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  label: {
    control: { type: 'text' },
  },
  light: {
    table: {
      disable: true,
    },
  },
  helperText: {
    control: { type: 'text' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
  },
  size: {
    options: ['sm', 'md', 'lg', 'xl'],
    control: { type: 'select' },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
  onKeyUp: {
    action: 'onKeyUp',
  },
};

export const Playground2 = ({ ...args }) => {
  const [value, setValue] = React.useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="playground-number-input"
      min={-100}
      max={100}
      value={value}
      label="NumberInput label"
      helperText="Optional helper text."
      onChange={handleChange}
      {...args}
    />
  );
};

Playground2.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: 'Error message goes here',
  warn: false,
  warnText: 'Warning message goes here',
  size: 'md',
};

Playground2.argTypes = {
  min: { control: { type: 'number' } },
  max: { control: { type: 'number' } },
  step: { control: { type: 'number' } },
  disabled: { control: { type: 'boolean' } },
  invalid: { control: { type: 'boolean' } },
  invalidText: { control: { type: 'text' } },
  warn: { control: { type: 'boolean' } },
  warnText: { control: { type: 'text' } },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  label: { control: { type: 'text' } },
  helperText: { control: { type: 'text' } },
};

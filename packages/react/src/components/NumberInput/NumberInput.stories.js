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
import mdx from './NumberInput.mdx';
import { NumberFormatter, NumberParser } from '@carbon/utilities';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    subcomponents: {
      NumberInputSkeleton,
    },
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  className: {
    table: {
      disable: true,
    },
  },
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
  id: {
    table: {
      disable: true,
    },
  },
  defaultValue: {
    table: {
      disable: true,
    },
  },
  light: {
    table: {
      disable: true,
    },
  },
  slug: {
    table: {
      disable: true,
    },
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
};

const sharedProps = {
  min: -100,
  max: 100,
};

export const Default = (args) => {
  const [value, setValue] = React.useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="default-number-input"
      min={sharedProps.min}
      max={sharedProps.max}
      value={value}
      label="NumberInput label"
      helperText="Optional helper text."
      onChange={handleChange}
      {...args}
    />
  );
};

Default.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${sharedProps.min} and ${sharedProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};

Default.argTypes = { ...sharedArgTypes };

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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

  return (
    <div style={{ width: 400 }}>
      <NumberInput
        min={sharedProps.min}
        max={sharedProps.max}
        value={50}
        label="NumberInput label"
        helperText="Optional helper text."
        invalidText="Number is not valid"
        decorator={aiLabel}
        {...args}
      />
    </div>
  );
};

withAILabel.argTypes = { ...sharedArgTypes };

export const WithTypeOfText = (args) => {
  const locale = document.documentElement.lang;

  return (
    <NumberInput
      id="default-number-input"
      min={sharedProps.min}
      max={sharedProps.max}
      type="text"
      locale={locale}
      inputMode="decimal"
      label="NumberInput label"
      helperText="Optional helper text."
      {...args}
    />
  );
};
WithTypeOfText.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${sharedProps.min} and ${sharedProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};
WithTypeOfText.argTypes = { ...sharedArgTypes };

export const InternalLocalizationUncontrolled = (args) => {
  const defaultValue = 75;
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <>
      <NumberInput
        id="default-number-input"
        min={sharedProps.min}
        max={sharedProps.max}
        defaultValue={defaultValue}
        type="text"
        // hardcode locale/format values for testing
        locale="DE"
        formatOptions={{ style: 'decimal' }}
        onChange={handleChange}
        label="NumberInput label"
        helperText="Optional helper text."
        {...args}
      />
      <p>
        Value is {value}, a {typeof value}
      </p>
    </>
  );
};
InternalLocalizationUncontrolled.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${sharedProps.min} and ${sharedProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};
InternalLocalizationUncontrolled.argTypes = { ...sharedArgTypes };

export const InternalLocalizationControlled = (args) => {
  const [value, setValue] = React.useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="default-number-input"
      min={sharedProps.min}
      max={sharedProps.max}
      value={value}
      type="text"
      // hardcode locale/format values for testing
      locale="DE"
      formatOptions={{ style: 'decimal' }}
      label="NumberInput label"
      helperText="Optional helper text."
      onChange={handleChange}
      {...args}
    />
  );
};
InternalLocalizationControlled.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${sharedProps.min} and ${sharedProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};
InternalLocalizationControlled.argTypes = { ...sharedArgTypes };

export const Skeleton = () => {
  return <NumberInputSkeleton />;
};

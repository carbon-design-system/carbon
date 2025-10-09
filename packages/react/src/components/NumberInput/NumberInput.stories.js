/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { NumberInput } from './';
import NumberInputSkeleton from './NumberInput.Skeleton';
import { validateNumberSeparators } from './NumberInput';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { useDocumentLang } from '../../internal/useDocumentLang';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './NumberInput.mdx';

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
    controls: {
      exclude: ['id', 'defaultValue', 'light', 'translateWithId'],
    },
  },
};

const sharedArgTypes = {
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

const reusableProps = {
  min: -100000000,
  max: 100000000,
};

export const Default = (args) => {
  const [value, setValue] = React.useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="default-number-input"
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

Default.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between -100 and 100`,
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
        min={reusableProps.min}
        max={reusableProps.max}
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
  const locale = useDocumentLang();

  return (
    <NumberInput
      id="default-number-input"
      min={reusableProps.min}
      max={reusableProps.max}
      inputMode="decimal"
      defaultValue={50}
      label="NumberInput label"
      helperText="Optional helper text."
      {...args}
      locale={locale}
    />
  );
};
WithTypeOfText.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
  type: 'text',
};
WithTypeOfText.argTypes = {
  locale: { control: { type: 'text' } },
  stepStartValue: { control: { type: 'number' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};

export const WithTypeOfTextControlled = (args) => {
  const locale = useDocumentLang();
  const [value, setValue] = useState(NaN);

  return (
    <>
      <NumberInput
        id="default-number-input"
        min={reusableProps.min}
        max={reusableProps.max}
        type="text"
        inputMode="decimal"
        label="NumberInput label"
        helperText="Optional helper text."
        {...args}
        locale={locale}
        value={value}
        onChange={(event, state) => {
          setValue(state.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          setValue(50);
        }}>
        set to 50
      </button>
    </>
  );
};
WithTypeOfTextControlled.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
  type: 'text',
};
WithTypeOfTextControlled.argTypes = {
  locale: { control: { type: 'text' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};

export const WithTypeOfCustomValidation = (args) => {
  const locale = useDocumentLang();
  const [value, setValue] = useState(NaN);

  return (
    <>
      <NumberInput
        id="default-number-input"
        type="text"
        inputMode="decimal"
        label="NumberInput label"
        helperText="Optional helper text."
        validate={validateNumberSeparators}
        {...args}
        locale={locale}
        value={value}
        allowEmpty
        onChange={(event, state) => {
          setValue(state.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          setValue(1000);
        }}>
        set to 1000
      </button>
    </>
  );
};
WithTypeOfCustomValidation.args = {
  step: 1,
  disabled: false,
  invalid: false,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
  helperText: 'Optional helper text.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
  type: 'text',
};
WithTypeOfCustomValidation.argTypes = {
  locale: { control: { type: 'text' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};

export const Skeleton = () => {
  return <NumberInputSkeleton />;
};

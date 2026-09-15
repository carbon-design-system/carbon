/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
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
  allowEmpty: { control: { type: 'boolean' } },
  disableWheel: { control: { type: 'boolean' } },
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
  hideLabel: { control: { type: 'boolean' } },
  hideSteppers: { control: { type: 'boolean' } },
  inputMode: {
    options: [
      'none',
      'text',
      'tel',
      'url',
      'email',
      'numeric',
      'decimal',
      'search',
    ],
    control: { type: 'select' },
  },
  readOnly: { control: { type: 'boolean' } },
  type: {
    options: ['number', 'text'],
    control: { type: 'select' },
  },
};

const reusableProps = {
  min: -100000000,
  max: 100000000,
};

const sharedArgs = {
  allowEmpty: false,
  disableWheel: false,
  disabled: false,
  helperText: 'Optional helper text.',
  invalid: false,
  invalidText: 'Number is not valid.',
  label: 'NumberInput label',
  hideLabel: false,
  hideSteppers: false,
  inputMode: 'decimal',
  readOnly: false,
  size: 'md',
  step: 1,
  type: 'number',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const textArgs = {
  ...sharedArgs,
  formatOptions: {},
  inputMode: 'decimal',
  locale: 'en-US',
  max: reusableProps.max,
  min: reusableProps.min,
  stepStartValue: 0,
  type: 'text',
};

const sharedControls = Object.keys(sharedArgTypes);
const textControls = [
  ...sharedControls,
  'formatOptions',
  'locale',
  'stepStartValue',
];

// TODO: Potential opportunity to differentiate between controlled and uncontrolled stories
export const Default = (args) => {
  const [value, setValue] = React.useState(50);

  const handleChange = (event, { value }) => {
    setValue(value);
  };

  return (
    <NumberInput
      id="default-number-input"
      value={value}
      onChange={handleChange}
      {...args}
    />
  );
};

Default.args = {
  ...sharedArgs,
  max: 100,
  min: -100,
  invalidText: `Number is not valid. Must be between -100 and 100`,
};

Default.argTypes = { ...sharedArgTypes };

Default.parameters = {
  controls: {
    include: sharedControls,
  },
};

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
      <NumberInput defaultValue={50} decorator={aiLabel} {...args} />
    </div>
  );
};

withAILabel.argTypes = { ...sharedArgTypes };

withAILabel.args = {
  ...sharedArgs,
  invalidText: 'Number is not valid',
  max: reusableProps.max,
  min: reusableProps.min,
};

withAILabel.parameters = {
  controls: {
    include: sharedControls,
  },
};

export const WithTypeOfText = (args) => {
  const locale = useDocumentLang();
  const { locale: localeArg, ...inputArgs } = args;

  return (
    <NumberInput
      id="default-number-input"
      defaultValue={50}
      {...inputArgs}
      locale={localeArg || locale}
    />
  );
};
WithTypeOfText.args = {
  ...textArgs,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
};
WithTypeOfText.argTypes = {
  locale: { control: { type: 'text' } },
  stepStartValue: { control: { type: 'number' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};
WithTypeOfText.parameters = {
  controls: {
    include: textControls,
  },
};

export const WithTypeOfTextControlled = (args) => {
  const locale = useDocumentLang();
  const [value, setValue] = useState(NaN);
  const { locale: localeArg, ...inputArgs } = args;

  return (
    <>
      <NumberInput
        id="default-number-input"
        {...inputArgs}
        locale={localeArg || locale}
        value={value}
        onChange={(event, state) => {
          setValue(state.value);
        }}
        onBlur={action('onBlur')}
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
  ...textArgs,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
};
WithTypeOfTextControlled.argTypes = {
  locale: { control: { type: 'text' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};
WithTypeOfTextControlled.parameters = {
  controls: {
    include: textControls,
  },
};

export const WithTypeOfCustomValidation = (args) => {
  const locale = useDocumentLang();
  const [value, setValue] = useState(NaN);
  const { locale: localeArg, ...inputArgs } = args;

  return (
    <>
      <NumberInput
        id="default-number-input"
        validate={validateNumberSeparators}
        {...inputArgs}
        locale={localeArg || locale}
        value={value}
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
  ...textArgs,
  allowEmpty: true,
  invalidText: `Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`,
};
WithTypeOfCustomValidation.argTypes = {
  locale: { control: { type: 'text' } },
  formatOptions: { control: { type: 'object' } },
  ...sharedArgTypes,
};
WithTypeOfCustomValidation.parameters = {
  controls: {
    include: textControls,
  },
};

export const Skeleton = (args) => {
  return <NumberInputSkeleton {...args} />;
};

Skeleton.argTypes = {
  size: {
    table: {
      defaultValue: { summary: '"md"' },
    },
  },
};

Skeleton.args = {
  size: 'md',
};

Skeleton.parameters = {
  controls: {
    include: ['size', 'hideLabel'],
  },
};

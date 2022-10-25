/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidForm from '../FluidForm';
import { default as TextInput, TextInputSkeleton } from '../TextInput';
import { Layer } from '../Layer';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  subcomponents: {
    TextInputSkeleton,
    'TextInput.PasswordInput': TextInput.PasswordInput,
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
  <TextInput
    id="text-input-1"
    type="text"
    labelText="Text input label"
    helperText="Optional help text"
  />
);

export const Fluid = () => (
  <FluidForm>
    <TextInput type="text" labelText="Text input label" id="text-input-1" />
  </FluidForm>
);

export const TogglePasswordVisibility = () => {
  return (
    <TextInput.PasswordInput
      id="text-input-1"
      labelText="Text input label"
      helperText="Optional help text"
    />
  );
};

export const ReadOnly = () => {
  return (
    <TextInput
      labelText="Text input label"
      helperText="Optional help text"
      value="This is read only, you can't type more."
      readOnly
      id="text-input-1"
    />
  );
};

export const WithLayer = () => {
  return (
    <>
      <TextInput
        type="text"
        labelText="First layer"
        helperText="Optional help text"
        id="text-input-1"
      />
      <Layer>
        <TextInput
          type="text"
          labelText="Second layer"
          helperText="Optional help text"
          id="text-input-2"
        />
        <Layer>
          <TextInput
            type="text"
            labelText="Third layer"
            helperText="Optional help text"
            id="text-input-3"
          />
        </Layer>
      </Layer>
    </>
  );
};

export const Skeleton = () => <TextInputSkeleton />;

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <TextInput {...args} id="text-input-1" type="text" />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 300,
  },
  className: {
    control: {
      type: 'text',
    },
    defaultValue: 'input-test-class',
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
    defaultValue: 'Placeholder text',
  },
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Error message goes here',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  labelText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Label text',
  },
  helperText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Helper text',
  },
  warn: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warnText: {
    control: {
      type: 'text',
    },
    defaultValue:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
  value: {
    control: {
      type: 'text',
    },
  },
  onChange: {
    action: 'clicked',
  },
  onClick: {
    action: 'clicked',
  },
  size: {
    defaultValue: 'md',
    options: ['sm', 'md', 'lg', 'xl'],
    control: {
      type: 'select',
    },
  },
};

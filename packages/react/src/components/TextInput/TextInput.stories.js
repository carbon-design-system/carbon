/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import FluidForm from '../FluidForm';
import { default as TextInput, TextInputSkeleton } from '../TextInput';

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
      autoComplete="true"
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

export const _WithLayer = () => (
  <WithLayer>
    {(layer) => (
      <TextInput
        type="text"
        labelText="Text input label"
        helperText="Optional help text"
        id={`text-input-${layer}`}
      />
    )}
  </WithLayer>
);

export const Skeleton = () => <TextInputSkeleton />;

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <TextInput {...args} id="text-input-1" type="text" />
  </div>
);

Playground.args = {
  playgroundWidth: 300,
  className: 'input-test-class',
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText: 'Error message goes here',
  disabled: false,
  labelText: 'Label text',
  helperText: 'Helper text',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  size: 'md',
};

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
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
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
  value: {
    control: {
      type: 'text',
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  size: {
    options: ['sm', 'md', 'lg', 'xl'],
    control: {
      type: 'select',
    },
  },
};

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

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Text%20input%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22text-input%22%2C%22label%22%3A%22Text%20input%20label%22%2C%22placeholder%22%3A%22Text%20input%20placeholder%22%2C%22helperText%22%3A%22Helper%20text%22%2C%22inputType%22%3A%22text%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22text-input-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Default = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <TextInput
        id="text-input-1"
        type="text"
        labelText="Text input label"
        helperText="Optional help text"
    />
  </div>
);

export const Fluid = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
    <FluidForm>
      <TextInput type="text" labelText="Text input label" id="text-input-1" />
    </FluidForm>
  </div>
);

export const TogglePasswordVisibility = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
      <TextInput.PasswordInput
        id="text-input-1"
        labelText="Text input label"
        helperText="Optional help text"
        autoComplete="true"
      />
    </div>
  );
};

export const ReadOnly = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
      <TextInput
        labelText="Text input label"
        helperText="Optional help text"
        value="This is read only, you can't type more."
        readOnly
        id="text-input-1"
      />
    </div>
  );
};

export const _WithLayer = () => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
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
  </div>
);

export const Skeleton = () => <div><CarbonBuilderLink></CarbonBuilderLink><TextInputSkeleton /></div>;

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <CarbonBuilderLink></CarbonBuilderLink>
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
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  size: {
    defaultValue: 'md',
    options: ['sm', 'md', 'lg', 'xl'],
    control: {
      type: 'select',
    },
  },
};

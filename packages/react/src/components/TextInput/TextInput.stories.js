/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import FluidForm from '../FluidForm';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Slug, SlugContent, SlugActions } from '../Slug';
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

const slug = (
  <Slug autoAlign size="xs">
    <SlugContent>
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
      <SlugActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View literature</Button>
      </SlugActions>
    </SlugContent>
  </Slug>
);

export const WithSlug = () => (
  <TextInput
    id="text-input-1"
    type="text"
    labelText="Text input label"
    helperText="Optional help text"
    slug={slug}
  />
);

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

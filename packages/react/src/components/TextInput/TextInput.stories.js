/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import FluidForm from '../FluidForm';
import { View, FolderOpen, Folders, Information } from '@carbon/icons-react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import mdx from './TextInput.mdx';

import { default as TextInput, TextInputSkeleton } from '../TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    TextInputSkeleton,
  },
  argTypes: {
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
  },
};

const sharedArgTypes = {
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
  type: {
    control: {
      type: 'text',
    },
  },
  id: {
    control: false,
    table: {
      disable: false,
    },
  },
  decorator: {
    table: {
      disable: true,
    },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  inline: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  enableCounter: {
    control: {
      type: 'boolean',
    },
  },
  maxCount: {
    control: {
      type: 'number',
    },
  },
};

const sharedArgs = {
  className: 'input-test-class',
  id: 'text-input-1',
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
  readOnly: false,
  inline: false,
  hideLabel: false,
  enableCounter: false,
  maxCount: 10,
  type: 'text',
  value: '',
};

export const Default = (args) => {
  const { defaultWidth, ...textInputArgs } = args;

  return (
    <div style={{ width: defaultWidth }}>
      <TextInput {...textInputArgs} />
    </div>
  );
};

Default.args = {
  ...sharedArgs,
  defaultWidth: 300,
};

Default.argTypes = {
  ...sharedArgTypes,
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
};

export const Fluid = (args) => (
  <FluidForm>
    <TextInput {...args} />
  </FluidForm>
);

Fluid.args = { ...sharedArgs };

Fluid.argTypes = {
  ...sharedArgTypes,
  helperText: {
    control: false,
    table: { disable: true },
  },
};

export const ReadOnly = (args) => {
  return <TextInput {...args} />;
};

ReadOnly.args = {
  ...sharedArgs,
  defaultValue: "This is read only, you can't type more.",
  readOnly: true,
};

ReadOnly.argTypes = {
  ...sharedArgTypes,
  readOnly: {
    control: false,
    table: { disable: true },
  },
  value: {
    table: { disable: true },
  },
  id: {
    table: { disable: true },
  },
  disabled: {
    control: false,
    table: { disable: true },
  },
  invalid: {
    control: false,
    table: { disable: true },
  },
  invalidText: {
    control: false,
    table: { disable: true },
  },
  warn: {
    control: false,
    table: { disable: true },
  },
  warnText: {
    control: false,
    table: { disable: true },
  },
  enableCounter: {
    control: false,
    table: { disable: true },
  },
  maxCount: {
    control: false,
    table: { disable: true },
  },
};

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => <TextInput {...args} id={`text-input-${layer}`} />}
  </WithLayer>
);

_WithLayer.args = { ...sharedArgs };

_WithLayer.argTypes = { ...sharedArgTypes };

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
    <TextInput
      type="text"
      labelText="Text input label"
      helperText="Optional help text"
      id="text-input-ai-label"
      decorator={aiLabel}
      {...args}
    />
  );
};

withAILabel.argTypes = {
  ...sharedArgTypes,
};
withAILabel.args = {
  ...sharedArgs,
};

export const Skeleton = (args) => <TextInputSkeleton {...args} />;

Skeleton.args = {
  hideLabel: false,
};

Skeleton.argTypes = {
  hideLabel: { control: { type: 'boolean' } },
};

Skeleton.parameters = {
  controls: {
    include: ['hideLabel'],
  },
};

// Hidden Test-Only Story. This story tests for a bug where the invalid-text would overlap with components below it. #19960
export const TestInvalidTextNoOverlap = (args) => {
  return (
    <div style={{ width: args.defaultWidth }}>
      <TextInput
        labelText="test invalid text, the invalid text should not overlap"
        invalid
        invalidText="invalid text, this should not overlap with the component below"
        id="text-input-1"
        type="text"
      />
      <TextInput labelText="test label" id="text-input-2" type="text" />
    </div>
  );
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
TestInvalidTextNoOverlap.tags = ['!dev', '!autodocs'];

/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RadioButton from './RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButtonSkeleton from './RadioButton.Skeleton';
import React from 'react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './RadioButton.mdx';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  subcomponents: {
    RadioButtonGroup,
    RadioButtonSkeleton,
  },
  argTypes: {
    checked: {
      table: {
        disable: true,
      },
    },
    defaultChecked: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  disabled: {
    control: { type: 'boolean' },
  },
  invalid: {
    control: { type: 'boolean' },
  },
  invalidText: {
    control: { type: 'text' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
  },
  helperText: {
    control: { type: 'text' },
  },
  readOnly: {
    control: { type: 'boolean' },
  },
};

export const Vertical = (args) => {
  return (
    <RadioButtonGroup
      legendText="Group label"
      name="radio-button-vertical-group"
      defaultSelected="radio-1"
      orientation="vertical"
      {...args}>
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
        hideLabel={args.hideLabel}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
        hideLabel={args.hideLabel}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
        hideLabel={args.hideLabel}
        disabled
      />
    </RadioButtonGroup>
  );
};

Vertical.args = {
  disabled: false,
  invalid: false,
  invalidText: 'Invalid selection',
  warn: false,
  warnText: 'Warning message',
  helperText: 'Helper text',
  readOnly: false,
  labelPosition: 'right',
  required: false,
  hideLabel: false,
};

Vertical.argTypes = {
  ...sharedArgTypes,
  labelPosition: {
    control: { type: 'select' },
    options: ['left', 'right'],
    description: 'Provide where label text should be placed',
  },
  required: {
    control: { type: 'boolean' },
    description: 'Specify if input selection in group is required',
  },
  hideLabel: {
    description:
      'Specify whether the label should be visually hidden but still available to screen readers',
    control: {
      type: 'boolean',
    },
  },
};

export const Skeleton = () => {
  return <RadioButtonSkeleton />;
};

export const withAILabel = (args) => {
  const AILabelFunc = (kind) => (
    <AILabel className="ai-label-container" kind={kind}>
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
    <div className="ai-label-check-radio-container">
      <RadioButtonGroup
        decorator={AILabelFunc('default')}
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group"
        defaultSelected="radio-1"
        {...args}>
        <RadioButton
          labelText="Radio button label"
          value="radio-1"
          id="radio-1"
          hideLabel={args.hideLabel}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-2"
          id="radio-2"
          hideLabel={args.hideLabel}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-3"
          id="radio-3"
          hideLabel={args.hideLabel}
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-2"
        defaultSelected="radio-4"
        {...args}>
        <RadioButton
          labelText="Radio button label"
          value="radio-4"
          id="radio-4"
          hideLabel={args.hideLabel}
          decorator={AILabelFunc()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-5"
          id="radio-5"
          hideLabel={args.hideLabel}
          decorator={AILabelFunc()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-6"
          id="radio-6"
          hideLabel={args.hideLabel}
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-3"
        defaultSelected="radio-7"
        {...args}>
        <RadioButton
          labelText="Radio button label"
          value="radio-7"
          id="radio-7"
          hideLabel={args.hideLabel}
          decorator={AILabelFunc('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-8"
          id="radio-8"
          hideLabel={args.hideLabel}
          decorator={AILabelFunc('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-9"
          id="radio-9"
          hideLabel={args.hideLabel}
        />
      </RadioButtonGroup>
    </div>
  );
};

withAILabel.args = {
  disabled: false,
  invalid: false,
  invalidText: 'Invalid selection',
  warn: false,
  warnText: 'Warning message',
  helperText: 'Helper text',
  readOnly: false,
  hideLabel: false,
};

withAILabel.argTypes = {
  ...sharedArgTypes,
  hideLabel: {
    description:
      'Specify whether the label should be visually hidden but still available to screen readers',
    control: {
      type: 'boolean',
    },
  },
};
export const Default = (args) => {
  return (
    <RadioButtonGroup
      legendText="Radio Button group"
      name="radio-button-default-group"
      {...args}>
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
        hideLabel={args.hideLabel}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
        hideLabel={args.hideLabel}
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
        hideLabel={args.hideLabel}
      />
    </RadioButtonGroup>
  );
};

Default.args = {
  defaultSelected: 'radio-2',
  helperText: 'Helper text',
  hideLabel: false,
  invalidText: 'Invalid selection',
  warn: false,
  warnText: 'Please notice the warning',
};

Default.argTypes = {
  ...sharedArgTypes,
  defaultSelected: {
    description: 'Specify the `<RadioButton>` to be selected by default',
    options: ['radio-1', 'radio-2', 'radio-3'],
    control: {
      type: 'select',
    },
  },
  hideLabel: {
    description:
      'Specify whether the label should be visually hidden but still available to screen readers',
    control: {
      type: 'boolean',
    },
  },
  orientation: {
    description: 'Provide how radio buttons should be displayed',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
};

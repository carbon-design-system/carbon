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

export const Default = () => {
  return (
    <RadioButtonGroup
      legendText="Group label"
      name="radio-button-default-group">
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
        disabled
      />
    </RadioButtonGroup>
  );
};

export const Vertical = () => {
  return (
    <RadioButtonGroup
      legendText="Group label"
      name="radio-button-vertical-group"
      defaultSelected="radio-1"
      orientation="vertical">
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
        disabled
      />
    </RadioButtonGroup>
  );
};

export const Skeleton = () => {
  return <RadioButtonSkeleton />;
};

export const Playground = (args) => {
  return (
    <RadioButtonGroup
      legendText="Radio Button group"
      name="radio-button-playground-group"
      {...args}>
      <RadioButton
        labelText="Radio button label"
        value="radio-1"
        id="radio-1"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-2"
        id="radio-2"
      />
      <RadioButton
        labelText="Radio button label"
        value="radio-3"
        id="radio-3"
      />
    </RadioButtonGroup>
  );
};

Playground.args = {
  defaultSelected: 'radio-2',
  helperText: 'Helper text',
  invalidText: 'Invalid selection',
  warn: false,
  warnText: 'Please notice the warning',
};

Playground.argTypes = {
  defaultSelected: {
    description: 'Specify the `<RadioButton>` to be selected by default',
    options: ['radio-1', 'radio-2', 'radio-3'],
    control: {
      type: 'select',
    },
  },
  readOnly: {
    description: 'Specify whether the RadioButtonGroup is read-only',
    control: {
      type: 'boolean',
    },
  },
  helperText: {
    description:
      'Provide text that is used alongside the control label for additional help',
    control: {
      type: 'text',
    },
  },
  invalid: {
    description: 'Specify whether the RadioButtonGroup is invalid',
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    description:
      'Provide the text that is displayed when the control is in an invalid state',
    control: {
      type: 'text',
    },
  },
  orientation: {
    description: 'Provide how radio buttons should be displayed',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
  warn: {
    description: 'Specify whether the control is currently in warning state',
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    description:
      'Provide the text that is displayed when the control is in warning state',
    control: {
      type: 'text',
    },
  },
};

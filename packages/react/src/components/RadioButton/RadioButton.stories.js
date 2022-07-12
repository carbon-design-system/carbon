/**
 * Copyright IBM Corp. 2016, 2018
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
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <RadioButtonGroup
      legendText="Radio button heading"
      name="radio-button-group"
      defaultSelected="radio-1">
      <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />
      <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
      <RadioButton labelText="Option 3" value="radio-3" id="radio-3" disabled />
    </RadioButtonGroup>
  );
};

export const Skeleton = () => {
  return <RadioButtonSkeleton />;
};

export const Playground = (args) => {
  return (
    <RadioButtonGroup labelText="Radio Button group" {...args}>
      <RadioButton value="radio-1" id="radio-1" />
      <RadioButton labelText="Option 2" value="radio-2" id="radio-2" />
      <RadioButton labelText="Option 3" value="radio-3" id="radio-3" />
    </RadioButtonGroup>
  );
};

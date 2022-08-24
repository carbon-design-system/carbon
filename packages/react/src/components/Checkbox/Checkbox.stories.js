/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Checkbox, CheckboxSkeleton } from './';
import mdx from './Checkbox.mdx';

const prefix = 'cds';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  subcomponents: {
    CheckboxSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const CheckboxStory = () => {
  return (
    <fieldset className={`${prefix}--fieldset`}>
      <legend className={`${prefix}--label`}>Group label</legend>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
    </fieldset>
  );
};

CheckboxStory.storyName = 'Checkbox';

export const Skeleton = () => <CheckboxSkeleton />;

export const Playground = (args) => (
  <fieldset className={`${prefix}--fieldset`}>
    <legend className={`${prefix}--label`}>Group label</legend>
    <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" {...args} />
    <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" {...args} />
  </fieldset>
);

Playground.argTypes = {
  checked: {
    control: {
      type: 'boolean',
    },
  },
  className: {
    control: false,
  },
  defaultChecked: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
  },
  indeterminate: {
    control: {
      type: 'boolean',
    },
  },
  labelText: {
    control: false,
  },
};

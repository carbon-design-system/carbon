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
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { Slug, SlugContent, SlugActions } from '../Slug';
import { IconButton } from '../IconButton';
import { Button } from '../Button';

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
      legendText="Group label"
      name="radio-button-group"
      defaultSelected="radio-1">
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

export const SlugTest = () => {
  const slug = (kind) => (
    <Slug kind={kind} className="slug-container">
      <SlugContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h1>84%</h1>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <RadioButtonGroup
        slug={slug('default')}
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group"
        defaultSelected="radio-1">
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

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-2"
        defaultSelected="radio-4">
        <RadioButton
          labelText="Radio button label"
          value="radio-4"
          id="radio-4"
          slug={slug()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-5"
          id="radio-5"
          slug={slug()}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-6"
          id="radio-6"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        orientation="vertical"
        legendText="Group label"
        name="radio-button-group-3"
        defaultSelected="radio-7">
        <RadioButton
          labelText="Radio button label"
          value="radio-7"
          id="radio-7"
          slug={slug('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-8"
          id="radio-8"
          slug={slug('inline')}
        />
        <RadioButton
          labelText="Radio button label"
          value="radio-9"
          id="radio-9"
        />
      </RadioButtonGroup>
    </div>
  );
};

export const Skeleton = () => {};

export const Playground = (args) => {
  return (
    <RadioButtonGroup
      legendText="Radio Button group"
      name="radio-button-group"
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
  helperText: 'Helper text',
  invalidText: 'Invalid selection',
  warn: false,
  warnText: 'Please notice the warning',
};

Playground.argTypes = {
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

/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '../AILabel/ailabel-story.scss';
import { default as Checkbox, CheckboxSkeleton } from './';
import mdx from './Checkbox.mdx';
import CheckboxGroup from '../CheckboxGroup';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';

const checkboxEvents = {
  className: 'some-class',
  labelText: 'Checkbox label',
};

const fieldsetCheckboxProps = () => ({
  className: 'some-class',
  legendText: 'Group label',
});

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  subcomponents: {
    CheckboxGroup,
    CheckboxSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <CheckboxGroup {...fieldsetCheckboxProps()}>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
    </CheckboxGroup>
  );
};

export const Horizontal = () => {
  return (
    <CheckboxGroup
      orientation="horizontal"
      {...fieldsetCheckboxProps()}
      helperText="Helper text goes here">
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-3" />
    </CheckboxGroup>
  );
};

export const Single = () => {
  return (
    <>
      <Checkbox
        {...checkboxEvents}
        id="checkbox-3"
        helperText="Helper text goes here"
      />
      <br /> <br />
      <Checkbox
        {...checkboxEvents}
        id="checkbox-4"
        invalid
        invalidText="Invalid text goes here"
      />
      <br /> <br />
      <Checkbox
        {...checkboxEvents}
        id="checkbox-5"
        warn
        warnText="Warning text goes here"
      />
      <br /> <br />
      <Checkbox {...checkboxEvents} id="checkbox-6" readOnly />
    </>
  );
};

export const Skeleton = () => <CheckboxSkeleton />;

const slugFunc = (kind) => (
  <AILabel className="slug-container" kind={kind}>
    <AILabelContent>
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

export const withAILabel = () => (
  <div className="slug-check-radio-container">
    <CheckboxGroup legendText="Group Label" slug={slugFunc()}>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-3" />
    </CheckboxGroup>

    <CheckboxGroup legendText="Group Label">
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-4"
        slug={slugFunc()}
      />
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-5"
        slug={slugFunc()}
      />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-6" />
    </CheckboxGroup>

    <CheckboxGroup legendText="Group Label">
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-7"
        slug={slugFunc('inline')}
      />
      <Checkbox
        labelText={`Checkbox label`}
        id="checkbox-label-8"
        slug={slugFunc('inline')}
      />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-9" />
    </CheckboxGroup>
  </div>
);

export const Playground = (args) => (
  <CheckboxGroup {...fieldsetCheckboxProps()} {...args}>
    <Checkbox
      defaultChecked
      {...checkboxEvents}
      id="checkbox-0"
      helperText="hello"
    />
    <Checkbox {...checkboxEvents} id="checkbox-1" />
    <Checkbox disabled {...checkboxEvents} id="checkbox-2" />
  </CheckboxGroup>
);

Playground.args = {
  helperText: 'Helper text goes here',
  invalid: false,
  invalidText: 'Invalid message goes here',
  readOnly: false,
  warn: false,
  warnText: 'Warning message goes here',
};

Playground.argTypes = {
  helperText: {
    description: 'Provide text for the form group for additional help',
    control: {
      type: 'text',
    },
  },
  invalid: {
    description: 'Specify whether the form group is currently invalid',
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    description:
      'Provide the text that is displayed when the form group is in an invalid state',
    control: {
      type: 'text',
    },
  },
  legendText: {
    description:
      'Provide the text to be rendered inside of the fieldset <legend>',
    control: {
      type: 'text',
    },
  },
  readOnly: {
    description: 'Specify whether the CheckboxGroup is read-only',
    control: {
      type: 'boolean',
    },
  },
  warn: {
    description: 'Specify whether the form group is currently in warning state',
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    description:
      'Provide the text that is displayed when the form group is in warning state',
    control: {
      type: 'text',
    },
  },
  checked: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  defaultChecked: {
    table: {
      disable: true,
    },
  },
  hideLabel: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
  },
  indeterminate: {
    table: {
      disable: true,
    },
  },
  labelText: {
    table: {
      disable: true,
    },
  },
  onChange: {
    table: {
      disable: true,
    },
  },
  title: {
    table: {
      disable: true,
    },
  },
  orientation: {
    description: 'Provide how checkbox should be displayed',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
};

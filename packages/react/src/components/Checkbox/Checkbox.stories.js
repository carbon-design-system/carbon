/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Checkbox, CheckboxSkeleton } from './';
import mdx from './Checkbox.mdx';
import CheckboxGroup from '../CheckboxGroup';

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

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22CheckboxFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22checkbox%22%2C%22label%22%3A%22Checkbox%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22checkbox-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Default = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
      <CheckboxGroup {...fieldsetCheckboxProps()}>
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
        <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
      </CheckboxGroup>
    </div>
  );
};

export const Single = () => {
  return (
    <div>
      <CarbonBuilderLink></CarbonBuilderLink>
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
    </div>
  );
};

export const Skeleton = () => <div><CarbonBuilderLink></CarbonBuilderLink><CheckboxSkeleton /></div>;

export const Playground = (args) => (
  <div>
    <CarbonBuilderLink></CarbonBuilderLink>
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
  </div>
);

Playground.argTypes = {
  helperText: {
    description: 'Provide text for the form group for additional help',
    control: {
      type: 'text',
    },
    defaultValue: 'Helper text goes here',
  },
  invalid: {
    description: 'Specify whether the form group is currently invalid',
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    description:
      'Provide the text that is displayed when the form group is in an invalid state',
    control: {
      type: 'text',
    },
    defaultValue: 'Invalid message goes here',
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
    defaultValue: false,
  },
  warn: {
    description: 'Specify whether the form group is currently in warning state',
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warnText: {
    description:
      'Provide the text that is displayed when the form group is in warning state',
    control: {
      type: 'text',
    },
    defaultValue: 'Warning message goes here',
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
  disabled: {
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
};

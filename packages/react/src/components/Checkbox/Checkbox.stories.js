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

const prefix = 'cds';

const checkboxEvents = {
  className: 'some-class',
  labelText: 'Checkbox label',
};

const fieldsetCheckboxProps = () => ({
  className: 'some-class',
  legendText: 'Checkbox heading',
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
    <fieldset className={`${prefix}--fieldset`}>
      <legend className={`${prefix}--label`}>Group label</legend>
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />
      <Checkbox labelText={`Checkbox label`} id="checkbox-label-2" />
    </fieldset>
  );
};

export const Skeleton = () => <CheckboxSkeleton />;

export const Playground = (args) => (
  <CheckboxGroup {...fieldsetCheckboxProps()} {...args}>
    <Checkbox defaultChecked {...checkboxEvents} id="checkbox-0" />
    <Checkbox {...checkboxEvents} id="checkbox-1" />
    <Checkbox disabled {...checkboxEvents} id="checkbox-2" />
  </CheckboxGroup>
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

// export const Playground = (args) => (
//   <Checkbox defaultChecked {...checkboxEvents} id="checkbox-a" {...args}/>
// );

// Playground.argTypes = {
//   checked: {
//     control: {
//       type: 'boolean',
//     },
//   },
//   className: {
//     control: false,
//   },
//   defaultChecked: {
//     control: false,
//   },
//   disabled: {
//     control: {
//       type: 'boolean',
//     },
//   },
//   hideLabel: {
//     control: {
//       type: 'boolean',
//     },
//   },
//   id: {
//     control: false,
//   },
//   indeterminate: {
//     control: {
//       type: 'boolean',
//     },
//   },
//   labelText: {
//     control: false,
//   },
// };

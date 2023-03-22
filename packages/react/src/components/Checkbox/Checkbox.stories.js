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
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Invalid message goes here',
  },
  legendText: {
    control: {
      type: 'text',
    },
  },
  message: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  messageText: {
    control: {
      type: 'text',
    },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warn: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warnText: {
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

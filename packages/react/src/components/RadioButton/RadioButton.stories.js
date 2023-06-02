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
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Radio%20group%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22disabled%22%3Afalse%2C%22type%22%3A%22radio-group%22%2C%22legend%22%3A%22Radio%20group%22%2C%22defaultSelected%22%3A%22%22%2C%22labelPosition%22%3A%22right%22%2C%22orientation%22%3A%22horizontal%22%2C%22items%22%3A%5B%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%201%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-3%22%7D%7D%2C%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%202%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-4%22%7D%7D%2C%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%203%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-group-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
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
    </>
  );
};

export const Skeleton = () => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Radio%20group%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22disabled%22%3Afalse%2C%22type%22%3A%22radio-group%22%2C%22legend%22%3A%22Radio%20group%22%2C%22defaultSelected%22%3A%22%22%2C%22labelPosition%22%3A%22right%22%2C%22orientation%22%3A%22horizontal%22%2C%22items%22%3A%5B%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%201%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-3%22%7D%7D%2C%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%202%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-4%22%7D%7D%2C%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%203%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-group-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
      <RadioButtonSkeleton />
    </>
  );
};

export const Playground = (args) => {
  return (
    <>
      <a
        href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Radio%20group%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22disabled%22%3Afalse%2C%22type%22%3A%22radio-group%22%2C%22legend%22%3A%22Radio%20group%22%2C%22defaultSelected%22%3A%22%22%2C%22labelPosition%22%3A%22right%22%2C%22orientation%22%3A%22horizontal%22%2C%22items%22%3A%5B%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%201%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-3%22%7D%7D%2C%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%202%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-4%22%7D%7D%2C%7B%22type%22%3A%22radio%22%2C%22labelText%22%3A%22Option%203%22%2C%22disabled%22%3Afalse%2C%22defaultChecked%22%3Afalse%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22radio-group-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
        target="_blank"
        rel="noreferrer">
        Edit on Carbon UI Builder
      </a>
      <br></br>
      <br></br>
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
    </>
  );
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
    defaultValue: 'Helper text',
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
    defaultValue: 'Invalid selection',
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
    defaultValue: false,
  },
  warnText: {
    description:
      'Provide the text that is displayed when the control is in warning state',
    control: {
      type: 'text',
    },
    defaultValue: 'Please notice the warning',
  },
};

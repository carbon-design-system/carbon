/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { NumberInput } from './';
import NumberInputSkeleton from './NumberInput.Skeleton';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    subcomponents: {
      NumberInputSkeleton,
    },
  },
};

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Number%20input%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22number-input%22%2C%22size%22%3A%22md%22%2C%22label%22%3A%22Number%20input%20label%22%2C%22min%22%3A0%2C%22max%22%3A100%2C%22step%22%3A10%2C%22helperText%22%3A%22Helper%20text%22%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22number-input-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Default = () => {
  return <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <NumberInput
      id="carbon-number"
      min={0}
      max={100}
      value={50}
      label="NumberInput label"
      helperText="Optional helper text."
      invalidText="Number is not valid"
    />
  </>;
};

export const Playground = (args) => {
  // const { numberInputArrowTranslationIds, ...rest } = props();
  return <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <NumberInput
      id="carbon-number"
      min={0}
      max={100}
      value={50}
      label="NumberInput label"
      helperText="Optional helper text."
      invalidText="Number is not valid"
      {...args}
    />
  </>;
};

Playground.argTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  defaultValue: {
    table: {
      disable: true,
    },
  },
  helperText: {
    control: { type: 'text' },
  },
  id: {
    table: {
      disable: true,
    },
  },
  invalidText: {
    control: { type: 'text' },
  },
  label: {
    control: { type: 'text' },
  },
  light: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  onKeyUp: {
    action: 'onKeyUp',
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
  value: {
    control: { type: 'text' },
  },
  warnText: {
    control: {
      type: 'text',
    },
    defaultValue:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
};

export const Skeleton = () => <NumberInputSkeleton />;

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidNumberInput, FluidNumberInputSkeleton } from '.';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidNumberInput',
  component: FluidNumberInput,
};

const ToggleTip = (
  <>
    <ToggletipLabel>Label</ToggletipLabel>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </>
);

export const Default = () => (
  <FluidNumberInput
    labelText={ToggleTip}
    placeholder="Placeholder text"
    id="input-1"
  />
);

export const Skeleton = () => (
  <div style={{ width: '300px' }}>
    <FluidNumberInputSkeleton
      labelText="Label"
      placeholder="Placeholder text"
      id="input-1"
    />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidNumberInput {...args} />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 300,
  },
  // className: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue: 'test-class',
  // },
  // defaultValue: {
  //   control: {
  //     type: 'text',
  //   },
  // },
  // placeholder: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue: 'Placeholder text',
  // },
  // invalid: {
  //   control: {
  //     type: 'boolean',
  //   },
  //   defaultValue: false,
  // },
  // invalidText: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue:
  //     'Error message that is really long can wrap to more lines but should not be excessively long.',
  // },
  // isPassword: {
  //   control: {
  //     type: 'boolean',
  //   },
  //   defaultValue: false,
  // },
  // disabled: {
  //   control: {
  //     type: 'boolean',
  //   },
  //   defaultValue: false,
  // },
  // labelText: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue: 'Label',
  // },
  // warn: {
  //   control: {
  //     type: 'boolean',
  //   },
  //   defaultValue: false,
  // },
  // warnText: {
  //   control: {
  //     type: 'text',
  //   },
  //   defaultValue:
  //     'Warning message that is really long can wrap to more lines but should not be excessively long.',
  // },
  // value: {
  //   control: {
  //     type: 'text',
  //   },
  // },
};

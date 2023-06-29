/**
 * Copyright IBM Corp. 2016, 2023
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
  subcomponents: {
    FluidNumberInputSkeleton,
  },
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
  <div style={{ width: '400px' }}>
    <FluidNumberInput
      label={ToggleTip}
      placeholder="Placeholder text"
      id="input-default"
      step={10}
      min={0}
      max={100}
      defaultValue={50}
    />
    <br />
    <br />
    <FluidNumberInput
      label={ToggleTip}
      placeholder="Placeholder text"
      id="input-invalid"
      step={10}
      min={0}
      max={100}
      defaultValue={50}
      invalid
      invalidText="Warning message that is really long can wrap to more lines but should not be excessively long."
    />
    <br />
    <br />
    <FluidNumberInput
      label={ToggleTip}
      placeholder="Placeholder text"
      id="input-warning"
      step={10}
      min={0}
      max={100}
      defaultValue={50}
      warn
      warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
    />
  </div>
);

export const Skeleton = () => (
  <div style={{ width: '400px' }}>
    <FluidNumberInputSkeleton
      label="Label"
      placeholder="Placeholder text"
      id="input-skeleton"
    />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidNumberInput {...args} />
  </div>
);

Playground.args = {
  playgroundWidth: 400,
  defaultValue: 50,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  label: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  defaultValue: {
    control: {
      type: 'number',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
};

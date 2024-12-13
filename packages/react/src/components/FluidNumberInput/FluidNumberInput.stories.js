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
  title: 'Experimental/Fluid Components/unstable__FluidNumberInput',
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

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidNumberInput {...args} />
  </div>
);

Default.args = {
  max: 100,
  min: 0,
  step: 10,
  id: 'input-default',
  placeholder: 'Placeholder text',
  defaultWidth: 400,
  defaultValue: 50,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  label: ToggleTip,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  defaultWidth: {
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

export const Skeleton = () => (
  <div style={{ width: '400px' }}>
    <FluidNumberInputSkeleton
      label="Label"
      placeholder="Placeholder text"
      id="input-skeleton"
    />
  </div>
);

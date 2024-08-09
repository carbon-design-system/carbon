/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  FluidTimePicker,
  FluidTimePickerSelect,
  SelectItem,
  ToggletipLabel,
  Toggletip,
  ToggletipContent,
  ToggletipButton,
} from '@carbon/react';
import { Information } from '@carbon/icons-react';
import figma from '@figma/code-connect';

const sharedFluidTimePickerProps = {
  invalidText: figma.string('Error message'),
  warningText: figma.string('Warning message'),
  disabled: figma.enum('State', {
    Disabled: true,
  }),
  readOnly: figma.enum('State', {
    'Read-only': true,
  }),
  warning: figma.enum('State', {
    Warning: true,
  }),
  invalid: figma.enum('State', {
    Error: true,
  }),
};

figma.connect(
  FluidTimePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268399&t=qp8bdiovIuVIO7xb-4',
  {
    variant: { Inputs: '3' },
    props: sharedFluidTimePickerProps,
    example: ({ ...props }) => {
      const ToggleTip = (
        <>
          <ToggletipLabel>Clock</ToggletipLabel>
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

      return (
        <FluidTimePicker
          id="time-picker-1"
          labelText="Choose a time"
          placeholder="hh:mm"
          {...props}>
          <FluidTimePickerSelect id="select-1" labelText={ToggleTip}>
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
          <FluidTimePickerSelect id="select-2" labelText="Timezone">
            <SelectItem value="et" text="Eastern Time (ET)" />
            <SelectItem value="ct" text="Central Time (CT)" />
            <SelectItem value="mt" text="Mountain Time (MT)" />
            <SelectItem value="pt" text="Pacific Time (PT)" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
      );
    },
  }
);

figma.connect(
  FluidTimePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268399&t=qp8bdiovIuVIO7xb-4',
  {
    variant: { Inputs: '2' },
    props: sharedFluidTimePickerProps,
    example: ({ ...props }) => {
      const ToggleTip = (
        <>
          <ToggletipLabel>Clock</ToggletipLabel>
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

      return (
        <FluidTimePicker
          id="time-picker-2"
          labelText="Choose a time"
          placeholder="hh:mm"
          {...props}>
          <FluidTimePickerSelect id="select-3" labelText={ToggleTip}>
            <SelectItem value="am" text="AM" />
            <SelectItem value="pm" text="PM" />
          </FluidTimePickerSelect>
        </FluidTimePicker>
      );
    },
  }
);

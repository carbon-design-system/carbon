/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { TimePicker, TimePickerSelect, SelectItem } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  TimePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268301&t=qp8bdiovIuVIO7xb-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      // these properties are missing in Figma https://github.com/carbon-design-system/carbon-design-kit/issues/853
      //
      // labelText: figma.textContent('Choose a time'),
      // placeholder: figma.textContent('hh:mm'),
      // missing from Figma
      // value,
      // warning,
      // warningText,
      // invalid,
      // invalidText,
      // hideLabel
    },
    example: ({ ...props }) => (
      <TimePicker {...props} labelText="Choose a time" placeholder="hh:mm">
        <TimePickerSelect id="time-picker-select-1">
          <SelectItem value="AM" text="AM" />
          <SelectItem value="PM" text="PM" />
        </TimePickerSelect>
        <TimePickerSelect id="time-picker-select-2">
          <SelectItem value="Time zone 1" text="Time zone 1" />
          <SelectItem value="Time zone 2" text="Time zone 2" />
        </TimePickerSelect>
      </TimePicker>
    ),
  }
);

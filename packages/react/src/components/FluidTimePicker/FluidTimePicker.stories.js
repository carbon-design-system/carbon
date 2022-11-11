/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../FluidTimePickerSelect';
// import FluidTimePickerSkeleton from './FluidTimePicker.Skeleton';
import SelectItem from '../SelectItem';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidTimePicker',
  component: FluidTimePicker,
};

const ToggleTip = (
  <>
    <ToggletipLabel>Time</ToggletipLabel>
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
  <div style={{ width: '288px' }}>
    <FluidTimePicker labelText="Time" placeholder="hh:mm">
      <FluidTimePickerSelect labelText={ToggleTip}>
        <SelectItem value="am" text="AM" />
        <SelectItem value="pm" text="PM" />
      </FluidTimePickerSelect>
      <FluidTimePickerSelect labelText="Timezone">
        <SelectItem value="et" text="Eastern Time (ET)" />
        <SelectItem value="ct" text="Central Time (CT)" />
        <SelectItem value="mt" text="Mountain Time (MT)" />
        <SelectItem value="pt" text="Pacific Time (PT)" />
      </FluidTimePickerSelect>
    </FluidTimePicker>
  </div>
);

// export const Skeleton = () => (
//   <div style={{ width: '300px' }}>
//     <FluidTimePickerSkeleton />
//   </div>
// );

export const Playground = (args) => {
  return (
    <div style={{ width: '288px' }}>
      <FluidTimePicker {...args} />
    </div>
  );
};

Playground.argTypes = {
  // appendTo: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // children: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // className: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // disable: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // enable: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // inline: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // light: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // locale: {
  //   table: {
  //     disable: true,
  //   },
  // },
  // onChange: {
  //   action: 'clicked',
  //   table: {
  //     disable: true,
  //   },
  // },
  // onClose: {
  //   action: 'clicked',
  //   table: {
  //     disable: true,
  //   },
  // },
  // onOpen: {
  //   action: 'clicked',
  //   table: {
  //     disable: true,
  //   },
  // },
  // disabled: {
  //   control: { type: 'boolean' },
  //   table: {
  //     category: 'DatePickerInput',
  //   },
  // },
  // invalid: {
  //   control: { type: 'boolean' },
  //   table: {
  //     category: 'DatePickerInput',
  //   },
  // },
  // invalidText: {
  //   control: { type: 'text' },
  //   table: {
  //     category: 'DatePickerInput',
  //   },
  //   defaultValue:
  //     'Error message that is really long can wrap to more lines but should not be excessively long.',
  // },
  // placeholder: {
  //   control: { type: 'text' },
  //   table: {
  //     category: 'DatePickerInput',
  //   },
  // },
  // warn: {
  //   control: { type: 'boolean' },
  //   table: {
  //     category: 'DatePickerInput',
  //   },
  // },
  // warnText: {
  //   control: { type: 'text' },
  //   table: {
  //     category: 'DatePickerInput',
  //   },
  //   defaultValue:
  //     'Warning message that is really long can wrap to more lines but should not be excessively long.',
  // },
};

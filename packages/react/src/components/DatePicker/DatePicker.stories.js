/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import DatePicker from './DatePicker';
import DatePickerSkeleton from './DatePicker.Skeleton';
import DatePickerInput from '../DatePickerInput';
import mdx from './DatePicker.mdx';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  subcomponents: {
    DatePickerInput,
    DatePickerSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Simple = () => (
  <DatePicker datePickerType="simple">
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
    />
  </DatePicker>
);

export const SingleWithCalendar = () => (
  <DatePicker datePickerType="single">
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      size="md"
    />
  </DatePicker>
);

export const RangeWithCalendar = () => {
  return (
    <DatePicker datePickerType="range">
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
      />
    </DatePicker>
  );
};

export const SimpleWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="simple">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-simple-${layer}`}
          size="md"
        />
      </DatePicker>
    )}
  </WithLayer>
);

export const SingleWithCalendarWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="single">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-single-${layer}`}
          size="md"
        />
      </DatePicker>
    )}
  </WithLayer>
);

export const RangeWithCalendarWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="range">
        <DatePickerInput
          id={`date-picker-input-id-start-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
        />
        <DatePickerInput
          id={`date-picker-input-id-finish-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
        />
      </DatePicker>
    )}
  </WithLayer>
);

export const Skeleton = () => <DatePickerSkeleton range />;

export const Playground = ({ readOnly, ...args }) => {
  return (
    <DatePicker datePickerType="single" {...args} readOnly={readOnly}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        {...args}
      />
      {args.datePickerType === 'range' && (
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          id="date-picker-input-2"
          {...args}
        />
      )}
    </DatePicker>
  );
};

Playground.argTypes = {
  appendTo: {
    table: {
      disable: true,
    },
  },
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  disable: {
    table: {
      disable: true,
    },
  },
  enable: {
    table: {
      disable: true,
    },
  },
  inline: {
    table: {
      disable: true,
    },
  },
  locale: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClose: {
    action: 'onClose',
  },
  onOpen: {
    action: 'onOpen',
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  value: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    table: {
      category: 'DatePickerInput',
    },
  },
  disabled: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalid: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  invalidText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  placeholder: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warn: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  warnText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  helperText: {
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
};

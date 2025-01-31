/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import DatePicker from './DatePicker';
import DatePickerSkeleton from './DatePicker.Skeleton';
import DatePickerInput from '../DatePickerInput';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders, Information } from '@carbon/icons-react';

import mdx from './DatePicker.mdx';
import { Tooltip } from '../Tooltip';

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

const sharedArgTypes = {
  appendTo: {
    table: {
      disable: true,
    },
  },
  datePickerType: {
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

export const Default = ({ readOnly, ...args }) => {
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

Default.argTypes = {
  ...sharedArgTypes,
  datePickerType: {
    options: ['sigle', 'simple', 'range'],
    control: { type: 'select' },
  },
};

export const Simple = (args) => (
  <DatePicker datePickerType="simple" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
      {...args}
    />
  </DatePicker>
);

Simple.argTypes = { ...sharedArgTypes };

export const SingleWithCalendar = (args) => (
  <DatePicker datePickerType="single" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      size="md"
      {...args}
    />
  </DatePicker>
);

SingleWithCalendar.argTypes = { ...sharedArgTypes };

export const RangeWithCalendar = (args) => {
  return (
    <DatePicker datePickerType="range" {...args}>
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
        {...args}
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
        {...args}
      />
    </DatePicker>
  );
};

RangeWithCalendar.argTypes = { ...sharedArgTypes };

export const SimpleWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="simple" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-simple-${layer}`}
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SimpleWithLayer.argTypes = { ...sharedArgTypes };

export const SingleWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-single-${layer}`}
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SingleWithCalendarWithLayer.argTypes = { ...sharedArgTypes };

export const RangeWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="range" {...args}>
        <DatePickerInput
          id={`date-picker-input-id-start-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
          {...args}
        />
        <DatePickerInput
          id={`date-picker-input-id-finish-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

RangeWithCalendarWithLayer.argTypes = { ...sharedArgTypes };

export const Skeleton = () => {
  return <DatePickerSkeleton range />;
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = (args) => (
  <div style={{ width: 400 }}>
    <DatePicker datePickerType="single" {...args}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        size="md"
        id="date-picker"
        decorator={aiLabel}
        {...args}
      />
    </DatePicker>
  </div>
);

withAILabel.argTypes = { ...sharedArgTypes };

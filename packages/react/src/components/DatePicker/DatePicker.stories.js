/**
 * Copyright IBM Corp. 2016, 2026
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
import { useDocumentLang } from '../../internal/useDocumentLang';

import mdx from './DatePicker.mdx';

const sharedArgs = {
  allowInput: true,
  closeOnSelect: true,
  dateFormat: 'm/d/Y',
  maxDate: '',
  minDate: '',
  short: false,
  disabled: false,
  helperText: '',
  invalid: false,
  invalidText: 'Error message goes here',
  placeholder: 'mm/dd/yyyy',
  readOnly: false,
  size: 'md',
  warn: false,
  warnText: 'Warning message goes here',
};

const getDatePickerInputArgs = ({
  allowInput,
  closeOnSelect,
  dateFormat,
  maxDate,
  minDate,
  onClose,
  onOpen,
  short,
  ...datePickerInputArgs
}) => datePickerInputArgs;

const sharedArgTypes = {
  allowInput: {
    control: 'boolean',
  },
  closeOnSelect: {
    control: 'boolean',
  },
  dateFormat: {
    control: 'text',
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
    control: 'boolean',
  },
  short: {
    control: 'boolean',
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: 'select',
    table: {
      category: 'DatePickerInput',
    },
  },
  disabled: {
    control: 'boolean',
    table: {
      category: 'DatePickerInput',
    },
  },
  invalid: {
    control: 'boolean',
    table: {
      category: 'DatePickerInput',
    },
  },
  invalidText: {
    control: 'text',
    table: {
      category: 'DatePickerInput',
    },
  },
  maxDate: {
    control: 'text',
  },
  minDate: {
    control: 'text',
  },
  placeholder: {
    control: 'text',
    table: {
      category: 'DatePickerInput',
    },
  },
  warn: {
    control: 'boolean',
    table: {
      category: 'DatePickerInput',
    },
  },
  warnText: {
    control: 'text',
    table: {
      category: 'DatePickerInput',
    },
  },
  helperText: {
    control: 'text',
    table: {
      category: 'DatePickerInput',
    },
  },
};

const datePickerTypeArgType = {
  control: 'select',
  options: ['single', 'simple', 'range'],
};

const sharedParameters = {
  controls: {
    include: [...Object.keys(sharedArgTypes), 'datePickerType'],
  },
};

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
    ...sharedParameters,
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = ({ readOnly, ...args }) => {
  const locale = useDocumentLang().split('-')[0];
  const datePickerInputArgs = getDatePickerInputArgs({ ...args, readOnly });
  return (
    <DatePicker
      datePickerType="single"
      {...args}
      readOnly={readOnly}
      locale={locale}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        {...datePickerInputArgs}
      />
      {args.datePickerType === 'range' && (
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          id="date-picker-input-2"
          {...datePickerInputArgs}
        />
      )}
    </DatePicker>
  );
};

Default.argTypes = {
  ...sharedArgTypes,
  datePickerType: datePickerTypeArgType,
};
Default.args = { ...sharedArgs };

export const Simple = (args) => {
  const datePickerInputArgs = getDatePickerInputArgs(args);
  return (
    <DatePicker datePickerType="simple" {...args}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-simple"
        {...datePickerInputArgs}
      />
    </DatePicker>
  );
};

Simple.args = { ...sharedArgs };
Simple.argTypes = { ...sharedArgTypes };

export const SingleWithCalendar = (args) => {
  const datePickerInputArgs = getDatePickerInputArgs(args);
  return (
    <DatePicker datePickerType="single" {...args}>
      <DatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Date Picker label"
        id="date-picker-single"
        size="md"
        {...datePickerInputArgs}
      />
    </DatePicker>
  );
};

SingleWithCalendar.args = { ...sharedArgs };
SingleWithCalendar.argTypes = { ...sharedArgTypes };

export const RangeWithCalendar = (args) => {
  const datePickerInputArgs = getDatePickerInputArgs(args);
  return (
    <DatePicker datePickerType="range" {...args}>
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
        {...datePickerInputArgs}
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
        {...datePickerInputArgs}
      />
    </DatePicker>
  );
};

RangeWithCalendar.args = { ...sharedArgs };
RangeWithCalendar.argTypes = { ...sharedArgTypes };

export const SimpleWithLayer = (args) => {
  const datePickerInputArgs = getDatePickerInputArgs(args);
  return (
    <WithLayer>
      {(layer) => (
        <DatePicker datePickerType="simple" {...args}>
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id={`date-picker-simple-${layer}`}
            size="md"
            {...datePickerInputArgs}
          />
        </DatePicker>
      )}
    </WithLayer>
  );
};

SimpleWithLayer.args = { ...sharedArgs };
SimpleWithLayer.argTypes = Simple.argTypes;

export const SingleWithCalendarWithLayer = (args) => {
  const datePickerInputArgs = getDatePickerInputArgs(args);
  return (
    <WithLayer>
      {(layer) => (
        <DatePicker datePickerType="single" {...args}>
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id={`date-picker-single-${layer}`}
            size="md"
            {...datePickerInputArgs}
          />
        </DatePicker>
      )}
    </WithLayer>
  );
};

SingleWithCalendarWithLayer.args = { ...sharedArgs };
SingleWithCalendarWithLayer.argTypes = SingleWithCalendar.argTypes;

export const RangeWithCalendarWithLayer = (args) => {
  const datePickerInputArgs = getDatePickerInputArgs(args);
  return (
    <WithLayer>
      {(layer) => (
        <DatePicker datePickerType="range" {...args}>
          <DatePickerInput
            id={`date-picker-input-id-start-${layer}`}
            placeholder="mm/dd/yyyy"
            labelText="Start date"
            size="md"
            {...datePickerInputArgs}
          />
          <DatePickerInput
            id={`date-picker-input-id-finish-${layer}`}
            placeholder="mm/dd/yyyy"
            labelText="End date"
            size="md"
            {...datePickerInputArgs}
          />
        </DatePicker>
      )}
    </WithLayer>
  );
};

RangeWithCalendarWithLayer.args = { ...sharedArgs };
RangeWithCalendarWithLayer.argTypes = RangeWithCalendar.argTypes;

export const Skeleton = (args) => {
  return <DatePickerSkeleton {...args} />;
};

Skeleton.args = {
  hideLabel: false,
  range: true,
};
Skeleton.argTypes = {
  hideLabel: { control: 'boolean' },
  range: { control: 'boolean' },
};
Skeleton.parameters = {
  controls: { include: Object.keys(Skeleton.argTypes) },
};

export const withAILabel = (args) => {
  const datePickerInputArgs = getDatePickerInputArgs(args);
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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
  return (
    <div style={{ width: 400 }}>
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          size="md"
          id="date-picker"
          decorator={aiLabel}
          {...datePickerInputArgs}
        />
      </DatePicker>
    </div>
  );
};

withAILabel.args = {
  ...sharedArgs,
};
withAILabel.argTypes = SingleWithCalendar.argTypes;

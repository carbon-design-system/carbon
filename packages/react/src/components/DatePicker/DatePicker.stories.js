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
  disabled: false,
  helperText: '',
  invalid: false,
  invalidText: 'Error message goes here',
  maxDate: '',
  minDate: '',
  placeholder: 'mm/dd/yyyy',
  readOnly: false,
  short: false,
  size: 'md',
  warn: false,
  warnText: 'Warning message goes here',
};

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
};

export const Default = ({ readOnly, ...args }) => {
  const locale = useDocumentLang().split('-')[0];
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
        {...sharedArgs}
        {...args}
      />
      {args.datePickerType === 'range' && (
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          id="date-picker-input-2"
          {...sharedArgs}
          {...args}
        />
      )}
    </DatePicker>
  );
};

Default.argTypes = {
  ...sharedArgTypes,
  datePickerType: datePickerTypeArgType,
};
Default.args = {
  ...sharedArgs,
  datePickerType: 'single',
};

export const Simple = (args) => (
  <DatePicker datePickerType="simple" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-simple"
      {...sharedArgs}
      {...args}
    />
  </DatePicker>
);

Simple.args = {
  ...sharedArgs,
  datePickerType: 'simple',
};
Simple.argTypes = {
  ...sharedArgTypes,
  datePickerType: {
    ...datePickerTypeArgType,
    table: { readonly: true },
  },
};

export const SingleWithCalendar = (args) => (
  <DatePicker datePickerType="single" {...args}>
    <DatePickerInput
      placeholder="mm/dd/yyyy"
      labelText="Date Picker label"
      id="date-picker-single"
      size="md"
      {...sharedArgs}
      {...args}
    />
  </DatePicker>
);

SingleWithCalendar.args = {
  ...sharedArgs,
  datePickerType: 'single',
};
SingleWithCalendar.argTypes = {
  ...sharedArgTypes,
  datePickerType: {
    ...datePickerTypeArgType,
    table: { readonly: true },
  },
};

export const RangeWithCalendar = (args) => {
  return (
    <DatePicker datePickerType="range" {...args}>
      <DatePickerInput
        id="date-picker-input-id-start"
        placeholder="mm/dd/yyyy"
        labelText="Start date"
        size="md"
        {...sharedArgs}
        {...args}
      />
      <DatePickerInput
        id="date-picker-input-id-finish"
        placeholder="mm/dd/yyyy"
        labelText="End date"
        size="md"
        {...sharedArgs}
        {...args}
      />
    </DatePicker>
  );
};

RangeWithCalendar.args = {
  ...sharedArgs,
  datePickerType: 'range',
};
RangeWithCalendar.argTypes = {
  ...sharedArgTypes,
  datePickerType: {
    ...datePickerTypeArgType,
    table: { readonly: true },
  },
};

export const SimpleWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="simple" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-simple-${layer}`}
          size="md"
          {...sharedArgs}
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SimpleWithLayer.args = {
  ...sharedArgs,
  datePickerType: 'simple',
};
SimpleWithLayer.argTypes = Simple.argTypes;

export const SingleWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="single" {...args}>
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id={`date-picker-single-${layer}`}
          size="md"
          {...sharedArgs}
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

SingleWithCalendarWithLayer.args = {
  ...sharedArgs,
  datePickerType: 'single',
};
SingleWithCalendarWithLayer.argTypes = SingleWithCalendar.argTypes;

export const RangeWithCalendarWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <DatePicker datePickerType="range" {...args}>
        <DatePickerInput
          id={`date-picker-input-id-start-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="Start date"
          size="md"
          {...sharedArgs}
          {...args}
        />
        <DatePickerInput
          id={`date-picker-input-id-finish-${layer}`}
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          {...sharedArgs}
          {...args}
        />
      </DatePicker>
    )}
  </WithLayer>
);

RangeWithCalendarWithLayer.args = {
  ...sharedArgs,
  datePickerType: 'range',
};
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
          {...sharedArgs}
          {...args}
        />
      </DatePicker>
    </div>
  );
};

withAILabel.args = {
  ...sharedArgs,
  datePickerType: 'single',
};
withAILabel.argTypes = SingleWithCalendar.argTypes;

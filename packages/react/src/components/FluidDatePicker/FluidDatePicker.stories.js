/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import FluidDatePickerSkeleton from './FluidDatePicker.Skeleton';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './fluid-date-picker-story.scss';
import mdx from './FluidDatePicker.mdx';

export default {
  title: 'Components/Fluid Components/FluidDatePicker',
  component: FluidDatePicker,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    FluidDatePickerSkeleton,
  },
};

const sharedArgs = {
  allowInput: true,
  closeOnSelect: true,
  dateFormat: 'm/d/Y',
  disabled: false,
  helperText: '',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  maxDate: '',
  minDate: '',
  placeholder: 'mm/dd/yyyy',
  readOnly: false,
  short: false,
  size: 'md',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
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
  disabled: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  readOnly: {
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
  helperText: {
    control: { type: 'text' },
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
    control: { type: 'text' },
    table: {
      category: 'DatePickerInput',
    },
  },
  short: {
    control: { type: 'boolean' },
    table: {
      category: 'DatePickerInput',
    },
  },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
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
};

const datePickerTypeArgType = {
  control: 'select',
  options: ['simple', 'single', 'range'],
  table: { readonly: true },
};

const defaultWidthArgType = {
  control: { type: 'range', min: 240, max: 640, step: 16 },
};

const sharedParameters = {
  controls: {
    include: [...Object.keys(sharedArgTypes), 'datePickerType', 'defaultWidth'],
  },
};

const LabelToggletip = () => (
  <span className="fluid-date-picker-story__toggletip">
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </span>
);

export const Simple = ({ defaultWidth, ...args }) => (
  <div className="fluid-date-picker-story" style={{ width: defaultWidth }}>
    <FluidDatePicker datePickerType="simple" {...args}>
      <FluidDatePickerInput
        placeholder="mm/dd/yyyy"
        labelText="Label"
        id="date-picker-simple"
        {...args}
      />
    </FluidDatePicker>
    <LabelToggletip />
  </div>
);

Simple.args = {
  ...sharedArgs,
  datePickerType: 'simple',
  defaultWidth: 288,
};
Simple.argTypes = {
  ...sharedArgTypes,
  datePickerType: datePickerTypeArgType,
  defaultWidth: defaultWidthArgType,
};
Simple.parameters = sharedParameters;

export const Single = ({ defaultWidth, ...args }) => (
  <div className="fluid-date-picker-story" style={{ width: defaultWidth }}>
    <FluidDatePicker datePickerType="single" {...args}>
      <FluidDatePickerInput
        style={{ width: defaultWidth }}
        placeholder="mm/dd/yyyy"
        labelText="Label"
        id="date-picker-single"
        {...args}
      />
    </FluidDatePicker>
    <LabelToggletip />
  </div>
);

Single.args = {
  ...sharedArgs,
  datePickerType: 'single',
  defaultWidth: 288,
};
Single.argTypes = {
  ...sharedArgTypes,
  datePickerType: datePickerTypeArgType,
  defaultWidth: defaultWidthArgType,
};
Single.parameters = sharedParameters;

export const RangeWithCalendar = ({ defaultWidth, ...args }) => {
  return (
    <div className="fluid-date-picker-story" style={{ width: defaultWidth }}>
      <FluidDatePicker datePickerType="range" {...args}>
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder="mm/dd/yyyy"
          labelText="Label"
          size="md"
          {...args}
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder="mm/dd/yyyy"
          labelText="End date"
          size="md"
          {...args}
        />
      </FluidDatePicker>
      <LabelToggletip />
    </div>
  );
};

RangeWithCalendar.args = {
  ...sharedArgs,
  datePickerType: 'range',
  defaultWidth: 288,
};
RangeWithCalendar.argTypes = {
  ...sharedArgTypes,
  datePickerType: datePickerTypeArgType,
  defaultWidth: defaultWidthArgType,
};
RangeWithCalendar.parameters = sharedParameters;

export const Skeleton = ({ className, defaultWidth }) => (
  <div style={{ width: defaultWidth }}>
    <FluidDatePickerSkeleton
      className={className}
      datePickerType="simple"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-1"
    />
    <br />
    <br />
    <FluidDatePickerSkeleton
      className={className}
      datePickerType="single"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-2"
    />
    <br />
    <br />
    <FluidDatePickerSkeleton
      className={className}
      datePickerType="range"
      labelText="Label"
      placeholder="Placeholder text"
      id="input-3"
    />
  </div>
);

Skeleton.args = {
  className: '',
  defaultWidth: 300,
};

Skeleton.argTypes = {
  className: { control: 'text' },
  defaultWidth: defaultWidthArgType,
};

Skeleton.parameters = {
  controls: { include: Object.keys(Skeleton.argTypes) },
};

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import FluidForm from '.';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import FluidSelect from '../FluidSelect';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';
import FluidTextInput from '../FluidTextInput';
import FluidTextArea from '../FluidTextArea';
import FluidTimePicker from '../FluidTimePicker';
import FluidTimePickerSelect from '../FluidTimePickerSelect';
import FluidNumberInput from '../FluidNumberInput';
import FluidPasswordInput from '../FluidTextInput/FluidPasswordInput';
import ModalWrapper from '../ModalWrapper';
import mdx from './FluidForm.mdx';

const additionalProps = {
  className: 'some-class',
  'aria-label': 'sample form',
};

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  placeholder: 'Placeholder text',
};

const TextAreaProps = {
  className: 'some-class',
  id: 'test3',
  labelText: 'Text Area label',
  placeholder: 'Placeholder text',
};

const PasswordInputProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'Password',
  defaultValue: '0000',
};

export default {
  title: 'Components/Fluid Components/FluidForm',
  component: FluidForm,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Specify whether the fluid form inputs should be disabled',
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Specify whether the fluid form inputs should be read-only',
    },
    invalid: {
      control: {
        type: 'boolean',
      },
      description:
        'Specify whether the fluid form inputs are in an invalid state',
    },
    invalidText: {
      control: {
        type: 'text',
      },
      description: 'Provide the text for the invalid state',
    },
    warn: {
      control: {
        type: 'boolean',
      },
      description:
        'Specify whether the fluid form inputs should display a warning',
    },
    warnText: {
      control: {
        type: 'text',
      },
      description: 'Provide the text for the warning state',
    },
  },
  args: {
    disabled: false,
    readOnly: false,
    invalid: false,
    invalidText:
      'Error message that is really long can wrap to more lines but should not be excessively long.',
    warn: false,
    warnText:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
};

export const Default = (args) => {
  const { disabled, readOnly, invalid, invalidText, warn, warnText } = args;
  return (
    <>
      <FluidForm {...additionalProps}>
        <div style={{ display: 'flex' }}>
          <FluidTimePicker
            id="time-picker-1"
            labelText="Time"
            placeholder="hh:mm"
            {...args}>
            <FluidTimePickerSelect id="select-01" labelText="Clock">
              <SelectItem value="am" text="AM" />
              <SelectItem value="pm" text="PM" />
            </FluidTimePickerSelect>
            <FluidTimePickerSelect id="select-02" labelText="Timezone">
              <SelectItem value="et" text="Eastern Time (ET)" />
              <SelectItem value="ct" text="Central Time (CT)" />
              <SelectItem value="mt" text="Mountain Time (MT)" />
              <SelectItem value="pt" text="Pacific Time (PT)" />
            </FluidTimePickerSelect>
          </FluidTimePicker>
          <FluidDatePicker datePickerType="range" invalid={invalid} warn={warn}>
            <FluidDatePickerInput
              id="date-picker-input-id-start"
              placeholder="mm/dd/yyyy"
              labelText="Choose your dates"
              disabled={disabled}
              readOnly={readOnly}
              invalidText={invalidText}
              warnText={warnText}
            />
            <FluidDatePickerInput
              id="date-picker-input-id-finish"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              disabled={disabled}
              readOnly={readOnly}
              invalidText={invalidText}
              warnText={warnText}
            />
          </FluidDatePicker>
          <FluidSelect
            id="select-1"
            defaultValue="placeholder-item"
            labelText="Choose an option"
            {...args}>
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Choose an option"
            />
            <SelectItemGroup label="Category 1">
              <SelectItem value="option-1" text="Option 1" />
              <SelectItem value="option-2" text="Option 2" />
            </SelectItemGroup>
            <SelectItemGroup label="Category 2">
              <SelectItem value="option-3" text="Option 3" />
              <SelectItem value="option-4" text="Option 4" />
            </SelectItemGroup>
          </FluidSelect>
        </div>
        <div style={{ display: 'flex' }}>
          <FluidTextInput {...TextInputProps} {...args} />
          <FluidNumberInput
            label="Number Input Label"
            id="input-default"
            step={10}
            min={0}
            max={100}
            defaultValue={50}
            {...args}
          />
        </div>

        <FluidPasswordInput {...PasswordInputProps} {...args} />
        <FluidTextArea {...TextAreaProps} {...args} />
      </FluidForm>

      <br />

      <ModalWrapper
        hasScrollingContent
        buttonTriggerText="Fluid form in modal"
        modalHeading="Modal heading"
        modalLabel="Label"
        handleSubmit={() => {}}
        size="md">
        <FluidForm {...additionalProps}>
          <FluidTextInput {...TextInputProps} {...args} id="modal-test2" />
          <FluidPasswordInput
            {...PasswordInputProps}
            {...args}
            id="modal-test4"
          />
          <FluidTextArea {...TextAreaProps} {...args} id="modal-test3" />
        </FluidForm>
      </ModalWrapper>
    </>
  );
};

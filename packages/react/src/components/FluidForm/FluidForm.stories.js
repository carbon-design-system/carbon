/**
 * Copyright IBM Corp. 2016, 2018
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
import ModalWrapper from '../ModalWrapper';

const additionalProps = {
  className: 'some-class',
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

const InvalidPasswordProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'Password',
  value: '0000',
};

export default {
  title: 'Experimental/FluidForm',
  component: FluidForm,
};

export const Default = () => (
  <>
    <FluidForm {...additionalProps}>
      <div style={{ display: 'flex' }}>
        <FluidDatePicker datePickerType="range">
          <FluidDatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Choose your dates"
          />
          <FluidDatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </FluidDatePicker>
        <FluidSelect
          id="select-1"
          defaultValue="placeholder-item"
          labelText="Choose an option">
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
      <FluidTextInput {...TextInputProps} />
      <FluidTextInput
        type="password"
        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
        {...InvalidPasswordProps}
      />
      <FluidTextArea {...TextAreaProps} />
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
        <FluidTextInput {...TextInputProps} />
        <FluidTextInput
          type="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          {...InvalidPasswordProps}
        />
        <FluidTextArea {...TextAreaProps} />
      </FluidForm>
    </ModalWrapper>
  </>
);

import React, { useEffect, useState } from 'react';

import Checkbox from '../Checkbox';
import ComboBox from '../ComboBox/ComboBox';
import DatePicker from '../DatePicker/DatePicker';
import DatePickerInput from '../DatePickerInput/DatePickerInput';
import Dropdown from '../Dropdown/Dropdown';
import MultiSelect from '../MultiSelect';
import { NumberInput } from '../NumberInput';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import Select from '../Select';
import SelectItem from '../SelectItem';
import Slider from '../Slider';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import TimePicker from '../TimePicker';
import TimePickerSelect from '../TimePickerSelect';
import Toggle from '../Toggle/Toggle';

import { dropItemToString, dropdownItems } from './storybook-shared';

/* eslint-disable react/prop-types */
export const WrappedCheckboxes = ({ id, ...rest }) => (
  <fieldset className="cds--fieldset">
    <legend className="cds--label">Group {id}</legend>
    <Checkbox
      labelText="Checkbox label"
      id={`${id}-checked`}
      defaultChecked
      {...rest}
    />
    <Checkbox labelText="Checkbox label" id={`${id}-unchecked`} {...rest} />
  </fieldset>
);

export const WrappedDatePicker = ({
  id,
  type,
  datePickerValue,
  disabled,
  readOnly,
}) => (
  <DatePicker
    id={`date-picker-${id}`}
    datePickerType={type}
    value={datePickerValue}
    disabled={typeof disabled === 'boolean' ? disabled : undefined}
    readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}>
    <DatePickerInput
      id={`date-picker-input-${id}`}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      placeholder="mm/dd/yyyy"
      labelText={`Date Picker ${type === 'range' ? 'start' : ''}`}
      type="text"></DatePickerInput>
    {type === 'range' && (
      <DatePickerInput
        disabled={typeof disabled === 'boolean' ? disabled : undefined}
        id={`date-picker-input-${id}-2`}
        placeholder="mm/dd/yyyy"
        labelText={`Date Picker ${type === 'range' ? 'end' : ''}`}
        type="text"></DatePickerInput>
    )}
  </DatePicker>
);

export const WrappedTimePicker = ({
  id,
  time,
  timeAMPM,
  timeZone,
  disabled,
  readOnly,
}) => {
  const [selectedTime, setSelectedTime] = useState(time);
  const [selectedAMPM, setSelectedAMPM] = useState(timeAMPM);
  const [selectedTimeZone, setSelectedTimeZone] = useState(timeZone);
  useEffect(() => {
    setSelectedTime(time);
    setSelectedAMPM(timeAMPM);
    setSelectedTimeZone(timeZone);
  }, [time, timeAMPM, timeZone]);

  return (
    <TimePicker
      id={`time-picker-${id}`}
      labelText="Time-${id}"
      onChange={(event) => setSelectedTime(event.target.value)}
      value={selectedTime}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}>
      <TimePickerSelect
        id={`time-picker-select-ampm-${id}`}
        value={selectedAMPM}
        onChange={(event) => setSelectedAMPM(event.target.value)}>
        <SelectItem text="AM" value="am" />
        <SelectItem text="PM" value="pm" />
      </TimePickerSelect>
      <TimePickerSelect
        id={`time-picker-select-timezone-${id}`}
        value={selectedTimeZone}
        onChange={(event) => setSelectedTimeZone(event.target.value)}>
        <SelectItem text="Timezone 1" value="timezone-1" />
        <SelectItem text="Timezone 2" value="timezone-2" />
      </TimePickerSelect>
    </TimePicker>
  );
};

export const WrappedDropdown = ({
  id,
  dropdownValue,
  disabled,
  readOnly,
  inline,
}) => {
  const [selected, setSelected] = useState(dropdownValue);
  useEffect(() => {
    setSelected(dropdownValue);
  }, [dropdownValue]);
  return (
    <Dropdown
      id={`dropdown-enabled-${id}`}
      label={`Dropdown ${id}`}
      items={dropdownItems}
      itemToString={dropItemToString}
      titleText="Enabled dropdown title"
      selectedItem={selected}
      onChange={(event) => setSelected(event.selectedItem)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      type={
        typeof inline === 'boolean'
          ? inline
            ? 'inline'
            : 'default'
          : undefined
      }
    />
  );
};

export const WrappedComboBox = ({ id, comboBoxValue, disabled, readOnly }) => {
  const [selected, setSelected] = useState(comboBoxValue);
  useEffect(() => {
    setSelected(comboBoxValue);
  }, [comboBoxValue]);
  return (
    <ComboBox
      id={`combo-box-${id}`}
      label="ComboBox label"
      items={dropdownItems}
      itemToString={dropItemToString}
      titleText="ComboBox title"
      selectedItem={selected}
      onChange={(event) => setSelected(event.selectedItem)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
    />
  );
};

export const WrappedMultiSelect = ({
  id,
  multiSelectValue,
  disabled,
  readOnly,
  inline,
}) => {
  const [selected, setSelected] = useState(multiSelectValue);
  useEffect(() => {
    setSelected(multiSelectValue);
  }, [multiSelectValue]);
  return (
    <MultiSelect
      id={`multi-select-${id}`}
      label="MultiSelect label"
      items={dropdownItems}
      itemToString={dropItemToString}
      titleText="MultiSelect title"
      selectedItems={selected}
      onChange={(event) => {
        setSelected(event.selectedItems);
      }}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      type={
        typeof inline === 'boolean'
          ? inline
            ? 'inline'
            : 'default'
          : undefined
      }
    />
  );
};

export const WrappedNumberInput = ({
  id,
  numberInputValue,
  disabled,
  readOnly,
}) => {
  const [value, setValue] = useState(numberInputValue);
  useEffect(() => {
    setValue(numberInputValue);
  }, [numberInputValue]);
  return (
    <NumberInput
      id={`number-input-${id}`}
      label="Number input label"
      min={0}
      max={100}
      value={value}
      onChange={(_, state) => setValue(state.value)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
    />
  );
};

export const WrappedRadioButton = ({
  radioButtonValue,
  group,
  disabled,
  readOnly,
  orientation,
}) => {
  const [selected, setSelected] = useState(radioButtonValue);
  useEffect(() => {
    setSelected(radioButtonValue);
  }, [radioButtonValue]);
  return (
    <RadioButtonGroup
      legend="Group Legend"
      name={group}
      valueSelected={selected}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      orientation={typeof orientation === 'string' ? orientation : undefined}
      onChange={(selected) => setSelected(selected)}>
      <RadioButton
        id={`${group}-radio-1`}
        labelText="Radio button label"
        value="radio-1"
      />
      <RadioButton
        id={`${group}-radio-2`}
        labelText="Radio button label"
        value="radio-2"
      />
      <RadioButton
        id={`${group}-radio-3`}
        labelText="Radio button label"
        value="radio-3"
      />
    </RadioButtonGroup>
  );
};

export const WrappedSelect = ({
  id,
  selectValue,
  disabled,
  readOnly,
  inline,
}) => {
  const [selected, setSelected] = useState(selectValue);
  useEffect(() => {
    setSelected(selectValue?.id || undefined);
  }, [selectValue]);
  return (
    <Select
      id={`select-${id}`}
      label="Select label"
      value={selected}
      onChange={(event) => setSelected(event.target.value)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      inline={inline}>
      {dropdownItems.map((item) => (
        <SelectItem key={item.id} text={item.text} value={item.id} />
      ))}
    </Select>
  );
};

export const WrappedSlider = ({ id, sliderValue, disabled, readOnly }) => {
  const [value, setValue] = useState(sliderValue);
  useEffect(() => {
    setValue(sliderValue);
  }, [sliderValue]);
  return (
    <Slider
      id={`slider-${id}`}
      label="Slider label"
      min={0}
      max={100}
      step={1}
      value={value}
      onChange={(event) => setValue(event.value)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
    />
  );
};

export const WrappedTextArea = ({ id, textAreaValue, disabled, readOnly }) => {
  const [value, setValue] = useState(textAreaValue);
  useEffect(() => {
    setValue(textAreaValue);
  }, [textAreaValue]);
  return (
    <TextArea
      id={`text-area-${id}`}
      labelText="Text area label"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
    />
  );
};

export const WrappedTextInput = ({
  id,
  textInputValue,
  disabled,
  readOnly,
}) => {
  const [value, setValue] = useState(textInputValue);
  useEffect(() => {
    setValue(textInputValue);
  }, [textInputValue]);
  return (
    <TextInput
      id={`text-input-${id}`}
      labelText="Text input label"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
    />
  );
};

export const WrappedToggle = ({
  id,
  toggleValue,
  disabled,
  readOnly,
  size,
}) => {
  const [value, setValue] = useState(toggleValue);
  useEffect(() => {
    setValue(toggleValue);
  }, [toggleValue]);
  return (
    <Toggle
      id={`toggle-${id}`}
      labelText="Toggle label"
      toggled={value}
      onToggle={(value) => {
        console.log(id, value);
        setValue(value);
      }}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      size={size}
    />
  );
};

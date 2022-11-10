/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

import styles from './_storybook-styles.scss';

import Checkbox from '../Checkbox';
import ComboBox from '../ComboBox/ComboBox';
import DatePicker from '../DatePicker/DatePicker';
import DatePickerInput from '../DatePickerInput/DatePickerInput';
import Dropdown from '../Dropdown/Dropdown';
import MultiSelect from '../MultiSelect';
import { NumberInput } from '../NumberInput';
// import RadioButton from '../RadioButton';
// import RadioButtonGroup from '../RadioButtonGroup';
// import Select from '../Select';
// import SelectItem from '../SelectItem';
// import Slider from '../Slider';
// import TextArea from '../TextArea';
// import TextInput from '../TextInput';
import TimePicker from '../TimePicker';
import TimePickerSelect from '../TimePickerSelect';
import SelectItem from '../SelectItem';
// import Toggle from '../Toggle/Toggle';

const blockClass = 'readonly-rollup';

const dropdownItems = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    Disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];
const dropItemoString = (item) => (item ? item.text : '');

const WrappedDropdown = ({ dropdownValue, disabled, readOnly, inline }) => {
  const [selected, setSelected] = useState(dropdownValue);
  useEffect(() => {
    setSelected(dropdownValue);
  }, [dropdownValue]);
  return (
    <Dropdown
      id="dropdown-enabled"
      label="Enabled dropdown"
      items={dropdownItems}
      itemToString={dropItemoString}
      titleText="Enabled dropdown title"
      selectedItem={selected}
      onChange={(event) => setSelected(event.selectedItem)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      inline={typeof inline === 'boolean' ? inline : undefined}
    />
  );
};
const WrappedCombobox = ({ comboboxValue, disabled, readOnly, inline }) => {
  const [selected, setSelected] = useState(comboboxValue);
  useEffect(() => {
    setSelected(comboboxValue);
  }, [comboboxValue]);
  return (
    <ComboBox
      id="combo-box"
      label="Combo box label"
      items={dropdownItems}
      itemToString={dropItemoString}
      titleText="Combo box title"
      selectedItem={selected}
      onChange={(event) => setSelected(event.selectedItem)}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      inline={typeof inline === 'boolean' ? inline : undefined}
    />
  );
};

const WrappedMultiSelect = ({
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
      id="MultiSelect"
      label="MultiSelect label"
      items={dropdownItems}
      itemToString={dropItemoString}
      titleText="MultiSelect title"
      selectedItems={selected}
      onChange={(event) => {
        console.log(event.selectedItems);
        setSelected(event.selectedItems);
      }}
      disabled={typeof disabled === 'boolean' ? disabled : undefined}
      readOnly={typeof readOnly === 'boolean' ? readOnly : undefined}
      inline={typeof inline === 'boolean' ? inline : undefined}
    />
  );
};

const headerData = [
  {
    key: 'component',
  },
  {
    key: 'enabled',
    header: 'Enabled',
  },
  {
    key: 'disabled',
    header: 'Disabled',
  },
  {
    key: 'readonly',
    header: 'Readonly',
  },
];

const rowData = [
  {
    id: 'checkboxes',
    component: 'Checkboxes',
    Enabled: () => (
      <fieldset className="cds--fieldset">
        <legend className="cds--label">Enabled group</legend>
        <Checkbox labelText="Checkbox label" id="checked" checked />
        <Checkbox labelText="Checkbox label" id="unchecked" />
      </fieldset>
    ),
    Disabled: () => (
      <fieldset className="cds--fieldset">
        <legend className="cds--label">Disabled group</legend>
        <Checkbox
          labelText="Checkbox label"
          id="checked-disabled"
          checked
          disabled
        />
        <Checkbox labelText="Checkbox label" id="unchecked-disabled" disabled />
      </fieldset>
    ),
    Readonly: () => (
      <fieldset className="cds--fieldset">
        <legend className="cds--label">Readonly group</legend>
        <Checkbox
          labelText="Checkbox label"
          id="checked-readonly"
          checked
          readOnly
        />
        <Checkbox labelText="Checkbox label" id="unchecked-readonly" readOnly />
      </fieldset>
    ),
  },

  {
    id: 'Date Picker Simple',
    component: 'Date Picker Simple',
    Enabled: ({ datePickerSimple }) => (
      <DatePicker
        id="date-picker-simple"
        datePickerType="simple"
        value={datePickerSimple}>
        <DatePickerInput
          id="date-picker-input"
          placeholder="mm/dd/yyyy"
          labelText="Enabled date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
    Disabled: ({ datePickerSimple }) => (
      <DatePicker
        id="date-picker-simple-disabled"
        datePickerType="simple"
        disabled
        value={datePickerSimple}>
        <DatePickerInput
          disabled
          id="date-picker-input-disabled"
          placeholder="mm/dd/yyyy"
          labelText="Disabled date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
    Readonly: ({ datePickerSimple }) => (
      <DatePicker
        id="date-picker-readonly"
        datePickerType="simple"
        readOnly
        value={datePickerSimple}>
        <DatePickerInput
          id="date-picker-input-simple-readonly"
          placeholder="mm/dd/yyyy"
          labelText="Readonly date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
  },

  {
    id: 'Date Picker Single',
    component: 'Date Picker Single',
    Enabled: ({ datePickerSingle }) => (
      <DatePicker
        id="date-picker-single"
        datePickerType="single"
        value={datePickerSingle}>
        <DatePickerInput
          id="date-picker-input"
          placeholder="mm/dd/yyyy"
          labelText="Enabled date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
    Disabled: ({ datePickerSingle }) => (
      <DatePicker
        id="date-picker-single-disabled"
        datePickerType="single"
        disabled
        value={datePickerSingle}>
        <DatePickerInput
          disabled
          id="date-picker-input-single-disabled"
          placeholder="mm/dd/yyyy"
          labelText="Disabled date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
    Readonly: ({ datePickerSingle }) => (
      <DatePicker
        id="date-picker"
        datePickerType="single"
        readOnly
        value={datePickerSingle}>
        <DatePickerInput
          id="date-picker-input-single-readonly"
          placeholder="mm/dd/yyyy"
          labelText="Readonly date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
  },

  {
    id: ' Date Picker Range',
    component: ' Date Picker Range',
    Enabled: ({ datePickerRangeStart, datePickerRangeEnd }) => (
      <DatePicker
        id="date-picker-range"
        datePickerType="range"
        value={[datePickerRangeStart, datePickerRangeEnd]}>
        <DatePickerInput
          id="date-picker-input-start"
          placeholder="mm/dd/yyyy"
          labelText="Enabled date"
          type="text"></DatePickerInput>
        <DatePickerInput
          id="date-picker-input-end"
          placeholder="mm/dd/yyyy"
          labelText="Enabled date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
    Disabled: ({ datePickerRangeStart, datePickerRangeEnd }) => (
      <DatePicker
        id="date-picker-range-disabled"
        datePickerType="range"
        disabled
        value={[datePickerRangeStart, datePickerRangeEnd]}>
        <DatePickerInput
          disabled
          id="date-picker-input-range-disabled"
          placeholder="mm/dd/yyyy"
          labelText="Disabled date"
          type="text"></DatePickerInput>
        <DatePickerInput
          disabled
          id="date-picker-input-range-disabled"
          placeholder="mm/dd/yyyy"
          labelText="Disabled date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
    Readonly: ({ datePickerRangeStart, datePickerRangeEnd }) => (
      <DatePicker
        id="date-picker-range-readonly"
        datePickerType="range"
        readOnly
        value={[datePickerRangeStart, datePickerRangeEnd]}>
        <DatePickerInput
          id="date-picker-input-range-readonly"
          placeholder="mm/dd/yyyy"
          labelText="Readonly date"
          type="text"></DatePickerInput>
        <DatePickerInput
          id="date-picker-input-range-readonly"
          placeholder="mm/dd/yyyy"
          labelText="Readonly date"
          type="text"></DatePickerInput>
      </DatePicker>
    ),
  },

  {
    id: 'Time Picker',
    component: 'Time Picker',
    Enabled: ({ time, timeZone, timeAMPM }) => (
      <TimePicker
        id="time-picker-enabled"
        labelText="Enabled time"
        value={time}>
        <TimePickerSelect id="time-picker-select-ampm" value={timeAMPM}>
          <SelectItem text="AM" value="am" />
          <SelectItem text="PM" value="pm" />
        </TimePickerSelect>
        <TimePickerSelect id="time-picker-select-timezone" value={timeZone}>
          <SelectItem text="Timezone 1" value="timezone-1" />
          <SelectItem text="Timezone 2" value="timezone-2" />
        </TimePickerSelect>
      </TimePicker>
    ),
    Disabled: ({ time, timeZone, timeAMPM }) => (
      <TimePicker
        id="time-picker-disabled"
        labelText="Disabled time"
        disabled
        defaultValue={time}>
        <TimePickerSelect
          id="time-picker-select-ampm-disabled"
          value={timeAMPM}>
          <SelectItem text="AM" value="am" />
          <SelectItem text="PM" value="pm" />
        </TimePickerSelect>
        <TimePickerSelect
          id="time-picker-select-timezone-disabled"
          value={timeZone}>
          <SelectItem text="Timezone 1" value="timezone-1" />
          <SelectItem text="Timezone 2" value="timezone-2" />
        </TimePickerSelect>
      </TimePicker>
    ),
    Readonly: ({ time, timeZone, timeAMPM }) => (
      <TimePicker
        id="time-picker-readonly"
        labelText="Readonly time"
        readOnly
        value={time}>
        <TimePickerSelect
          id="time-picker-select-ampm-readonly"
          value={timeAMPM}>
          <SelectItem text="AM" value="am" />
          <SelectItem text="PM" value="pm" />
        </TimePickerSelect>
        <TimePickerSelect
          id="time-picker-select-timezone-readonly"
          value={timeZone}>
          <SelectItem text="Timezone 1" value="timezone-1" />
          <SelectItem text="Timezone 2" value="timezone-2" />
        </TimePickerSelect>
      </TimePicker>
    ),
  },

  {
    id: 'Dropdown',
    component: 'Dropdown',
    Enabled: ({ dropdownValue }) => (
      <WrappedDropdown dropdownValue={dropdownValue} />
    ),
    Disabled: ({ dropdownValue }) => (
      <WrappedDropdown dropdownValue={dropdownValue} disabled />
    ),
    Readonly: ({ dropdownValue }) => (
      <WrappedDropdown dropdownValue={dropdownValue} readOnly />
    ),
  },

  {
    id: 'Dropdown-inline',
    component: 'Dropdown inline',
    Enabled: ({ dropdownValueInline }) => (
      <WrappedDropdown dropdownValue={dropdownValueInline} inline />
    ),
    Disabled: ({ dropdownValueInline }) => (
      <WrappedDropdown dropdownValue={dropdownValueInline} disabled inline />
    ),
    Readonly: ({ dropdownValueInline }) => (
      <WrappedDropdown dropdownValue={dropdownValueInline} readOnly inline />
    ),
  },

  {
    id: 'Combobox',
    component: 'Combobox',
    Enabled: ({ comboboxValue }) => (
      <WrappedCombobox comboboxValue={comboboxValue} />
    ),
    Disabled: ({ comboboxValue }) => (
      <WrappedCombobox comboboxValue={comboboxValue} disabled />
    ),
    Readonly: ({ comboboxValue }) => (
      <WrappedCombobox comboboxValue={comboboxValue} readOnly />
    ),
  },

  {
    id: 'MultiSelect',
    component: 'MultiSelect',
    Enabled: ({ multiSelectValue }) => (
      <WrappedMultiSelect multiSelectValue={multiSelectValue} />
    ),
    Disabled: ({ multiSelectValue }) => (
      <WrappedMultiSelect multiSelectValue={multiSelectValue} disabled />
    ),
    Readonly: ({ multiSelectValue }) => (
      <WrappedMultiSelect multiSelectValue={multiSelectValue} readOnly />
    ),
  },

  {
    id: 'NumberInput',
    component: 'NumberInput',
    Enabled: ({ numberInputValue }) => (
      <NumberInput
        id="number-input-enabled"
        label="Number input"
        value={numberInputValue}
        min={0}
        max={100}
        step={1}
      />
    ),
    Disabled: ({ numberInputValue }) => (
      <NumberInput
        id="number-input-disabled"
        label="Number input"
        value={numberInputValue}
        min={0}
        max={100}
        step={1}
        disabled
      />
    ),
    Readonly: ({ numberInputValue }) => (
      <NumberInput
        id="number-input-readonly"
        label="Number input"
        value={numberInputValue}
        min={0}
        max={100}
        step={1}
        readOnly
      />
    ),
  },
];

const ReadonlyRollup = (args) => (
  <div>
    <table className={`${blockClass}__table`}>
      <thead>
        <tr className={`${blockClass}__row`}>
          {headerData.map(({ key, header }) => (
            <th scope="col" key={key} className={`${blockClass}__col`}>
              <div>{header}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody aria-live="polite">
        {rowData.map(({ id, component, Enabled, Disabled, Readonly }) => {
          return (
            <tr key={id} className={`${blockClass}__row`}>
              <td className={`${blockClass}__col`}>{component}:</td>
              <td className={`${blockClass}__col`}>
                <Enabled {...args} />
              </td>
              <td className={`${blockClass}__col`}>
                <Disabled {...args} />
              </td>
              <td className={`${blockClass}__col`}>
                <Readonly {...args} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const dropdownItemsStorybookSelect = dropdownItems.reduce(
  (acc, item, index) => {
    acc.options.push(index + 1);
    acc.labels[index + 1] = item.text;
    acc.mapping[index + 1] = item;
    return acc;
  },
  { options: [0], labels: { 0: 'Nothing selected' }, mapping: { 0: undefined } }
);

const multiSelectItems = {
  options: [0, 1, 2, 3],
  labels: {
    0: 'Nothing selected',
    1: 'Option 1',
    2: 'Option 1 amd 2',
    3: 'All options',
  },
  mapping: {
    0: [],
    1: [dropdownItems[1]],
    2: [dropdownItems[1], dropdownItems[2]],
    3: dropdownItems,
  },
};

export default {
  parameters: styles,
  title: 'Components/ReadonlyRollup',
  component: ReadonlyRollup,
  argTypes: {
    numberInputValue: {
      control: {
        type: 'number',
      },
    },
    multiSelectValue: {
      options: multiSelectItems.options,
      mapping: multiSelectItems.mapping,
      control: {
        type: 'select',
        labels: multiSelectItems.labels,
      },
    },
    comboboxValue: {
      options: dropdownItemsStorybookSelect.options,
      mapping: dropdownItemsStorybookSelect.mapping,
      control: {
        type: 'select',
        labels: dropdownItemsStorybookSelect.labels,
      },
    },
    dropdownValue: {
      options: dropdownItemsStorybookSelect.options,
      mapping: dropdownItemsStorybookSelect.mapping,
      control: {
        type: 'select',
        labels: dropdownItemsStorybookSelect.labels,
      },
    },
    dropdownValueInline: {
      options: dropdownItemsStorybookSelect.options,
      mapping: dropdownItemsStorybookSelect.mapping,
      control: {
        type: 'select',
        labels: dropdownItemsStorybookSelect.labels,
      },
    },
    datePickerSimple: {
      control: {
        type: 'text',
      },
      defaultValue: '10/20/2010',
    },
    datePickerSingle: {
      control: {
        type: 'text',
      },
      defaultValue: '12/20/2012',
    },
    datePickerRangeStart: {
      control: {
        type: 'text',
      },
      defaultValue: '12/20/2012',
    },
    datePickerRangeEnd: {
      control: {
        type: 'text',
      },
      defaultValue: '12/20/2012',
    },
    time: { control: { type: 'text' }, defaultValue: '01:50' },
    timeAMPM: {
      options: ['am', 'pm'],
      control: {
        type: 'select',
        labels: { am: 'AM', pm: 'PM' },
      },
      defaultValue: 'AM',
    },
    timeZone: {
      options: ['timezone-1', 'timezone-2'],
      control: {
        type: 'select',
        labels: { 'timezone-1': 'Timezone 1', 'timezone-2': 'Timezone 2' },
      },
      defaultValue: 'timezone-1',
    },
  },
};

export const Default = (args) => <ReadonlyRollup {...args} />;

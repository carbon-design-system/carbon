/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import styles from './_storybook-styles.scss';

import {
  WrappedCheckboxes,
  WrappedComboBox,
  WrappedDatePicker,
  WrappedDropdown,
  WrappedMultiSelect,
  WrappedNumberInput,
  WrappedRadioButton,
  WrappedSelect,
  WrappedSlider,
  WrappedTextArea,
  // WrappedTextInput,
  WrappedTimePicker,
  // WrappedToggle,
} from './storybook-wrappers';

import {
  dropdownItemsStorybookSelect,
  multiSelectItems,
} from './storybook-shared';

const blockClass = 'readonly-rollup';

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
    Enabled: () => <WrappedCheckboxes id="enabled" />,
    Disabled: () => <WrappedCheckboxes id="disabled" disabled />,
    Readonly: () => <WrappedCheckboxes id="read-only" readOnly />,
  },

  {
    id: 'Date Picker Simple',
    component: 'Date Picker Simple',
    Enabled: ({ datePickerSimple }) => (
      <WrappedDatePicker
        id="enabled-simple"
        type="simple"
        datePickerValue={datePickerSimple}
      />
    ),
    Disabled: ({ datePickerSimple }) => (
      <WrappedDatePicker
        id="disabled-simple"
        type="simple"
        datePickerValue={datePickerSimple}
        disabled
      />
    ),
    Readonly: ({ datePickerSimple }) => (
      <WrappedDatePicker
        id="readonly-simple"
        type="simple"
        datePickerValue={datePickerSimple}
        readOnly
      />
    ),
  },

  {
    id: 'Date Picker Single',
    component: 'Date Picker Single',
    Enabled: ({ datePickerSingle }) => (
      <WrappedDatePicker
        id="enabled-single"
        type="single"
        datePickerValue={datePickerSingle}
      />
    ),
    Disabled: ({ datePickerSingle }) => (
      <WrappedDatePicker
        id="disabled-single"
        type="single"
        datePickerValue={datePickerSingle}
        disabled
      />
    ),
    Readonly: ({ datePickerSingle }) => (
      <WrappedDatePicker
        id="readonly-single"
        type="single"
        datePickerValue={datePickerSingle}
        readOnly
      />
    ),
  },

  {
    id: ' Date Picker Range',
    component: ' Date Picker Range',
    Enabled: ({ datePickerRangeStart, datePickerRangeEnd }) => (
      <WrappedDatePicker
        id="enabled-range"
        type="range"
        datePickerValue={[datePickerRangeStart, datePickerRangeEnd]}
      />
    ),
    Disabled: ({ datePickerRangeStart, datePickerRangeEnd }) => (
      <WrappedDatePicker
        id="disabled-range"
        type="range"
        datePickerValue={[datePickerRangeStart, datePickerRangeEnd]}
        disabled
      />
    ),
    Readonly: ({ datePickerRangeStart, datePickerRangeEnd }) => (
      <WrappedDatePicker
        id="readonly-range"
        type="range"
        datePickerValue={[datePickerRangeStart, datePickerRangeEnd]}
        readOnly
      />
    ),
  },

  {
    id: 'Time Picker',
    component: 'Time Picker',
    Enabled: ({ time, timeAMPM, timeZone }) => (
      <WrappedTimePicker
        id="enabled-time"
        time={time}
        timeAMPM={timeAMPM}
        timeZone={timeZone}
      />
    ),
    Disabled: ({ time, timeAMPM, timeZone }) => (
      <WrappedTimePicker
        id="disabled-time"
        time={time}
        timeAMPM={timeAMPM}
        timeZone={timeZone}
        disabled
      />
    ),
    Readonly: ({ time, timeAMPM, timeZone }) => (
      <WrappedTimePicker
        id="readonly-time"
        time={time}
        timeAMPM={timeAMPM}
        timeZone={timeZone}
        readOnly
      />
    ),
  },

  {
    id: 'Dropdown',
    component: 'Dropdown',
    Enabled: ({ dropdownValue }) => (
      <WrappedDropdown id="enabled" dropdownValue={dropdownValue} />
    ),
    Disabled: ({ dropdownValue }) => (
      <WrappedDropdown id="disabled" dropdownValue={dropdownValue} disabled />
    ),
    Readonly: ({ dropdownValue }) => (
      <WrappedDropdown id="read-only" dropdownValue={dropdownValue} readOnly />
    ),
  },

  {
    id: 'Dropdown-inline',
    component: 'Dropdown inline',
    Enabled: ({ dropdownValueInline }) => (
      <WrappedDropdown
        id="enabled"
        dropdownValue={dropdownValueInline}
        inline
      />
    ),
    Disabled: ({ dropdownValueInline }) => (
      <WrappedDropdown
        id="disabled"
        dropdownValue={dropdownValueInline}
        disabled
        inline
      />
    ),
    Readonly: ({ dropdownValueInline }) => (
      <WrappedDropdown
        id="read-only"
        dropdownValue={dropdownValueInline}
        readOnly
        inline
      />
    ),
  },

  {
    id: 'ComboBox',
    component: 'ComboBox',
    Enabled: ({ ComboBoxValue }) => (
      <WrappedComboBox ComboBoxValue={ComboBoxValue} />
    ),
    Disabled: ({ ComboBoxValue }) => (
      <WrappedComboBox ComboBoxValue={ComboBoxValue} disabled />
    ),
    Readonly: ({ ComboBoxValue }) => (
      <WrappedComboBox ComboBoxValue={ComboBoxValue} readOnly />
    ),
  },

  {
    id: 'MultiSelect',
    component: 'MultiSelect',
    Enabled: ({ multiSelectValue }) => (
      <WrappedMultiSelect id="enabled" multiSelectValue={multiSelectValue} />
    ),
    Disabled: ({ multiSelectValue }) => (
      <WrappedMultiSelect
        id="disabled"
        multiSelectValue={multiSelectValue}
        disabled
      />
    ),
    Readonly: ({ multiSelectValue }) => (
      <WrappedMultiSelect
        id="read-only"
        multiSelectValue={multiSelectValue}
        readOnly
      />
    ),
  },

  {
    id: 'MultiSelect-inline',
    component: 'MultiSelect inline',
    Enabled: ({ multiSelectValue }) => (
      <WrappedMultiSelect
        id="enabled-inline"
        multiSelectValue={multiSelectValue}
        inline
      />
    ),
    Disabled: ({ multiSelectValue }) => (
      <WrappedMultiSelect
        id="disabled-inline"
        multiSelectValue={multiSelectValue}
        inline
        disabled
      />
    ),
    Readonly: ({ multiSelectValue }) => (
      <WrappedMultiSelect
        id="read-only-inline"
        multiSelectValue={multiSelectValue}
        inline
        readOnly
      />
    ),
  },

  {
    id: 'NumberInput',
    component: 'NumberInput',
    Enabled: ({ numberInputValue }) => (
      <WrappedNumberInput id="enabled" numberInputValue={numberInputValue} />
    ),
    Disabled: ({ numberInputValue }) => (
      <WrappedNumberInput
        id="disabled"
        numberInputValue={numberInputValue}
        disabled
      />
    ),
    Readonly: ({ numberInputValue }) => (
      <WrappedNumberInput
        id="read-only"
        numberInputValue={numberInputValue}
        readOnly
      />
    ),
  },

  {
    id: 'RadioButton',
    component: 'RadioButton',
    Enabled: ({ radioButtonValue }) => (
      <WrappedRadioButton radioButtonValue={radioButtonValue} group="enabled" />
    ),
    Disabled: ({ radioButtonValue }) => (
      <WrappedRadioButton
        radioButtonValue={radioButtonValue}
        disabled
        group="disabled"
      />
    ),
    Readonly: ({ radioButtonValue }) => (
      <WrappedRadioButton
        radioButtonValue={radioButtonValue}
        readOnly
        group="read-only"
      />
    ),
  },

  {
    id: 'RadioButton-vertical',
    component: 'RadioButton vertical',
    Enabled: ({ radioButtonValue }) => (
      <WrappedRadioButton
        radioButtonValue={radioButtonValue}
        group="enabled-vertical"
        orientation="vertical"
      />
    ),
    Disabled: ({ radioButtonValue }) => (
      <WrappedRadioButton
        radioButtonValue={radioButtonValue}
        disabled
        group="disabled-vertical"
        orientation="vertical"
      />
    ),
    Readonly: ({ radioButtonValue }) => (
      <WrappedRadioButton
        radioButtonValue={radioButtonValue}
        readOnly
        group="readonly-vertical"
        orientation="vertical"
      />
    ),
  },

  {
    id: 'Select',
    component: 'Select',
    Enabled: ({ selectValue }) => (
      <WrappedSelect id="enabled" selectValue={selectValue} />
    ),
    Disabled: ({ selectValue }) => (
      <WrappedSelect id="disabled" selectValue={selectValue} disabled />
    ),
    Readonly: ({ selectValue }) => (
      <WrappedSelect id="read-only" selectValue={selectValue} readOnly />
    ),
  },

  {
    id: 'Slider',
    component: 'Slider',
    Enabled: ({ sliderValue }) => (
      <WrappedSlider id="enabled" sliderValue={sliderValue} />
    ),
    Disabled: ({ sliderValue }) => (
      <WrappedSlider id="disabled" sliderValue={sliderValue} disabled />
    ),
    Readonly: ({ sliderValue }) => (
      <WrappedSlider id="read-only" sliderValue={sliderValue} readOnly />
    ),
  },

  {
    id: 'TextArea',
    component: 'TextArea',
    Enabled: ({ textAreaValue }) => (
      <WrappedTextArea id="enabled" textAreaValue={textAreaValue} />
    ),
    Disabled: ({ textAreaValue }) => (
      <WrappedTextArea id="disabled" textAreaValue={textAreaValue} disabled />
    ),
    Readonly: ({ textAreaValue }) => (
      <WrappedTextArea id="read-only" textAreaValue={textAreaValue} readOnly />
    ),
  },
];

const ReadOnlyComparison = ({ filter, ...args }) => (
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
        {rowData
          ?.filter((row) => !filter || filter.test(row.id))
          .map(({ id, component, Enabled, Disabled, Readonly }) => {
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

export default {
  parameters: styles,
  title: 'Experimental/ReadOnlyComparison',
  component: ReadOnlyComparison,
  argTypes: {
    radioButtonValue: {
      options: ['radio-1', 'radio-2', 'radio-3'],
      control: {
        type: 'radio',
      },
    },
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
    ComboBoxValue: {
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
    selectValue: {
      options: dropdownItemsStorybookSelect.options,
      mapping: dropdownItemsStorybookSelect.mapping,
      control: {
        type: 'select',
        labels: dropdownItemsStorybookSelect.labels,
      },
    },
    sliderValue: {
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1,
      },
      defaultValue: 50,
    },
    textAreaValue: {
      control: {
        type: 'text',
      },
      defaultValue: 'Text Area',
    },
  },
};

export const All = (args) => <ReadOnlyComparison {...args} />;
export const Checkboxes = (args) => (
  <ReadOnlyComparison {...args} filter={/Checkbox/i} />
);
Checkboxes.parameters = {
  controls: { hideNoControlsWarning: true, include: [] },
};

export const ComboBox = (args) => (
  <ReadOnlyComparison {...args} filter={/ComboBox/i} />
);
ComboBox.parameters = { controls: { include: ['ComboBoxValue'] } };

export const DatePicker = (args) => (
  <ReadOnlyComparison {...args} filter={/Date Picker/i} />
);
DatePicker.parameters = {
  controls: {
    include: [
      'datePickerSimple',
      'datePickerSingle',
      'datePickerRangeStart',
      'datePickerRangeEnd',
    ],
  },
};

export const Dropdown = (args) => (
  <ReadOnlyComparison {...args} filter={/Dropdown/i} />
);
Dropdown.parameters = {
  controls: { include: ['dropdownValue', 'dropdownValueInline'] },
};

export const MultiSelect = (args) => (
  <ReadOnlyComparison {...args} filter={/MultiSelect/i} />
);
MultiSelect.parameters = { controls: { include: ['multiSelectValue'] } };

export const NumberInput = (args) => (
  <ReadOnlyComparison {...args} filter={/NumberInput/i} />
);
NumberInput.parameters = { controls: { include: ['numberInputValue'] } };

export const RadioButton = (args) => (
  <ReadOnlyComparison {...args} filter={/RadioButton/i} />
);
RadioButton.parameters = { controls: { include: ['radioButtonValue'] } };

export const TimePicker = (args) => (
  <ReadOnlyComparison {...args} filter={/Time Picker/i} />
);
TimePicker.parameters = {
  controls: { include: ['time', 'timeAMPM', 'timeZone'] },
};

export const Select = (args) => (
  <ReadOnlyComparison {...args} filter={/^Select/i} />
);
Select.parameters = { controls: { include: ['selectValue'] } };

export const Slider = (args) => (
  <ReadOnlyComparison {...args} filter={/Slider/i} />
);
Slider.parameters = { controls: { include: ['sliderValue'] } };

export const TextArea = (args) => (
  <ReadOnlyComparison {...args} filter={/TextArea/i} />
);
TextArea.parameters = { controls: { include: ['textAreaValue'] } };

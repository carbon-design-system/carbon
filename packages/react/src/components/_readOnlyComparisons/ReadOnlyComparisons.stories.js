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
  WrappedTextInput,
  WrappedTimePicker,
  WrappedToggle,
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

const wrappedThings = (id, storyName, fComponent) => {
  return {
    id,
    component: storyName,
    Enabled: fComponent('enabled', false, false),
    Disabled: fComponent('disabled', true, false),
    Readonly: fComponent('readonly', false, true),
  };
};

const rowData = [
  wrappedThings('checkboxes', 'Checkboxes', (id, disabled, readOnly) => () => (
    <WrappedCheckboxes {...{ id, disabled, readOnly }} />
  )),

  wrappedThings(
    'Date Picker Simple',
    'Date Picker Simple',
    (id, disabled, readOnly) =>
      ({ datePickerSimple }) =>
        (
          <WrappedDatePicker
            {...{ id, disabled, readOnly }}
            datePickerValue={datePickerSimple}
          />
        )
  ),

  wrappedThings(
    'Date Picker Single',
    'Date Picker Single',
    (id, disabled, readOnly) =>
      ({ datePickerSingle }) => {
        return (
          <WrappedDatePicker
            {...{ id, disabled, readOnly }}
            datePickerValue={datePickerSingle}
            type="single"
          />
        );
      }
  ),

  wrappedThings(
    'Date Picker Range',
    'Date Picker Range',
    (id, disabled, readOnly) =>
      ({ datePickerRangeStart, datePickerRangeEnd }) => {
        return (
          <WrappedDatePicker
            {...{ id, disabled, readOnly }}
            datePickerValue={[datePickerRangeStart, datePickerRangeEnd]}
            type="range"
          />
        );
      }
  ),

  wrappedThings(
    'Time Picker',
    'Time Picker',
    (id, disabled, readOnly) =>
      ({ time, timeAMPM, timeZone }) => {
        return (
          <WrappedTimePicker
            {...{ id, disabled, readOnly, time, timeAMPM, timeZone }}
          />
        );
      }
  ),

  wrappedThings(
    'Dropdown',
    'Dropdown',
    (id, disabled, readOnly) =>
      ({ dropdownValue }) => {
        return (
          <WrappedDropdown
            {...{ id, disabled, readOnly }}
            dropdownValue={dropdownValue}
          />
        );
      }
  ),

  wrappedThings(
    'Dropdown-Inline',
    'Dropdown inline',
    (id, disabled, readOnly) =>
      ({ dropdownValue }) => {
        return (
          <WrappedDropdown
            {...{ id, disabled, readOnly }}
            dropdownValue={dropdownValue}
            inline
          />
        );
      }
  ),

  wrappedThings(
    'ComboBox',
    'ComboBox',
    (id, disabled, readOnly) =>
      ({ comboBoxValue }) =>
        (
          <WrappedComboBox
            {...{ id, disabled, readOnly }}
            comboBoxValue={comboBoxValue}
          />
        )
  ),

  wrappedThings(
    'MultiSelect',
    'MultiSelect',
    (id, disabled, readOnly) =>
      ({ multiSelectValue }) =>
        (
          <WrappedMultiSelect
            {...{ id, disabled, readOnly }}
            multiSelectValue={multiSelectValue}
          />
        )
  ),

  wrappedThings(
    'MultiSelect-Inline',
    'MultiSelect inline',
    (id, disabled, readOnly) =>
      ({ multiSelectValue }) =>
        (
          <WrappedMultiSelect
            {...{ id, disabled, readOnly }}
            multiSelectValue={multiSelectValue}
            inline
          />
        )
  ),

  wrappedThings(
    'NumberInput',
    'NumberInput',
    (id, disabled, readOnly) =>
      ({ numberInputValue }) =>
        (
          <WrappedNumberInput
            {...{ id, disabled, readOnly }}
            numberInputValue={numberInputValue}
          />
        )
  ),

  wrappedThings(
    'RadioButton',
    'RadioButton',
    (id, disabled, readOnly) =>
      ({ radioButtonValue }) =>
        (
          <WrappedRadioButton
            {...{ id, disabled, readOnly }}
            radioButtonValue={radioButtonValue}
            group={`${id}`}
          />
        )
  ),

  wrappedThings(
    'RadioButton-Vertical',
    'RadioButton vertical',
    (id, disabled, readOnly) =>
      ({ radioButtonValue }) =>
        (
          <WrappedRadioButton
            {...{ id, disabled, readOnly }}
            radioButtonValue={radioButtonValue}
            group={`${id}-vertical`}
            orientation="vertical"
          />
        )
  ),

  wrappedThings(
    'Select',
    'Select',
    (id, disabled, readOnly) =>
      ({ selectValue }) =>
        (
          <WrappedSelect
            {...{ id, disabled, readOnly }}
            selectValue={selectValue}
          />
        )
  ),

  wrappedThings(
    'Select-Inline',
    'Select inline',
    (id, disabled, readOnly) =>
      ({ selectValue }) =>
        (
          <WrappedSelect
            {...{ id, disabled, readOnly }}
            selectValue={selectValue}
            inline
          />
        )
  ),

  wrappedThings(
    'Slider',
    'Slider',
    (id, disabled, readOnly) =>
      ({ sliderValue }) =>
        (
          <WrappedSlider
            {...{ id, disabled, readOnly }}
            sliderValue={sliderValue}
          />
        )
  ),

  wrappedThings(
    'TextArea',
    'TextArea',
    (id, disabled, readOnly) =>
      ({ textAreaValue }) =>
        (
          <WrappedTextArea
            {...{ id, disabled, readOnly }}
            textAreaValue={textAreaValue}
          />
        )
  ),

  wrappedThings(
    'TextInput',
    'TextInput',
    (id, disabled, readOnly) =>
      ({ textInputValue }) =>
        (
          <WrappedTextInput
            {...{ id, disabled, readOnly }}
            textInputValue={textInputValue}
          />
        )
  ),

  wrappedThings(
    'Toggle',
    'Toggle',
    (id, disabled, readOnly) =>
      ({ toggleValue }) => {
        return (
          <WrappedToggle
            {...{ id, disabled, readOnly }}
            toggleValue={toggleValue}
          />
        );
      }
  ),

  wrappedThings(
    'Toggle-small',
    'Toggle small',
    (id, disabled, readOnly) =>
      ({ toggleValue }) => {
        return (
          <WrappedToggle
            {...{ disabled, readOnly }}
            id={`${id}-small`}
            toggleValue={toggleValue}
            size="sm"
          />
        );
      }
  ),
];

const ReadOnlyComparisons = ({ filter, ...args }) => (
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
  title: 'Experimental/ReadOnlyComparisons',
  component: ReadOnlyComparisons,
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
    comboBoxValue: {
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
    textInputValue: {
      control: {
        type: 'text',
      },
      defaultValue: 'Text Input',
    },
    toggleValue: {
      label: 'Toggle on/off',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
};

export const All = (args) => <ReadOnlyComparisons {...args} />;
export const Checkboxes = (args) => (
  <ReadOnlyComparisons {...args} filter={/Checkbox/i} />
);
Checkboxes.parameters = {
  controls: { hideNoControlsWarning: true, include: [] },
};

export const ComboBox = (args) => (
  <ReadOnlyComparisons {...args} filter={/ComboBox/i} />
);
ComboBox.parameters = { controls: { include: ['ComboBoxValue'] } };

export const DatePicker = (args) => (
  <ReadOnlyComparisons {...args} filter={/Date Picker/i} />
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
  <ReadOnlyComparisons {...args} filter={/Dropdown/i} />
);
Dropdown.parameters = {
  controls: { include: ['dropdownValue', 'dropdownValueInline'] },
};

export const MultiSelect = (args) => (
  <ReadOnlyComparisons {...args} filter={/MultiSelect/i} />
);
MultiSelect.parameters = { controls: { include: ['multiSelectValue'] } };

export const NumberInput = (args) => (
  <ReadOnlyComparisons {...args} filter={/NumberInput/i} />
);
NumberInput.parameters = { controls: { include: ['numberInputValue'] } };

export const RadioButton = (args) => (
  <ReadOnlyComparisons {...args} filter={/RadioButton/i} />
);
RadioButton.parameters = { controls: { include: ['radioButtonValue'] } };

export const TimePicker = (args) => (
  <ReadOnlyComparisons {...args} filter={/Time Picker/i} />
);
TimePicker.parameters = {
  controls: { include: ['time', 'timeAMPM', 'timeZone'] },
};

export const Select = (args) => (
  <ReadOnlyComparisons {...args} filter={/^Select/i} />
);
Select.parameters = { controls: { include: ['selectValue'] } };

export const Slider = (args) => (
  <ReadOnlyComparisons {...args} filter={/Slider/i} />
);
Slider.parameters = { controls: { include: ['sliderValue'] } };

export const TextArea = (args) => (
  <ReadOnlyComparisons {...args} filter={/TextArea/i} />
);
TextArea.parameters = { controls: { include: ['textAreaValue'] } };

export const TextInput = (args) => (
  <ReadOnlyComparisons {...args} filter={/TextInput/i} />
);
TextInput.parameters = { controls: { include: ['textInputValue'] } };

export const Toggle = (args) => (
  <ReadOnlyComparisons {...args} filter={/Toggle/i} />
);

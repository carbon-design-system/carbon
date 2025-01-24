/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Checkbox from '../Checkbox';
import Form from './Form';
import FormGroup from '../FormGroup';
import FileUploader from '../FileUploader';
import { NumberInput } from '../NumberInput';
import RadioButton from '../RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import Button from '../Button';
import Search from '../Search';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import { Stack } from '../Stack';
import ComboBox from '../ComboBox';
import Dropdown from '../Dropdown';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import { MultiSelect, FilterableMultiSelect } from '../MultiSelect';
import FluidComboBox from '../FluidComboBox';
import FluidForm from '../FluidForm';
import FluidNumberInput from '../FluidNumberInput';
import FluidDatePicker from '../FluidDatePicker';
import FluidDatePickerInput from '../FluidDatePickerInput';
import FluidDropdown from '../FluidDropdown';
import FluidMultiSelect from '../FluidMultiSelect';
import FluidSelect from '../FluidSelect';
import FluidTextArea from '../FluidTextArea';
import FluidTextInput from '../FluidTextInput';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import '../AILabel/ailabel-story.scss';

import mdx from './Form.mdx';

const numberInputProps = {
  className: 'some-class',
  id: 'number-input-1',
  label: 'Number Input',
  min: 0,
  max: 100,
  value: 50,
  step: 10,
  iconDescription: 'Add/decrement number',
};

const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input label',
  placeholder: 'Placeholder text',
};

const PasswordProps = {
  className: 'some-class',
  id: 'test3',
  labelText: 'Password',
};

const InvalidPasswordProps = {
  className: 'some-class',
  id: 'test4',
  labelText: 'Password',
  invalid: true,
  invalidText:
    'Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number.',
};

const textareaProps = {
  labelText: 'Text Area label',
  className: 'some-class',
  placeholder: 'Placeholder text',
  id: 'test5',
  rows: 4,
};

const buttonEvents = {
  className: 'some-class',
};

export default {
  title: 'Components/Form',
  component: Form,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <Form aria-label="sample form">
      <Stack gap={7}>
        <FormGroup className="some-class" legendText="Checkbox heading">
          <Checkbox defaultChecked labelText="Checkbox label" id="checkbox-0" />
          <Checkbox labelText="Checkbox label" id="checkbox-1" />
          <Checkbox disabled labelText="Checkbox label" id="checkbox-2" />
        </FormGroup>

        <NumberInput
          className="some-class"
          id="number-input-1"
          label="Number Input"
          min={0}
          max={100}
          value={50}
          step={10}
          iconDescription="Add/decrement number"
        />

        <FormGroup className="some-class" legendText="File Uploader">
          <FileUploader
            id="file-1"
            role="button"
            labelDescription="Max file size is 500 MB. Only .jpg files are supported."
            buttonLabel="Add file"
            buttonKind="primary"
            size="md"
            filenameStatus="edit"
            accept={['.jpg', '.png']}
            multiple={true}
            disabled={false}
            iconDescription="Dismiss file"
            name=""
          />
        </FormGroup>

        <RadioButtonGroup
          name="radio-button-group"
          defaultSelected="default-selected"
          legendText="Radio Button heading">
          <RadioButton
            value="standard"
            id="radio-1"
            labelText="Standard Radio Button"
            className="some-class"
          />
          <RadioButton
            value="default-selected"
            labelText="Default Selected Radio Button"
            id="radio-2"
            className="some-class"
          />
          <RadioButton
            value="blue"
            labelText="Standard Radio Button"
            id="radio-3"
            className="some-class"
          />
          <RadioButton
            value="disabled"
            labelText="Disabled Radio Button"
            id="radio-4"
            disabled
            className="some-class"
          />
        </RadioButtonGroup>

        <FormGroup className="some-class" legendText="Search">
          <Search
            className="some-class"
            size="md"
            id="search-1"
            labelText="Search"
            placeholder="Search"
          />
        </FormGroup>

        <Select
          className="some-class"
          id="select-1"
          defaultValue="placeholder-item">
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Choose an option"
          />
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
          <SelectItem value="option-3" text="Option 3" />
        </Select>

        <TextInput
          className="some-class"
          id="test2"
          labelText="Text Input label"
          placeholder="Placeholder text"
        />

        <TextInput
          type="password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          className="some-class"
          id="test3"
          labelText="Password"
        />

        <TextInput
          type="password"
          required
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          className="some-class"
          id="test4"
          labelText="Password"
          invalid
          invalidText="Your password must be at least 6 characters as well as contain at least one uppercase one lowercase, and one number."
        />

        <TextArea
          labelText="Text Area label"
          className="some-class"
          placeholder="Placeholder text"
          id="test5"
          rows={4}
        />

        <Button type="submit" className="some-class">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};

const items = [
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
    disabled: true,
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

export const withAILabel = (args) => {
  const { revertActive, ...rest } = args;
  const aiLabel = (
    <AILabel className="ai-label-container" revertActive={revertActive}>
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h1>84%</h1>
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
    <Stack gap={7} className="form-example">
      <Form aria-label="sample form" className="ai-label-form">
        <Stack gap={7}>
          <NumberInput {...numberInputProps} decorator={aiLabel} {...rest} />
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              size="md"
              id="date-picker"
              decorator={aiLabel}
              {...rest}
            />
          </DatePicker>
          <TextInput {...TextInputProps} decorator={aiLabel} {...rest} />
          <TextArea {...textareaProps} decorator={aiLabel} {...rest} />
          <Dropdown
            id="default"
            titleText="Dropdown title"
            helperText="This is some helper text"
            initialSelectedItem={items[1]}
            label="Option 1"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            decorator={aiLabel}
            {...rest}
          />
          <MultiSelect
            label="Multiselect Label"
            id="carbon-multiselect-example"
            titleText="Multiselect title"
            helperText="This is helper text"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            selectionFeedback="top-after-reopen"
            decorator={aiLabel}
            {...rest}
          />
          <FilterableMultiSelect
            id="carbon-multiselect-example-3"
            titleText="FilterableMultiselect title"
            helperText="This is helper text"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            selectionFeedback="top-after-reopen"
            decorator={aiLabel}
            {...rest}
          />
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            titleText="ComboBox title"
            helperText="Combobox helper text"
            decorator={aiLabel}
            {...rest}
          />
          <Select
            id="select-1"
            labelText="Select an option"
            helperText="Optional helper text"
            decorator={aiLabel}
            {...rest}>
            <SelectItem value="" text="" />
            <SelectItem
              value="An example option that is really long to show what should be done to handle long text"
              text="An example option that is really long to show what should be done to handle long text"
            />
            <SelectItem value="Option 2" text="Option 2" />
            <SelectItem value="Option 3" text="Option 3" />
            <SelectItem value="Option 4" text="Option 4" />
          </Select>
          <Button type="submit" className="some-class" {...buttonEvents}>
            Submit
          </Button>
        </Stack>
      </Form>

      <FluidForm aria-label="sample ai form" className="fluid-ai-label-form">
        <div style={{ display: 'flex' }}>
          <FluidDatePicker datePickerType="single" style={{ width: '100%' }}>
            <FluidDatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              size="md"
              id="fluid-date-picker"
              decorator={aiLabel}
              {...rest}
            />
          </FluidDatePicker>
        </div>

        <div style={{ display: 'flex' }}>
          <FluidNumberInput
            {...numberInputProps}
            id="fluid-number-input"
            decorator={aiLabel}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidTextInput
            {...TextInputProps}
            id="fluid-text-input"
            decorator={aiLabel}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidTextArea
            {...textareaProps}
            id="fluid-text-area"
            decorator={aiLabel}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidDropdown
            isCondensed
            initialSelectedItem={items[2]}
            id="fluid-dropdown"
            titleText="Label"
            label="Choose an option"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            decorator={aiLabel}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidComboBox
            isCondensed
            onChange={() => {}}
            id="fluid-combobox"
            titleText="Label"
            label="Choose an option"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            decorator={aiLabel}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidMultiSelect
            isCondensed
            onChange={() => {}}
            initialSelectedItem={items[2]}
            id="fluid-multi-select"
            titleText="Label"
            label="Choose an option"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            decorator={aiLabel}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidMultiSelect
            isFilterable
            isCondensed
            onChange={() => {}}
            initialSelectedItem={items[2]}
            id="fluid-multi-select-2"
            titleText="Label"
            label="Choose an option"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            decorator={aiLabel}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidSelect decorator={aiLabel} {...rest} id="select-2">
            <SelectItem value="" text="" />
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
            <SelectItem value="option-3" text="Option 3" />
            <SelectItem value="option-4" text="Option 4" />
          </FluidSelect>
        </div>
        <Button type="submit" className="some-class" {...buttonEvents}>
          Submit
        </Button>
      </FluidForm>
    </Stack>
  );
};

withAILabel.args = {
  revertActive: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

withAILabel.argTypes = {
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
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
  revertActive: {
    control: {
      type: 'boolean',
    },
    table: {
      category: 'AILabel',
    },
  },
};

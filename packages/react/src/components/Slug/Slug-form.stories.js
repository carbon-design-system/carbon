import React, { useState, useRef } from 'react';
import ComboBox from '../ComboBox';
import Dropdown from '../Dropdown';
import DatePicker from '../DatePicker';
import DatePickerInput from '../DatePickerInput';
import Form from '../Form/Form';
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
import { NumberInput } from '../NumberInput';
import Button from '../Button';
import Select from '../Select';
import SelectItem from '../SelectItem';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import { Stack } from '../Stack';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { Slug, SlugContent, SlugActions } from '.';
import './slug-story.scss';

export default {
  title: 'Experimental/unstable__Slug/Form',
  component: Form,
  subcomponents: {
    Slug,
  },
};

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

export const RevertTest = () => {
  const textInputRef = useRef();
  const numberInputRef = useRef();
  const [isTextInputEdited, setIsTextInputEdited] = useState(false);
  const [isNumberInputEdited, setIsNumberInputEdited] = useState(false);
  const aiTextValue = 'Generated AI content';
  const aiNumberValue = 11;

  const handleRevertClick = (evt) => {
    if (textInputRef.current.nextElementSibling.contains(evt.target)) {
      textInputRef.current.value = aiTextValue;
      textInputRef.current.focus();
      setIsTextInputEdited(false);
    }

    if (numberInputRef.current.nextElementSibling.contains(evt.target)) {
      numberInputRef.current.value = aiNumberValue;
      numberInputRef.current.focus();
      setIsNumberInputEdited(false);
    }
  };

  const handleChange = (evt, numberInputState) => {
    if (textInputRef.current.contains(evt.target)) {
      setIsTextInputEdited(true);
    }

    if (numberInputRef.current.contains(evt.target) || numberInputState) {
      setIsNumberInputEdited(true);
    }
  };

  const textInputSlug = (
    <Slug
      revertActive={isTextInputEdited}
      onRevertClick={handleRevertClick}
      className="slug-container">
      <SlugContent>
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
      </SlugContent>
    </Slug>
  );

  const numberInputSlug = (
    <Slug
      revertActive={isNumberInputEdited}
      onRevertClick={handleRevertClick}
      className="slug-container">
      <SlugContent>
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
      </SlugContent>
    </Slug>
  );

  return (
    <Stack gap={7} className="form-example">
      <Form aria-label="sample form" className="slug-form">
        <Stack gap={7}>
          <TextInput
            ref={textInputRef}
            id="text-input-edit"
            labelText="Sample AI Input"
            slug={textInputSlug}
            defaultValue={aiTextValue}
            onChange={handleChange}
          />
          <NumberInput
            ref={numberInputRef}
            id="number-input-edit"
            label="Sample AI Input"
            slug={numberInputSlug}
            defaultValue={aiNumberValue}
            step={1}
            min={0}
            max={100}
            onChange={handleChange}
          />
        </Stack>
      </Form>
    </Stack>
  );
};

export const _FormExample = (args) => {
  const { revertActive, ...rest } = args;
  const slug = (
    <Slug className="slug-container" revertActive={revertActive}>
      <SlugContent>
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
        <SlugActions>
          <IconButton kind="ghost" label="View">
            <View />
          </IconButton>
          <IconButton kind="ghost" label="Open Folder">
            <FolderOpen />
          </IconButton>
          <IconButton kind="ghost" label="Folders">
            <Folders />
          </IconButton>
          <Button>View literature</Button>
        </SlugActions>
      </SlugContent>
    </Slug>
  );

  return (
    <Stack gap={7} className="form-example">
      <Form aria-label="sample form" className="slug-form">
        <Stack gap={7}>
          <NumberInput {...numberInputProps} slug={slug} {...rest} />
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              size="md"
              id="date-picker"
              slug={slug}
              {...rest}
            />
          </DatePicker>
          <TextInput {...TextInputProps} slug={slug} {...rest} />
          <TextArea {...textareaProps} slug={slug} {...rest} />
          <Dropdown
            id="default"
            titleText="Dropdown title"
            helperText="This is some helper text"
            initialSelectedItem={items[1]}
            label="Option 1"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            slug={slug}
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
            slug={slug}
            {...rest}
          />
          <FilterableMultiSelect
            id="carbon-multiselect-example-3"
            titleText="FilterableMultiselect title"
            helperText="This is helper text"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            selectionFeedback="top-after-reopen"
            slug={slug}
            {...rest}
          />
          <ComboBox
            onChange={() => {}}
            id="carbon-combobox"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            titleText="ComboBox title"
            helperText="Combobox helper text"
            slug={slug}
            {...rest}
          />
          <Select
            id="select-1"
            labelText="Select an option"
            helperText="Optional helper text"
            slug={slug}
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

      <FluidForm aria-label="sample ai form" className="fluid-slug-form">
        <div style={{ display: 'flex' }}>
          <FluidDatePicker datePickerType="single" style={{ width: '100%' }}>
            <FluidDatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Date Picker label"
              size="md"
              id="fluid-date-picker"
              slug={slug}
              {...rest}
            />
          </FluidDatePicker>
        </div>

        <div style={{ display: 'flex' }}>
          <FluidNumberInput
            {...numberInputProps}
            id="fluid-number-input"
            slug={slug}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidTextInput
            {...TextInputProps}
            id="fluid-text-input"
            slug={slug}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidTextArea
            {...textareaProps}
            id="fluid-text-area"
            slug={slug}
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
            slug={slug}
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
            slug={slug}
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
            slug={slug}
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
            slug={slug}
            {...rest}
          />
        </div>
        <div style={{ display: 'flex' }}>
          <FluidSelect slug={slug} {...rest} id="select-2">
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

_FormExample.args = {
  revertActive: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

_FormExample.argTypes = {
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
      category: 'Slug',
    },
  },
};

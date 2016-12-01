import React from 'react';
import { action, storiesOf } from '@kadira/storybook';
import AppContainer from '../../components/AppContainer';
import Checkbox from '../../components/Checkbox';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import FileUploader from '../../components/FileUploader';
import NumberInput from '../../components/NumberInput';
import RadioButton from '../../components/RadioButton';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import PrimaryButton from '../../components/PrimaryButton';
import Search from '../../components/Search';
import Select from '../../components/Select';
import SelectItem from '../../components/SelectItem';
import Textarea from '../../components/TextArea';
import TextInput from '../../components/TextInput';
import Toggle from '../../components/Toggle';


const additionalProps = {
  className: 'some-class',
};

const checkboxEvents = {
  className: 'some-class',
  labelText: 'Checkbox',
  id: 'checkbox-1',
  onChange: action('onChange'),
};
const fieldsetCheckboxProps = {
  className: 'some-class',
  legendText: 'Checkbox',
};

const numberInputProps = {
  className: 'some-class',
  id: 'tj-input',
  label: 'Number Input',
  onChange: action('onChange'),
  onClick: action('onClick'),
  min: 0,
  max: 100,
  value: 50,
  step: 10,
};
const fieldsetNumberInputProps = {
  className: 'some-class',
  legendText: 'Number Input',
};

const toggleProps = {
  onToggle: action('toggle'),
  className: 'some-class',
};
const fieldsetToggleProps = {
  className: 'some-class',
  legendText: 'Toggle',
};

const fileUploaderEvents = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};
const fieldsetFileUploaderProps = {
  className: 'some-class',
  legendText: 'File Uploader',
};

const radioProps = {
  className: 'some-class',
};
const fieldsetRadioProps = {
  className: 'some-class',
  legendText: 'Radio Button',
};

const searchProps = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: () => { console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};
const fieldsetSearchProps = {
  className: 'some-class',
  legendText: 'Search',
};

const selectProps = {
  onBlur: () => { action('blur'); }, // eslint-disable-line no-console
  onClick: () => { action('click'); }, // eslint-disable-line no-console
  onFocus: () => { action('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { action('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { action('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { action('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { action('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

const fieldsetSelectProps = {
  className: 'some-class',
  legendText: 'Search',
};


const TextInputProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Text Input',
  placeholder: 'Hint text here',
};
const fieldsetTextInputProps = {
  className: 'some-class',
  legendText: 'Text Input',
};

const PasswordProps = {
  className: 'some-class',
  id: 'test2',
  labelText: 'Password',
  placeholder: 'Password',
};
const fieldsetPasswordProps = {
  className: 'some-class',
  legendText: 'Password field label',
};
const fieldsetPassInvalidProps = {
  className: 'some-class',
  legendText: 'Password (invalid)',
  message: true,
  messageText: 'Your password must be at least 6 characters as well as contain at least one uppercase,' +
  'one lowercase, and one number.',
};

const textareaProps = {
  labelText: 'Text Area',
  className: 'some-class',
  onChange: action('onChange'),
  onClick: action('onClick'),
  placeholder: 'Hint text here',
  id: 'test2',
  cols: 50,
  rows: 4,
};

const fieldsetTextareaProps = {
  className: 'some-class',
  legendText: 'Text Area',
};

const buttonEvents = {
  onBlur: () => { console.log('blur'); }, // eslint-disable-line no-console
  onClick: (e) => { e.preventDefault(); e.stopPropagation(); console.log('click'); }, // eslint-disable-line no-console
  onFocus: () => { console.log('focus'); }, // eslint-disable-line no-console
  onMouseDown: () => { console.log('mouseDown'); }, // eslint-disable-line no-console
  onMouseEnter: () => { console.log('mouseEnter'); }, // eslint-disable-line no-console
  onMouseLeave: () => { console.log('mouseLeave'); }, // eslint-disable-line no-console
  onMouseUp: () => { console.log('mouseUp'); }, // eslint-disable-line no-console
  className: 'some-class',
};

storiesOf('Form', module)
.addDecorator((story) => (
  <AppContainer>
  {story()}
  </AppContainer>
))
.addWithInfo(
  '',
  `
    Forms are widely used to collect user input.

    Form can have any number of react components enclosed within FormGroup component. FormGroup component
    is a wrapper for legend and fieldset component.

  `,
  () => (
    <Form {...additionalProps} >
      <FormGroup {...fieldsetCheckboxProps}>
        <Checkbox defaultChecked {...checkboxEvents} />
        <br />
        <Checkbox {...checkboxEvents} />
        <br />
        <Checkbox disabled {...checkboxEvents} />
        <br />
      </FormGroup>


      <FormGroup {...fieldsetNumberInputProps}>
        <NumberInput {...numberInputProps} />
      </FormGroup>

      <FormGroup {...fieldsetToggleProps}>
        <Toggle {...toggleProps} id="toggle-1" />
        <Toggle disabled {...toggleProps} id="toggle-2" />
      </FormGroup>

      <FormGroup {...fieldsetFileUploaderProps}>
        <FileUploader
          {...fileUploaderEvents}
          id="file-1"
          labelDescription="Choose Files..."
        />
      </FormGroup>

      <FormGroup {...fieldsetRadioProps}>
        <RadioButtonGroup
          onChange={action('onChange')}
          name="radio-button-group"
          defaultSelected="default-selected"
        >
          <RadioButton
            value="standard"
            id="radio-1"
            labelText="Standard Radio Button"
            {...radioProps}
          />
          <RadioButton
            value="default-selected"
            labelText="Default Selected Radio Button"
            id="radio-2"
            {...radioProps}
          />
          <RadioButton
            value="disabled"
            labelText="Disabled Radio Button"
            id="radio-3"
            disabled
            {...radioProps}
          />
        </RadioButtonGroup>
      </FormGroup>

      <FormGroup {...fieldsetSearchProps}>
        <Search
          {...searchProps}
          id="search-1"
          labelText="Search"
          placeHolderText="Search Bluemix Offerings"
        />
      </FormGroup>


      <FormGroup {...fieldsetSelectProps}>
        <Select
          {...selectProps}
          onChange={action('onChange')} // eslint-disable-line no-console
          id="select-1"
          defaultValue="placeholder-item"
        >
          <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
          <SelectItem value="option-3" text="Option 3" />
        </Select>

        <Select
          disabled
          {...selectProps}
          onChange={action('onChange')} // eslint-disable-line no-console
          id="select-1"
          defaultValue="placeholder-item"
        >
          <SelectItem disabled hidden value="placeholder-item" text="Pick an option" />
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
          <SelectItem value="option-3" text="Option 3" />
        </Select>
      </FormGroup>

      <FormGroup {...fieldsetTextInputProps}>
        <TextInput {...TextInputProps} />
      </FormGroup>

      <FormGroup {...fieldsetPasswordProps} >
        <TextInput
          type="password"
          required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          {...PasswordProps}
        />
      </FormGroup>

      <FormGroup
        datainvalid
        {...fieldsetPassInvalidProps}
      >
        <TextInput
          type="password"
          required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          {...PasswordProps}
        />
      </FormGroup>

      <FormGroup {...fieldsetTextareaProps}>
        <Textarea {...textareaProps} />
      </FormGroup>

      <PrimaryButton
        type="submit"
        className="some-class"
        {...buttonEvents}
      >
        Submit
      </PrimaryButton>
    </Form>

    ));

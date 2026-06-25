/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextInput,
  NumberInput,
  TextArea,
  Dropdown,
  DatePicker,
  DatePickerInput,
  RadioButton,
  RadioButtonGroup,
  usePrefix,
} from '@carbon/react';

import { pkg } from '../../settings';
import { CreateModal } from '.';

import styles from './_storybook-styles.scss?inline';
import DocsPage from './CreateModal.docs-page';

export default {
  title: 'Patterns/Prebuilt patterns/Create flows/CreateModal',
  component: CreateModal,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: { page: DocsPage },
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    portalTarget: { control: { disable: true } },
    open: {
      control: false,
    },
    children: {
      control: {
        type: 'select',
        labels: {
          0: 'one child',
          1: 'three children',
          2: 'four children',
        },
      },
      options: [0, 1, 2],
      mapping: {
        0: (
          <TextInput
            id="1"
            key="form-field-1"
            labelText="Text input label"
            helperText="Helper text goes here"
            placeholder="Placeholder"
          />
        ),
        1: (
          <>
            <TextInput
              id="1"
              key="form-field-1"
              labelText="Text input label"
              helperText="Helper text goes here"
              placeholder="Placeholder"
            />
            <Dropdown
              id="default"
              titleText="Dropdown label"
              helperText="This is some helper text"
              label="Dropdown menu options"
              items={['Option 0', 'Option 1', 'Option 2']}
            />
            <TextArea
              id="2"
              placeholder="Placeholder text"
              labelText="Text area label"
              helperText="Optional helper text"
            />
          </>
        ),
        2: (
          <>
            <TextInput
              id="1"
              key="form-field-1"
              labelText="Text input label"
              helperText="Helper text goes here"
              placeholder="Placeholder"
            />
            <NumberInput
              id="2"
              className="create-modal--storybook-input"
              label="Number input label"
              helperText="Optional helper text goes here"
              min={0}
              max={50}
              value={1}
              iconDescription="Choose a number"
            />
            <RadioButtonGroup
              legendText="Radio button legend text goes here"
              name="radio-button-group"
              defaultSelected="radio-1"
            >
              <RadioButton labelText="Radio-1" value="radio-1" id="radio-1" />
              <RadioButton labelText="Radio-2" value="radio-2" id="radio-2" />
              <RadioButton labelText="Radio-3" value="radio-3" id="radio-3" />
            </RadioButtonGroup>
            <DatePicker datePickerType="single">
              <DatePickerInput
                placeholder="mm/dd/yyyy"
                labelText="Date picker input label"
                id="date-picker-single"
              />
            </DatePicker>
          </>
        ),
      },
    },
  },
};

const Template = (
  { storyInitiallyOpen = true, story, children, ...args },
  context
) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(
    context.viewMode !== 'docs' && storyInitiallyOpen
  );
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {story?.storyName}</Button>

      <style>{`.${pkg.prefix}--create-modal { opacity: 0 }`};</style>
      <CreateModal
        open={open}
        onRequestClose={() => setOpen(false)}
        {...args}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
      >
        {children}
      </CreateModal>
    </>
  );
};

const TemplateWithFormValidation = ({ story, ...args }, context) => {
  const carbonPrefix = usePrefix();
  const [open, setOpen] = useState(context.viewMode !== 'docs');
  const [textInput, setTextInput] = useState('');
  const [invalid, setInvalid] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {story?.storyName}</Button>
      <style>{`.${pkg.prefix}--create-modal { opacity: 0 }`};</style>
      <CreateModal
        {...args}
        open={open}
        onRequestClose={() => setOpen(false)}
        disableSubmit={textInput.length === 0 ? true : false}
        selectorPrimaryFocus={`.${carbonPrefix}--text-input`}
      >
        <TextInput
          id="1"
          key="form-field-1"
          labelText="Text input label"
          placeholder="Placeholder"
          onChange={(e) => {
            setTextInput(e.target.value);
            setInvalid(false);
          }}
          onBlur={() => {
            textInput.length === 0 && setInvalid(true);
          }}
          invalid={invalid}
          invalidText="This is a required field"
        />
        <TextInput
          id="2"
          key="form-field-2"
          labelText="Text input label (optional)"
          placeholder="Placeholder"
        />
        <TextInput
          id="3"
          key="form-field-3"
          labelText="Text input label (optional)"
          placeholder="Placeholder"
        />
        <RadioButtonGroup
          legendText="Radio button legend text goes here"
          name="radio-button-group"
          defaultSelected="radio-1"
        >
          <RadioButton labelText="Radio-1" value="radio-1" id="radio-1" />
          <RadioButton labelText="Radio-2" value="radio-2" id="radio-2" />
          <RadioButton labelText="Radio-3" value="radio-3" id="radio-3" />
        </RadioButtonGroup>
      </CreateModal>
    </>
  );
};

const defaultProps = {
  title: 'Title',
  subtitle: 'Your subtitle text will appear here',
  description:
    'This is example description text that will appear here in your modal ',
  primaryButtonText: 'Create',
  secondaryButtonText: 'Cancel',
};

Template.propTypes = {
  story: PropTypes.object,
  storyInitiallyOpen: PropTypes.bool,
  ...CreateModal.propTypes,
  children: PropTypes.node,
};

TemplateWithFormValidation.propTypes = {
  story: PropTypes.object,
  storyInitiallyOpen: PropTypes.bool,
  ...CreateModal.propTypes,
};

export const Default = Template.bind({});
Default.storyName = 'Create Modal';
Default.args = {
  story: Default,
  children: 1,
  ...defaultProps,
};

export const WithFormValidation = TemplateWithFormValidation.bind({});
WithFormValidation.storyName = 'Create Modal with form validation';
WithFormValidation.args = {
  story: WithFormValidation,
  children: {
    control: false,
  },
  ...defaultProps,
};

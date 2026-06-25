/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { EditInPlace } from '.';
import { DisplayBox } from '../../global/js/utils/DisplayBox';
// import mdx from './EditInPlace.mdx';
import styles from './_storybook-styles.scss?inline';
import { StoryDocsPage } from '../../global/js/utils/StoryDocsPage';

const storyClass = 'edit-in-place-example';

const tooltipAlignmentOptions = {
  'Default / undefined': undefined,
  'All top': 'top',
  'All top-left': 'top-left',
  'All top-right': 'top-right',
  'All bottom': 'bottom',
  'All bottom-left': 'bottom-left',
  'All bottom-right': 'bottom-right',
  'All left': 'left',
  'All right': 'right',
  'Edit and save right, cancel left': {
    edit: 'right',
    cancel: 'left',
    save: 'right',
  },
};

export default {
  title: 'Components/EditInPlace',
  component: EditInPlace,
  tags: ['autodocs'],
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 20, max: 800, step: 10 },
      description:
        'Controls containing element width. Used for demonstration purposes, not property of the component.',
    },
    tooltipAlignment: {
      control: {
        type: 'select',
        labels: Object.keys(tooltipAlignmentOptions),
      },
      options: Object.values(tooltipAlignmentOptions).map((_k, i) => i),
      mapping: Object.values(tooltipAlignmentOptions),
    },
  },
  parameters: {
    styles,
    docs: {
      page: () => (
        <StoryDocsPage altGuidelinesHref="https://pages.github.ibm.com/carbon/ibm-products/patterns/edit-and-update/usage/#inline-edit" />
      ),
    },
  },
  decorators: [
    (story) => (
      <DisplayBox className={`${storyClass}__viewport`}>{story()}</DisplayBox>
    ),
  ],
};

const actionSave = action('save');
const actionChange = action('change');
const actionCancel = action('cancel');
const actionBlur = action('blur');

const defaultProps = {
  cancelLabel: 'Cancel',
  containerWidth: 300,
  editLabel: 'Edit',
  id: 'story-id',
  invalid: false,
  invalidText: 'This field is required',
  labelText: 'Label text',
  onCancel: () => {},
  onChange: () => {},
  onSave: () => {},
  // onBlur is intentionally omitted to use default auto-save/cancel behavior
  readOnlyToggleTipText: 'This field is read-only and cannot be edited',
  toggleTipAlignment: 'bottom',
  saveLabel: 'Save',
  value: 'default',
  placeholder: 'placeholder text',
};

const Template = ({ containerWidth, ...args }) => {
  const [value, setValue] = useState(defaultProps.value);

  const onChange = (val) => {
    setValue(val);
    actionChange(val);
  };

  const onSave = () => {
    actionSave(value);
  };

  const onCancel = (initialVal) => {
    setValue(initialVal);
    actionCancel(initialVal);
  };

  const props = {
    ...args,
    value,
    onChange,
    onSave,
    onCancel,
  };

  return (
    <div style={{ width: containerWidth }}>
      <EditInPlace {...props} className="edit-in-place-example" />
    </div>
  );
};

const TemplateBlur = ({ containerWidth, ...args }) => {
  const [value, setValue] = useState(defaultProps.value);

  const onChange = (val) => {
    setValue(val);
    actionChange(val);
  };

  const onSave = () => {
    // Update parent state so the value prop changes and component can sync initialValue
    setValue(value);
    actionSave(value);
  };

  const onCancel = (initialVal) => {
    setValue(initialVal);
    actionCancel(initialVal);
  };

  const onBlur = (initialVal) => {
    const shouldSaveValue = false;
    if (shouldSaveValue) {
      // Update parent state when saving via blur
      setValue(value);
      actionSave(value);
    } else {
      setValue(initialVal);
      actionCancel(initialVal);
    }
    actionBlur(initialVal);
  };

  const props = {
    ...args,
    value,
    onChange,
    onSave,
    onCancel,
    onBlur,
  };

  return (
    <div style={{ width: containerWidth }}>
      <EditInPlace {...props} className="edit-in-place-example" />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...defaultProps,
  invalid: true,
};

export const CustomBlurFunction = TemplateBlur.bind({});
CustomBlurFunction.args = {
  ...defaultProps,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...defaultProps,
  readOnly: true,
  readOnlyLabel: 'Edit off',
};

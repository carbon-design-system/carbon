/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { EditInPlace } from '.';
import { DisplayBox } from '../../internal/DisplayBox';
import mdx from './EditInPlace.mdx';

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
  tags: ['autodocs', 'ibm-products-migrated'],
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
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
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <DisplayBox className="edit-in-place-example__viewport">
        <Story />
      </DisplayBox>
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
  readOnlyToggleTipText: 'This field is read-only and cannot be edited',
  toggleTipAlignment: 'bottom',
  saveLabel: 'Save',
  value: 'default',
  placeholder: 'placeholder text',
};

const EditInPlaceTemplate = ({ containerWidth, ...args }) => {
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

const EditInPlaceBlurTemplate = ({ containerWidth, ...args }) => {
  const [value, setValue] = useState(defaultProps.value);

  const onChange = (val) => {
    setValue(val);
    actionChange(val);
  };

  const onSave = () => {
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

export const Default = {
  render: (args) => <EditInPlaceTemplate {...args} />,
  args: {
    ...defaultProps,
  },
};

export const Invalid = {
  render: (args) => <EditInPlaceTemplate {...args} />,
  args: {
    ...defaultProps,
    invalid: true,
  },
};

export const CustomBlurFunction = {
  render: (args) => <EditInPlaceBlurTemplate {...args} />,
  args: {
    ...defaultProps,
  },
};

export const ReadOnly = {
  render: (args) => <EditInPlaceTemplate {...args} />,
  args: {
    ...defaultProps,
    readOnly: true,
    readOnlyLabel: 'Edit off',
  },
};

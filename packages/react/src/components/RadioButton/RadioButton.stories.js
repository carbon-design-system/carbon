/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import RadioButton from './RadioButton';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButtonSkeleton from './RadioButton.Skeleton';
import React from 'react';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './RadioButton.mdx';
import { useArgs } from 'storybook/preview-api';

export default {
  title: 'Components/RadioButton',
  component: RadioButton,
  subcomponents: {
    RadioButtonGroup,
    RadioButtonSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const radioButtonOptions = [
  { id: 'radio-email', label: 'Email notifications', value: 'email' },
  { id: 'radio-sms', label: 'SMS notifications', value: 'sms' },
  { id: 'radio-push', label: 'Push notifications', value: 'push' },
];

const groupArgs = {
  disabled: false,
  helperText: 'Choose how you want to receive account updates.',
  hideLabel: false,
  invalid: false,
  invalidText: 'Choose a notification method.',
  labelPosition: 'right',
  labelText: radioButtonOptions[0].label,
  legendText: 'Preferred notification method',
  name: 'notification-method',
  orientation: 'horizontal',
  readOnly: false,
  required: false,
  valueSelected: radioButtonOptions[0].value,
  warn: false,
  warnText: 'Review your notification preference before continuing.',
};

const groupArgTypes = {
  disabled: {
    description: 'Specify whether the RadioButtonGroup is disabled',
    control: {
      type: 'boolean',
    },
  },
  helperText: {
    description:
      'Provide text that is used alongside the control label for additional help',
    control: {
      type: 'text',
    },
  },
  hideLabel: {
    description:
      'Specify whether the radio button labels are visually hidden but still available to screen readers',
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    description: 'Specify whether the RadioButtonGroup is invalid',
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    description:
      'Provide the text that is displayed when the control is in an invalid state',
    control: {
      type: 'text',
    },
  },
  labelPosition: {
    description: 'Provide where radio button labels should be placed',
    control: 'select',
    options: ['left', 'right'],
  },
  labelText: {
    description: 'Provide the label text for the first radio button',
    control: {
      type: 'text',
    },
  },
  legendText: {
    description:
      'Provide the text to be rendered inside of the fieldset <legend>',
    control: {
      type: 'text',
    },
  },
  name: {
    description: 'Provide a name for the underlying radio button inputs',
    control: {
      type: 'text',
    },
  },
  onChange: {
    action: 'onChange',
  },
  orientation: {
    description: 'Provide how radio buttons should be displayed',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
  readOnly: {
    description: 'Specify whether the RadioButtonGroup is read-only',
    control: {
      type: 'boolean',
    },
  },
  required: {
    description: 'Specify whether a radio button selection is required',
    control: {
      type: 'boolean',
    },
  },
  valueSelected: {
    description: 'Specify the selected radio button',
    control: 'select',
    options: radioButtonOptions.map(({ value }) => value),
  },
  warn: {
    description: 'Specify whether the control is currently in warning state',
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    description:
      'Provide the text that is displayed when the control is in warning state',
    control: {
      type: 'text',
    },
  },
};

const groupControls = Object.keys(groupArgTypes);

const GroupStory = (args) => {
  const [{ valueSelected }, updateArgs] = useArgs();
  const {
    hideLabel,
    labelText,
    onChange,
    thirdItemDisabled,
    ...radioButtonGroupArgs
  } = args;

  return (
    <RadioButtonGroup
      {...radioButtonGroupArgs}
      valueSelected={valueSelected}
      onChange={(selection, name, event) => {
        updateArgs({ valueSelected: selection });
        onChange?.(selection, name, event);
      }}>
      {radioButtonOptions.map((option, index) => (
        <RadioButton
          key={option.value}
          labelText={index === 0 ? labelText : option.label}
          value={option.value}
          id={option.id}
          hideLabel={hideLabel}
          disabled={index === 2 && thirdItemDisabled}
        />
      ))}
    </RadioButtonGroup>
  );
};

export const Default = GroupStory;

Default.args = {
  ...groupArgs,
};

Default.argTypes = {
  ...groupArgTypes,
};

Default.parameters = {
  controls: {
    include: groupControls,
  },
};

export const Vertical = GroupStory;

Vertical.args = {
  ...groupArgs,
  orientation: 'vertical',
  thirdItemDisabled: true,
};

Vertical.argTypes = {
  ...groupArgTypes,
  orientation: {
    ...groupArgTypes.orientation,
    table: {
      readonly: true,
    },
  },
  thirdItemDisabled: {
    description: 'Specify whether the third radio button is disabled',
    control: {
      type: 'boolean',
    },
  },
};

Vertical.parameters = {
  controls: {
    include: [...groupControls, 'thirdItemDisabled'],
  },
};

export const Skeleton = (args) => <RadioButtonSkeleton {...args} />;

Skeleton.args = {
  className: '',
};

Skeleton.argTypes = {
  className: {
    description: 'Specify an optional class name to add to the skeleton',
    control: {
      type: 'text',
    },
  },
};

Skeleton.parameters = {
  controls: {
    include: ['className'],
  },
};

export const withAILabel = (args) => {
  const AILabelFunc = (kind) => (
    <AILabel className="ai-label-container" kind={kind}>
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            This recommendation is based on your notification activity from the
            last 30 days.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Notification preference model</p>
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

  const { hideLabel, labelText, name, onChange } = args;
  const radioButtonGroupArgs = {
    disabled: args.disabled,
    helperText: args.helperText,
    invalid: args.invalid,
    invalidText: args.invalidText,
    labelPosition: args.labelPosition,
    legendText: args.legendText,
    orientation: args.orientation,
    readOnly: args.readOnly,
    required: args.required,
    warn: args.warn,
    warnText: args.warnText,
  };

  const renderRadioButtons = (groupNumber, decorators = {}) =>
    radioButtonOptions.map((option, index) => (
      <RadioButton
        key={option.value}
        labelText={index === 0 ? labelText : option.label}
        value={option.value}
        id={`radio-ai-${groupNumber}-${option.value}`}
        hideLabel={hideLabel}
        decorator={decorators[index]}
      />
    ));

  return (
    <div className="ai-label-check-radio-container">
      <RadioButtonGroup
        {...radioButtonGroupArgs}
        decorator={AILabelFunc('default')}
        name={`${name}-group-1`}
        defaultSelected={radioButtonOptions[0].value}
        onChange={onChange}>
        {renderRadioButtons(1)}
      </RadioButtonGroup>

      <RadioButtonGroup
        {...radioButtonGroupArgs}
        name={`${name}-group-2`}
        defaultSelected={radioButtonOptions[0].value}
        onChange={onChange}>
        {renderRadioButtons(2, {
          0: AILabelFunc(),
          1: AILabelFunc(),
        })}
      </RadioButtonGroup>

      <RadioButtonGroup
        {...radioButtonGroupArgs}
        name={`${name}-group-3`}
        defaultSelected={radioButtonOptions[0].value}
        onChange={onChange}>
        {renderRadioButtons(3, {
          0: AILabelFunc('inline'),
          1: AILabelFunc('inline'),
        })}
      </RadioButtonGroup>
    </div>
  );
};

withAILabel.args = {
  ...groupArgs,
  orientation: 'vertical',
};

withAILabel.argTypes = {
  ...groupArgTypes,
  orientation: {
    ...groupArgTypes.orientation,
    table: {
      readonly: true,
    },
  },
  valueSelected: {
    table: {
      disable: true,
    },
  },
};

withAILabel.parameters = {
  controls: {
    include: groupControls.filter((control) => control !== 'valueSelected'),
  },
};

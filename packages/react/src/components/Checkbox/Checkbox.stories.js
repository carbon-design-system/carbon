/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '../AILabel/ailabel-story.scss';
import { default as Checkbox, CheckboxSkeleton } from './';
import mdx from './Checkbox.mdx';
import CheckboxGroup from '../CheckboxGroup';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { useArgs } from 'storybook/preview-api';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  subcomponents: {
    CheckboxGroup,
    CheckboxSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const groupArgs = {
  disabled: false,
  helperText: 'Choose how you want to receive account updates.',
  invalid: false,
  invalidText: 'Choose at least one notification method.',
  legendText: 'Notification methods',
  orientation: 'vertical',
  readOnly: false,
  warn: false,
  warnText: 'Review your notification settings before continuing.',
};

const groupArgTypes = {
  disabled: {
    description: 'Specify whether the checkbox group is disabled',
    control: {
      type: 'boolean',
    },
  },
  helperText: {
    description: 'Provide text for the form group for additional help',
    control: {
      type: 'text',
    },
  },
  invalid: {
    description: 'Specify whether the form group is currently invalid',
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    description:
      'Provide the text that is displayed when the form group is in an invalid state',
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
  readOnly: {
    description: 'Specify whether the CheckboxGroup is read-only',
    control: {
      type: 'boolean',
    },
  },
  warn: {
    description: 'Specify whether the form group is currently in warning state',
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    description:
      'Provide the text that is displayed when the form group is in warning state',
    control: {
      type: 'text',
    },
  },
  orientation: {
    description: 'Provide how checkbox should be displayed',
    control: 'select',
    options: ['horizontal', 'vertical'],
  },
};

const groupControls = [
  'disabled',
  'helperText',
  'invalid',
  'invalidText',
  'legendText',
  'orientation',
  'readOnly',
  'warn',
  'warnText',
];

const checkboxArgs = {
  checked: false,
  disabled: false,
  helperText: 'You can change this preference at any time.',
  hideLabel: false,
  indeterminate: false,
  invalid: false,
  invalidText: 'Select this option to continue.',
  labelText: 'Email me product updates',
  readOnly: false,
  title: '',
  warn: false,
  warnText: 'Review this preference before continuing.',
};

const checkboxArgTypes = {
  checked: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  indeterminate: {
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
  labelText: {
    control: {
      type: 'text',
    },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  title: {
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
};

const checkboxControls = Object.keys(checkboxArgTypes);

export const Default = (args) => (
  <CheckboxGroup {...args} readOnly={args.readOnly || undefined}>
    <Checkbox labelText="Email notifications" id="checkbox-label-1" />
    <Checkbox labelText="SMS notifications" id="checkbox-label-2" />
  </CheckboxGroup>
);

Default.args = {
  ...groupArgs,
};

Default.argTypes = { ...groupArgTypes };

Default.parameters = {
  controls: {
    include: groupControls,
  },
};

export const Horizontal = (args) => {
  return (
    <CheckboxGroup {...args} readOnly={args.readOnly || undefined}>
      <Checkbox labelText="Email notifications" id="checkbox-label-1" />
      <Checkbox labelText="SMS notifications" id="checkbox-label-2" />
      <Checkbox labelText="Push notifications" id="checkbox-label-3" />
    </CheckboxGroup>
  );
};

Horizontal.args = {
  ...groupArgs,
  orientation: 'horizontal',
};

Horizontal.argTypes = {
  ...groupArgTypes,
  orientation: {
    ...groupArgTypes.orientation,
    table: {
      readonly: true,
    },
  },
};

Horizontal.parameters = {
  controls: {
    include: groupControls,
  },
};

export const Single = (args) => {
  const [{ checked }, updateArgs] = useArgs();

  return (
    <Checkbox
      {...args}
      checked={checked}
      id="checkbox-single"
      onChange={(event, data) => {
        updateArgs({ checked: data.checked });
        args.onChange?.(event, data);
      }}
    />
  );
};

Single.args = {
  ...checkboxArgs,
};

Single.argTypes = {
  ...checkboxArgTypes,
};

Single.parameters = {
  controls: {
    include: checkboxControls,
  },
};

export const Skeleton = (args) => <CheckboxSkeleton {...args} />;

Skeleton.args = {
  className: '',
};

Skeleton.argTypes = {
  className: {
    control: {
      type: 'text',
    },
    description: 'Specify an optional class name to add to the skeleton.',
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

  return (
    <div className="ai-label-check-radio-container">
      <CheckboxGroup
        decorator={AILabelFunc()}
        {...args}
        readOnly={args.readOnly || undefined}>
        <Checkbox labelText="Email notifications" id="checkbox-label-1" />
        <Checkbox labelText="SMS notifications" id="checkbox-label-2" />
        <Checkbox labelText="Push notifications" id="checkbox-label-3" />
      </CheckboxGroup>

      <CheckboxGroup {...args} readOnly={args.readOnly || undefined}>
        <Checkbox
          labelText="Email notifications"
          id="checkbox-label-4"
          decorator={AILabelFunc()}
        />
        <Checkbox
          labelText="SMS notifications"
          id="checkbox-label-5"
          decorator={AILabelFunc()}
        />
        <Checkbox labelText="Push notifications" id="checkbox-label-6" />
      </CheckboxGroup>

      <CheckboxGroup {...args} readOnly={args.readOnly || undefined}>
        <Checkbox
          labelText="Email notifications"
          id="checkbox-label-7"
          decorator={AILabelFunc('inline')}
        />
        <Checkbox
          labelText="SMS notifications"
          id="checkbox-label-8"
          decorator={AILabelFunc('inline')}
        />
        <Checkbox labelText="Push notifications" id="checkbox-label-9" />
      </CheckboxGroup>
    </div>
  );
};

withAILabel.args = {
  ...groupArgs,
};

withAILabel.argTypes = { ...groupArgTypes };

withAILabel.parameters = {
  controls: {
    include: groupControls,
  },
};

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextInput from '../FluidTextInput';
import FluidTextInputSkeleton from './FluidTextInput.Skeleton';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './test.scss';
import './fluid-text-input-story.scss';
import mdx from './FluidTextInput.mdx';

export default {
  title: 'Components/Fluid Components/FluidTextInput',
  component: FluidTextInput,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['isPassword'],
    },
  },
  subcomponents: {
    FluidTextInputSkeleton,
  },
};

export const Default = (textInputArgs) => <FluidTextInput {...textInputArgs} />;

const LabelToggletip = () => (
  // Keep the toggletip outside `labelText`; interactive content is invalid in labels.
  <span className="fluid-text-input-story__toggletip">
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </span>
);

const sharedArgTypes = {
  className: {
    control: { type: 'text' },
    description:
      'Specify an optional className to be applied to the outer FluidForm wrapper.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Specify whether the `<input>` should be disabled.',
    table: { defaultValue: { summary: false } },
  },
  enableCounter: {
    control: { type: 'boolean' },
    description: 'Specify whether to display the character counter.',
    table: { defaultValue: { summary: false } },
  },
  invalid: {
    control: { type: 'boolean' },
    description: 'Specify whether the control is currently invalid.',
    table: { defaultValue: { summary: false } },
  },
  invalidText: {
    control: { type: 'text' },
    description:
      'Provide the text that is displayed when the control is in an invalid state.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  labelText: {
    control: { type: 'text' },
    description:
      'Provide the text that will be read by a screen reader when visiting this control.',
    table: { defaultValue: { summary: 'required' } },
  },
  maxCount: {
    control: { type: 'number' },
    description:
      'Max character count allowed for the textInput. This is needed in order for enableCounter to display.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  placeholder: {
    control: { type: 'text' },
    description: 'Specify the placeholder attribute for the `<input>`.',
    table: { defaultValue: { summary: 'undefined' } },
  },
  readOnly: {
    control: { type: 'boolean' },
    description: 'Whether or not the component is readonly.',
    table: { defaultValue: { summary: false } },
  },
  warn: {
    control: { type: 'boolean' },
    description: 'Specify whether the control is currently in warning state.',
    table: { defaultValue: { summary: false } },
  },
  warnText: {
    control: { type: 'text' },
    description:
      'Provide the text that is displayed when the control is in warning state.',
    table: { defaultValue: { summary: 'undefined' } },
  },
};

const sharedArgs = {
  className: 'test-class',
  disabled: false,
  enableCounter: false,
  id: 'input-1',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  labelText: 'Label',
  maxCount: 500,
  placeholder: 'Placeholder text',
  readOnly: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const sharedControls = Object.keys(sharedArgTypes);

Default.args = {
  ...sharedArgs,
};

Default.argTypes = {
  ...sharedArgTypes,
};

Default.parameters = {
  controls: { include: sharedControls },
};

export const DefaultWithToggletip = (textInputArgs) => (
  <div className="fluid-text-input-story">
    <LabelToggletip />
    <FluidTextInput {...textInputArgs} labelText="Label" />
  </div>
);

DefaultWithToggletip.args = {
  ...sharedArgs,
};
DefaultWithToggletip.argTypes = {
  ...sharedArgTypes,
};
DefaultWithToggletip.parameters = {
  controls: {
    include: sharedControls.filter((control) => control !== 'labelText'),
  },
};

export const Skeleton = () => <FluidTextInputSkeleton />;

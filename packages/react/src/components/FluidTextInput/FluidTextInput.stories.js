/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextInput from '../FluidTextInput';
import FluidTextInputSkeleton from './FluidTextInput.Skeleton';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './test.scss';
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

const ToggleTip = (
  <>
    <ToggletipLabel>Label</ToggletipLabel>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </>
);

const sharedArgTypes = {
  className: { control: { type: 'text' } },
  disabled: { control: { type: 'boolean' } },
  enableCounter: { control: { type: 'boolean' } },
  invalid: { control: { type: 'boolean' } },
  invalidText: { control: { type: 'text' } },
  labelText: { control: { type: 'text' } },
  maxCount: { control: { type: 'number' } },
  placeholder: { control: { type: 'text' } },
  readOnly: { control: { type: 'boolean' } },
  warn: { control: { type: 'boolean' } },
  warnText: { control: { type: 'text' } },
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
const widthArgType = {
  control: { type: 'range', min: 300, max: 800, step: 50 },
};

export const Default = ({ defaultWidth, ...textInputArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidTextInput {...textInputArgs} />
  </div>
);

Default.args = {
  ...sharedArgs,
  defaultWidth: 300,
};

Default.argTypes = {
  ...sharedArgTypes,
  defaultWidth: widthArgType,
};

Default.parameters = {
  controls: { include: [...sharedControls, 'defaultWidth'] },
};

export const DefaultWithToggletip = ({ defaultWidth, ...textInputArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidTextInput {...textInputArgs} labelText={ToggleTip} />
  </div>
);

DefaultWithToggletip.args = {
  ...sharedArgs,
  defaultWidth: 300,
};
DefaultWithToggletip.argTypes = {
  ...sharedArgTypes,
  defaultWidth: widthArgType,
};
DefaultWithToggletip.parameters = {
  controls: {
    include: [
      ...sharedControls.filter((control) => control !== 'labelText'),
      'defaultWidth',
    ],
  },
};

export const Skeleton = ({ defaultWidth }) => (
  <div style={{ width: defaultWidth }}>
    <FluidTextInputSkeleton />
  </div>
);

Skeleton.args = { defaultWidth: 300 };
Skeleton.argTypes = { defaultWidth: widthArgType };
Skeleton.parameters = { controls: { include: ['defaultWidth'] } };

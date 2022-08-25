/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import FluidTextInput from '../FluidTextInput';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './test.scss';

export default {
  title: 'Components/FluidTextInput',
  component: FluidTextInput,
};

export const Default = () => (
  <FluidTextInput labelText="Label" placeholder="Placeholder text" />
);

export const Test = () => (
  <>
    <div className="fluid-input-wrapper">
      <FluidTextInput
        id="input-1"
        labelText="Label"
        placeholder="Placeholder text"
      />

      <FluidTextInput
        id="input-2"
        invalid
        invalidText="Error message that is really long can wrap to more lines but should not be excessively long."
        labelText="Label"
        placeholder="Placeholder text"
      />

      <FluidTextInput
        id="input-3"
        warn
        warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
        labelText="Label"
        placeholder="Placeholder text"
      />
    </div>
    <div className="fluid-input-wrapper">
      <FluidTextInput
        id="input-4"
        labelText={ToggleTip}
        placeholder="Placeholder text"
      />

      <FluidTextInput
        id="input-5"
        invalid
        invalidText="Error message that is really long can wrap to more lines but should not be excessively long."
        labelText={ToggleTip}
        placeholder="Placeholder text"
      />

      <FluidTextInput
        id="input-6"
        warn
        warnText="Warning message that is really long can wrap to more lines but should not be excessively long."
        labelText={ToggleTip}
        placeholder="Placeholder text"
      />
    </div>
  </>
);

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

export const DefaultWithTooltip = () => (
  <FluidTextInput labelText={ToggleTip} placeholder="Placeholder text" />
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidTextInput {...args} />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 300,
  },
  className: {
    control: {
      type: 'text',
    },
    defaultValue: 'test-class',
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
    defaultValue: 'Placeholder text',
  },
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue:
      'Error message that is really long can wrap to more lines but should not be excessively long.',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  labelText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Label',
  },
  warn: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warnText: {
    control: {
      type: 'text',
    },
    defaultValue:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
  value: {
    control: {
      type: 'text',
    },
  },
};

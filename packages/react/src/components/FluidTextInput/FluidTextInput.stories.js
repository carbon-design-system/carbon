/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './fluid-text-input-story.scss?inline';

import React from 'react';
import FluidTextInput from '../FluidTextInput';
import FluidTextInputSkeleton from './FluidTextInput.Skeleton';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './test.scss';
import mdx from './FluidTextInput.mdx';

export default {
  title: 'Components/Fluid Components/FluidTextInput',
  component: FluidTextInput,
  decorators: [
    (Story) => (
      <>
        <style>{styles}</style>
        <Story />
      </>
    ),
  ],
  parameters: {
    styles,
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

export const Default = (args) => {
  const { defaultWidth, ...textInputArgs } = args;
  return (
    <div style={{ width: defaultWidth }}>
      <FluidTextInput {...textInputArgs} />
    </div>
  );
};

Default.args = {
  defaultWidth: 300,
  placeholder: 'Placeholder text',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  disabled: false,
  labelText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
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
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  labelText: {
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
  value: {
    control: {
      type: 'text',
    },
  },
};

export const DefaultWithToggletip = () => {
  const labelToggletip = (
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
  return (
    <div className="fluid-text-input-story">
      {labelToggletip}
      <FluidTextInput labelText="Label" placeholder="Placeholder text" />
    </div>
  );
};

export const Skeleton = () => {
  return (
    <div style={{ width: '300px' }}>
      <FluidTextInputSkeleton
        labelText="Label"
        placeholder="Placeholder text"
        id="input-1"
      />
    </div>
  );
};

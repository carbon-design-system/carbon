/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidNumberInput, FluidNumberInputSkeleton } from '.';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Information } from '@carbon/icons-react';
import './fluid-number-input-story.scss';
import mdx from './FluidNumberInput.mdx';

export default {
  title: 'Components/Fluid Components/FluidNumberInput',
  component: FluidNumberInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    FluidNumberInputSkeleton,
  },
};

export const Default = ({ defaultWidth, labelText, ...numberInputArgs }) => (
  <div className="fluid-number-input-story" style={{ width: defaultWidth }}>
    {/* Keep the toggletip outside `label`; interactive content is invalid in labels. */}
    <span className="fluid-number-input-story__toggletip">
      <Toggletip align="top-left">
        <ToggletipButton label="Show information">
          <Information />
        </ToggletipButton>
        <ToggletipContent>
          <p>Additional field information here.</p>
        </ToggletipContent>
      </Toggletip>
    </span>
    <FluidNumberInput {...numberInputArgs} label={labelText} />
  </div>
);

Default.args = {
  allowEmpty: false,
  className: '',
  defaultWidth: 400,
  defaultValue: 50,
  disableWheel: false,
  disabled: false,
  iconDescription: 'Adjust number',
  id: 'input-default',
  inputMode: 'decimal',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  labelText: 'Label',
  locale: 'en-US',
  max: 100,
  min: 0,
  placeholder: 'Placeholder text',
  readOnly: false,
  step: 10,
  type: 'number',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  allowEmpty: {
    control: 'boolean',
  },
  className: {
    control: 'text',
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  defaultValue: {
    control: 'number',
  },
  disableWheel: {
    control: 'boolean',
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
  iconDescription: {
    control: 'text',
  },
  id: {
    control: 'text',
  },
  inputMode: {
    control: 'select',
    options: [
      'none',
      'text',
      'tel',
      'url',
      'email',
      'numeric',
      'decimal',
      'search',
    ],
  },
  labelText: {
    control: 'text',
  },
  locale: {
    control: 'text',
  },
  max: {
    control: 'number',
  },
  min: {
    control: 'number',
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  onKeyUp: {
    action: 'onKeyUp',
  },
  placeholder: {
    control: 'text',
  },
  readOnly: {
    control: 'boolean',
  },
  step: {
    control: 'number',
  },
  type: {
    control: 'select',
    options: ['number', 'text'],
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

Default.parameters = {
  controls: { include: Object.keys(Default.argTypes) },
};

export const Skeleton = ({ defaultWidth, ...args }) => (
  <div style={{ width: defaultWidth }}>
    <FluidNumberInputSkeleton {...args} />
  </div>
);

Skeleton.args = {
  className: '',
  defaultWidth: 400,
};

Skeleton.argTypes = {
  className: { control: 'text' },
  defaultWidth: Default.argTypes.defaultWidth,
};

Skeleton.parameters = {
  controls: { include: Object.keys(Skeleton.argTypes) },
};

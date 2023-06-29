/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSelect, FluidSelectSkeleton } from '.';
import SelectItem from '../SelectItem';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';
import mdx from './FluidSelect.mdx';

export default {
  title: 'Experimental/unstable__FluidSelect',
  component: FluidSelect,
  subcomponents: {
    FluidSelectSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    onChange: {
      action: 'onChange',
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
    light: {
      table: {
        disable: true,
      },
    },
  },
};

const ToggleTip = (
  <>
    <ToggletipLabel>Select an option</ToggletipLabel>
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

export const Default = () => (
  <div style={{ width: '400px' }}>
    <FluidSelect id="select-1" labelText={ToggleTip}>
      <SelectItem value="" text="" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
      <SelectItem value="option-4" text="Option 4" />
    </FluidSelect>
    <br /> <br />
    <FluidSelect
      id="select-2"
      labelText={ToggleTip}
      invalid
      invalidText="Error message that is really long can wrap to more lines but should not be excessively long.">
      <SelectItem value="" text="" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
      <SelectItem value="option-4" text="Option 4" />
    </FluidSelect>
    <br /> <br />
    <FluidSelect
      id="select-3"
      labelText={ToggleTip}
      warn
      warnText="Warning message that is really long can wrap to more lines but should not be excessively long.">
      <SelectItem value="" text="" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
      <SelectItem value="option-4" text="Option 4" />
    </FluidSelect>
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidSelect {...args} id="select-1">
      <SelectItem value="" text="" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
      <SelectItem value="option-4" text="Option 4" />
    </FluidSelect>
  </div>
);

export const Skeleton = () => (
  <div style={{ width: 400 }}>
    <FluidSelectSkeleton />
  </div>
);

Playground.args = {
  playgroundWidth: 400,
  className: 'test-class',
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  disabled: {
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

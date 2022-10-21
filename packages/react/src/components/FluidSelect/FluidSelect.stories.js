/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSelect, FluidSelectSkeleton } from '.';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidSelect',
  component: FluidSelect,
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
    <FluidSelect
      id="select-1"
      defaultValue="placeholder-item"
      labelText={ToggleTip}>
      <SelectItem
        disabled
        hidden
        value="placeholder-item"
        text="Choose an option"
      />
      <SelectItemGroup label="Category 1">
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </SelectItemGroup>
      <SelectItemGroup label="Category 2">
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </SelectItemGroup>
    </FluidSelect>
    <br /> <br />
    <FluidSelect
      id="select-2"
      defaultValue="placeholder-item"
      labelText={ToggleTip}
      invalid
      invalidText="Error message that is really long can wrap to more lines but should not be excessively long.">
      <SelectItem
        disabled
        hidden
        value="placeholder-item"
        text="Choose an option"
      />
      <SelectItemGroup label="Category 1">
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </SelectItemGroup>
      <SelectItemGroup label="Category 2">
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </SelectItemGroup>
    </FluidSelect>
    <br /> <br />
    <FluidSelect
      id="select-3"
      defaultValue="placeholder-item"
      labelText={ToggleTip}
      warn
      warnText="Warning message that is really long can wrap to more lines but should not be excessively long.">
      <SelectItem
        disabled
        hidden
        value="placeholder-item"
        text="Choose an option"
      />
      <SelectItemGroup label="Category 1">
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </SelectItemGroup>
      <SelectItemGroup label="Category 2">
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </SelectItemGroup>
    </FluidSelect>
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidSelect {...args} id="select-1" defaultValue="placeholder-item">
      <SelectItem
        disabled
        hidden
        value="placeholder-item"
        text="Choose an option"
      />
      <SelectItemGroup label="Category 1">
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </SelectItemGroup>
      <SelectItemGroup label="Category 2">
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </SelectItemGroup>
    </FluidSelect>
  </div>
);

export const Skeleton = () => (
  <div style={{ width: 400 }}>
    <FluidSelectSkeleton />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 400,
  },
  className: {
    control: {
      type: 'text',
    },
    defaultValue: 'test-class',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
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
  labelText: {
    control: {
      type: 'text',
    },
    defaultValue: ToggleTip,
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
};

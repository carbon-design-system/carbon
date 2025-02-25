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
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { Information, View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './FluidSelect.mdx';

export default {
  title: 'Experimental/Fluid Components/unstable__FluidSelect',
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

const sharedArgTypes = {
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

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidSelect {...args} id="select-1">
      <SelectItem value="" text="" />
      <SelectItem value="option-1" text="Option 1" />
      <SelectItem value="option-2" text="Option 2" />
      <SelectItem value="option-3" text="Option 3" />
      <SelectItem value="option-4" text="Option 4" />
    </FluidSelect>
  </div>
);

Default.args = {
  labelText: ToggleTip,
  defaultWidth: 400,
  className: 'test-class',
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Default.argTypes = {
  ...sharedArgTypes,
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
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

export const withAILabel = (args) => (
  <div style={{ width: 400 }}>
    <FluidSelect
      id="select-1"
      labelText="Select an option"
      decorator={aiLabel}
      {...args}>
      <SelectItem value="" text="" />
      <SelectItem
        value="An example option that is really long to show what should be done to handle long text"
        text="An example option that is really long to show what should be done to handle long text"
      />
      <SelectItem value="Option 2" text="Option 2" />
      <SelectItem value="Option 3" text="Option 3" />
      <SelectItem value="Option 4" text="Option 4" />
    </FluidSelect>
  </div>
);

withAILabel.argTypes = { ...sharedArgTypes };

export const Skeleton = () => (
  <div style={{ width: 400 }}>
    <FluidSelectSkeleton />
  </div>
);

/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import FluidTextArea from '../FluidTextArea';
import FluidTextAreaSkeleton from './FluidTextArea.Skeleton';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidTextArea',
  component: FluidTextArea,
  subcomponents: {
    FluidTextAreaSkeleton,
  },
  argTypes: {
    hideLabel: {
      table: {
        disable: true,
      },
    },
    helperText: {
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
    value: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
  <FluidTextArea
    labelText="Text Area label"
    placeholder="Placeholder text"
    id="text-area-1"
  />
);

export const DefaultWithLayers = () => (
  <WithLayer>
    {(layer) => (
      <FluidTextArea
        labelText="Text Area label"
        placeholder="Placeholder text"
        id={`text-area-${layer}`}
      />
    )}
  </WithLayer>
);

const ToggleTip = (
  <>
    <ToggletipLabel>Text Area label</ToggletipLabel>
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
  <FluidTextArea labelText={ToggleTip} placeholder="Placeholder text" />
);

export const Skeleton = () => (
  <div style={{ width: '300px' }}>
    <FluidTextAreaSkeleton />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidTextArea {...args} />
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
  enableCounter: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  labelText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Text Area label',
  },
  maxCount: {
    control: {
      type: 'text',
    },
    defaultValue: '500',
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
    defaultValue: 'This is a warning message.',
  },
};

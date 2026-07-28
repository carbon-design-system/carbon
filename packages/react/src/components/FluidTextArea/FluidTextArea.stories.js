/**
 * Copyright IBM Corp. 2016, 2026
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
import mdx from './FluidTextArea.mdx';

export default {
  title: 'Components/Fluid Components/FluidTextArea',
  component: FluidTextArea,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id', 'value', 'defaultValue'],
    },
  },
  subcomponents: {
    FluidTextAreaSkeleton,
  },
  argTypes: {
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
  cols: {
    control: {
      type: 'number',
    },
  },
  enableCounter: {
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
  labelText: {
    control: {
      type: 'text',
    },
  },
  maxCount: {
    control: {
      type: 'number',
    },
  },
  onChange: {
    action: 'onChange',
  },
  onClick: {
    action: 'onClick',
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  rows: {
    control: {
      type: 'number',
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

const sharedArgs = {
  className: 'test-class',
  cols: 40,
  disabled: false,
  enableCounter: false,
  helperText: 'Optional helper text',
  hideLabel: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  labelText: 'Text Area label',
  maxCount: 500,
  placeholder: 'Placeholder text',
  readOnly: false,
  rows: 4,
  warn: false,
  warnText: 'This is a warning message.',
};

const sharedControls = Object.keys(sharedArgTypes);
const widthArgType = {
  control: { type: 'range', min: 300, max: 800, step: 50 },
};

export const Default = ({ defaultWidth, ...textAreaArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidTextArea {...textAreaArgs} />
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

export const DefaultWithLayers = ({ defaultWidth, ...textAreaArgs }) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: defaultWidth }}>
        <FluidTextArea {...textAreaArgs} id={`text-area-${layer}`} />
      </div>
    )}
  </WithLayer>
);

DefaultWithLayers.args = {
  ...sharedArgs,
  defaultWidth: 300,
};

DefaultWithLayers.argTypes = {
  ...sharedArgTypes,
  defaultWidth: widthArgType,
};

DefaultWithLayers.parameters = {
  controls: { include: [...sharedControls, 'defaultWidth'] },
};

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

export const DefaultWithToggletip = ({ defaultWidth, ...textAreaArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidTextArea {...textAreaArgs} labelText={ToggleTip} />
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
    <FluidTextAreaSkeleton />
  </div>
);

Skeleton.args = { defaultWidth: 300 };
Skeleton.argTypes = { defaultWidth: widthArgType };
Skeleton.parameters = { controls: { include: ['defaultWidth'] } };

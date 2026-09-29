/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './fluid-text-area-story.scss?inline';

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import FluidTextArea from '../FluidTextArea';
import FluidTextAreaSkeleton from './FluidTextArea.Skeleton';
import { Toggletip, ToggletipButton, ToggletipContent } from '../Toggletip';
import { Information } from '@carbon/icons-react';
import mdx from './FluidTextArea.mdx';

export default {
  title: 'Components/Fluid Components/FluidTextArea',
  component: FluidTextArea,
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
      exclude: ['id', 'value', 'defaultValue'],
    },
  },
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
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  enableCounter: {
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
  defaultWidth: 300,
  disabled: false,
  enableCounter: false,
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

export const Default = (args) => {
  const { defaultWidth, ...textAreaArgs } = args;
  return (
    <div style={{ width: defaultWidth }}>
      <FluidTextArea {...textAreaArgs} />
    </div>
  );
};

Default.args = {
  ...sharedArgs,
};

Default.argTypes = {
  ...sharedArgTypes,
};

export const DefaultWithLayers = (args) => {
  const { defaultWidth, ...textAreaArgs } = args;
  return (
    <WithLayer>
      {(layer) => (
        <div style={{ width: defaultWidth }}>
          <FluidTextArea {...textAreaArgs} id={`text-area-${layer}`} />
        </div>
      )}
    </WithLayer>
  );
};

DefaultWithLayers.args = {
  ...sharedArgs,
};

DefaultWithLayers.argTypes = {
  ...sharedArgTypes,
};

export const DefaultWithToggletip = (args) => {
  const { defaultWidth, ...textAreaArgs } = args;
  const labelToggletip = (
    <span className="fluid-text-area-story__toggletip">
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
    <div className="fluid-text-area-story" style={{ width: defaultWidth }}>
      {labelToggletip}
      <FluidTextArea {...textAreaArgs} labelText="Text Area label" />
    </div>
  );
};

DefaultWithToggletip.args = {
  ...sharedArgs,
};

DefaultWithToggletip.argTypes = {
  ...sharedArgTypes,
};

DefaultWithToggletip.parameters = {
  controls: {
    exclude: ['id', 'value', 'defaultValue', 'labelText'],
  },
};

export const Skeleton = (args) => {
  const { defaultWidth } = args;
  return (
    <div style={{ width: defaultWidth }}>
      <FluidTextAreaSkeleton />
    </div>
  );
};

Skeleton.args = { defaultWidth: sharedArgs.defaultWidth };
Skeleton.argTypes = { defaultWidth: sharedArgTypes.defaultWidth };
Skeleton.parameters = { controls: { include: ['defaultWidth'] } };

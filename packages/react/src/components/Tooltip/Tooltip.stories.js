/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import { Information } from '@carbon/icons-react';
import React from 'react';
import { Tooltip } from './';
import mdx from './Tooltip.mdx';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    layout: 'centered',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
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
  },
  decorators: [
    (Story) => (
      <div className="sb-tooltip-story">
        <Story />
      </div>
    ),
  ],
};

export const Default = () => {
  const label =
    'Occassionally, services are updated in a specified time window to ensure no down time for customers.';
  return (
    <Tooltip align="bottom" label={label}>
      <button className="sb-tooltip-trigger" type="button">
        <Information />
      </button>
    </Tooltip>
  );
};

export const Alignment = () => {
  return (
    <Tooltip label="Tooltip alignment" align="bottom-left">
      <button className="sb-tooltip-trigger" type="button">
        <Information />
      </button>
    </Tooltip>
  );
};

export const Duration = () => {
  return (
    <Tooltip label="Label one" enterDelayMs={0} leaveDelayMs={300}>
      <button className="sb-tooltip-trigger" type="button">
        <Information />
      </button>
    </Tooltip>
  );
};

const PlaygroundStory = (props) => {
  const {
    align,
    closeOnActivation,
    defaultOpen,
    description,
    enterDelayMs,
    label,
    leaveDelayMs,
  } = props;
  return (
    <Tooltip
      align={align}
      defaultOpen={defaultOpen}
      description={description}
      enterDelayMs={enterDelayMs}
      label={label}
      leaveDelayMs={leaveDelayMs}
      closeOnActivation={closeOnActivation}>
      <button className="sb-tooltip-trigger" type="button">
        <Information />
      </button>
    </Tooltip>
  );
};

export const Playground = PlaygroundStory.bind({});

Playground.args = {
  align: 'bottom',
  closeOnActivation: false,
  defaultOpen: true,
  label: 'Custom label',
};

Playground.argTypes = {
  align: {
    options: [
      'top',
      'top-left',
      'top-right',

      'bottom',
      'bottom-left',
      'bottom-right',

      'left',
      'left-bottom',
      'left-top',

      'right',
      'right-bottom',
      'right-top',
    ],
    control: {
      type: 'select',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  description: {
    control: {
      type: 'text',
    },
  },
};

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import { Checkbox16 } from '@carbon/icons-react';
import React from 'react';
import { Tooltip } from '../next';

export default {
  title: 'Experimental/unstable_Tooltip',
  component: Tooltip,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    layout: 'centered',
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
};

export const Default = () => {
  const label =
    'Occassionally, services are updated in a specified time window to ensure no down time for customers.';
  return (
    <Tooltip align="bottom" defaultOpen label={label}>
      <button className="demo-tooltip-trigger" type="button">
        <Checkbox16 />
      </button>
    </Tooltip>
  );
};

export const Duration = () => {
  return (
    <>
      <Tooltip label="Label one" enterDelayMs={500} leaveDelayMs={500}>
        <button className="demo-tooltip-trigger" type="button">
          <Checkbox16 />
        </button>
      </Tooltip>
      <Tooltip label="Label two" enterDelayMs={500} leaveDelayMs={500}>
        <button className="demo-tooltip-trigger" type="button">
          <Checkbox16 />
        </button>
      </Tooltip>
      <Tooltip label="Label three" enterDelayMs={500} leaveDelayMs={500}>
        <button className="demo-tooltip-trigger" type="button">
          <Checkbox16 />
        </button>
      </Tooltip>
    </>
  );
};

const PlaygroundStory = (props) => {
  const { align, defaultOpen, description, label } = props;
  return (
    <Tooltip
      align={align}
      label={label}
      defaultOpen={defaultOpen}
      description={description}>
      <button className="demo-tooltip-trigger" type="button">
        <Checkbox16 />
      </button>
    </Tooltip>
  );
};

export const Playground = PlaygroundStory.bind({});

Playground.argTypes = {
  align: {
    defaultValue: 'bottom',
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
  defaultOpen: {
    defaultValue: true,
  },
  label: {
    control: {
      type: 'text',
    },
    defaultValue: 'Custom label',
  },
  description: {
    control: {
      type: 'text',
    },
  },
};

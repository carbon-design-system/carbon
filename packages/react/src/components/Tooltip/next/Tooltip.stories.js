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
import { DefinitionTooltip } from './DefinitionTooltip.js';

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

export const Definition = () => {
  const definition =
    'Starfleet was the deep space exploratory and defense service maintained by the United Federation of Planets.';
  return (
    <div>
      <p>
        The first duty of every{' '}
        <DefinitionTooltip definition={definition}>Starfleet</DefinitionTooltip>{' '}
        officer is to the truth, whether it’s scientific truth, or historical
        truth, or personal truth! It is the guiding principle on which Starfleet
        is based.
      </p>
    </div>
  );
};

const PlaygroundStory = (props) => {
  const {
    align,
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
      leaveDelayMs={leaveDelayMs}>
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

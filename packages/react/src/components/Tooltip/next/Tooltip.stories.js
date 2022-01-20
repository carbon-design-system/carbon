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
    'Uniform Resource Locator; the address of a resource (such as a document or website) on the Internet.';
  return (
    <div>
      <p>
        Custom domains direct requests for your apps in this Cloud Foundry
        organization to a{' '}
        <DefinitionTooltip openOnClick definition={definition}>
          URL
        </DefinitionTooltip>{' '}
        that you own. A custom domain can be a shared domain, a shared
        subdomain, or a shared domain and host.
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

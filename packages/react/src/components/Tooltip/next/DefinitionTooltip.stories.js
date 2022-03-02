/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';
import { DefinitionTooltip } from './DefinitionTooltip';

export default {
  title: 'Components/Tooltip/DefinitionTooltip',
  component: DefinitionTooltip,
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
  const definition =
    'Uniform Resource Locator; the address of a resource (such as a document or website) on the Internet.';
  return (
    <div>
      <p>
        Custom domains direct requests for your apps in this Cloud Foundry
        organization to a{' '}
        <DefinitionTooltip definition={definition}>URL</DefinitionTooltip> that
        you own. A custom domain can be a shared domain, a shared subdomain, or
        a shared domain and host.
      </p>
    </div>
  );
};
const PlaygroundStory = (props) => {
  const { align, defaultOpen, definition } = props;
  return (
    <p>
      This sentence contains a{' '}
      <DefinitionTooltip
        align={align}
        defaultOpen={defaultOpen}
        definition={definition}>
        definition tooltip
      </DefinitionTooltip>
      .
    </p>
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
  definition: {
    control: {
      type: 'text',
    },
  },
};

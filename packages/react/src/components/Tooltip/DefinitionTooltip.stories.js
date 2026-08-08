/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';
import { DefinitionTooltip } from './';
import mdx from './DefinitionTooltip.mdx';

const alignOptions = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const deprecatedAlignOptions = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'left-bottom',
  'left-top',
  'right-bottom',
  'right-top',
];

const defaultArgs = {
  align: 'bottom-start',
  autoAlign: false,
  defaultOpen: false,
  definition:
    'Uniform Resource Locator; the address of a resource (such as a document or website) on the Internet.',
  openOnHover: true,
};

const argTypes = {
  align: {
    options: alignOptions,
    control: 'select',
  },
  alignDeprecated: {
    name: 'align (deprecated)',
    options: deprecatedAlignOptions,
    control: 'select',
    table: {
      category: 'Deprecated',
    },
  },
  autoAlign: {
    control: 'boolean',
  },
  definition: {
    control: 'text',
  },
  defaultOpen: {
    control: 'boolean',
  },
  openOnHover: {
    control: 'boolean',
  },
};

export default {
  title: 'Components/DefinitionTooltip',
  component: DefinitionTooltip,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      include: Object.keys(argTypes),
    },
    docs: {
      page: mdx,
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="sb-tooltip-story sb-definition-tooltip">
        <Story />
      </div>
    ),
  ],
};
export const Default = (args) => {
  const { align, alignDeprecated, defaultOpen, ...rest } = args;
  const resolvedAlign = alignDeprecated || align;
  return (
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a{' '}
      <DefinitionTooltip
        key={defaultOpen ? 'open' : 'closed'}
        openOnHover
        align={resolvedAlign}
        defaultOpen={defaultOpen}
        {...rest}>
        URL
      </DefinitionTooltip>{' '}
      that you own. A custom domain can be a shared domain, a shared subdomain,
      or a shared domain and host.
    </p>
  );
};

Default.args = { ...defaultArgs };
Default.argTypes = { ...argTypes };

export const WithLargeText = (args) => {
  const { align, alignDeprecated, defaultOpen, ...rest } = args;
  const resolvedAlign = alignDeprecated || align;
  return (
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a{' '}
      <DefinitionTooltip
        key={defaultOpen ? 'open' : 'closed'}
        openOnHover
        align={resolvedAlign}
        defaultOpen={defaultOpen}
        {...rest}>
        URL that you own. A custom domain can be a shared domain,
      </DefinitionTooltip>{' '}
      a shared subdomain, or a shared domain and host.
    </p>
  );
};

WithLargeText.args = { ...defaultArgs };
WithLargeText.argTypes = { ...argTypes };

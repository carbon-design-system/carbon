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

export default {
  title: 'Components/DefinitionTooltip',
  component: DefinitionTooltip,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: ['id', 'tooltipText', 'triggerClassName'],
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
  const definition =
    'Uniform Resource Locator; the address of a resource (such as a document or website) on the Internet.';
  const { align, alignDeprecated, ...rest } = args;
  const resolvedAlign = alignDeprecated || align;
  return (
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a{' '}
      <DefinitionTooltip
        openOnHover
        definition={definition}
        align={resolvedAlign}
        {...rest}>
        URL
      </DefinitionTooltip>{' '}
      that you own. A custom domain can be a shared domain, a shared subdomain,
      or a shared domain and host.
    </p>
  );
};

Default.args = {
  align: 'bottom-left',
  defaultOpen: false,
  definition: 'Example definition',
  openOnHover: true,
};

Default.argTypes = {
  align: {
    options: alignOptions,
    control: {
      type: 'select',
    },
  },
  alignDeprecated: {
    name: 'align (deprecated)',
    options: deprecatedAlignOptions,
    control: {
      type: 'select',
    },
    table: {
      category: 'Deprecated',
    },
  },
  definition: {
    control: {
      type: 'text',
    },
  },
  openOnHover: {
    control: {
      type: 'boolean',
    },
  },
};

export const WithLargeText = (args) => {
  const definition = 'Example definition';
  const { align, alignDeprecated, ...rest } = args;
  const resolvedAlign = alignDeprecated || align;
  return (
    <p>
      Custom domains direct requests for your apps in this Cloud Foundry
      organization to a{' '}
      <DefinitionTooltip
        openOnHover
        definition={definition}
        align={resolvedAlign}
        {...rest}>
        URL that you own. A custom domain can be a shared domain,
      </DefinitionTooltip>{' '}
      a shared subdomain, or a shared domain and host.
    </p>
  );
};

WithLargeText.args = {
  align: 'bottom-left',
  defaultOpen: false,
  definition: 'Example definition',
  openOnHover: true,
};

WithLargeText.argTypes = {
  align: {
    options: alignOptions,
    control: {
      type: 'select',
    },
  },
  alignDeprecated: {
    name: 'align (deprecated)',
    options: deprecatedAlignOptions,
    control: {
      type: 'select',
    },
    table: {
      category: 'Deprecated',
    },
  },
  definition: {
    control: {
      type: 'text',
    },
  },
  id: {
    table: { disable: true },
  },
  openOnHover: {
    control: {
      type: 'boolean',
    },
  },
  tooltipText: {
    table: {
      disable: true,
    },
  },
  triggerClassName: {
    table: {
      disable: true,
    },
  },
};

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Edit, Notification } from '@carbon/icons-react';
import React from 'react';
import { IconButton } from '../IconButton';
import mdx from './IconButton.mdx';

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
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
      exclude: ['badgeCount'],
    },
    docs: {
      page: mdx,
    },
    layout: 'centered',
  },
};

export const Default = (args) => {
  const { align, alignDeprecated, ...rest } = args;
  const resolvedAlign = alignDeprecated || align;
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton align={resolvedAlign} {...rest}>
        <Edit />
      </IconButton>
    </div>
  );
};

Default.args = {
  align: 'bottom',
  defaultOpen: true,
  disabled: false,
  label: 'Custom label',
  kind: 'primary',
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
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  kind: {
    control: {
      type: 'select',
    },
    options: ['primary', 'secondary', 'ghost', 'tertiary'],
  },
};

export const withBadgeIndicator = (args) => {
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton
        label="Notification"
        kind="ghost"
        size="lg"
        autoAlign
        {...args}>
        <Notification />
      </IconButton>
    </div>
  );
};

withBadgeIndicator.args = {
  badgeCount: 4,
};
withBadgeIndicator.parameters = {
  controls: {
    exclude: ['size', 'kind'],
  },
};

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
      exclude: ['children'],
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
  autoAlign: false,
  closeOnActivation: true,
  defaultOpen: true,
  disabled: false,
  dropShadow: false,
  enterDelayMs: 100,
  highContrast: true,
  isSelected: false,
  label: 'Custom label',
  kind: 'primary',
  leaveDelayMs: 100,
  size: 'lg',
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
  autoAlign: {
    control: {
      type: 'boolean',
    },
  },
  closeOnActivation: {
    control: {
      type: 'boolean',
    },
  },
  defaultOpen: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  dropShadow: {
    control: {
      type: 'boolean',
    },
  },
  enterDelayMs: {
    control: {
      type: 'number',
      min: 0,
    },
  },
  highContrast: {
    control: {
      type: 'boolean',
    },
  },
  isSelected: {
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
  leaveDelayMs: {
    control: {
      type: 'number',
      min: 0,
    },
  },
  size: {
    control: {
      type: 'select',
    },
    options: ['xs', 'sm', 'md', 'lg'],
  },
};

Default.parameters = {
  controls: {
    exclude: ['badgeCount', 'children'],
  },
};

export const withBadgeIndicator = (args) => {
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton
        label="Notification"
        autoAlign
        {...args}
        kind="ghost"
        size="lg">
        <Notification />
      </IconButton>
    </div>
  );
};

withBadgeIndicator.args = {
  align: 'bottom',
  autoAlign: true,
  badgeCount: 4,
  closeOnActivation: true,
  disabled: false,
  dropShadow: false,
  enterDelayMs: 100,
  highContrast: true,
  isSelected: false,
  kind: 'ghost',
  label: 'Notifications',
  leaveDelayMs: 100,
  size: 'lg',
};
withBadgeIndicator.argTypes = {
  ...Default.argTypes,
  badgeCount: {
    control: {
      type: 'number',
      min: 0,
    },
  },
  kind: {
    ...Default.argTypes.kind,
    control: false,
  },
  size: {
    ...Default.argTypes.size,
    control: false,
  },
};
withBadgeIndicator.parameters = {
  controls: {
    exclude: ['children'],
  },
};

/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Edit, Notification } from '@carbon/icons-react';
import React from 'react';
import { IconButton } from '../IconButton';
import mdx from './IconButton.mdx';

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

export const Default = (args) => {
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton {...args}>
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
    // TODO:
    // 1. Should the deprecated options be deleted?
    // 2. The list doesn't include all of the options available in the
    //    component. Is it supposed to?
    options: [
      'top',
      'top-left',
      'top-right',
      'bottom',
      'bottom-left',
      'bottom-right',
      'left',
      'right',
    ],
    control: {
      type: 'select',
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

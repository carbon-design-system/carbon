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

const DefaultStory = (props) => {
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton {...props}>
        <Edit />
      </IconButton>
    </div>
  );
};

export const Default = DefaultStory.bind({});

Default.args = {
  align: 'bottom',
  defaultOpen: true,
  disabled: false,
  label: 'Custom label',
  kind: 'primary',
};

Default.argTypes = {
  align: {
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

export const withBadgeIndicator = (props) => {
  const { badgeCount, disabled } = props;
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton
        badgeCount={badgeCount}
        disabled={disabled}
        label="Notification"
        kind="ghost"
        size="lg"
        autoAlign>
        <Notification />
      </IconButton>
    </div>
  );
};

withBadgeIndicator.args = {
  badgeCount: 4,
};

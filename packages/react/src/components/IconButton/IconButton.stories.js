/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Edit } from '@carbon/icons-react';
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

export const Default = () => (
  <div style={{ margin: '3rem' }}>
    <IconButton label="label">
      <Edit />
    </IconButton>
  </div>
);

const PlaygroundStory = (props) => {
  const { align, defaultOpen, disabled, kind, label, size } = props;
  return (
    <div style={{ margin: '3rem' }}>
      <IconButton
        align={align}
        defaultOpen={defaultOpen}
        disabled={disabled}
        kind={kind}
        label={label}
        size={size}>
        <Edit />
      </IconButton>
    </div>
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
      'right',
    ],
    control: {
      type: 'select',
    },
  },
  defaultOpen: {
    defaultValue: true,
  },
  disabled: {
    defaultValue: false,
    control: {
      type: 'boolean',
    },
  },
  label: {
    control: {
      type: 'text',
    },
    defaultValue: 'Custom label',
  },
  kind: {
    control: {
      type: 'select',
    },
    defaultValue: 'primary',
    options: ['primary', 'secondary', 'ghost', 'tertiary'],
  },
};

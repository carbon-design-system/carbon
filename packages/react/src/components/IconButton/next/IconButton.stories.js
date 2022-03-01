/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Edit16 } from '@carbon/icons-react';
import React from 'react';
import { IconButton } from '../';

export default {
  title: 'IconButton',
  component: IconButton,
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

const PlaygroundStory = (props) => {
  const { align, defaultOpen, disabled, kind, label } = props;
  return (
    <IconButton
      align={align}
      defaultOpen={defaultOpen}
      disabled={disabled}
      kind={kind}
      label={label}>
      <Edit16 />
    </IconButton>
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

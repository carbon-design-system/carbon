/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Stack } from '../Stack';

export default {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => {
  return (
    <Stack step={6}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
};

export const Horizontal = () => {
  return (
    <Stack step={6} orientation="horizontal">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
};

const PlaygroundStory = (props) => {
  return (
    <Stack {...props}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
};

export const Playground = PlaygroundStory.bind({});

Playground.argTypes = {
  gap: {
    control: {
      type: 'text',
    },
  },
  orientation: {
    options: ['horizontal', 'vertical'],
    control: {
      type: 'select',
    },
  },
  step: {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    control: {
      type: 'select',
    },
  },
};

/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button, Stack } from '@carbon/react';
import { Add } from '@carbon/icons-react';

export const stories = [
  {
    name: 'Default (Primary)',
    render: () => (
      <Stack gap={4}>
        <Button kind="primary">Button</Button>
        <Button kind="primary" renderIcon={Add}>
          Button
        </Button>
      </Stack>
    ),
  },
  {
    name: 'Secondary',
    render: () => (
      <Stack gap={4}>
        <Button kind="secondary">Button</Button>
        <Button kind="secondary" renderIcon={Add}>
          Button
        </Button>
      </Stack>
    ),
  },
  {
    name: 'Tertiary',
    render: () => (
      <Stack gap={4}>
        <Button kind="tertiary">Button</Button>
        <Button kind="tertiary" renderIcon={Add}>
          Button
        </Button>
      </Stack>
    ),
  },
  {
    name: 'Ghost',
    render: () => (
      <Stack gap={4}>
        <Button kind="ghost">Button</Button>
        <Button kind="ghost" renderIcon={Add}>
          Button
        </Button>
      </Stack>
    ),
  },
  {
    name: 'Danger',
    render: () => (
      <Stack gap={4}>
        <Button kind="danger">Button</Button>
        <Button kind="danger--tertiary">Danger tertiary</Button>
        <Button kind="danger--ghost">Danger ghost</Button>
      </Stack>
    ),
  },
  {
    name: 'Disabled',
    render: () => (
      <Stack gap={4}>
        <Button kind="primary" disabled>
          Button
        </Button>
        <Button kind="secondary" disabled>
          Button
        </Button>
      </Stack>
    ),
  },
  {
    name: 'Sizes',
    render: () => (
      <Stack gap={4}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
        <Button size="2xl">2XL</Button>
      </Stack>
    ),
  },
];

// Made with Bob

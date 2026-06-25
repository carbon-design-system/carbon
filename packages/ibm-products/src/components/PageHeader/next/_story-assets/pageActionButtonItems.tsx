/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from '@carbon/react';
import { Activity, Add, AiGenerate } from '@carbon/react/icons';

export const pageActionButtonItems = [
  {
    // props used for both collapse menu item and non-collapsed action form
    id: 'action1',
    onClick: () => console.log(`Action 1`),
    // component to render when non-collapsed
    body: (
      <Button
        renderIcon={AiGenerate}
        iconDescription="Icon Description 1"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
    // props to pass to the corresponding collapsed menu item
    menuItem: {
      label: 'action 1',
    },
  },
  {
    id: 'action2',
    onClick: () => console.log(`Action 2`),
    body: (
      <Button
        renderIcon={Activity}
        iconDescription="Icon Description 2"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
    menuItem: {
      label: 'action 2',
    },
  },
  {
    id: 'action3',
    onClick: () => console.log(`Action 3`),
    body: (
      <Button
        renderIcon={Activity}
        iconDescription="Icon Description 3"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
    menuItem: {
      label: 'action 3',
    },
  },
  {
    id: 'action4',
    onClick: () => console.log(`Action 4`),
    body: (
      <Button
        renderIcon={Activity}
        iconDescription="Icon Description 4"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
    menuItem: {
      label: 'action 4',
    },
  },
  {
    id: 'primary-action',
    onClick: () => console.log(`Primary action`),
    body: (
      <Button
        kind="primary"
        renderIcon={Add}
        size="md"
        aria-label="Add Primary action"
      >
        Primary action
      </Button>
    ),
    menuItem: {
      label: 'Add Primary action',
    },
  },
];

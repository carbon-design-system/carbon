/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Document, Folder } from '@carbon/icons-react';
import { Button, VStack } from '../../';

import mdx from './TreeView.featureflag.mdx';

import { TreeView, TreeNode } from './';

import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

const nodes = [
  {
    id: '1',
    value: 'Artificial intelligence',
    label: <span>Artificial intelligence</span>,
    renderIcon: Document,
  },
  {
    id: '2',
    value: 'Blockchain',
    label: 'Blockchain',
    renderIcon: Document,
  },
  {
    id: '3',
    value: 'Business automation',
    label: 'Business automation',
    renderIcon: Folder,
    children: [
      {
        id: '3-1',
        value: 'Business process automation',
        label: 'Business process automation',
        renderIcon: Document,
      },
      {
        id: '3-2',
        value: 'Business process mapping',
        label: 'Business process mapping',
        renderIcon: Document,
      },
    ],
  },
  {
    id: '4',
    value: 'Business operations',
    label: 'Business operations',
    renderIcon: Document,
  },
  {
    id: '5',
    value: 'Cloud computing',
    label: 'Cloud computing',
    isExpanded: true,
    renderIcon: Folder,
    children: [
      {
        id: '5-1',
        value: 'Containers',
        label: 'Containers',
        renderIcon: Document,
      },
      {
        id: '5-2',
        value: 'Databases',
        label: 'Databases',
        renderIcon: Document,
      },
      {
        id: '5-3',
        value: 'DevOps',
        label: 'DevOps',
        isExpanded: true,
        renderIcon: Folder,
        children: [
          {
            id: '5-4',
            value: 'Solutions',
            label: 'Solutions',
            renderIcon: Document,
          },
          {
            id: '5-5',
            value: 'Case studies',
            label: 'Case studies',
            isExpanded: true,
            renderIcon: Folder,
            children: [
              {
                id: '5-6',
                value: 'Resources',
                label: 'Resources',
                renderIcon: Document,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '6',
    value: 'Data & Analytics',
    label: 'Data & Analytics',
    renderIcon: Folder,
    children: [
      {
        id: '6-1',
        value: 'Big data',
        label: 'Big data',
        renderIcon: Document,
      },
      {
        id: '6-2',
        value: 'Business intelligence',
        label: 'Business intelligence',
        renderIcon: Document,
      },
    ],
  },
  {
    id: '7',
    value: 'Models',
    label: 'Models',
    isExpanded: true,
    disabled: true,
    renderIcon: Folder,
    children: [
      {
        id: '7-1',
        value: 'Audit',
        label: 'Audit',
        renderIcon: Document,
      },
      {
        id: '7-2',
        value: 'Monthly data',
        label: 'Monthly data',
        renderIcon: Document,
      },
      {
        id: '8',
        value: 'Data warehouse',
        label: 'Data warehouse',
        isExpanded: true,
        renderIcon: Folder,
        children: [
          {
            id: '8-1',
            value: 'Report samples',
            label: 'Report samples',
            renderIcon: Document,
          },
          {
            id: '8-2',
            value: 'Sales performance',
            label: 'Sales performance',
            renderIcon: Document,
          },
        ],
      },
    ],
  },
];

function renderTree(nodes) {
  if (!nodes) {
    return;
  }

  return nodes.map(({ children, isExpanded, ...nodeProps }) => (
    <TreeNode key={nodeProps.id} defaultIsExpanded={isExpanded} {...nodeProps}>
      {renderTree(children)}
    </TreeNode>
  ));
}

export default {
  title: 'Experimental/Feature Flags/TreeView',
  component: TreeView,
  subcomponents: {
    TreeNode,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    onSelect: action('onSelect'),
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const Playground = (args) => {
  const [selected, setSelected] = useState([]);
  const [active, setActive] = useState(null);

  return (
    <VStack gap={6}>
      <VStack gap={2}>
        <Button
          kind="tertiary"
          size="sm"
          onClick={() => {
            setSelected(['5-2']);
          }}>
          Select &quot;Databases&quot;
        </Button>
        <Button
          kind="tertiary"
          size="sm"
          onClick={() => {
            setActive('5-2');
          }}>
          Activate &quot;Databases&quot;
        </Button>
      </VStack>

      <div>
        <TreeView
          label="Tree View"
          {...args}
          active={active}
          onActivate={setActive}
          selected={selected}
          onSelect={setSelected}>
          {renderTree(nodes)}
        </TreeView>
      </div>
    </VStack>
  );
};

Playground.args = {
  hideLabel: false,
  multiselect: false,
};

Playground.argTypes = {
  active: { control: { disable: true } },
  selected: { control: { disable: true } },
  size: {
    options: ['xs', 'sm'],
    control: { type: 'select' },
  },
};

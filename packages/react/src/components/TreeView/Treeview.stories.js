/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Document, Folder } from '@carbon/icons-react';
import { default as TreeView, TreeNode } from './';
import './story.scss';

const nodes = [
  {
    id: '1',
    value: 'Level 1 (leaf)',
    label: <span>Level 1 (leaf)</span>,
    renderIcon: Document,
  },
  {
    id: '2',
    value: 'Level 1 (leaf)',
    label: 'Level 1 (leaf)',
    renderIcon: Document,
  },
  {
    id: '3',
    value: 'Level 1 (branch)',
    label: 'Level 1 (branch)',
    renderIcon: Folder,
    children: [
      {
        id: '3-1',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
      {
        id: '3-2',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
    ],
  },
  {
    id: '4',
    value: 'Level 1 (leaf)',
    label: 'Level 1 (leaf)',
    renderIcon: Document,
  },
  {
    id: '5',
    value: 'Level 1 (branch)',
    label: 'Level 1 (branch)',
    isExpanded: true,
    renderIcon: Folder,
    children: [
      {
        id: '5-1',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
      {
        id: '5-2',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
      {
        id: '5-3',
        value: 'Level 2 (branch)',
        label: 'Level 2 (branch)',
        isExpanded: true,
        renderIcon: Folder,
        children: [
          {
            id: '5-4',
            value: 'Level 3 (leaf)',
            label: 'Level 3 (leaf)',
            renderIcon: Document,
          },
          {
            id: '5-5',
            value: 'Level 3 (branch)',
            label: 'Level 3 (branch)',
            isExpanded: true,
            renderIcon: Folder,
            children: [
              {
                id: '5-6',
                value: 'Level 4 (leaf)',
                label: 'Level 4 (leaf)',
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
    value: 'Level 1 (branch)',
    label: 'Level 1 (branch)',
    renderIcon: Folder,
    children: [
      {
        id: '6-1',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
      {
        id: '6-2',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
    ],
  },
  {
    id: '7',
    value: 'Level 1 (branch)',
    label: 'Level 1 (branch)',
    isExpanded: true,
    disabled: true,
    renderIcon: Folder,
    children: [
      {
        id: '7-1',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
      {
        id: '7-2',
        value: 'Level 2 (leaf)',
        label: 'Level 2 (leaf)',
        renderIcon: Document,
      },
      {
        id: '8',
        value: 'Level 2 (branch)',
        label: 'Level 2 (branch)',
        isExpanded: true,
        renderIcon: Folder,
        children: [
          {
            id: '8-1',
            value: 'Level 3 (leaf)',
            label: 'Level 3 (leaf)',
            renderIcon: Document,
          },
          {
            id: '8-2',
            value: 'Level 3 (leaf)',
            label: 'Level 3 (leaf)',
            renderIcon: Document,
          },
        ],
      },
    ],
  },
];

function renderTree({ nodes, expanded, withIcons = false }) {
  if (!nodes) {
    return;
  }
  return nodes.map(({ children, renderIcon, isExpanded, ...nodeProps }) => (
    <TreeNode
      key={nodeProps.id}
      renderIcon={withIcons ? renderIcon : null}
      isExpanded={expanded ?? isExpanded}
      {...nodeProps}>
      {renderTree({ nodes: children, expanded, withIcons })}
    </TreeNode>
  ));
}

export default {
  title: 'components/TreeView',
  component: TreeView,
  subcomponents: {
    TreeNode,
  },
  args: {},
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

    label: {
      table: {
        disable: true,
      },
    },

    onSelect: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
  <TreeView label="Tree View">{renderTree({ nodes })}</TreeView>
);

export const WithIcons = () => (
  <TreeView label="Tree View">
    {renderTree({ nodes, withIcons: true })}
  </TreeView>
);

export const WithControlledExpansion = () => {
  const [expanded, setExpanded] = useState(undefined);
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <button type="button" onClick={() => setExpanded(true)}>
          expand all
        </button>
        <button type="button" onClick={() => setExpanded(false)}>
          collapse all
        </button>
      </div>
      <TreeView label="Tree View">{renderTree({ nodes, expanded })}</TreeView>
    </>
  );
};

export const Playground = (args) => (
  <TreeView label="Tree View" {...args}>
    {renderTree({ nodes })}
  </TreeView>
);

Playground.args = {
  hideLabel: false,
  multiselect: false,
};

Playground.argTypes = {
  active: { control: { type: 'text' } },
  size: {
    options: ['xs', 'sm'],
    control: { type: 'select' },
  },
};

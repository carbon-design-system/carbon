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
    value: 'IT infrastructure',
    label: 'IT infrastructure',
    isExpanded: true,
    disabled: true,
    renderIcon: Folder,
    children: [
      {
        id: '7-1',
        value: 'Data storage',
        label: 'Data storage',
        renderIcon: Document,
      },
      {
        id: '7-2',
        value: 'Enterprise servers',
        label: 'Enterprise servers',
        renderIcon: Document,
      },
      {
        id: '8',
        value: 'Hybrid cloud infrastructure',
        label: 'Hybrid cloud infrastructure',
        isExpanded: true,
        renderIcon: Folder,
        children: [
          {
            id: '8-1',
            value: 'Insights',
            label: 'Insights',
            renderIcon: Document,
          },
          {
            id: '8-2',
            value: 'Benefits',
            label: 'Benefits',
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

Playground.argTypes = {
  active: { control: { type: 'text' } },
  hideLabel: { defaultValue: false },
  multiselect: { defaultValue: false },
  size: {
    options: ['xs', 'sm'],
    control: { type: 'select' },
  },
};

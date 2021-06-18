/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Document16, Folder16 } from '@carbon/icons-react';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { InlineNotification } from '../Notification';
import TreeView, { TreeNode } from '../TreeView';
import './story.scss';

const sizes = {
  default: 'default',
  compact: 'compact',
};
const props = () => ({
  active: text('Active node ID (active)', '5'),
  hideLabel: boolean('Visible label (hideLabel)', false),
  label: text('Label (label)', 'Tree view'),
  multiselect: boolean(
    'Allow selection of multiple tree nodes (multiselect)',
    false
  ),
  onSelect: action('onSelect (TreeView onSelect)'),
  selected: object('Array of selected node IDs (selected)', ['5']),
  size: select('Tree size (sizes)', sizes, 'default'),
});
const nodes = [
  {
    id: '1',
    value: 'Artificial intelligence',
    label: <span>Artificial intelligence</span>,
    renderIcon: Document16,
    onSelect: action('onSelect (TreeNode onSelect)'),
    onToggle: action('onToggle'),
  },
  {
    id: '2',
    value: 'Blockchain',
    label: 'Blockchain',
    renderIcon: Document16,
    onSelect: action('onSelect (TreeNode onSelect)'),
    onToggle: action('onToggle'),
  },
  {
    id: '3',
    value: 'Business automation',
    label: 'Business automation',
    renderIcon: Folder16,
    onSelect: action('onSelect (TreeNode onSelect)'),
    onToggle: action('onToggle'),
    children: [
      {
        id: '3-1',
        value: 'Business process automation',
        label: 'Business process automation',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
      {
        id: '3-2',
        value: 'Business process mapping',
        label: 'Business process mapping',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
    ],
  },
  {
    id: '4',
    value: 'Business operations',
    label: 'Business operations',
    renderIcon: Document16,
    onSelect: action('onSelect (TreeNode onSelect)'),
    onToggle: action('onToggle'),
  },
  {
    id: '5',
    value: 'Cloud computing',
    label: 'Cloud computing',
    isExpanded: true,
    renderIcon: Folder16,
    onSelect: action('onSelect (TreeNode onSelect)'),
    onToggle: action('onToggle'),
    children: [
      {
        id: '5-1',
        value: 'Containers',
        label: 'Containers',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
      {
        id: '5-2',
        value: 'Databases',
        label: 'Databases',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
      {
        id: '5-3',
        value: 'DevOps',
        label: 'DevOps',
        isExpanded: true,
        renderIcon: Folder16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
        children: [
          {
            id: '5-4',
            value: 'Solutions',
            label: 'Solutions',
            renderIcon: Document16,
            onSelect: action('onSelect (TreeNode onSelect)'),
            onToggle: action('onToggle'),
          },
          {
            id: '5-5',
            value: 'Case studies',
            label: 'Case studies',
            isExpanded: true,
            renderIcon: Folder16,
            onSelect: action('onSelect (TreeNode onSelect)'),
            onToggle: action('onToggle'),
            children: [
              {
                id: '5-6',
                value: 'Resources',
                label: 'Resources',
                renderIcon: Document16,
                onSelect: action('onSelect (TreeNode onSelect)'),
                onToggle: action('onToggle'),
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
    renderIcon: Folder16,
    onSelect: action('onSelect (TreeNode onSelect)'),
    onToggle: action('onToggle'),
    children: [
      {
        id: '6-1',
        value: 'Big data',
        label: 'Big data',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
      {
        id: '6-2',
        value: 'Business intelligence',
        label: 'Business intelligence',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
    ],
  },
  {
    id: '7',
    value: 'IT infrastructure',
    label: 'IT infrastructure',
    isExpanded: true,
    disabled: true,
    renderIcon: Folder16,
    onSelect: action('onSelect (TreeNode onSelect)'),
    onToggle: action('onToggle'),
    children: [
      {
        id: '7-1',
        value: 'Data storage',
        label: 'Data storage',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
      {
        id: '7-2',
        value: 'Enterprise servers',
        label: 'Enterprise servers',
        renderIcon: Document16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
      },
      {
        id: '8',
        value: 'Hybrid cloud infrastructure',
        label: 'Hybrid cloud infrastructure',
        isExpanded: true,
        renderIcon: Folder16,
        onSelect: action('onSelect (TreeNode onSelect)'),
        onToggle: action('onToggle'),
        children: [
          {
            id: '8-1',
            value: 'Insights',
            label: 'Insights',
            renderIcon: Document16,
            onSelect: action('onSelect (TreeNode onSelect)'),
            onToggle: action('onToggle'),
          },
          {
            id: '8-2',
            value: 'Benefits',
            label: 'Benefits',
            renderIcon: Document16,
            onSelect: action('onSelect (TreeNode onSelect)'),
            onToggle: action('onToggle'),
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
  title: 'Experimental/unstable_TreeView',
  decorators: [withKnobs],
  parameters: { component: TreeView },
};

export const Default = () => (
  <>
    <InlineNotification
      kind="info"
      title="Experimental component"
      subtitle="An accessibility review of this component is in progress"
    />
    <TreeView {...props()}>{renderTree({ nodes })}</TreeView>
  </>
);

Default.storyName = 'default';
Default.parameters = {
  info: {
    text: ``,
  },
};

export const WithIcons = () => (
  <>
    <InlineNotification
      kind="info"
      title="Experimental component"
      subtitle="An accessibility review of this component is in progress"
    />
    <TreeView {...props()}>{renderTree({ nodes, withIcons: true })}</TreeView>
  </>
);

WithIcons.storyName = 'with icons';

export const WithControlledExpansion = () => {
  const [expanded, setExpanded] = useState(undefined);
  return (
    <>
      <InlineNotification
        kind="info"
        title="Experimental component"
        subtitle="An accessibility review of this component is in progress"
      />
      <div style={{ marginBottom: '1rem' }}>
        <button type="button" onClick={() => setExpanded(true)}>
          expand all
        </button>
        <button type="button" onClick={() => setExpanded(false)}>
          collapse all
        </button>
      </div>
      <TreeView {...props()}>{renderTree({ nodes, expanded })}</TreeView>
    </>
  );
};

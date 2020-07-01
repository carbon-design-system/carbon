/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Document16, Folder16 } from '@carbon/icons-react';
import {
  boolean,
  object,
  select,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import TreeView, { TreeNode } from '../TreeView';

const sizes = {
  default: 'default',
  compact: 'compact',
};
const props = () => ({
  active: text('Active node value (active)', '5'),
  hideLabel: boolean('Visible label (hideLabel)', false),
  label: text('Label (label)', 'Tree view'),
  multiselect: boolean(
    'Allow selection of multiple tree nodes (multiselect)',
    false
  ),
  selected: object('Array of selected node IDs (selected)', ['5']),
  size: select('Tree size (sizes)', sizes, 'default'),
});

const nodes = [
  {
    id: '1',
    value: '1',
    label: <span>1</span>,
    renderIcon: Document16,
  },
  {
    id: '2',
    value: '2',
    label: '2',
    renderIcon: Document16,
  },
  {
    id: '3',
    value: '3',
    label: '3',
    renderIcon: Folder16,

    children: [
      {
        id: '3-1',
        value: '3-1',
        label: '3-1',
        renderIcon: Document16,
      },
      {
        id: '3-2',
        value: '3-2',
        label: '3-2',
        renderIcon: Document16,
      },
    ],
  },
  {
    id: '4',
    value: '4',
    label: '4',
    renderIcon: Document16,
  },
  {
    id: '5',
    value: '5',
    label: '5',
    isExpanded: true,
    renderIcon: Folder16,

    children: [
      {
        id: '5-1',
        value: '5-1',
        label: '5-1',
        renderIcon: Document16,
      },
      {
        id: '5-2',
        value: '5-2',
        label: '5-2',
        renderIcon: Document16,
      },
      {
        id: '5-3',
        value: '5-3',
        label: '5-3',
        isExpanded: true,
        renderIcon: Folder16,

        children: [
          {
            id: '5-4',
            value: '5-4',
            label: '5-4',
            renderIcon: Document16,
          },
          {
            id: '5-5',
            value: '5-5',
            label: '5-5',
            isExpanded: true,
            renderIcon: Folder16,

            children: [
              {
                id: '5-6',
                value: '5-6',
                label: '5-6',
                renderIcon: Document16,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '6',
    value: '6',
    label: '6',
    renderIcon: Folder16,

    children: [
      {
        id: '6-1',
        value: '6-1',
        label: '6-1',
        renderIcon: Document16,
      },
      {
        id: '6-2',
        value: '6-2',
        label: '6-2',
        renderIcon: Document16,
      },
    ],
  },
  {
    id: '7',
    value: '7',
    label: '7',
    isExpanded: true,
    disabled: true,
    renderIcon: Folder16,

    children: [
      {
        id: '7-1',
        value: '7-1',
        label: '7-1',
        renderIcon: Document16,
      },
      {
        id: '7-2',
        value: '7-2',
        label: '7-2',
        renderIcon: Document16,
      },
      {
        id: '8',
        value: '8',
        label: '8',
        isExpanded: true,
        renderIcon: Folder16,

        children: [
          {
            id: '8-1',
            value: '8-1',
            label: '8-1',
            renderIcon: Document16,
          },
          {
            id: '8-2',
            value: '8-2',
            label: '8-2',
            renderIcon: Document16,
          },
        ],
      },
    ],
  },
];
function renderTree({ nodes, withIcons = false }) {
  if (!nodes) {
    return;
  }
  return nodes.map(({ children, renderIcon, ...nodeProps }) => (
    <TreeNode renderIcon={withIcons ? renderIcon : null} {...nodeProps}>
      {renderTree({ nodes: children, withIcons })}
    </TreeNode>
  ));
}

storiesOf('TreeView', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TreeView {...props()}>{renderTree({ nodes })}</TreeView>
  ))
  .add('with icons', () => (
    <TreeView {...props()}>{renderTree({ nodes, withIcons: true })}</TreeView>
  ));

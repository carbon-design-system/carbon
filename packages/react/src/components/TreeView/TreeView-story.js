/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import TreeView, { TreeNode } from '../TreeView';

storiesOf('TreeView', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TreeView>
      <TreeNode label={<button>1</button>} />
      <TreeNode label="2" />
      <TreeNode label="3">
        <TreeNode label="3-1" />
        <TreeNode label="3-2" />
      </TreeNode>
      <TreeNode label="4" />
      <TreeNode label="5" isExpanded>
        <TreeNode label="5-1" />
        <TreeNode label="5-2" />
        <TreeNode label="5-3" isExpanded>
          <TreeNode label="5-4" selected />
          <TreeNode label="5-5" isExpanded>
            <TreeNode label="5-6" />
          </TreeNode>
        </TreeNode>
      </TreeNode>
      <TreeNode label="6">
        <TreeNode label="6-1" />
        <TreeNode label="6-2" />
      </TreeNode>
    </TreeView>
  ));

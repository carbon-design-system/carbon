/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { Document16, Folder16 } from '@carbon/icons-react';
import TreeView, { TreeNode } from '../TreeView';

storiesOf('TreeView', module)
  .add(
    'default',
    () => (
      <TreeView>
        <TreeNode value="1" label={<button>1</button>} />
        <TreeNode value="2" label="2" />
        <TreeNode value="3" label="3">
          <TreeNode value="3-1" label="3-1" />
          <TreeNode value="3-2" label="3-2" />
        </TreeNode>
        <TreeNode value="4" label="4" />
        <TreeNode value="5" label="5" isExpanded selected>
          <TreeNode value="5-1" label="5-1" />
          <TreeNode value="5-2" label="5-2" />
          <TreeNode value="5-3" label="5-3" isExpanded>
            <TreeNode value="5-4" label="5-4" />
            <TreeNode value="5-5" label="5-5" isExpanded>
              <TreeNode value="5-6" label="5-6" />
            </TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode value="6" label="6">
          <TreeNode value="6-1" label="6-1" />
          <TreeNode value="6-2" label="6-2" />
        </TreeNode>
        <TreeNode value="7" label="7" isExpanded disabled>
          <TreeNode value="7-1" label="7-1" />
          <TreeNode value="7-2" label="7-2" />
        </TreeNode>
      </TreeView>
    ),
    {
      info: {
        text: ``,
      },
    }
  )
  .add(
    'with icons',
    () => (
      <TreeView>
        <TreeNode
          renderIcon={Document16}
          value="1"
          label={<button>1</button>}
        />
        <TreeNode renderIcon={Document16} value="2" label="2" />
        <TreeNode renderIcon={Folder16} value="3" label="3">
          <TreeNode renderIcon={Document16} value="3-1" label="3-1" />
          <TreeNode renderIcon={Document16} value="3-2" label="3-2" />
        </TreeNode>
        <TreeNode renderIcon={Document16} value="4" label="4" />
        <TreeNode renderIcon={Folder16} value="5" label="5" isExpanded selected>
          <TreeNode renderIcon={Document16} value="5-1" label="5-1" />
          <TreeNode renderIcon={Document16} value="5-2" label="5-2" />
          <TreeNode renderIcon={Folder16} value="5-3" label="5-3" isExpanded>
            <TreeNode renderIcon={Document16} value="5-4" label="5-4" />
            <TreeNode renderIcon={Folder16} value="5-5" label="5-5" isExpanded>
              <TreeNode renderIcon={Document16} value="5-6" label="5-6" />
            </TreeNode>
          </TreeNode>
        </TreeNode>
        <TreeNode renderIcon={Folder16} value="6" label="6">
          <TreeNode renderIcon={Document16} value="6-1" label="6-1" />
          <TreeNode renderIcon={Document16} value="6-2" label="6-2" />
        </TreeNode>
        <TreeNode renderIcon={Folder16} value="7" label="7" isExpanded disabled>
          <TreeNode renderIcon={Document16} value="7-1" label="7-1" />
          <TreeNode renderIcon={Document16} value="7-2" label="7-2" />
        </TreeNode>
      </TreeView>
    ),
    {
      info: {
        text: ``,
      },
    }
  );

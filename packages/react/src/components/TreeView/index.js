/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import UnstableTreeView from './TreeView';
import UnstableTreeNode from './TreeNode';

UnstableTreeView.TreeNode = UnstableTreeNode;

export { UnstableTreeNode as TreeNode };
export default UnstableTreeView;

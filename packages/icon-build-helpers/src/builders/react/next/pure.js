/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function annotateAsPure(nodes) {
  nodes[0].declarations[0].init.leadingComments = [
    {
      type: 'CommentBlock',
      value: '#__PURE__',
    },
  ];

  return nodes;
}

module.exports = {
  annotateAsPure,
};

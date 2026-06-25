/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

/**
 * unwrapIfFragment - walks the passed children unwrapping fragments
 * to create a flat array of all children
 */
const unwrapIfFragment = (children) => {
  // When passed one of the following
  // - A fragment with zero or more children *1
  // - An array with zero or more children *1
  // - A single node
  // *1 -  The children of the above can be any of the above
  // Outputs - A flat array of child nodes
  const newChildArray = [];

  const isFragment = (item) => item && item.type === React.Fragment;

  const addChildren = (children) => {
    const loopOver = (children) => {
      // children may be a single item
      const _children = Array.isArray(children) ? children : [children];

      for (let child of _children) {
        addChildren(child);
      }
    };

    // children is nothing, one fragment, array with one or more children, or a single item
    if (!children) {
      return;
    }

    if (isFragment(children)) {
      loopOver(children.props.children);
    } else {
      if (Array.isArray(children)) {
        loopOver(children);
      } else {
        newChildArray.push(children);
      }
    }
  };

  // nothing, one fragment, array with one or more children, or a single item
  addChildren(children);

  // wrapping with React.Children caters for any missing keys
  const keyedChildren = React.Children.map(newChildArray, (child) => child);

  return keyedChildren;
};

export default unwrapIfFragment;

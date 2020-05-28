/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { keys, match, matches } from '../../internal/keyboard';

const { prefix } = settings;

export default function TreeView({
  children,
  className,
  multiselect,
  onSelect,
  selected: preselected = [],
  size = 'default',
  ...rest
}) {
  const treeClasses = classNames(className, `${prefix}--tree`, {
    [`${prefix}--tree--${size}`]: size !== 'default',
  });
  const treeRootRef = useRef(null);
  const treeWalker = useRef(treeRootRef?.current);
  const [selected, setSelected] = useState(preselected);
  const handleSelect = (event, { value } = {}) => {
    if (multiselect && event.metaKey) {
      if (!selected.includes(value)) {
        setSelected(selected.concat(value));
      } else {
        setSelected(selected.filter(selectedValue => selectedValue !== value));
      }
    } else {
      setSelected([value]);
    }
    if (onSelect) {
      onSelect(event, { value });
    }
  };
  let focusTarget = false;
  const nodesWithProps = React.Children.map(children, node => {
    const sharedNodeProps = {
      depth: 0,
      onSelect: handleSelect,
      selected,
      tabIndex: (!node.props.disabled && -1) || null,
    };
    if (!focusTarget && !node.props.disabled) {
      sharedNodeProps.tabIndex = 0;
      focusTarget = true;
    }
    if (React.isValidElement(node)) {
      return React.cloneElement(node, sharedNodeProps);
    }
  });

  const handleKeyDown = event => {
    event.stopPropagation();
    if (matches(event, [keys.ArrowUp, keys.ArrowDown])) {
      event.preventDefault();
    }
    treeWalker.current.currentNode = event.target;
    let nextFocusNode;
    if (match(event, keys.ArrowUp)) {
      nextFocusNode = treeWalker.current.previousNode();
    }
    if (match(event, keys.ArrowDown)) {
      nextFocusNode = treeWalker.current.nextNode();
    }
    if (nextFocusNode && nextFocusNode !== event.target) {
      Array.prototype.forEach.call(
        treeRootRef?.current?.querySelectorAll('[tabIndex="0"]') ?? [],
        item => {
          item.tabIndex = -1;
        }
      );
      nextFocusNode.tabIndex = 0;
      nextFocusNode.focus();
    }
    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  };

  useEffect(() => {
    treeWalker.current =
      treeWalker.current ??
      document.createTreeWalker(treeRootRef?.current, NodeFilter.SHOW_ELEMENT, {
        acceptNode: function(node) {
          if (node.classList.contains(`${prefix}--tree-node--disabled`)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.matches(`li.${prefix}--tree-node`)) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        },
      });
  }, []);

  useEffect(() => {
    setSelected(preselected);
  }, [preselected]);

  return (
    <ul
      {...rest}
      className={treeClasses}
      onKeyDown={handleKeyDown}
      ref={treeRootRef}
      role="tree">
      {nodesWithProps}
    </ul>
  );
}

TreeView.propTypes = {
  /**
   * Specify the children of the TreeView
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the TreeView
   */
  className: PropTypes.string,

  /**
   * Specify the selection mode of the tree.
   * If `multiselect` is `false` then only one node can be selected at a time
   */
  multiselect: PropTypes.bool,

  /**
   * Callback function that is called when a node is seleected
   */
  onSelect: PropTypes.func,

  /**
   * Array representing all selected values in the tree
   */
  selected: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the size of the tree from a list of available sizes.
   */
  size: PropTypes.oneOf(['default', 'compact']),
};

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
import uniqueId from '../../tools/uniqueId';

const { prefix } = settings;

export default function TreeView({
  active: prespecifiedActive,
  children,
  className,
  hideLabel = false,
  label,
  multiselect,
  onSelect,
  selected: preselected = [],
  size = 'default',
  ...rest
}) {
  const { current: treeId } = useRef(rest.id || uniqueId());
  const treeClasses = classNames(className, `${prefix}--tree`, {
    [`${prefix}--tree--${size}`]: size !== 'default',
  });
  const treeRootRef = useRef(null);
  const treeWalker = useRef(treeRootRef?.current);
  const [selected, setSelected] = useState(preselected);
  const [active, setActive] = useState(prespecifiedActive);
  function resetNodeTabIndices() {
    Array.prototype.forEach.call(
      treeRootRef?.current?.querySelectorAll('[tabIndex="0"]') ?? [],
      (item) => {
        item.tabIndex = -1;
      }
    );
  }
  function handleTreeSelect(event, node = {}) {
    const { id: nodeId } = node;
    if (multiselect && (event.metaKey || event.ctrlKey)) {
      if (!selected.includes(nodeId)) {
        setSelected(selected.concat(nodeId));
      } else {
        setSelected(selected.filter((selectedId) => selectedId !== nodeId));
      }
    } else {
      setSelected([nodeId]);
      setActive(nodeId);
    }
    if (onSelect) {
      onSelect(event, node);
    }
  }
  function handleFocusEvent(event) {
    if (event.type === 'blur') {
      const {
        relatedTarget: currentFocusedNode,
        target: prevFocusedNode,
      } = event;
      if (treeRootRef?.current?.contains(currentFocusedNode)) {
        prevFocusedNode.tabIndex = -1;
      }
    }
    if (event.type === 'focus') {
      resetNodeTabIndices();
      const {
        relatedTarget: prevFocusedNode,
        target: currentFocusedNode,
      } = event;
      if (treeRootRef?.current?.contains(prevFocusedNode)) {
        prevFocusedNode.tabIndex = -1;
      }
      currentFocusedNode.tabIndex = 0;
    }
  }
  let focusTarget = false;
  const nodesWithProps = React.Children.map(children, (node) => {
    const sharedNodeProps = {
      active,
      depth: 0,
      onNodeFocusEvent: handleFocusEvent,
      onTreeSelect: handleTreeSelect,
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

  function handleKeyDown(event) {
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
      resetNodeTabIndices();
      nextFocusNode.tabIndex = 0;
      nextFocusNode.focus();
    }
    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  }

  useEffect(() => {
    treeWalker.current =
      treeWalker.current ??
      document.createTreeWalker(treeRootRef?.current, NodeFilter.SHOW_ELEMENT, {
        acceptNode: function (node) {
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
    if (preselected.length) {
      setSelected(preselected);
    }
    if (prespecifiedActive) {
      setActive(prespecifiedActive);
    }
  }, [preselected, prespecifiedActive]);

  const labelId = `${treeId}__label`;
  const TreeLabel = () =>
    !hideLabel && (
      <label id={labelId} className={`${prefix}--label`}>
        {label}
      </label>
    );
  return (
    <>
      <TreeLabel />
      <ul
        {...rest}
        aria-label={hideLabel ? label : null}
        aria-labelledby={!hideLabel ? labelId : null}
        aria-multiselectable={multiselect || null}
        className={treeClasses}
        onKeyDown={handleKeyDown}
        ref={treeRootRef}
        role="tree">
        {nodesWithProps}
      </ul>
    </>
  );
}

TreeView.propTypes = {
  /**
   * Mark the active node in the tree, represented by its value
   */
  active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify the children of the TreeView
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the TreeView
   */
  className: PropTypes.string,

  /**
   * Specify whether or not the label should be hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide the label text that will be read by a screen reader
   */
  label: PropTypes.string.isRequired,

  /**
   * Specify the selection mode of the tree.
   * If `multiselect` is `false` then only one node can be selected at a time
   */
  multiselect: PropTypes.bool,

  /**
   * Callback function that is called when any node is selected
   */
  onSelect: PropTypes.func,

  /**
   * Array representing all selected node IDs in the tree
   */
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),

  /**
   * Specify the size of the tree from a list of available sizes.
   */
  size: PropTypes.oneOf(['default', 'compact']),
};

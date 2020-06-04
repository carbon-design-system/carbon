/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CaretDown16 } from '@carbon/icons-react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { keys, match, matches } from '../../internal/keyboard';

const { prefix } = settings;

export default function TreeNode({
  children,
  className,
  depth,
  disabled,
  isExpanded,
  label,
  onSelect,
  onToggle,
  renderIcon: Icon,
  selected,
  value,
  ...rest
}) {
  const [expanded, setExpanded] = useState(isExpanded);
  const currentNode = useRef(null);
  const currentNodeLabel = useRef(null);
  const nodesWithProps = React.Children.map(children, node => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        depth: depth + 1,
        disabled,
        onSelect,
        selected,
        tabIndex: (!node.props.disabled && -1) || null,
      });
    }
  });
  const isSelected = selected.includes(value) || null;
  const treeNodeClasses = classNames(className, `${prefix}--tree-node`, {
    [`${prefix}--tree-node--disabled`]: disabled,
    [`${prefix}--tree-node--selected`]: isSelected,
    [`${prefix}--tree-node--with-icon`]: Icon,
    [`${prefix}--tree-leaf-node`]: !children,
    [`${prefix}--tree-parent-node`]: children,
  });
  const toggleClasses = classNames(`${prefix}--tree-parent-node__toggle-icon`, {
    [`${prefix}--tree-parent-node__toggle-icon--expanded`]: expanded,
  });
  const handleToggleClick = event => {
    if (onToggle) {
      onToggle(event, { isExpanded: !expanded });
    }
    setExpanded(!expanded);
  };
  const handleClick = event => {
    event.stopPropagation();
    if (onSelect && !disabled) {
      onSelect(event, { value });
    }
  };
  const handleKeyDown = event => {
    if (matches(event, [keys.ArrowLeft, keys.ArrowRight, keys.Enter])) {
      event.stopPropagation();
    }
    if (match(event, keys.ArrowLeft)) {
      const findParentTreeNode = node => {
        if (node.classList.contains(`${prefix}--tree-parent-node`)) {
          return node;
        }
        if (node.classList.contains(`${prefix}--tree`)) {
          return null;
        }
        return findParentTreeNode(node.parentNode);
      };
      if (children && expanded) {
        setExpanded(false);
      } else {
        /**
         * When focus is on a leaf node or a closed parent node, move focus to
         * its parent node (unless its depth is level 1)
         */
        findParentTreeNode(currentNode.current.parentNode)?.focus();
      }
    }
    if (children && match(event, keys.ArrowRight)) {
      if (expanded) {
        /**
         * When focus is on an expanded parent node, move focus to the first
         * child node
         */
        currentNode.current.lastChild.firstChild.focus();
      }
      setExpanded(true);
    }
    if (match(event, keys.Enter) && onSelect && !disabled) {
      onSelect(event, { value });
    }
    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  };

  useEffect(() => {
    /**
     * Negative margin shifts node to align with the left side boundary of the
     * tree
     * Dynamically calculate padding to recreate tree node indentation
     * - parent nodes have (depth + 1rem) left padding
     * - leaf nodes have (depth + 2.5rem) left padding without icons (because
     *   of expando icon + spacing)
     * - leaf nodes have (depth + 2rem) left padding with icons (because of
     *   reduced spacing between the expando icon and the node icon + label)
     */
    const calcOffset = () => {
      // parent node
      if (children) {
        return depth + 1;
      }
      // leaf node with icon
      if (Icon) {
        return depth + 2;
      }
      // leaf node without icon
      return depth + 2.5;
    };

    if (currentNodeLabel.current) {
      currentNodeLabel.current.style.marginLeft = `-${calcOffset()}rem`;
      currentNodeLabel.current.style.paddingLeft = `${calcOffset()}rem`;
    }

    // sync props and state
    setExpanded(isExpanded);
  }, [children, depth, Icon, isExpanded]);

  const treeNodeProps = {
    ...rest,
    ['aria-selected']: isSelected,
    ['aria-disabled']: disabled,
    className: treeNodeClasses,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    ref: currentNode,
    role: 'treeitem',
  };

  if (!children) {
    return (
      <li {...treeNodeProps}>
        <div className={`${prefix}--tree-node__label`} ref={currentNodeLabel}>
          {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
          {label}
        </div>
      </li>
    );
  }
  return (
    <li {...treeNodeProps} aria-expanded={expanded}>
      <div className={`${prefix}--tree-node__label`} ref={currentNodeLabel}>
        <button
          className={`${prefix}--tree-parent-node__toggle`}
          disabled={disabled}
          onClick={handleToggleClick}
          tabIndex={-1}>
          <CaretDown16 className={toggleClasses} />
        </button>
        <span className={`${prefix}--tree-node__label__details`}>
          {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
          {label}
        </span>
      </div>
      {expanded && (
        <ul role="group" className={`${prefix}--tree-node__children`}>
          {nodesWithProps}
        </ul>
      )}
    </li>
  );
}

TreeNode.propTypes = {
  /**
   * Specify the children of the TreeNode
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the TreeNode
   */
  className: PropTypes.string,

  /**
   * TreeNode depth to determine spacing, automatically calculated by default
   */
  depth: PropTypes.number,

  /**
   * Specify if the TreeNode is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify if the TreeNode is expanded (only applicable to parent nodes)
   */
  isExpanded: PropTypes.bool,

  /**
   * Rendered label for the TreeNode
   */
  label: PropTypes.node,

  /**
   * Callback function for when a node is selected
   */
  onSelect: PropTypes.func,

  /**
   * Callback function for when a parent node is expanded or collapsed
   */
  onToggle: PropTypes.func,

  /**
   * Optional prop to allow each node to have an associated icon.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Array containing all selected values in the tree
   */
  selected: PropTypes.arrayOf(PropTypes.string),

  /**
   * Specify the value of the TreeNode
   */
  value: PropTypes.string,
};

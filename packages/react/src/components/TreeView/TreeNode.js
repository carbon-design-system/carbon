/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import { CaretDown16 } from '@carbon/icons-react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { keys, match } from '../../internal/keyboard';

const { prefix } = settings;

export default function TreeNode({
  className,
  children,
  isExpanded,
  label,
  onToggle,
  renderIcon: Icon,
  selected,
  ...rest
}) {
  const [expanded, setExpanded] = useState(isExpanded);
  const handleToggleClick = evt => {
    setExpanded(!expanded);
    onToggle && onToggle(evt, { isExpanded: !expanded });
  };
  const currentNode = useRef(null);
  const depth = useRef(0);
  const treeNodeClasses = classNames(className, `${prefix}--tree-node`, {
    [`${prefix}--tree-node--selected`]: selected,
    [`${prefix}--tree-leaf-node`]: !children,
    [`${prefix}--tree-parent-node`]: children,
  });
  const toggleClasses = classNames(`${prefix}--tree-parent-node__toggle-icon`, {
    [`${prefix}--tree-parent-node__toggle-icon--expanded`]: expanded,
  });
  const handleKeyDown = evt => {
    evt.stopPropagation();

    if (children && match(evt, keys.ArrowLeft)) {
      setExpanded(false);
    }
    if (children && match(evt, keys.ArrowRight)) {
      setExpanded(true);
    }
    rest.onKeyDown && rest.onKeyDown(evt);
  };

  useEffect(() => {
    /**
     * compute current node depth by finding the difference in client rect x
     * values between the tree root and current node
     */
    const { x: treeRootX } = currentNode.current
      .closest(`.${prefix}--tree`)
      .getBoundingClientRect();
    const { x: currentNodeX } = currentNode.current.getBoundingClientRect();
    depth.current = (currentNodeX - treeRootX) / 16;

    /**
     * Negative margin shifts node to align with the left side boundary of the
     * tree
     * Dynamically calculate padding to recreate tree node indentation
     * - parent nodes have 1rem left padding
     * - leaf nodes have 2.5rem left padding (because of expando icon + spacing)
     */
    const currentNodeLabel = currentNode.current.querySelector(
      `.${prefix}--tree-node__label`
    );
    const offset = `${depth.current + (!children ? 2.5 : 1)}rem`;
    currentNodeLabel.style.marginLeft = `-${offset}`;
    currentNodeLabel.style.paddingLeft = `${offset}`;

    // sync props and state
    setExpanded(isExpanded);
  }, [children, isExpanded]);

  if (!children) {
    return (
      <li
        {...rest}
        className={treeNodeClasses}
        onKeyDown={handleKeyDown}
        ref={currentNode}
        role="treeitem"
        tabIndex="-1">
        <div className={`${prefix}--tree-node__label`}>{label}</div>
      </li>
    );
  }
  return (
    <li
      {...rest}
      aria-expanded={isExpanded}
      className={treeNodeClasses}
      onKeyDown={handleKeyDown}
      ref={currentNode}
      role="treeitem"
      tabIndex="-1">
      <div className={`${prefix}--tree-node__label`}>
        <button
          className={`${prefix}--tree-parent-node__toggle`}
          onClick={handleToggleClick}>
          <CaretDown16 className={toggleClasses} />
        </button>
        {Icon && <Icon className={`${prefix}--tree-node__icon`} />}
        <span className={`${prefix}--tree-node__label--details`}>{label}</span>
      </div>
      {expanded && (
        <ul role="group" className={`${prefix}--tree-node__children`}>
          {children}
        </ul>
      )}
    </li>
  );
}

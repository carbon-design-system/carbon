/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { keys, match } from '../../internal/keyboard';

import SelectableContextMenuOption from './SelectableContextMenuOption';
import ContextMenuRadioGroup from './ContextMenuRadioGroup';

const { prefix } = settings;

const ContextMenu = function ContextMenu({ children, open, ...rest }) {
  const rootRef = useRef(null);

  function resetFocus() {
    Array.from(
      rootRef?.current?.querySelectorAll('[tabindex="0"]') ?? []
    ).forEach((node) => {
      node.tabIndex = -1;
    });
  }

  function focusNode(node) {
    if (node) {
      resetFocus();
      node.tabIndex = 0;
      node.focus();
    }
  }

  function getValidNodes(list) {
    const nodes = Array.from(list.childNodes ?? []).reduce((acc, child) => {
      if (child.tagName === 'LI') {
        return [...acc, child];
      }

      if (child.classList.contains(`${prefix}--context-menu-radio-group`)) {
        return [...acc, ...child.childNodes];
      }

      return acc;
    }, []);

    return nodes.filter((node) =>
      node.matches(
        `li.${prefix}--context-menu-option:not(.${prefix}--context-menu-option--disabled)`
      )
    );
  }

  function getNextNode(current, direction) {
    const nodes = getValidNodes(current.parentNode);
    const currentIndex = nodes.indexOf(current);

    const nextNode = nodes[currentIndex + direction];

    return nextNode?.firstChild || null;
  }

  function getFirstSubNode(node) {
    const submenu = node.querySelector(`ul.${prefix}--context-menu`);

    if (submenu) {
      const subnodes = getValidNodes(submenu);

      return subnodes[0]?.firstChild || null;
    }

    return null;
  }

  function getParentNode(node) {
    const parentNode = node.parentNode.closest(
      `li.${prefix}--context-menu-option`
    );

    return parentNode?.firstChild || null;
  }

  function handleKeyDown(event) {
    event.stopPropagation();

    const currentNode = event.target.parentNode;
    let nodeToFocus;

    if (match(event, keys.ArrowUp)) {
      nodeToFocus = getNextNode(currentNode, -1);
    } else if (match(event, keys.ArrowDown)) {
      nodeToFocus = getNextNode(currentNode, 1);
    } else if (match(event, keys.ArrowRight)) {
      nodeToFocus = getFirstSubNode(currentNode);
    } else if (match(event, keys.ArrowLeft)) {
      nodeToFocus = getParentNode(currentNode);
    }

    focusNode(nodeToFocus);

    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  }

  useEffect(() => {
    const topLevelNodes = getValidNodes(rootRef?.current);

    if (topLevelNodes && topLevelNodes.length > 0) {
      focusNode(topLevelNodes[0].firstChild);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const someNodesHaveIcons = children.some(
    (node) =>
      node.props.renderIcon ||
      node.type === SelectableContextMenuOption ||
      node.type === ContextMenuRadioGroup
  );

  const options = React.Children.map(children, (node) => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        indented: someNodesHaveIcons,
      });
    }
  });

  const classes = classnames(`${prefix}--context-menu`, {
    [`${prefix}--context-menu--open`]: open,
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <ul ref={rootRef} className={classes} onKeyDown={handleKeyDown}>
      {options}
    </ul>
  );
};

ContextMenu.propTypes = {
  /**
   * Specify the children of the ContextMenu
   */
  children: PropTypes.node,

  /**
   * Specify whether the ContextMenu is currently open
   */
  open: PropTypes.bool,
};

export default ContextMenu;

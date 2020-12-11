/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { keys, match } from '../../internal/keyboard';
import ClickListener from '../../internal/ClickListener';

import {
  getValidNodes,
  resetFocus,
  focusNode as focusNodeUtil,
  getNextNode,
  getFirstSubNode,
  getParentNode,
} from './_utils';

import ContextMenuSelectableOption from './ContextMenuSelectableOption';
import ContextMenuRadioGroup from './ContextMenuRadioGroup';

const { prefix } = settings;

const contextMenuWidth = 208; // in px

const ContextMenu = function ContextMenu({
  children,
  open,
  level = 1,
  x = 0,
  y = 0,
  onClose = () => {},
  ...rest
}) {
  const rootRef = useRef(null);
  const [shouldReverse, setShouldReverse] = useState(false);
  const isRootMenu = level === 1;

  function focusNode(node) {
    if (node) {
      resetFocus(rootRef?.current?.element);
      focusNodeUtil(node);
    }
  }

  function handleKeyDown(event) {
    event.stopPropagation();

    if (
      match(event, keys.Escape) ||
      (!isRootMenu && match(event, keys.ArrowLeft))
    ) {
      onClose();
    }

    let nodeToFocus;

    if (event.target.tagName === 'BUTTON') {
      const currentNode = event.target.parentNode;

      if (match(event, keys.ArrowUp)) {
        nodeToFocus = getNextNode(currentNode, -1);
      } else if (match(event, keys.ArrowDown)) {
        nodeToFocus = getNextNode(currentNode, 1);
      } else if (match(event, keys.ArrowRight)) {
        nodeToFocus = getFirstSubNode(currentNode);
        console.log(nodeToFocus);
      } else if (match(event, keys.ArrowLeft)) {
        nodeToFocus = getParentNode(currentNode);
      }
    } else if (event.target.tagName === 'UL') {
      const validNodes = getValidNodes(event.target);

      if (validNodes.length > 0 && match(event, keys.ArrowUp)) {
        nodeToFocus = validNodes[validNodes.length - 1].firstChild;
      } else if (validNodes.length > 0 && match(event, keys.ArrowDown)) {
        nodeToFocus = validNodes[0].firstChild;
      }
    }

    focusNode(nodeToFocus);

    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  }

  function handleClick() {
    onClose();
  }

  function handleClickOutside() {
    onClose();
  }

  function willFit() {
    if (rootRef?.current?.element) {
      const bodyWidth = document.body.clientWidth;

      const reverseMap = [...Array(level)].reduce(
        (acc) => {
          const endX = acc.lastX + contextMenuWidth * acc.direction;
          const fits =
            acc.direction === 1 ? endX < bodyWidth : endX > contextMenuWidth;

          const newDirection = fits ? acc.direction : acc.direction * -1;
          const newLastX = fits
            ? endX
            : acc.lastX + contextMenuWidth * newDirection;

          return {
            direction: newDirection,
            lastX: newLastX,
            map: [...acc.map, newDirection === 1],
          };
        },
        { direction: 1, lastX: x, map: [] }
      );

      return reverseMap.map[level - 1];
    }

    return true;
  }

  useEffect(() => {
    if (open) {
      if (isRootMenu) {
        rootRef?.current?.element?.focus();
      }
    }

    setShouldReverse(!willFit());
  }, [open, x, y]); // eslint-disable-line react-hooks/exhaustive-deps

  const someNodesHaveIcons = React.Children.toArray(children).some(
    (node) =>
      node.props.renderIcon ||
      node.type === ContextMenuSelectableOption ||
      node.type === ContextMenuRadioGroup
  );

  const options = React.Children.map(children, (node) => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        indented: someNodesHaveIcons,
        level: level,
        menuX: x,
      });
    }
  });

  const classes = classnames(`${prefix}--context-menu`, {
    [`${prefix}--context-menu--open`]: open,
    [`${prefix}--context-menu--reverse`]: shouldReverse,
    [`${prefix}--context-menu--root`]: isRootMenu,
  });

  return (
    <ClickListener onClickOutside={handleClickOutside} ref={rootRef}>
      <ul
        className={classes}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        data-level={level}
        style={isRootMenu ? { left: `${x}px`, top: `${y}px` } : null}
        role="menu"
        tabIndex={-1}>
        {options}
      </ul>
    </ClickListener>
  );
};

ContextMenu.propTypes = {
  /**
   * Specify the children of the ContextMenu
   */
  children: PropTypes.node,

  /**
   * Internal: keeps track of the nesting level of the menu
   */
  level: PropTypes.number,

  /**
   * Function called when the menu is closed
   */
  onClose: PropTypes.func,

  /**
   * Specify whether the ContextMenu is currently open
   */
  open: PropTypes.bool,

  /**
   * Specify the x position where this menu is rendered
   */
  x: PropTypes.number,

  /**
   * Specify the y position where this menu is rendered
   */
  y: PropTypes.number,
};

export default ContextMenu;

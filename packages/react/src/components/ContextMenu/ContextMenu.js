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
  getParentMenu,
} from './_utils';

import ContextMenuSelectableOption from './ContextMenuSelectableOption';
import ContextMenuRadioGroup from './ContextMenuRadioGroup';

const { prefix } = settings;

const margin = 16; // distance to keep to body edges, in px

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
  const [direction, setDirection] = useState(1); // 1 = to right, -1 = to left
  const [position, setPosition] = useState([x, y]);
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

  function handleClick(e) {
    if (e.target.tagName !== 'UL') {
      onClose();
    }
  }

  function handleClickOutside() {
    if (open) {
      onClose();
    }
  }

  function getCorrectedPosition(assumedDirection) {
    const pos = [x, y];

    const {
      width,
      height,
    } = rootRef?.current?.element?.getBoundingClientRect();
    const { clientWidth: bodyWidth, clientHeight: bodyHeight } = document.body;
    const parentWidth = isRootMenu
      ? 0
      : getParentMenu(rootRef?.current?.element)?.getBoundingClientRect()
          ?.width;
    let localDirection = assumedDirection;

    const min = [margin, margin];
    const max = [bodyWidth - margin - width, bodyHeight - margin - height];

    // in case it is root menu previously had direction -1, check
    // if direction 1 would be possible
    if (isRootMenu && localDirection === -1 && pos[0] < max[0]) {
      localDirection = 1;
    }

    // make sure menu is visible in y bounds
    if (pos[1] > max[1]) pos[1] = max[1];
    if (pos[1] < min[1]) pos[1] = min[1];

    if (localDirection === 1) {
      // if it won't fit anymore
      if (pos[0] > max[0]) {
        pos[0] = x - width - parentWidth;
        if (pos[0] + width > bodyWidth - margin) pos[0] = max[0];
        localDirection = -1;
      } else if (pos[0] < min[0]) {
        // keep distance to left screen edge
        pos[0] = min[0];
      }
    } else if (localDirection === -1) {
      pos[0] = x - width - parentWidth;

      // if it should re-reverse
      if (pos[0] < min[0]) {
        pos[0] = x;
        localDirection = 1;
      }
    }

    setDirection(localDirection);

    return [Math.round(pos[0]), Math.round(pos[1])];
  }

  useEffect(() => {
    if (open) {
      let localDirection = 1;

      if (isRootMenu) {
        rootRef?.current?.element?.focus();
      } else {
        const parentMenu = getParentMenu(rootRef?.current?.element);

        if (parentMenu) {
          localDirection = Number(parentMenu.dataset.direction);
        }
      }

      const correctedPosition = getCorrectedPosition(localDirection);
      setPosition(correctedPosition);
    } else {
      setPosition([0, 0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, x, y]);

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
      });
    }
  });

  const classes = classnames(`${prefix}--context-menu`, {
    [`${prefix}--context-menu--open`]: open,
    [`${prefix}--context-menu--invisible`]:
      open && position[0] === 0 && position[1] === 0,
    [`${prefix}--context-menu--root`]: isRootMenu,
  });

  return (
    <ClickListener onClickOutside={handleClickOutside} ref={rootRef}>
      <ul
        open={open}
        className={classes}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        role="menu"
        tabIndex={-1}
        data-level={level}
        data-direction={direction}
        style={{
          left: `${position[0]}px`,
          top: `${position[1]}px`,
        }}>
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

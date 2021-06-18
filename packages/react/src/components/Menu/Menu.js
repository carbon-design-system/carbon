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
  capWithinRange,
  clickedElementHasSubnodes,
  focusNode as focusNodeUtil,
  getNextNode,
  getParentMenu,
  getParentNode,
  getPosition,
  getValidNodes,
  resetFocus,
} from './_utils';

import MenuGroup from './MenuGroup';
import MenuRadioGroup from './MenuRadioGroup';
import MenuRadioGroupOptions from './MenuRadioGroupOptions';
import MenuSelectableItem from './MenuSelectableItem';

const { prefix } = settings;

const margin = 16; // distance to keep to body edges, in px

const Menu = function Menu({
  autoclose = true,
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
  const [canBeClosed, setCanBeClosed] = useState(false);
  const isRootMenu = level === 1;

  function getContainerBoundaries() {
    const { clientWidth: bodyWidth, clientHeight: bodyHeight } = document.body;
    return [margin, margin, bodyWidth - margin, bodyHeight - margin];
  }

  function getTargetBoundaries() {
    const xIsRange = typeof x === 'object' && x.length === 2;
    const yIsRange = typeof y === 'object' && y.length === 2;

    const targetBoundaries = [
      xIsRange ? x[0] : x,
      yIsRange ? y[0] : y,
      xIsRange ? x[1] : x,
      yIsRange ? y[1] : y,
    ];

    if (!isRootMenu) {
      const { width: parentWidth } = getParentMenu(
        rootRef?.current?.element
      )?.getBoundingClientRect();

      targetBoundaries[2] -= parentWidth;
    }

    const containerBoundaries = getContainerBoundaries();

    return [
      capWithinRange(
        targetBoundaries[0],
        containerBoundaries[0],
        containerBoundaries[2]
      ),
      capWithinRange(
        targetBoundaries[1],
        containerBoundaries[1],
        containerBoundaries[3]
      ),
      capWithinRange(
        targetBoundaries[2],
        containerBoundaries[0],
        containerBoundaries[2]
      ),
      capWithinRange(
        targetBoundaries[3],
        containerBoundaries[1],
        containerBoundaries[3]
      ),
    ];
  }

  function focusNode(node) {
    if (node) {
      resetFocus(rootRef?.current?.element);
      focusNodeUtil(node);
    }
  }

  function handleKeyDown(event) {
    if (
      event.target.tagName === 'LI' &&
      (match(event, keys.Enter) || match(event, keys.Space))
    ) {
      handleClick(event);
    } else {
      event.stopPropagation();
    }

    if (
      match(event, keys.Escape) ||
      (!isRootMenu && match(event, keys.ArrowLeft))
    ) {
      onClose();
    }

    let nodeToFocus;

    if (event.target.tagName === 'LI') {
      const currentNode = event.target;

      if (match(event, keys.ArrowUp)) {
        nodeToFocus = getNextNode(currentNode, -1);
      } else if (match(event, keys.ArrowDown)) {
        nodeToFocus = getNextNode(currentNode, 1);
      } else if (match(event, keys.ArrowLeft)) {
        nodeToFocus = getParentNode(currentNode);
      }
    } else if (event.target.tagName === 'UL') {
      const validNodes = getValidNodes(event.target);

      if (validNodes.length > 0 && match(event, keys.ArrowUp)) {
        nodeToFocus = validNodes[validNodes.length - 1];
      } else if (validNodes.length > 0 && match(event, keys.ArrowDown)) {
        nodeToFocus = validNodes[0];
      }
    }

    focusNode(nodeToFocus);

    if (rest.onKeyDown) {
      rest.onKeyDown(event);
    }
  }

  function handleClick(e) {
    if (!clickedElementHasSubnodes(e) && e.target.tagName !== 'UL') {
      onClose();
    } else {
      e.stopPropagation();
    }
  }

  function handleClickOutside(e) {
    if (!clickedElementHasSubnodes(e) && open && canBeClosed && autoclose) {
      onClose();
    }
  }

  function getCorrectedPosition(preferredDirection) {
    const elementRect = rootRef?.current?.element?.getBoundingClientRect();
    const elementDimensions = [elementRect.width, elementRect.height];
    const targetBoundaries = getTargetBoundaries();
    const containerBoundaries = getContainerBoundaries();

    const {
      position: correctedPosition,
      direction: correctedDirection,
    } = getPosition(
      elementDimensions,
      targetBoundaries,
      containerBoundaries,
      preferredDirection
    );

    setDirection(correctedDirection);

    return correctedPosition;
  }

  useEffect(() => {
    setCanBeClosed(false);

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

      setCanBeClosed(true);
    } else {
      setPosition([0, 0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, x, y]);

  const someNodesHaveIcons = React.Children.toArray(children).some(
    (node) => node.type === MenuSelectableItem || node.type === MenuRadioGroup
  );

  const options = React.Children.map(children, (node) => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        indented: someNodesHaveIcons,
        level: level,
      });
    }
  });

  const classes = classnames(`${prefix}--menu`, {
    [`${prefix}--menu--open`]: open,
    [`${prefix}--menu--invisible`]:
      open && position[0] === 0 && position[1] === 0,
    [`${prefix}--menu--root`]: isRootMenu,
  });

  const ulAttributes = {
    className: classes,
    onKeyDown: handleKeyDown,
    onClick: handleClick,
    role: 'menu',
    tabIndex: -1,
    'data-direction': direction,
    'data-level': level,
    style: {
      left: `${position[0]}px`,
      top: `${position[1]}px`,
    },
  };

  let childrenToRender = options;

  // if the only child is a radiogroup, don't render it as radiogroup component, but
  // only the items to prevent duplicate markup
  if (options && options.length === 1 && options[0].type === MenuRadioGroup) {
    const radioGroupProps = options[0].props;

    ulAttributes['aria-label'] = radioGroupProps.label;
    childrenToRender = (
      <MenuRadioGroupOptions
        items={radioGroupProps.items}
        initialSelectedItem={radioGroupProps.initialSelectedItem}
        onChange={radioGroupProps.onChange}
      />
    );
  }

  // if the only child is a generic group, don't render it as group component, but
  // only the children to prevent duplicate markup
  if (options && options.length === 1 && options[0].type === MenuGroup) {
    const groupProps = options[0].props;

    ulAttributes['aria-label'] = groupProps.label;
    childrenToRender = React.Children.toArray(options[0].props.children);
  }

  return (
    <ClickListener onClickOutside={handleClickOutside} ref={rootRef}>
      <ul {...ulAttributes}>{childrenToRender}</ul>
    </ClickListener>
  );
};

Menu.propTypes = {
  /**
   * Whether or not the menu should automatically close when
   * an outside click is registered
   */
  autoclose: PropTypes.bool,

  /**
   * Specify the children of the Menu
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
   * Specify whether the Menu is currently open
   */
  open: PropTypes.bool,

  /**
   * Specify the x position where this menu is rendered
   */
  x: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),

  /**
   * Specify the y position where this menu is rendered
   */
  y: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

export default Menu;

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import { CaretRight16 } from '@carbon/icons-react';
import { keys, match } from '../../internal/keyboard';

import {
  getFirstSubNode,
  focusNode,
  getParentMenu,
  clickedElementHasSubnodes,
} from './_utils';

import ContextMenu from './ContextMenu';

const { prefix } = settings;

const hoverIntentDelay = 150; // in ms

function ContextMenuOptionContent({
  label,
  info,
  disabled,
  icon: Icon,
  indented,
}) {
  const classes = classnames(`${prefix}--context-menu-option__content`, {
    [`${prefix}--context-menu-option__content--disabled`]: disabled,
  });

  return (
    <div className={classes}>
      {indented && (
        <div className={`${prefix}--context-menu-option__icon`}>
          {Icon && <Icon />}
        </div>
      )}
      <span className={`${prefix}--context-menu-option__label`} title={label}>
        {label}
      </span>
      <div className={`${prefix}--context-menu-option__info`}>{info}</div>
    </div>
  );
}

function ContextMenuOption({
  children,
  disabled,
  indented,
  kind = 'default',
  label,
  level,
  onClick = () => {},
  renderIcon,
  shortcut,
  ...rest
}) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [submenuOpenedByKeyboard, setSubmenuOpenedByKeyboard] = useState(false);
  const rootRef = useRef(null);
  const hoverIntentTimeout = useRef(null);

  const subOptions = React.Children.map(children, (node) => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node);
    }
  });

  function openSubmenu(openedByKeyboard = false) {
    setSubmenuOpenedByKeyboard(openedByKeyboard);
    setSubmenuOpen(true);
  }

  function handleKeyDown(event) {
    if (
      clickedElementHasSubnodes(event) &&
      (match(event, keys.ArrowRight) ||
        match(event, keys.Enter) ||
        match(event, keys.Space))
    ) {
      openSubmenu(true);
    } else if (
      (match(event, keys.Enter) || match(event, keys.Space)) &&
      onClick
    ) {
      onClick(event);
    }
  }

  function handleMouseEnter() {
    hoverIntentTimeout.current = setTimeout(openSubmenu, hoverIntentDelay);
  }

  function handleMouseLeave() {
    clearTimeout(hoverIntentTimeout?.current);

    setSubmenuOpen(false);
  }

  function getSubmenuPosition() {
    const pos = [0, 0];

    if (subOptions) {
      const parentMenu = getParentMenu(rootRef?.current);

      if (parentMenu) {
        const { x, width } = parentMenu.getBoundingClientRect();
        const { y } = rootRef.current.getBoundingClientRect();

        pos[0] = x + width;
        pos[1] = y;
      }
    }

    return pos;
  }

  useEffect(() => {
    if (subOptions && submenuOpenedByKeyboard) {
      const firstSubnode = getFirstSubNode(rootRef?.current);
      focusNode(firstSubnode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submenuOpen]);

  const classes = classnames(`${prefix}--context-menu-option`, {
    [`${prefix}--context-menu-option--disabled`]: disabled,
    [`${prefix}--context-menu-option--active`]: subOptions && submenuOpen,
    [`${prefix}--context-menu-option--danger`]:
      !subOptions && kind === 'danger',
  });

  const allowedRoles = ['menuitemradio', 'menuitemcheckbox'];
  const role =
    rest.role && allowedRoles.includes(rest.role) ? rest.role : 'menuitem';

  const submenuPosition = getSubmenuPosition();

  return (
    // role is either menuitemradio, menuitemcheckbox, or menuitem which are all interactive
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      {...rest}
      ref={rootRef}
      className={classes}
      role={role}
      tabIndex={-1}
      aria-disabled={!subOptions && disabled}
      aria-haspopup={subOptions ? true : null}
      aria-expanded={subOptions ? submenuOpen : null}
      onKeyDown={handleKeyDown}
      onMouseEnter={subOptions ? handleMouseEnter : null}
      onMouseLeave={subOptions ? handleMouseLeave : null}
      onClick={onClick}>
      {subOptions ? (
        <>
          <ContextMenuOptionContent
            label={label}
            icon={renderIcon}
            info={<CaretRight16 />}
            indented={indented}
          />
          <ContextMenu
            level={level + 1}
            open={submenuOpen}
            onClose={() => {
              setSubmenuOpen(false);
            }}
            x={submenuPosition[0]}
            y={submenuPosition[1]}>
            {subOptions}
          </ContextMenu>
        </>
      ) : (
        <ContextMenuOptionContent
          label={label}
          disabled={disabled}
          icon={renderIcon}
          info={shortcut}
          indented={indented}
        />
      )}
    </li>
  );
}

ContextMenuOptionContent.propTypes = {
  /**
   * Whether this option is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Icon that is displayed in front of the option
   */
  icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Whether the content should be indented
   */
  indented: PropTypes.bool,

  /**
   * Additional information such as shortcut or caret
   */
  info: PropTypes.node,

  /**
   * Rendered label for the ContextMenuOptionContent
   */
  label: PropTypes.node.isRequired,
};

ContextMenuOption.propTypes = {
  /**
   * Specify the children of the ContextMenuOption
   */
  children: PropTypes.node,

  /**
   * Specify whether this ContextMenuOption is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Whether the content should be indented (for example because it's in a group with options that have icons).
   * Is automatically set by ContextMenu
   */
  indented: PropTypes.bool,

  /**
   * Optional prop to specify the kind of the ContextMenuOption
   */
  kind: PropTypes.oneOf(['default', 'danger']),

  /**
   * Rendered label for the ContextMenuOption
   */
  label: PropTypes.node.isRequired,

  /**
   * Which nested level this option is located in.
   * Is automatically set by ContextMenu
   */
  level: PropTypes.number,

  /**
   * The onClick handler
   */
  onClick: PropTypes.func,

  /**
   * Rendered icon for the ContextMenuOption.
   * Can be a React component class
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Rendered shortcut for the ContextMenuOption
   */
  shortcut: PropTypes.node,
};

export default ContextMenuOption;

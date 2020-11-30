/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';
import { CaretRight16 } from '@carbon/icons-react';
import ContextMenu from './ContextMenu';

const { prefix } = settings;

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
    <button className={classes} type="button" disabled={disabled} tabIndex={-1}>
      {indented && (
        <div className={`${prefix}--context-menu-option__icon`}>
          {Icon && <Icon />}
        </div>
      )}
      <span className={`${prefix}--context-menu-option__label`} title={label}>
        {label}
      </span>
      <div className={`${prefix}--context-menu-option__info`}>{info}</div>
    </button>
  );
}

function ContextMenuOption({
  label,
  children,
  disabled,
  shortcut,
  renderIcon,
  indented,
  level,
  menuX,
  ...rest
}) {
  const subOptions = React.Children.map(children, (node) => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node);
    }
  });

  const classes = classnames(`${prefix}--context-menu-option`, {
    [`${prefix}--context-menu-option--disabled`]: disabled,
  });

  return (
    <li {...rest} className={classes} role="menuitem">
      {subOptions ? (
        <>
          <ContextMenuOptionContent
            label={label}
            icon={renderIcon}
            info={<CaretRight16 />}
            indented={indented}
          />
          <ContextMenu level={level + 1} x={menuX}>
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

  /**
   * Which nested level this option is located in.
   */
  level: PropTypes.number,
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
   * Rendered label for the ContextMenuOption
   */
  label: PropTypes.node.isRequired,

  /**
   * Which nested level this option is located in.
   * Is automatically set by ContextMenu
   */
  level: PropTypes.number,

  /**
   * The x position of the root menu.
   * Is automatically set by ContextMenu
   */
  menuX: PropTypes.number,

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

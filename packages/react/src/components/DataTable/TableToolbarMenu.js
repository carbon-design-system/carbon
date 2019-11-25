/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { settings } from 'carbon-components';
import { Settings16 } from '@carbon/icons-react';
import OverflowMenu from '../OverflowMenu';
import { match, keys } from '../../internal/keyboard';

const { prefix } = settings;

const TableToolbarMenu = ({
  className,
  renderIcon,
  iconDescription,
  children,
  ...rest
}) => {
  const [focused, setFocus] = useState(0);

  useEffect(() => {
    updateMenuFocus();
  });

  const updateMenuFocus = () => {
    const nodes = [
      ...document.querySelectorAll('[data-table-toolbar-focusable]'),
    ];
    if (nodes && focused >= 0 && nodes[focused]) {
      nodes[focused].focus();
    }
  };

  const handleMenuItemFocus = evt => {
    const nodes = [
      ...document.querySelectorAll('[data-table-toolbar-focusable]'),
    ];
    const len = nodes.length;
    if (len > 0 && match(evt, keys.ArrowDown)) {
      setFocus((focused + 1) % len);
    } else if (len > 0 && match(evt, keys.ArrowUp)) {
      setFocus((focused - 1 + len) % len);
    }
  };

  const childrenWithProps = React.Children.toArray(
    React.Children.toArray(children)
  ).map(child =>
    React.cloneElement(child, {
      handleMenuItemFocus,
    })
  );

  const toolbarActionClasses = cx(
    className,
    `${prefix}--toolbar-action ${prefix}--overflow-menu`
  );
  return (
    <OverflowMenu
      renderIcon={renderIcon}
      className={toolbarActionClasses}
      title={iconDescription}
      flipped
      onOpen={updateMenuFocus}
      {...rest}>
      {childrenWithProps}
    </OverflowMenu>
  );
};

TableToolbarMenu.defaultProps = {
  renderIcon: Settings16,
  iconDescription: 'Settings',
};

TableToolbarMenu.propTypes = {
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class name for the toolbar menu
   */
  className: PropTypes.string,

  /**
   * Optional prop to allow overriding the default menu icon
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * The description of the menu icon.
   */
  iconDescription: PropTypes.string.isRequired,
};

export default TableToolbarMenu;

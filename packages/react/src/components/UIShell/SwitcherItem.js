/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import Link from './Link';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';

const SwitcherItem = React.forwardRef(function SwitcherItem(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    children,
    isSelected,
    expanded,
    tabIndex = expanded ? 0 : -1,
    index,
    handleSwitcherItemFocus,
    onKeyDown = () => {},
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const className = cx(`${prefix}--switcher__item`, {
    [customClassName]: !!customClassName,
  });

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  const linkClassName = cx(`${prefix}--switcher__item-link`, {
    [`${prefix}--switcher__item-link--selected`]: isSelected,
  });

  function setTabFocus(evt) {
    if (match(evt, keys.ArrowDown)) {
      evt.preventDefault();
      handleSwitcherItemFocus?.({
        currentIndex: index,
        direction: 1,
      });
    }
    if (match(evt, keys.ArrowUp)) {
      evt.preventDefault();
      handleSwitcherItemFocus?.({
        currentIndex: index,
        direction: -1,
      });
    }
  }

  return (
    <li className={className}>
      <Link
        onKeyDown={(evt) => {
          setTabFocus(evt);
          onKeyDown(evt);
        }}
        {...rest}
        ref={ref}
        className={linkClassName}
        tabIndex={tabIndex}
        {...accessibilityLabel}>
        {children}
      </Link>
    </li>
  );
});

SwitcherItem.displayName = 'SwitcherItem';
SwitcherItem.propTypes = {
  /**
   * Required props for accessibility label on the underlying menuitem
   */
  ...AriaLabelPropType,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * event handlers
   */
  handleSwitcherItemFocus: PropTypes.func,

  /**
   * Specify the index of the SwitcherItem
   */
  index: PropTypes.number,

  /**
   * event handlers
   */
  onKeyDown: PropTypes.func,

  /**
   * Specify the tab index of the Link
   */
  tabIndex: PropTypes.number,
};

export default SwitcherItem;

/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { settings } from 'carbon-components';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

const DropdownItem = ({
  className,
  value,
  isDropdownOpen,
  itemText,
  onClick,
  onKeyPress,
  href,
  selected,
  ...other
}) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The `DropdownItem` component has been deprecated and will be ' +
        'removed in the next major release of `carbon-components-react`. ' +
        'Please use `DropdownV2` instead.'
    );
    didWarnAboutDeprecation = true;
  }

  const dropdownItemClasses = classNames({
    [`${prefix}--dropdown-item`]: true,
    [className]: className,
  });

  const handleClick = () => {
    const info = {
      value,
      itemText,
    };
    onClick(info);
  };

  const handleKeypress = () => {
    const info = {
      value,
      itemText,
    };
    onKeyPress(info);
  };

  return (
    <li
      {...other}
      value={value}
      className={dropdownItemClasses}
      onClick={handleClick}
      onKeyPress={handleKeypress}
      tabIndex={-1}
      aria-selected={selected}
      role="option">
      <a
        tabIndex={isDropdownOpen ? 0 : -1}
        href={href}
        onClick={/* istanbul ignore next */ evt => evt.preventDefault()}
        className={`${prefix}--dropdown-link`}>
        {itemText}
      </a>
    </li>
  );
};

DropdownItem.propTypes = {
  /**
   * Specify the value of the <DropdownItem>
   */
  value: PropTypes.string.isRequired,

  /**
   * Specify the content of the <DropdownItem>
   */
  itemText: PropTypes.string.isRequired,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Provide an optional function to be called when the container node is
   * clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional function to be called when a key is pressed on the <DropdownItem>
   */
  onKeyPress: PropTypes.func,

  /**
   * Optional string representing the link location for the <DropdownItem>
   */
  href: PropTypes.string,

  /**
   * Specify whether the <DropdownItem> is selected
   */
  selected: PropTypes.bool,
};

DropdownItem.defaultProps = {
  onClick: /* istanbul ignore next */ () => {},
  onKeyPress: /* istanbul ignore next */ () => {},
  href: '',
  selected: false,
};

export default DropdownItem;

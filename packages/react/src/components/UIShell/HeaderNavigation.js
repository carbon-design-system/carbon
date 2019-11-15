/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

export default class HeaderNavigation extends React.Component {
  static propTypes = {
    /**
     * Required props for accessibility label on the underlying menu
     */
    ...AriaLabelPropType,

    /**
     * Optionally provide a custom class to apply to the underlying <nav> node
     */
    className: PropTypes.string,

    /**
     * Provide valid children of HeaderNavigation, for example `HeaderMenuItem`
     * or `HeaderMenu`
     */
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.items = [];
    this.state = {
      selectedIndex: 0,
    };
  }

  /**
   * Handles individual menuitem refs. We assign them to a class instance
   * property so that we can properly manage focus of our children.
   */
  handleItemRef = index => node => {
    this.items[index] = node;
  };

  render() {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className: customClassName,
      ...rest
    } = this.props;
    const className = cx(`${prefix}--header__nav`, customClassName);
    // Assign both label strategies in this option, only one should be defined
    // so when we spread that should be the one that is applied to the node
    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };

    return (
      <nav {...rest} {...accessibilityLabel} className={className}>
        <ul
          {...accessibilityLabel}
          className={`${prefix}--header__menu-bar`}
          role="menubar">
          {React.Children.map(children, this._renderNavItem)}
        </ul>
      </nav>
    );
  }

  /**
   * Render an individual menuitem, adding a `ref` for each child inside of
   * `this.items` to properly manage focus.
   */
  _renderNavItem = (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ref: this.handleItemRef(index),
      });
    }
  };
}

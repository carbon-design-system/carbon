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
import SideNavFooter from './SideNavFooter';

const { prefix } = settings;

const translations = {
  'carbon.sidenav.state.open': 'Close',
  'carbon.sidenav.state.closed': 'Open',
};

function translateById(id) {
  return translations[id];
}

export default class SideNav extends React.Component {
  static propTypes = {
    /**
     * Required props for accessibility label on the underlying menu
     */
    ...AriaLabelPropType,

    /**
     * Optionally provide a custom class to apply to the underlying <li> node
     */
    className: PropTypes.string,

    /**
     * Provide a custom function for translating all message ids within this
     * component. This function will take in two arguments: the mesasge Id and the
     * state of the component. From this, you should return a string representing
     * the label you want displayed or read by screen readers.
     */
    translateById: PropTypes.func,
  };

  static defaultProps = {
    translateById,
  };

  state = {
    isExpanded: true,
    isFocused: false,
  };

  handleExpand = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };

  handleFocus = () => {
    this.setState(state => {
      if (!state.isFocused) {
        return { isFocused: true };
      }
      return null;
    });
  };

  handleBlur = () => {
    this.setState(state => {
      if (state.isFocused) {
        return { isFocused: false };
      }
      return null;
    });
  };

  render() {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className: customClassName,
      translateById: t,
    } = this.props;
    const { isExpanded, isFocused } = this.state;
    const accessibilityLabel = {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
    };
    const assistiveText =
      isExpanded || isFocused
        ? t('carbon.sidenav.state.open')
        : t('carbon.sidenav.state.closed');
    const className = cx({
      [`${prefix}--side-nav`]: true,
      [`${prefix}--side-nav--expanded`]: isExpanded || isFocused,
      [customClassName]: !!customClassName,
    });

    return (
      <nav
        className={`${prefix}--side-nav__navigation ${className}`}
        {...accessibilityLabel}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}>
        {children}
        <SideNavFooter
          assistiveText={assistiveText}
          isExpanded={isExpanded}
          onToggle={this.handleExpand}
        />
      </nav>
    );
  }
}

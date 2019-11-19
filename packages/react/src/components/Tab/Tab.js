/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import TabContent from '../TabContent';

const { prefix } = settings;

export default class Tab extends React.Component {
  static propTypes = {
    /**
     * Specify an optional className to be added to your Tab
     */
    className: PropTypes.string,

    /**
     * A handler that is invoked when a user clicks on the control.
     * Reserved for usage in Tabs
     */
    handleTabClick: PropTypes.func,

    /**
     * A handler that is invoked when a user presses left/right key.
     * Reserved for usage in Tabs
     */
    handleTabAnchorFocus: PropTypes.func,

    /**
     * A handler that is invoked on the key down event for the control.
     * Reserved for usage in Tabs
     */
    handleTabKeyDown: PropTypes.func,

    /**
     * Whether your Tab is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * Provide a string that represents the `href` of the Tab
     */
    href: PropTypes.string.isRequired,

    /**
     * The index of your Tab in your Tabs. Reserved for usage in Tabs
     */
    index: PropTypes.number,

    /**
     * Provide the contents of your Tab
     */
    label: PropTypes.node,

    /**
     * Provide an accessibility role for your Tab
     */
    role: PropTypes.string.isRequired,

    /**
     * Provide a handler that is invoked when a user clicks on the control
     */
    onClick: PropTypes.func.isRequired,

    /**
     * Provide a handler that is invoked on the key down event for the control
     */
    onKeyDown: PropTypes.func.isRequired,

    /**
     * Whether your Tab is selected.
     * Reserved for usage in Tabs
     */
    selected: PropTypes.bool.isRequired,

    /**
     * Specify the tab index of the <a> node
     */
    tabIndex: PropTypes.number.isRequired,

    /*
     * An optional parameter to allow overriding the anchor rendering.
     * Useful for using Tab along with react-router or other client
     * side router libraries.
     **/
    renderAnchor: PropTypes.func,

    /*
     * An optional parameter to allow overriding the content rendering.
     **/
    renderContent: PropTypes.func,
  };

  static defaultProps = {
    role: 'presentation',
    label: 'provide a label',
    tabIndex: 0,
    href: '#',
    selected: false,
    renderContent: TabContent,
    onClick: () => {},
    onKeyDown: () => {},
  };

  setTabFocus(evt) {
    const leftKey = 37;
    const rightKey = 39;
    if (evt.which === leftKey) {
      this.props.handleTabAnchorFocus(this.props.index - 1);
    } else if (evt.which === rightKey) {
      this.props.handleTabAnchorFocus(this.props.index + 1);
    } else {
      return;
    }
  }

  render() {
    const {
      className,
      handleTabClick,
      handleTabAnchorFocus, // eslint-disable-line
      handleTabKeyDown,
      disabled,
      href,
      index,
      label,
      selected,
      tabIndex,
      onClick,
      onKeyDown,
      renderAnchor,
      renderContent, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = classNames(className, `${prefix}--tabs__nav-item`, {
      [`${prefix}--tabs__nav-item--disabled`]: disabled,
      [`${prefix}--tabs__nav-item--selected`]: selected,
    });

    const anchorProps = {
      className: `${prefix}--tabs__nav-link`,
      href,
      role: 'tab',
      tabIndex: !disabled ? tabIndex : -1,
      ['aria-selected']: selected,
      ['aria-disabled']: disabled,
      ref: e => {
        this.tabAnchor = e;
      },
    };

    return (
      <li
        {...other}
        tabIndex={-1}
        className={classes}
        onClick={evt => {
          if (disabled) {
            return;
          }
          handleTabClick(index, evt);
          onClick(evt);
        }}
        onKeyDown={evt => {
          if (disabled) {
            return;
          }
          this.setTabFocus(evt);
          handleTabKeyDown(index, evt);
          onKeyDown(evt);
        }}
        role="presentation"
        selected={selected}>
        {renderAnchor ? (
          renderAnchor(anchorProps)
        ) : (
          <a {...anchorProps}>{label}</a>
        )}
      </li>
    );
  }
}

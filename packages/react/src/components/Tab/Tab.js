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
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;
export default class Tab extends React.Component {
  static propTypes = {
    /**
     * Specify an optional className to be added to your Tab
     */
    className: PropTypes.string,

    /**
     * Whether your Tab is disabled.
     */
    disabled: PropTypes.bool,

    /**
     * A handler that is invoked when a user clicks on the control.
     * Reserved for usage in Tabs
     */
    handleTabClick: PropTypes.func,

    /**
     * A handler that is invoked on the key down event for the control.
     * Reserved for usage in Tabs
     */
    handleTabKeyDown: PropTypes.func,

    /**
     * Provide a string that represents the `href` of the Tab
     */
    href: deprecate(PropTypes.string),

    /**
     * The element ID for the top-level element.
     */
    id: PropTypes.string,

    /**
     * The index of your Tab in your Tabs. Reserved for usage in Tabs
     */
    index: PropTypes.number,

    /**
     * Provide the contents of your Tab
     */
    label: PropTypes.node,

    /**
     * Provide a handler that is invoked when a user clicks on the control
     */
    onClick: PropTypes.func.isRequired,

    /**
     * Provide a handler that is invoked on the key down event for the control
     */
    onKeyDown: PropTypes.func.isRequired,

    /*
     * An optional parameter to allow overriding the anchor rendering.
     * Useful for using Tab along with react-router or other client
     * side router libraries.
     **/
    renderAnchor: deprecate(PropTypes.func),
    renderButton: PropTypes.func,

    /*
     * An optional parameter to allow overriding the content rendering.
     **/
    renderContent: PropTypes.func,

    /**
     * Provide an accessibility role for your Tab
     */
    role: deprecate(PropTypes.string),

    /**
     * Whether your Tab is selected.
     * Reserved for usage in Tabs
     */
    selected: PropTypes.bool.isRequired,

    /**
     * Specify the tab index of the `<button>` node
     */
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    label: 'provide a label',
    selected: false,
    onClick: () => {},
    onKeyDown: () => {},
  };

  render() {
    const {
      id,
      className,
      handleTabClick,
      handleTabKeyDown,
      disabled,
      href = '#',
      index,
      label,
      selected,
      tabIndex = 0,
      onClick,
      onKeyDown,
      // TODO: rename renderAnchor to renderButton in next major version
      renderAnchor,
      renderButton,
      renderContent, // eslint-disable-line no-unused-vars
      role, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = classNames(
      className,
      // TODO: remove scrollable in next major release
      // `${prefix}--tabs__nav-item`,
      `${prefix}--tabs--scrollable__nav-item`,
      {
        [`${prefix}--tabs__nav-item--disabled`]: disabled,
        [`${prefix}--tabs__nav-item--selected`]: selected,
        // TODO: remove scrollable in next major release
        [`${prefix}--tabs--scrollable__nav-item--disabled`]: disabled,
        [`${prefix}--tabs--scrollable__nav-item--selected`]: selected,
      }
    );

    const buttonProps = {
      ['aria-selected']: selected,
      ['aria-disabled']: disabled,
      ['aria-controls']: id && `${id}__panel`,
      id,
      // TODO: remove scrollable in next major release
      // className:  `${prefix}--tabs__nav-link`,
      className: `${prefix}--tabs--scrollable__nav-link`,
      href,
      tabIndex: !disabled ? tabIndex : -1,
      ref: (e) => {
        this.tabAnchor = e;
      },
    };

    const renderElement = renderButton || renderAnchor;

    return (
      <li
        {...other}
        className={classes}
        onClick={(evt) => {
          if (disabled) {
            return;
          }
          if (handleTabClick) {
            handleTabClick(index, evt);
          }
          onClick(evt);
        }}
        onKeyDown={(evt) => {
          if (disabled) {
            return;
          }
          if (handleTabKeyDown) {
            handleTabKeyDown(index, evt);
          }
          onKeyDown(evt);
        }}
        role="presentation">
        {renderElement ? (
          renderElement(buttonProps)
        ) : (
          <button type="button" role="tab" {...buttonProps}>
            {label}
          </button>
        )}
      </li>
    );
  }
}

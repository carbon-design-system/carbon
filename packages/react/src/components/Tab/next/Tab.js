/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import deprecate from '../../../prop-types/deprecate';
import { usePrefix } from '../../../internal/usePrefix';

const Tab = React.forwardRef(function Tab(
  {
    className,
    disabled,
    handleTabClick,
    handleTabKeyDown,
    id,
    index,
    label = 'provide a label',
    onClick = () => {},
    onKeyDown = () => {},
    renderButton,
    renderContent, // eslint-disable-line no-unused-vars
    selected = false,
    tabIndex = 0,
    ...other
  },
  ref
) {
  const prefix = usePrefix();

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
    tabIndex: !disabled ? tabIndex : -1,
    ref: ref,
  };

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
      {renderButton ? (
        renderButton(buttonProps)
      ) : (
        <button type="button" role="tab" {...buttonProps}>
          {label}
        </button>
      )}
    </li>
  );
});

Tab.propTypes = {
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
  href: deprecate(
    PropTypes.string,
    'The href prop has been deprecated and removed in v11.'
  ),

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
  onClick: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the control
   */
  onKeyDown: PropTypes.func,

  /*
   * An optional parameter to allow overriding the anchor rendering.
   * Useful for using Tab along with react-router or other client
   * side router libraries.
   **/
  renderAnchor: deprecate(
    PropTypes.func,
    'The renderAnchor prop has been deprecated in favor of renderButton. It has been removed in v11.'
  ),
  renderButton: PropTypes.func,

  /*
   * An optional parameter to allow overriding the content rendering.
   **/
  renderContent: PropTypes.func,

  /**
   * Provide an accessibility role for your Tab
   */
  role: deprecate(
    PropTypes.string,
    'The role prop has been deprecated and removed in v11. Role is now built into the element.'
  ),

  /**
   * Whether your Tab is selected.
   * Reserved for usage in Tabs
   */
  selected: PropTypes.bool,

  /**
   * Specify the tab index of the `<button>` node
   */
  tabIndex: PropTypes.number,
};

export default Tab;

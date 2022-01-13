/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import deprecate from '../../prop-types/deprecate';
import { composeEventHandlers } from '../../tools/events';
import { getNextIndex, matches, keys } from '../../internal/keyboard';
import { PrefixContext } from '../../internal/usePrefix';

export default class ContentSwitcher extends React.Component {
  /**
   * The DOM references of child `<Switch>`.
   * @type {Array<Element>}
   * @private
   */
  _switchRefs = [];

  state = {};

  static propTypes = {
    /**
     * Pass in Switch components to be rendered in the ContentSwitcher
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be added to the container node
     */
    className: PropTypes.string,

    /**
     * `true` to use the light variant.
     */
    light: deprecate(
      PropTypes.bool,
      'The `light` prop for `ContentSwitcher` is no longer needed and has ' +
        'been deprecated. It will be removed in the next major release.'
    ),

    /**
     * Specify an `onChange` handler that is called whenever the ContentSwitcher
     * changes which item is selected
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Specify a selected index for the initially selected content
     */
    selectedIndex: PropTypes.number,

    /**
     * Choose whether or not to automatically change selection on focus
     */
    selectionMode: PropTypes.oneOf(['automatic', 'manual']),

    /**
     * Specify the size of the Content Switcher. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
     * TODO V11: remove `xl` (replaced with lg)
     */
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  };

  static contextType = PrefixContext;

  static defaultProps = {
    selectedIndex: 0,
    selectionMode: 'automatic',
    onChange: () => {},
  };

  static getDerivedStateFromProps({ selectedIndex }, state) {
    const { prevSelectedIndex } = state;
    return prevSelectedIndex === selectedIndex
      ? null
      : {
          selectedIndex,
          prevSelectedIndex: selectedIndex,
        };
  }

  handleItemRef = (index) => (ref) => {
    this._switchRefs[index] = ref;
  };

  handleChildChange = (data) => {
    const { selectionMode } = this.props;
    // the currently selected child index
    const { selectedIndex } = this.state;
    // the newly selected child index
    const { index } = data;
    const { key } = data;

    if (matches(data, [keys.ArrowRight, keys.ArrowLeft])) {
      const nextIndex = getNextIndex(key, index, this.props.children.length);
      const children = React.Children.toArray(this.props.children);
      if (selectionMode === 'manual') {
        const switchRef = this._switchRefs[nextIndex];
        switchRef && switchRef.focus();
      } else {
        this.setState(
          {
            selectedIndex: nextIndex,
          },
          () => {
            const child = children[this.state.selectedIndex];
            const switchRef = this._switchRefs[this.state.selectedIndex];
            switchRef && switchRef.focus();
            this.props.onChange({
              ...data,
              index: this.state.selectedIndex,
              name: child.props.name,
              text: child.props.text,
            });
          }
        );
      }
    } else if (selectedIndex !== index) {
      this.setState({ selectedIndex: index }, () => {
        const switchRef = this._switchRefs[index];
        switchRef && switchRef.focus();
        this.props.onChange(data);
      });
    }
  };

  render() {
    const prefix = this.context;
    const {
      children,
      className,
      light,
      selectedIndex, // eslint-disable-line no-unused-vars
      selectionMode, // eslint-disable-line no-unused-vars
      size,
      ...other
    } = this.props;

    const classes = classNames(`${prefix}--content-switcher`, className, {
      [`${prefix}--content-switcher--light`]: light,
      [`${prefix}--content-switcher--${size}`]: size,
    });

    return (
      <div {...other} className={classes} role="tablist">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            index,
            onClick: composeEventHandlers([
              this.handleChildChange,
              child.props.onClick,
            ]),
            onKeyDown: this.handleChildChange,
            selected: index === this.state.selectedIndex,
            ref: this.handleItemRef(index),
          })
        )}
      </div>
    );
  }
}

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
import { composeEventHandlers } from '../../tools/events';

const { prefix } = settings;

export default class ContentSwitcher extends React.Component {
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
     * Specify an `onChange` handler that is called whenever the ContentSwitcher
     * changes which item is selected
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Specify a selected index for the initially selected content
     */
    selectedIndex: PropTypes.number,
  };

  static defaultProps = {
    selectedIndex: 0,
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

  getChildren(children) {
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        index,
        onClick: composeEventHandlers([
          this.handleChildChange,
          child.props.onClick,
        ]),
        onKeyDown: this.handleChildChange,
        selected: index === this.state.selectedIndex,
      })
    );
  }

  handleChildChange = data => {
    const { selectedIndex } = this.state;
    const { index } = data;

    if (selectedIndex !== index) {
      this.setState({ selectedIndex: index });
      this.props.onChange(data);
    }
  };

  render() {
    const {
      children,
      className,
      selectedIndex, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const classes = classNames(`${prefix}--content-switcher`, className);

    return (
      <div {...other} className={classes}>
        {this.getChildren(children)}
      </div>
    );
  }
}

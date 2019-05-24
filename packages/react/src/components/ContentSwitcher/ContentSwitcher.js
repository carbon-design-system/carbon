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
import { match, keys } from '../../tools/key';

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

  static totalNumberOfChildren;

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

  handleOnKeyDown = (key, index) => {
    const lastChild = this.totalNumberOfChildren - 1;
    const firstChild = this.totalNumberOfChildren - this.totalNumberOfChildren;

    // if they hit ArrowRight on the last child loop back around to the first child
    if (key === 'ArrowRight') {
      return index === lastChild ? firstChild : index + 1;
    }

    // if they hit ArrowLeft on the first child loop around to the last child
    if (key === 'ArrowLeft') {
      return index === firstChild ? lastChild : index - 1;
    }
  };

  handleChildChange = data => {
    // BUG: The state is being updated but the data being passed back from the child is staying the same
    // so our stying isn't being updated fully

    // the currently selected child index
    const { selectedIndex } = this.state;
    // the newly selected child index
    const { index } = data;
    const { key } = data;

    if (key) {
      this.setState({
        selectedIndex: this.handleOnKeyDown(key, selectedIndex),
      });
    } else {
      if (selectedIndex !== index) {
        this.setState({ selectedIndex: index });
      }
    }

    console.log('data', data);
    console.log('state', this.state);
    this.props.onChange(data);
  };

  render() {
    const {
      children,
      className,
      selectedIndex, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;
    const classes = classNames(`${prefix}--content-switcher`, className);
    this.totalNumberOfChildren = this.props.children.length;

    return (
      <div {...other} className={classes}>
        {this.getChildren(children)}
      </div>
    );
  }
}

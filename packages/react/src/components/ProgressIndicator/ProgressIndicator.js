/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

import OriginalProgressStep from './ProgressStep';

import { useDeprecatedImport } from '../../internal/useDeprecatedImport';

export const ProgressStep = (props) => {
  useDeprecatedImport(
    'Import ProgressStep from ProgressIndicator/ProgressIndicator is deprecated and it will be removed in the next major version. Please use ProgressIndicator/ProgressStep.'
  );

  return <OriginalProgressStep {...props} />;
};

const { prefix } = settings;

export class ProgressIndicator extends Component {
  state = {};

  static propTypes = {
    /**
     * Provide <ProgressStep> components to be rendered in the
     * <ProgressIndicator>
     */
    children: PropTypes.node,

    /**
     * Provide an optional className to be applied to the containing node
     */
    className: PropTypes.string,

    /**
     * Optionally specify the current step array index
     */
    currentIndex: PropTypes.number,

    /**
     * Optional callback called if a ProgressStep is clicked on.  Returns the index of the step.
     */
    onChange: PropTypes.func,

    /**
     * Specify whether the progress steps should be split equally in size in the div
     */
    spaceEqually: PropTypes.bool,
    /**
     * Determines whether or not the ProgressIndicator should be rendered vertically.
     */
    vertical: PropTypes.bool,
  };

  static defaultProps = {
    currentIndex: 0,
  };

  static getDerivedStateFromProps({ currentIndex }, state) {
    const { prevCurrentIndex } = state;
    return prevCurrentIndex === currentIndex
      ? null
      : {
          currentIndex,
          prevCurrentIndex: currentIndex,
        };
  }

  renderSteps = () => {
    const { onChange } = this.props;

    return React.Children.map(this.props.children, (child, index) => {
      // only setup click handlers if onChange event is passed
      const onClick = onChange ? () => onChange(index) : undefined;
      if (index === this.state.currentIndex) {
        return React.cloneElement(child, {
          current: true,
          index,
          onClick,
        });
      }
      if (index < this.state.currentIndex) {
        return React.cloneElement(child, {
          complete: true,
          index,
          onClick,
        });
      }
      if (index > this.state.currentIndex) {
        return React.cloneElement(child, {
          complete: false,
          index,
          onClick,
        });
      }
      return null;
    });
  };

  render() {
    const {
      className,
      currentIndex, // eslint-disable-line no-unused-vars
      vertical,
      spaceEqually,
      ...other
    } = this.props;
    const classes = classnames({
      [`${prefix}--progress`]: true,
      [`${prefix}--progress--vertical`]: vertical,
      [`${prefix}--progress--space-equal`]: spaceEqually && !vertical,
      [className]: className,
    });
    return (
      <ul className={classes} {...other}>
        {this.renderSteps()}
      </ul>
    );
  }
}

export default ProgressIndicator;

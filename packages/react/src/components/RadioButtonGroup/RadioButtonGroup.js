/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import RadioButton from '../RadioButton';
import warning from 'warning';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class RadioButtonGroup extends React.Component {
  state = { selected: this.props.valueSelected || this.props.defaultSelected };

  static propTypes = {
    /**
     * Provide a collection of <RadioButton> components to render in the group
     */
    children: PropTypes.node,

    /**
     * Provide an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify the <RadioButton> to be selected by default
     */
    defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Provide where radio buttons should be placed
     */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),

    /**
     * Provide where label text should be placed
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),

    /**
     * Specify the name of the underlying <input> nodes
     */
    name: PropTypes.string.isRequired,

    /**
     * Specify whether the group is disabled
     */
    disabled: PropTypes.bool,

    /**
     * Provide an optional `onChange` hook that is called whenever the value of
     * the group changes
     */
    onChange: PropTypes.func,

    /**
     * Specify the value that is currently selected in the group
     */
    valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    orientation: 'horizontal',
    labelPosition: 'right',
    onChange: /* istanbul ignore next */ () => {},
  };

  static getDerivedStateFromProps({ valueSelected, defaultSelected }, state) {
    const { prevValueSelected } = state;
    return prevValueSelected === valueSelected
      ? null
      : {
          selected: valueSelected || defaultSelected,
          prevValueSelected: valueSelected,
        };
  }

  getRadioButtons = () => {
    const children = React.Children.map(this.props.children, radioButton => {
      const { value, ...other } = radioButton.props;
      /* istanbul ignore if */
      if (radioButton.props.hasOwnProperty('checked')) {
        warning(
          false,
          `Instead of using the checked property on the RadioButton, set
            the defaultSelected property or valueSelected property on the RadioButtonGroup.`
        );
      }

      return (
        <RadioButton
          {...other}
          name={this.props.name}
          key={value}
          value={value}
          onChange={this.handleChange}
          checked={value === this.state.selected}
        />
      );
    });

    return children;
  };

  handleChange = (newSelection, value, evt) => {
    if (newSelection !== this.state.selected) {
      this.setState({ selected: newSelection });
      this.props.onChange(newSelection, this.props.name, evt);
    }
  };

  render() {
    const { disabled, className, orientation, labelPosition } = this.props;

    const wrapperClasses = classNames(
      `${prefix}--radio-button-group`,
      className,
      {
        [`${prefix}--radio-button-group--${orientation}`]:
          orientation === 'vertical',
        [`${prefix}--radio-button-group--label-${labelPosition}`]: labelPosition,
      }
    );

    return (
      <div className={`${prefix}--form-item`}>
        <div className={wrapperClasses} disabled={disabled}>
          {this.getRadioButtons()}
        </div>
      </div>
    );
  }
}

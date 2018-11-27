import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import uid from '../../tools/uniqueId';

const { prefix } = settings;

export default class RadioButton extends React.Component {
  static propTypes = {
    /**
     * Specify whether the <RadioButton> is currently checked
     */
    checked: PropTypes.bool,

    /**
     * Provide an optional className to be applied to the containing node
     */
    className: PropTypes.string,

    /**
     * Specify whether the <RadioButton> should be checked by default
     */
    defaultChecked: PropTypes.bool,

    /**
     * Specify whether the control is disabled
     */
    disabled: PropTypes.bool,

    /**
     * Provide a unique id for the underlying <input> node
     */
    id: PropTypes.string,

    /**
     * Provide label text to be read by screen readers when interacting with the
     * control
     */
    labelText: PropTypes.node.isRequired,

    /**
     * Provide a name for the underlying <input> node
     */
    name: PropTypes.string,

    /**
     * Provide an optional `onChange` hook that is called each time the value of
     * the underlying <input> changes
     */
    onChange: PropTypes.func,

    /**
     * Specify the value of the <RadioButton>
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  static defaultProps = {
    onChange: () => {},
  };

  UNSAFE_componentWillMount() {
    this.uid = this.props.id || uid();
  }

  handleChange = evt => {
    this.props.onChange(this.props.value, this.props.name, evt);
  };

  render() {
    const wrapperClasses = classNames(
      'radioButtonWrapper',
      this.props.className
    );

    const { labelText, ...other } = this.props;

    return (
      <div className={wrapperClasses}>
        <input
          {...other}
          type="radio"
          className={`${prefix}--radio-button`}
          onChange={this.handleChange}
          id={this.uid}
        />
        <label htmlFor={this.uid} className={`${prefix}--radio-button__label`}>
          <span className={`${prefix}--radio-button__appearance`} />
          {labelText}
        </label>
      </div>
    );
  }
}

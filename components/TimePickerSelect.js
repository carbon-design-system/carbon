import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

export default class TimePickerSelect extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    inline: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
    iconDescription: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    inline: true,
    iconDescription: 'open list of options',
  };

  render() {
    const {
      id,
      disabled,
      children,
      iconDescription,
      className,
      inline, // eslint-disable-line
      ...other
    } = this.props;

    const selectClasses = classNames({
      'bx--select': true,
      'bx--time-picker__select': true,
      'bx--select--inline': true,
      [className]: className,
    });

    return (
      <div className={selectClasses}>
        <select
          {...other}
          id={id}
          className="bx--select-input"
          disabled={disabled}
        >
          {children}
        </select>
        <Icon
          name="caret--down"
          className="bx--select__arrow"
          description={iconDescription}
        />
      </div>
    );
  }
}

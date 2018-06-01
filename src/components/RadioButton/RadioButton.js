import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uid from '../../tools/uniqueId';

export default class RadioButton extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
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
          className="bx--radio-button"
          onChange={this.handleChange}
          id={this.uid}
        />
        <label htmlFor={this.uid} className="bx--radio-button__label">
          <span className="bx--radio-button__appearance" />
          {labelText}
        </label>
      </div>
    );
  }
}

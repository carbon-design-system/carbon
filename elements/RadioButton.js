import React from 'react';
import classNames from 'classnames';
import InternalSwitch from '../internal/InternalSwitch';
import '@console/bluemix-components/consumables/scss/base-elements/radio/radio.scss';

class RadioButton extends React.Component {

  static propTypes = {
    checked: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onCheck: React.PropTypes.func,
    value: React.PropTypes.any,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    labelText: React.PropTypes.string,
  };

  static defaultProps = {
    checked: false,
    disabled: false,
  };

  setChecked(newCheckedValue) {
    this.refs.internalSwitch.setSwitched(newCheckedValue);
  }

  getValue() {
    return this.refs.internalSwitch.getValue();
  }

  isChecked() {
    return this.refs.internalSwitch.isSwitched();
  }

  handleSwitch = (event) => {
    if (this.props.onCheck) {
      this.props.onCheck(event, this.props.value);
    }
  };

  render() {
    const radioButtonClasses = classNames({
      'bx--radio': true,
      [this.props.className]: this.props.className,
    });

    const {
      checked,
      onCheck, // eslint-disable-line no-unused-vars
      disabled,
      labelText,
      id,
      ...other,
    } = this.props;

    return (
      <div className="radioButtonWrapper">
        <InternalSwitch
          {...other}
          ref="internalSwitch"
          className={radioButtonClasses}
          inputType="radio"
          checked={checked}
          switched={checked}
          disabled={disabled}
          onSwitch={this.handleSwitch}
          id={id}
        />
        <label htmlFor={id} className="bx--radio__label">
          <span className="bx--radio__appearance"></span>
          {labelText}
        </label>
      </div>
    );
  }
}

export default RadioButton;

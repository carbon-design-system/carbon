import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import InternalSwitch from '../internal/InternalSwitch';
import '@console/bluemix-components/consumables/scss/base-elements/checkbox/checkbox.scss';


class Checkbox extends Component {

  static propTypes = {
    checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    labelText: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  }

  static defaultProps = {
    className: 'bx--checkbox__label',
    disabled: false,
  }

  state = {
    switched: this.props.checked || false,
  };

  handleCheck = () => {
    this.setState({
      switched: !(this.state.switched),
    });
  };

  handleFocus = (evt) => {
    if (!this.state.disabled) {
      this.props.onClick(evt);
    }
  }

  handleFocus = (evt) => {
    if (!this.state.disabled) {
      this.setState({
        focus: true,
      });
      this.props.onFocus(evt);
    }
  }

  handleBlur = (evt) => {
    if (!this.state.disabled) {
      this.setState({
        focus: false,
      });
      this.props.onBlur(evt);
    }
  }

  render() {
    const {
      className,
      checked,
      id,
      labelText,
      ...other,
    } = this.props;

    const props = {
      id,
      checked: this.state.switched,
      ref: 'internalSwitch',
      inputType: 'checkbox',
      switched: this.state.switched,
      onSwitch: this.handleCheck,
      onParentShouldUpdate: this.handleStateChange,
    };

    const checkboxClasses = classNames({
      'bx--checkbox bx--checkbox--svg': true,
      [this.props.className]: className,
    });

    return (
      <label htmlFor={id} className="bx--checkbox__label">
        <InternalSwitch checked={checked} className={checkboxClasses} {...props} {...other} />
        <span className="bx--checkbox__appearance">
          <Icon className="bx--checkbox__checkmark" name="check-padding" />
        </span>
        <span className="bx--checkbox__label-text">{labelText}</span>
      </label>
        );
  }
}

export default Checkbox;

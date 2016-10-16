import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import '@console/bluemix-components/consumables/scss/base-elements/checkbox/checkbox.scss';

class Checkbox extends Component {

  static propTypes = {
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => { },
  };

  handleChange = (evt) => {
    this.props.onChange(this.input.checked, this.props.id, evt);
  };

  render() {
    const {
      className,
      id,
      labelText,
      ...other,
    } = this.props;

    const wrapperClasses = classNames(
      'bx--checkbox__label',
      className,
    );

    return (
      <label htmlFor={id} className={wrapperClasses}>
        <input
          {...other}
          type="checkbox"
          onChange={this.handleChange}
          className="bx--checkbox bx--checkbox--svg"
          id={id}
          ref={el => { this.input = el; }}
        />

        <span className="bx--checkbox__appearance">
          <Icon
            className="bx--checkbox__checkmark"
            description="checkmark"
            name="check-padding"
          />
        </span>
        <span className="bx--checkbox__label-text">{labelText}</span>
      </label>
    );
  }
}

export default Checkbox;

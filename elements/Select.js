import React from 'react';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/base-elements/select/select.scss';
import '@console/bluemix-components/consumables/scss/base-elements/forms/forms.scss';

class Select extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    value: React.PropTypes.any,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    labelText: React.PropTypes.string,
    placeholderText: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
  };

  render() {
    const selectClasses = classNames({
      'bx--select': true,
      [this.props.className]: this.props.className,
    });

    const {
      id,
      value,
      children,
      labelText,
      disabled,
      ...other,
    } = this.props;

    return (
      <div className={selectClasses}>
        <label htmlFor={id} className="bx--form__label">{labelText}</label>
        <select
          {...other}
          id={id}
          defaultValue={value}
          className="bx--select__input"
          defaultValue="placeholder-item"
          disabled={disabled}
        >
          {children}
        </select>
        <Icon name="down-arrow" className="bx--select__arrow" fill="#5aaafa" />
      </div>
    );
  }
}

export default Select;

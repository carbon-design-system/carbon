import React from 'react';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/base-elements/select/select.scss';
import '@console/bluemix-components/consumables/scss/base-elements/forms/forms.scss';

class Select extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    labelText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    defaultValue: React.PropTypes.any,
  };

  static defaultProps = {
    disabled: false,
    labelText: 'Select',
  };

  render() {
    const selectClasses = classNames({
      'bx--select': true,
      [this.props.className]: this.props.className,
    });

    const {
      id,
      labelText,
      disabled,
      children,
      ...other,
    } = this.props;

    return (
      <div className={selectClasses}>
        <label htmlFor={id} className="bx--form__label">{labelText}</label>
        <select
          {...other}
          id={id}
          className="bx--select__input"
          disabled={disabled}
        >
          {children}
        </select>
        <Icon name="down-arrow" className="bx--select__arrow" description="select-arrow" fill="#5aaafa" />
      </div>
    );
  }
}

export default Select;

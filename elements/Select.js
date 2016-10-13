import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/base-elements/select/select.scss';
import '@console/bluemix-components/consumables/scss/base-elements/forms/forms.scss';

class Select extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.any,
    iconDescription: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    labelText: 'Select',
    iconDescription: 'open list of options',
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
      iconDescription,
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
        <Icon name="down-arrow" className="bx--select__arrow" fill="#5aaafa" description={iconDescription} />
      </div>
    );
  }
}

export default Select;

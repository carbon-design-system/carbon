import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/select/select.scss';

class SelectItem extends React.Component {

  static propTypes = {
    value: React.PropTypes.any.isRequired,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    text: React.PropTypes.string.isRequired,
  };

  static defaultProps = {
    disabled: false,
    hidden: false,
    value: '',
    text: '',
  };

  render() {
    const selectItemClasses = classNames({
      'bx--select__option': true,
      [this.props.className]: this.props.className,
    });

    const {
      value,
      disabled,
      hidden,
      text,
      ...other,
    } = this.props;

    return (
      <option
        {...other}
        className={selectItemClasses}
        value={value}
        disabled={disabled}
        hidden={hidden}
      >{text}
      </option>
    );
  }
}

export default SelectItem;

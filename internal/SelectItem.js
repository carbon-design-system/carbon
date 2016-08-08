import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/select/select.scss';

class SelectItem extends React.Component {

  static propTypes = {
    value: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    selectItemText: React.PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    hidden: false,
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
      selectItemText,
      ...other,
    } = this.props;

    return (
      <option
        {...other}
        className={selectItemClasses}
        value={value}
        disabled={disabled}
        hidden={hidden}
      >{selectItemText}
      </option>
    );
  }
}

export default SelectItem;

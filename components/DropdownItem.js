import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/dropdown/dropdown.scss';

class DropdownItem extends React.Component {

  static propTypes = {
    value: React.PropTypes.string.isRequired,
    itemText: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {},
  };

  handleClick = () => {
    const info = {
      value: this.props.value,
      itemText: this.props.itemText,
    };
    this.props.onClick(info);
  }

  render() {
    const {
      value,
      itemText,
      ...other,
    } = this.props;

    const dropdownItemClasses = classNames({
      'bx--dropdown__list-item': true,
      [this.props.className]: this.props.className,
    });

    return (
      <li
        {...other}
        value={value}
        className={dropdownItemClasses}
        onClick={this.handleClick}
      >
        <a className="bx--dropdown__link">{itemText}</a>
      </li>
    );
  }
}

export default DropdownItem;

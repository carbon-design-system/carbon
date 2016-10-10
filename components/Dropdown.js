import React from 'react';
import classNames from 'classnames';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/components/dropdown/dropdown.scss';

class Dropdown extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    defaultText: React.PropTypes.string,
    value: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    selectedText: React.PropTypes.string,
    open: React.PropTypes.bool,
  }

  static defaultProps = {
    tabIndex: 0,
    open: false,
  }

  state = {
    open: this.props.open,
    selectedText: this.props.defaultText,
    value: '',
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }

  handleItemClick = (info) => {
    this.props.onChange(info);
    this.setState({
      selectedText: info.itemText,
      value: info.value,
    });
  };

  render() {
    const {
      tabIndex,
      defaultText, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        onClick: this.handleItemClick,
      })
    );

    const dropdownClasses = classNames({
      'bx--dropdown': true,
      'bx--dropdown--open': this.state.open,
      [this.props.className]: this.props.className,
    });

    const dropdown = (
      <ul
        {...other}
        onClick={this.handleClick}
        value={this.state.value}
        className={dropdownClasses}
        tabIndex={tabIndex}
      >
        <li className="bx--dropdown__menu-text">{this.state.selectedText}</li>
        <Icon name="down-arrow" className="bx--dropdown__arrow" fill="#5aaafa" />
        <li>
          <ul className="bx--dropdown__list">
              {children}
          </ul>
        </li>
      </ul>
    );

    return dropdown;
  }
}

export default Dropdown;

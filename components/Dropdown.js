import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import '@console/bluemix-components/consumables/scss/components/dropdown/dropdown.scss';

class Dropdown extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    defaultText: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    selectedText: PropTypes.string,
    open: PropTypes.bool,
    iconDescription: PropTypes.string,
  }

  static defaultProps = {
    tabIndex: 0,
    open: false,
    iconDescription: 'open list of options',
    onChange: () => {},
  }

  state = {
    open: this.props.open,
    selectedText: this.props.defaultText,
    value: '',
  };

  toggle = (evt) => {
    // Open on click, enter, or space
    if (evt.which === 13 || evt.which === 32 || evt.type === 'click') {
      this.setState({ open: !this.state.open });
    }
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
      iconDescription,
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
        onClick={this.toggle}
        onKeyPress={this.toggle}
        value={this.state.value}
        className={dropdownClasses}
        tabIndex={tabIndex}
      >
        <li className="bx--dropdown__menu-text">{this.state.selectedText}</li>
        <Icon name="down-arrow" className="bx--dropdown__arrow" fill="#5aaafa" description={iconDescription} />
        <li>
          <ul className="bx--dropdown__list">{children}</ul>
        </li>
      </ul>
    );

    return dropdown;
  }
}

export default Dropdown;

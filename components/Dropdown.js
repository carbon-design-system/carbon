import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';
import ClickListener from '../internal/ClickListener';
import Icon from './Icon';

class Dropdown extends PureComponent {

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

  constructor(props) {
    super(props);
    const {
      children,
      selectedText,
      value,
      defaultText,
      open,
    } = props;

    let matchingChild;
    React.Children.forEach(children, child => {
      if (child.props.itemText === selectedText || child.props.value === value) {
        matchingChild = child;
      }
    });

    if (matchingChild) {
      this.state = {
        open,
        selectedText: matchingChild.props.itemText,
        value: matchingChild.props.value,
      };
    } else {
      this.state = {
        open,
        selectedText: defaultText,
        value: '',
      };
    }
  }

  close = () => {
    this.setState({ open: false });
  }

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
      <ClickListener onClickOutside={this.close}>
        <ul
          {...other}
          onClick={this.toggle}
          onKeyPress={this.toggle}
          value={this.state.value}
          className={dropdownClasses}
          tabIndex={tabIndex}
        >
          <li className="bx--dropdown-text">{this.state.selectedText}</li>
          <li>
            <Icon name="caret--down" className="bx--dropdown__arrow" description={iconDescription} />
          </li>
          <li>
            <ul className="bx--dropdown-list">{children}</ul>
          </li>
        </ul>
      </ClickListener>
    );

    return dropdown;
  }
}

export default Dropdown;

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ClickListener from '../../internal/ClickListener';
import Icon from '../Icon';

export default class Dropdown extends PureComponent {
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
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    tabIndex: 0,
    open: false,
    disabled: false,
    iconDescription: 'open list of options',
    onChange: () => {},
  };

  constructor(props) {
    super(props);
    this.state = this.resetState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.resetState(nextProps));
  }

  resetState(props) {
    const { children, selectedText, value, defaultText, open } = props;

    let matchingChild;
    React.Children.forEach(children, child => {
      if (
        child.props.itemText === selectedText ||
        child.props.value === value
      ) {
        matchingChild = child;
      }
    });

    if (matchingChild) {
      return {
        open,
        selectedText: matchingChild.props.itemText,
        value: matchingChild.props.value,
      };
    }
    return {
      open,
      selectedText: defaultText,
      value: '',
    };
  }

  close = () => {
    this.setState({ open: false });
  };

  toggle = evt => {
    if (this.props.disabled) {
      return;
    }

    // Open on click, enter, or space
    if (evt.which === 13 || evt.which === 32 || evt.type === 'click') {
      this.setState({ open: !this.state.open });
    }
  };

  handleItemClick = info => {
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
      disabled,
      selectedText, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        onClick: (...args) => {
          child.props.onClick && child.props.onClick(...args);
          this.handleItemClick(...args);
        },
      })
    );

    const dropdownClasses = classNames({
      'bx--dropdown': true,
      'bx--dropdown--open': this.state.open,
      'bx--dropdown--disabled': disabled,
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
          role="presentation">
          <li className="bx--dropdown-text">{this.state.selectedText}</li>
          <li>
            <Icon
              name="caret--down"
              className="bx--dropdown__arrow"
              description={iconDescription}
            />
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

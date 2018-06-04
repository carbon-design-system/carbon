import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import ClickListener from '../../internal/ClickListener';
import Icon from '../Icon';

let didWarnAboutDeprecation = false;

export default class Dropdown extends PureComponent {
  static propTypes = {
    ariaLabel: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    defaultText: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
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
    onOpen: () => {},
    onClose: () => {},
  };

  constructor(props) {
    super(props);
    this.state = this.resetState(props);
    if (__DEV__) {
      warning(
        didWarnAboutDeprecation,
        'The `Dropdown` component is being updated in the next release of ' +
          '`carbon-components-react`. Please use `DropdownV2` instead.'
      );
      didWarnAboutDeprecation = true;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(this.resetState(nextProps));
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.open && this.state.open) {
      this.props.onOpen();
    }
    if (prevState.open && !this.state.open) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  resetState(props) {
    const { children, selectedText, value, defaultText, open } = props;

    let matchingChild;
    React.Children.forEach(children, child => {
      if (
        child &&
        (child.props.itemText === selectedText || child.props.value === value)
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

  handleKeydown = evt => {
    const key = evt.keyCode || evt.which;
    if (key === 27 && this.state.open) {
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
      ariaLabel,
      tabIndex,
      defaultText, // eslint-disable-line no-unused-vars
      iconDescription,
      disabled,
      selectedText, // eslint-disable-line no-unused-vars
      onOpen, // eslint-disable-line no-unused-vars
      onClose, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const children = React.Children.toArray(this.props.children)
      .filter(Boolean)
      .map(child =>
        React.cloneElement(child, {
          onClick: (...args) => {
            child.props.onClick && child.props.onClick(...args);
            this.handleItemClick(...args);
          },
          isDropdownOpen: this.state.open,
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
          aria-label={ariaLabel}
          role="listbox">
          <li className="bx--dropdown-text">{this.state.selectedText}</li>
          <li>
            <Icon
              name="caret--down"
              className="bx--dropdown__arrow"
              description={iconDescription}
            />
          </li>
          <li>
            <ul
              role="menu"
              className="bx--dropdown-list"
              aria-label="inner dropdown menu">
              {children}
            </ul>
          </li>
        </ul>
      </ClickListener>
    );

    return dropdown;
  }
}

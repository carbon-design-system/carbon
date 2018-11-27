import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { iconCaretDown } from 'carbon-icons';
import { settings } from 'carbon-components';
import ClickListener from '../../internal/ClickListener';
import Icon from '../Icon';

const { prefix } = settings;

let didWarnAboutDeprecation = false;

export default class Dropdown extends PureComponent {
  static propTypes = {
    /**
     * Specify a label to be read by screen readers on the container node
     */
    ariaLabel: PropTypes.string.isRequired,

    /**
     * Specify the drop down items
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify the text for the trigger button until a selection is made
     */
    defaultText: PropTypes.string,

    /**
     * Specify the value of the selected dropdown item
     */
    value: PropTypes.string,

    /**
     * Specify the tab index of the container node
     */
    tabIndex: PropTypes.number,

    onClick: PropTypes.func,

    /**
     * Specify an `onChange` handler that is called whenever the Dropdown
     * changes which item is selected
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Function called when menu is open
     */
    onOpen: PropTypes.func,

    /**
     * Function called when menu is closed
     */
    onClose: PropTypes.func,

    /**
     * Specify the text content of the selected dropdown item
     */
    selectedText: PropTypes.string,

    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

    /**
     * Specify a description for the twistie icon that can be read by screen
     * readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify if the control should be disabled, or not
     */
    disabled: PropTypes.bool,

    /**
     * Specify whether you want the light version of this control
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    tabIndex: 0,
    open: false,
    disabled: false,
    light: false,
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
      light,
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
      [`${prefix}--dropdown`]: true,
      [`${prefix}--dropdown--open`]: this.state.open,
      [`${prefix}--dropdown--disabled`]: disabled,
      [`${prefix}--dropdown--light`]: light,
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
          <li className={`${prefix}--dropdown-text`}>
            {this.state.selectedText}
          </li>
          <li>
            <Icon
              icon={iconCaretDown}
              className={`${prefix}--dropdown__arrow`}
              description={iconDescription}
            />
          </li>
          <li>
            <ul
              role="menu"
              className={`${prefix}--dropdown-list`}
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

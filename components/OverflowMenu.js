import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import ClickListener from '../internal/ClickListener';
import Icon from './Icon';

class OverflowMenu extends Component {

  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    id: PropTypes.string,
    ariaLabel: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    handleClick: PropTypes.func,
    iconDescription: PropTypes.string.isRequired,
  }

  static defaultProps = {
    ariaLabel: 'list of options',
    iconDescription: 'open and close list of options',
    open: false,
    onClick: () => {},
    tabIndex: 0,
  }

  state = {
    open: this.props.open,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
  }

  handleClick = (evt) => {
    this.setState({ open: !this.state.open });
    this.props.onClick(evt);
  }

  handleKeyPress = (evt) => {
    const key = evt.key || evt.which;

    if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
      this.setState({ open: !this.state.open });
    }
  }

  handleClickOutside = () => {
    this.setState({ open: false });
  }

  handleBlur = (evt) => {
    if (!this.refs.overflow.contains(evt.relatedTarget)) {
      this.setState({ open: false });
    }
  }

  render() {
    const {
      id,
      tabIndex,
      ariaLabel,
      children,
      iconDescription,
      ...other,
    } = this.props;

    const overflowMenuClasses = classNames(
      this.props.className,
      'bx--overflow-menu',
      { 'bx--overflow-menu--open': this.state.open },
    );

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          ref="overflow"
          className={overflowMenuClasses}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyPress}
          onBlur={this.handleBlur}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
        >
          <Icon
            className="bx--overflow-menu__icon"
            name="overflow-menu"
            description={iconDescription}
            width="100%"
          />
          <ul className="bx--overflow-menu__options">
            {children}
          </ul>
        </div>
      </ClickListener>
    );
  }
}

export default OverflowMenu;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ClickListener from '../internal/ClickListener';
import FloatingMenu from '../internal/FloatingMenu';
import OptimizedResize from '../internal/OptimizedResize';
import Icon from './Icon';

class OverflowMenu extends Component {
  static propTypes = {
    open: PropTypes.bool,
    flipped: PropTypes.bool,
    floatingMenu: PropTypes.bool,
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
    iconName: PropTypes.string,
    menuOffset: PropTypes.object,
    menuOffsetFlip: PropTypes.object,
    iconClass: PropTypes.string,
  };

  static defaultProps = {
    ariaLabel: 'list of options',
    iconDescription: 'open and close list of options',
    iconName: 'overflow-menu',
    open: false,
    flipped: false,
    floatingMenu: false,
    onClick: () => {},
    tabIndex: 0,
    menuOffset: { top: 0, left: 60.5 },
    menuOffsetFlip: { top: 0, left: -60.5 },
  };

  state = {
    open: this.props.open,
  };

  componentDidMount() {
    this.getMenuPosition();
    this.hResize = OptimizedResize.add(() => {
      this.getMenuPosition();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
  }

  componentWillUnmount() {
    this.hResize.release();
  }

  getMenuPosition = () => {
    const menuPosition = this.menuEl.getBoundingClientRect();
    this.setState({ menuPosition });
  };

  handleClick = evt => {
    this.setState({ open: !this.state.open });
    this.props.onClick(evt);
  };

  handleKeyPress = evt => {
    const key = evt.key || evt.which;

    if (key === 'Enter' || key === 13 || key === ' ' || key === 32) {
      this.setState({ open: !this.state.open });
    }
  };

  handleClickOutside = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      id,
      tabIndex,
      ariaLabel,
      children,
      iconDescription,
      iconName,
      flipped,
      floatingMenu,
      menuOffset,
      menuOffsetFlip,
      iconClass,
      ...other
    } = this.props;

    const overflowMenuClasses = classNames(
      this.props.className,
      'bx--overflow-menu',
      {
        'bx--overflow-menu--open': this.state.open,
      }
    );

    const overflowMenuOptionsClasses = classNames('bx--overflow-menu-options', {
      'bx--overflow-menu--flip': this.props.flipped,
      'bx--overflow-menu-options--open': this.state.open,
    });

    const overflowMenuIconClasses = classNames(
      'bx--overflow-menu__icon',
      iconClass
    );

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          className={overflowMenuClasses}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyPress}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
          ref={node => {
            this.menuEl = node;
          }}
        >
          <Icon
            className={overflowMenuIconClasses}
            name={iconName}
            description={iconDescription}
            style={{ width: '100%' }}
          />
          {floatingMenu
            ? <FloatingMenu
                menuPosition={this.state.menuPosition}
                menuDirection="bottom"
                menuOffset={flipped ? menuOffsetFlip : menuOffset}
              >
                <ul className={overflowMenuOptionsClasses}>
                  {children}
                </ul>
              </FloatingMenu>
            : <ul className={overflowMenuOptionsClasses}>
                {children}
              </ul>}
        </div>
      </ClickListener>
    );
  }
}

export default OverflowMenu;

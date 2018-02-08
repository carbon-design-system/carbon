import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ClickListener from '../../internal/ClickListener';
import FloatingMenu from '../../internal/FloatingMenu';
import OptimizedResize from '../../internal/OptimizedResize';
import Icon from '../Icon';

/**
 * @param {Element} menuBody The menu body with the menu arrow.
 * @returns {FloatingMenu~offset} The adjustment of the floating menu position, upon the position of the menu arrow.
 * @private
 */
const getMenuOffset = menuBody => {
  const menuWidth = menuBody.offsetWidth;
  const arrowStyle = menuBody.ownerDocument.defaultView.getComputedStyle(
    menuBody,
    ':before'
  );
  const values = ['top', 'left', 'width', 'height', 'border-top-width'].reduce(
    (o, name) => ({
      ...o,
      [name]: Number(
        (/^([\d-]+)px$/.exec(arrowStyle.getPropertyValue(name)) || [])[1]
      ),
    }),
    {}
  );
  if (Object.keys(values).every(name => !isNaN(values[name]))) {
    const {
      top,
      left,
      width,
      height,
      'border-top-width': borderTopWidth,
    } = values;
    return {
      left:
        menuWidth / 2 -
        (left + Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2),
      top: Math.sqrt(Math.pow(borderTopWidth, 2) * 2) - top,
    };
  }
};

export default class OverflowMenu extends Component {
  static propTypes = {
    /**
     * `true` if the menu should be open.
     */
    open: PropTypes.bool,

    /**
     * `true` if the menu alignment should be flipped.
     */
    flipped: PropTypes.bool,

    /**
     * `true` if the menu should be floated.
     * Useful when the container of the triggering element cannot have `overflow:visible` style, etc.
     */
    floatingMenu: PropTypes.bool,

    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * The CSS class names.
     */
    className: PropTypes.string,

    /**
     * The `tabindex` attribute.
     */
    tabIndex: PropTypes.number,

    /**
     * The element ID.
     */
    id: PropTypes.string,

    /**
     * The ARIA label.
     */
    ariaLabel: PropTypes.string,

    /**
     * The event handler for the `click` event.
     */
    onClick: PropTypes.func,

    /**
     * The event handler for the `focus` event.
     */
    onFocus: PropTypes.func,

    /**
     * The event handler for the `keydown` event.
     */
    onKeyDown: PropTypes.func,

    /**
     * The icon description.
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * The icon name.
     */
    iconName: PropTypes.string,

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffset: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The adjustment in position applied to the floating menu.
     */
    menuOffsetFlip: PropTypes.oneOfType([
      PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
      }),
      PropTypes.func,
    ]),

    /**
     * The CSS class for the icon.
     */
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
    menuOffset: getMenuOffset,
    menuOffsetFlip: getMenuOffset,
  };

  state = {
    /**
     * The open/closed state.
     * @type {boolean}
     */
    open: this.props.open,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.open && !this.state.open) {
      requestAnimationFrame(() => {
        this.getMenuPosition();
      });
      return false; // Let `.getMenuPosition()` cause render
    }
    return true;
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.getMenuPosition();
    });
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
    if (this.menuEl) {
      const menuPosition = this.menuEl.getBoundingClientRect();
      this.setState({ menuPosition });
    }
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
    this.closeMenu();
  };

  closeMenu = () => {
    this.setState({ open: false });
  };

  bindMenuEl = menuEl => {
    this.menuEl = menuEl;
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
      onClick, // eslint-disable-line
      ...other
    } = this.props;

    const { open } = this.state;

    const overflowMenuClasses = classNames(
      this.props.className,
      'bx--overflow-menu',
      {
        'bx--overflow-menu--open': open,
      }
    );

    const overflowMenuOptionsClasses = classNames('bx--overflow-menu-options', {
      'bx--overflow-menu--flip': this.props.flipped,
      'bx--overflow-menu-options--open': open,
    });

    const overflowMenuIconClasses = classNames(
      'bx--overflow-menu__icon',
      iconClass
    );

    const childrenWithProps = React.Children.toArray(children).map(child =>
      React.cloneElement(child, {
        closeMenu: this.closeMenu,
      })
    );

    const menuBody = (
      <ul className={overflowMenuOptionsClasses}>{childrenWithProps}</ul>
    );
    const wrappedMenuBody = !floatingMenu ? (
      menuBody
    ) : (
      <FloatingMenu
        menuPosition={this.state.menuPosition}
        menuOffset={flipped ? menuOffsetFlip : menuOffset}>
        {menuBody}
      </FloatingMenu>
    );

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          role="button"
          className={overflowMenuClasses}
          onKeyDown={this.handleKeyPress}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
          ref={this.bindMenuEl}>
          <Icon
            onClick={this.handleClick}
            className={overflowMenuIconClasses}
            name={iconName}
            description={iconDescription}
            style={{ width: '100%' }}
          />
          {open && wrappedMenuBody}
        </div>
      </ClickListener>
    );
  }
}

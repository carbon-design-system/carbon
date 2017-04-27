import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import ClickListener from '../internal/ClickListener';
import Icon from './Icon';
if (!process.env.EXCLUDE_SASS) {
  import(
    '@console/bluemix-components/consumables/scss/components/overflow-menu/overflow-menu.scss'
  );
}

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
  };

  static defaultProps = {
    ariaLabel: 'list of options',
    iconDescription: 'open and close list of options',
    open: false,
    onClick: () => {},
    tabIndex: 0,
  };

  state = {
    open: this.props.open,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open });
    }
  }

  closeMenu = () => {
    this.setState({
      open: false,
    });
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

  render() {
    const {
      id,
      tabIndex,
      ariaLabel,
      children,
      iconDescription,
      onClick, // eslint-disable-line
      ...other
    } = this.props;

    const overflowMenuClasses = classNames(
      this.props.className,
      'bx--overflow-menu',
      { 'bx--overflow-menu--open': this.state.open }
    );

    const childrenWithProps = React.Children.toArray(children).map(child =>
      React.cloneElement(child, {
        closeMenu: this.closeMenu,
      })
    );

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          onKeyDown={this.handleKeyPress}
          ref={overflow => (this.overflow = overflow)} // eslint-disable-line
          className={overflowMenuClasses}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
        >
          <Icon
            onClick={this.handleClick}
            className="bx--overflow-menu__icon"
            name="overflow-menu"
            description={iconDescription}
            width="100%"
          />
          <ul className="bx--overflow-menu__options">
            {childrenWithProps}
          </ul>
        </div>
      </ClickListener>
    );
  }
}

export default OverflowMenu;

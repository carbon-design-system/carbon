import React from 'react';
import classNames from 'classnames';
import ClickListener from '../internal/ClickListener';
import Icon from '../elements/Icon';
import '@console/bluemix-components/consumables/scss/components/overflow-menu/overflow-menu.scss';

class OverflowMenu extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    id: React.PropTypes.string,
    ariaLabel: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    handleClick: React.PropTypes.func,
  }

  static defaultProps = {
    ariaLabel: 'List of options',
  }

  state = {
    open: false,
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  setOpen = (open) => {
    this.setState({ open });
  }

  handleClick = () => {
    this.setOpen(!this.state.open);
  }

  handleClickOutside = () => {
    this.setOpen(false);
  }

  handleKeyPress = (evt) => {
    const key = evt.key || evt.which;

    if (key === 'Enter' || key === 13) {
      this.setOpen(false);
    }
  }

  render() {
    const {
      id,
      tabIndex,
      ariaLabel,
      children,
      ...other,
    } = this.props;

    const overflowMenuClasses = classNames(
      this.props.className,
      'bx--overflow-menu',
      { 'bx--overflow-menu--open': this.state.open },
    );

    const overriddenStyles = {
      height: 40,
    };

    return (
      <ClickListener onClickOutside={this.handleClickOutside}>
        <div
          {...other}
          ref="overflow"
          data-overflow-menu
          className={overflowMenuClasses}
          onClick={this.handleClick}
          aria-label={ariaLabel}
          id={id}
          tabIndex={tabIndex}
        >
          <Icon
            className="bx--overflow-menu__icon"
            name="overflow_menu_icon"
            fill="#dfe6eb"
            height="40px"
            viewBox="0 0 14 60"
            style={overriddenStyles}
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

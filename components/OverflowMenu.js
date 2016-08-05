import React from 'react';
import classNames from 'classnames';
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
    className: 'bx--overflow-menu',
    ariaLabel: 'List of options',
  }

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    document.addEventListener('click', (evt) => {
      this.handleDocumentClick(evt);
    });
    document.addEventListener('keypress', (evt) => {
      this.handleKeyPress(evt);
    });
  }

  handleDocumentClick(evt) {
    const target = evt.target;
    const element = this.refs.overflow;
    if (element) {
      if (element.contains(target)) {
        element.classList.toggle('bx--overflow-menu--open');
      } else {
        element.classList.remove('bx--overflow-menu--open');
      }
    }
  }

  handleKeyPress(evt) {
    const key = evt.key || evt.which;
    const element = this.refs.overflow;
    if (key === 'Enter' || key === 13) {
      element.classList.remove('bx--overflow-menu--open');
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

    const overflowMenuClasses = classNames({
      'bx--overflow-menu': true,
      [this.props.className]: this.props.className,
    });

    const overriddenStyles = {
      height: 40,
    };

    const overflowMenu = (
      <div
        {...other}
        ref="overflow"
        data-overflow-menu
        className={overflowMenuClasses}
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
    );

    return overflowMenu;
  }
}

export default OverflowMenu;

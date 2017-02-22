import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Icon from './Icon';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/inline-left-nav/inline-left-nav.scss';

class InteriorLeftNavList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    open: PropTypes.bool,
    onItemClick: PropTypes.func,
    activeHref: PropTypes.string,
    iconDescription: PropTypes.string,
  };

  static defaultProps = {
    open: false,
    tabIndex: 0,
    activeHref: '#',
    iconDescription: 'display sub navigation items',
    onItemClick: () => {},
  };

  state = {
    open: this.props.open,
  };

  handleListClick = (evt) => {
    // 13 = Enter, 32 = Spacebar
    if (evt.which === 13 || evt.which === 32 || evt.type === 'click') {
      this.setState({ open: !this.state.open });
    }
  };

  render() {
    const {
      tabIndex,
      onItemClick,
      title,
      children,
      className,
      activeHref,
      iconDescription,
      ...other,
    } = this.props;

    const classNames = classnames(
      'left-nav-list__item',
      'left-nav-list__item--has-children',
      {
        'left-nav-list__item--expanded': this.state.open,
      },
      className);

    const newChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        onClick: onItemClick,
        tabIndex: this.state.open ? 0 : -1,
        activeHref,
      })
    );

    return (
      <li
        className={classNames}
        tabIndex={tabIndex}
        onClick={this.handleListClick}
        onKeyPress={this.handleListClick}
        role="menuitem"
        {...other}
      >
        <a className="left-nav-list__item-link">
          {title}
          <div className="left-nav-list__item-icon">
            <Icon
              name="chevron--down"
              description={iconDescription}
              className="left-nav-list__item-icon bx--inline-left-nav__icon"
            />
          </div>
        </a>
        <ul
          role="menu"
          className="left-nav-list left-nav-list--nested"
          aria-hidden
        >
          {newChildren}
        </ul>
      </li>
    );
  }
}

export default InteriorLeftNavList;
